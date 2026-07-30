"use strict"

const fs = require("node:fs")
const path = require("node:path")
const { canonicalHash, fileSha256, sha256 } = require("./canonical.js")
const { projectRoot, relativePath, runGit } = require("./project.js")

const PROJECTIONS = new Set(["workspace", "staged", "commit", "base-diff"])

function workspaceEntries(root) {
  const entries = []

  function visit(directory, topLevel = false) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (topLevel && (entry.name === ".git" || entry.name === ".ai")) continue
      const full = path.join(directory, entry.name)
      const stat = fs.lstatSync(full)
      const rel = relativePath(root, full)
      if (stat.isSymbolicLink()) {
        entries.push({ path: rel, type: "symlink", mode: stat.mode & 0o7777, target: fs.readlinkSync(full) })
      } else if (stat.isDirectory()) {
        visit(full, false)
      } else if (stat.isFile()) {
        entries.push({ path: rel, type: "file", mode: stat.mode & 0o7777, size: stat.size, sha256: fileSha256(full) })
      } else {
        entries.push({ path: rel, type: "other", mode: stat.mode & 0o7777, size: stat.size })
      }
    }
  }

  visit(root, true)
  return entries
}

function parseNullSeparated(bufferOrString) {
  const text = Buffer.isBuffer(bufferOrString) ? bufferOrString.toString("utf8") : String(bufferOrString)
  return text.split("\0").filter(Boolean)
}

function stagedIdentity(root) {
  const tree = String(runGit(root, ["write-tree"])).trim()
  const raw = runGit(root, ["ls-files", "--stage", "-z"], { encoding: null })
  const entries = parseNullSeparated(raw).map((line) => {
    const match = line.match(/^(\d+) ([0-9a-f]+) (\d+)\t([\s\S]+)$/)
    if (!match) throw new Error(`unexpected staged entry: ${line}`)
    return { mode: match[1], blob: match[2], stage: Number(match[3]), path: match[4] }
  })
  if (entries.some((entry) => entry.stage !== 0)) throw new Error("staged projection does not allow unresolved index stages")
  return { tree, entries }
}

function commitIdentity(root, commitRef = "HEAD") {
  const commit = String(runGit(root, ["rev-parse", `${commitRef}^{commit}`])).trim()
  const tree = String(runGit(root, ["rev-parse", `${commit}^{tree}`])).trim()
  const raw = runGit(root, ["ls-tree", "-r", "-z", "--full-tree", commit], { encoding: null })
  return { commit, tree, raw_sha256: sha256(raw) }
}

function baseDiffIdentity(root, candidateRef = "HEAD", baseRef = "HEAD^") {
  const candidate = String(runGit(root, ["rev-parse", `${candidateRef}^{commit}`])).trim()
  const base = String(runGit(root, ["rev-parse", `${baseRef}^{commit}`])).trim()
  const mergeBase = String(runGit(root, ["merge-base", base, candidate])).trim()
  const raw = runGit(root, ["diff", "--raw", "-z", "--no-renames", mergeBase, candidate], { encoding: null })
  return { candidate, base, merge_base: mergeBase, raw_diff_sha256: sha256(raw) }
}

function freezeCandidate({ projectDir, projection, commit = "HEAD", base = "HEAD^" }) {
  if (!PROJECTIONS.has(projection)) throw new Error(`unsupported candidate projection: ${projection}`)
  const root = projectRoot(projectDir)
  let identity
  if (projection === "workspace") identity = { entries: workspaceEntries(root) }
  else if (projection === "staged") identity = stagedIdentity(root)
  else if (projection === "commit") identity = commitIdentity(root, commit)
  else identity = baseDiffIdentity(root, commit, base)

  const parameters = projection === "commit"
    ? { commit }
    : projection === "base-diff"
      ? { commit, base }
      : {}
  const digest = canonicalHash({ schema: "GOVERNANCE_CANDIDATE_V1", projection, parameters, identity })
  return {
    schema: "GOVERNANCE_CANDIDATE_V1",
    projection,
    parameters,
    identity,
    digest,
    created_at: new Date().toISOString(),
  }
}

function verifyCandidate({ projectDir, candidate }) {
  if (!candidate || candidate.schema !== "GOVERNANCE_CANDIDATE_V1" || !PROJECTIONS.has(candidate.projection)) {
    return { status: "INVALID_CANDIDATE" }
  }
  let live
  try {
    live = freezeCandidate({
      projectDir,
      projection: candidate.projection,
      commit: candidate.parameters?.commit || "HEAD",
      base: candidate.parameters?.base || "HEAD^",
    })
  } catch (error) {
    return { status: "CANDIDATE_UNAVAILABLE", reason: error instanceof Error ? error.message : String(error) }
  }
  return live.digest === candidate.digest
    ? { status: "PASS", live }
    : { status: "CANDIDATE_MISMATCH", expected: candidate.digest, actual: live.digest, live }
}

module.exports = { freezeCandidate, verifyCandidate, workspaceEntries }

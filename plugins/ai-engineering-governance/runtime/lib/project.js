"use strict"

const fs = require("node:fs")
const path = require("node:path")
const { spawnSync } = require("node:child_process")
const { canonicalStringify } = require("./canonical.js")

function existingDirectory(value) {
  if (!value) return null
  try {
    const resolved = path.resolve(value)
    return fs.statSync(resolved).isDirectory() ? resolved : null
  } catch {
    return null
  }
}

function projectRoot(projectDir) {
  const candidate = existingDirectory(projectDir) || existingDirectory(process.env.ZCODE_PROJECT_DIR) || existingDirectory(process.env.CLAUDE_PROJECT_DIR) || process.cwd()
  const git = spawnSync("git", ["rev-parse", "--show-toplevel"], { cwd: candidate, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
  if (git.status === 0 && git.stdout.trim()) return path.resolve(git.stdout.trim())
  return path.resolve(candidate)
}

function isInside(root, candidate) {
  const relative = path.relative(path.resolve(root), path.resolve(candidate))
  return relative === "" || (!path.isAbsolute(relative) && relative !== ".." && !relative.startsWith(`..${path.sep}`))
}

function assertNoLinkTraversal(root, resolved) {
  const relative = path.relative(path.resolve(root), path.resolve(resolved))
  if (!relative) return
  let current = path.resolve(root)
  for (const segment of relative.split(path.sep)) {
    current = path.join(current, segment)
    let stat
    try {
      stat = fs.lstatSync(current)
    } catch (error) {
      if (error && error.code === "ENOENT") break
      throw error
    }
    if (stat.isSymbolicLink()) throw new Error(`governed path crosses a symbolic link or junction: ${current}`)
  }
}

function resolveInside(root, value) {
  const rootPath = path.resolve(root)
  const resolved = path.resolve(rootPath, value)
  if (!isInside(rootPath, resolved)) throw new Error(`path escapes project root: ${value}`)
  assertNoLinkTraversal(rootPath, resolved)
  return resolved
}

function relativePath(root, candidate) {
  if (!isInside(root, candidate)) throw new Error(`path escapes project root: ${candidate}`)
  return path.relative(root, candidate).split(path.sep).join("/") || "."
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
  return dirPath
}

function atomicWriteJson(filePath, value) {
  ensureDir(path.dirname(filePath))
  const temporary = `${filePath}.${process.pid}.${Date.now()}.tmp`
  fs.writeFileSync(temporary, `${canonicalStringify(value)}\n`, { encoding: "utf8", mode: 0o600 })
  fs.renameSync(temporary, filePath)
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

function appendJsonLine(filePath, value) {
  ensureDir(path.dirname(filePath))
  fs.appendFileSync(filePath, `${canonicalStringify(value)}\n`, "utf8")
}

function runGit(cwd, args, options = {}) {
  const result = spawnSync("git", args, {
    cwd,
    encoding: options.encoding === null ? null : "utf8",
    maxBuffer: 64 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  })
  if (result.status !== 0) {
    const stderr = Buffer.isBuffer(result.stderr) ? result.stderr.toString("utf8") : result.stderr
    throw new Error(`git ${args.join(" ")} failed: ${(stderr || "unknown error").trim()}`)
  }
  return result.stdout
}

function activeTaskId(root) {
  const statusPath = resolveInside(root, path.join(".ai", "STATUS.md"))
  if (fs.existsSync(statusPath)) {
    const match = fs.readFileSync(statusPath, "utf8").match(/^Current task:\s*(\S+)/mi)
    if (match && match[1].toUpperCase() !== "NONE") return match[1]
  }
  const tasksDir = resolveInside(root, path.join(".ai", "tasks"))
  if (!fs.existsSync(tasksDir)) return null
  const candidates = fs.readdirSync(tasksDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(resolveInside(tasksDir, path.join(entry.name, "RUN_STATE.json"))))
    .map((entry) => {
      const statePath = resolveInside(tasksDir, path.join(entry.name, "RUN_STATE.json"))
      return { name: entry.name, mtime: fs.statSync(statePath).mtimeMs }
    })
    .sort((a, b) => b.mtime - a.mtime)
  return candidates[0]?.name || null
}

module.exports = {
  activeTaskId,
  appendJsonLine,
  assertNoLinkTraversal,
  atomicWriteJson,
  ensureDir,
  existingDirectory,
  isInside,
  projectRoot,
  readJson,
  relativePath,
  resolveInside,
  runGit,
}

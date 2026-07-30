"use strict"

const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")
const { spawnSync } = require("node:child_process")
const test = require("node:test")

const RUNTIME = path.resolve(__dirname, "../../plugins/ai-engineering-governance/runtime/lib")
const { canonicalHash } = require(path.join(RUNTIME, "canonical.js"))
const { freezeCandidate, verifyCandidate } = require(path.join(RUNTIME, "candidate-authority.js"))
const { createReceipt, verifyReceipt, armPreCommit } = require(path.join(RUNTIME, "approval-receipt.js"))
const { validateRunState } = require(path.join(RUNTIME, "run-state.js"))
const { startContext, recordContextCycle, selectSkills } = require(path.join(RUNTIME, "context-intelligence.js"))
const { createEvidenceRecord, checkEvidenceReuse } = require(path.join(RUNTIME, "evidence-reuse.js"))
const { deriveReviewLenses } = require(path.join(RUNTIME, "review-lenses.js"))
const { GovernedMemory } = require(path.join(RUNTIME, "governed-memory.js"))
const { resolveInside } = require(path.join(RUNTIME, "project.js"))

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "aeg-runtime-"))
}

function git(cwd, args) {
  const result = spawnSync("git", args, { cwd, encoding: "utf8" })
  assert.equal(result.status, 0, result.stderr)
  return result.stdout.trim()
}

function initGitProject() {
  const root = tempDir()
  git(root, ["init", "-q"])
  git(root, ["config", "user.email", "test@example.invalid"])
  git(root, ["config", "user.name", "Runtime Test"])
  fs.writeFileSync(path.join(root, "app.txt"), "one\n")
  git(root, ["add", "app.txt"])
  git(root, ["commit", "-qm", "initial"])
  return root
}

test("canonical hashing is key-order stable", () => {
  assert.equal(canonicalHash({ b: 2, a: 1 }), canonicalHash({ a: 1, b: 2 }))
})

test("governed paths reject symbolic-link or junction traversal", (t) => {
  const root = tempDir()
  const outside = tempDir()
  const link = path.join(root, ".ai")
  try {
    fs.symlinkSync(outside, link, process.platform === "win32" ? "junction" : "dir")
  } catch (error) {
    t.skip(`link creation unavailable: ${error.code || error.message}`)
    return
  }
  assert.throws(() => resolveInside(root, ".ai/tasks/TASK-1/RUN_STATE.json"), /symbolic link|junction/i)
})

test("workspace candidate excludes root .git and .ai and detects content changes", () => {
  const root = initGitProject()
  fs.mkdirSync(path.join(root, ".ai"))
  fs.writeFileSync(path.join(root, ".ai", "state.txt"), "ignored")
  const frozen = freezeCandidate({ projectDir: root, projection: "workspace" })
  fs.writeFileSync(path.join(root, ".ai", "state.txt"), "still ignored")
  assert.equal(verifyCandidate({ projectDir: root, candidate: frozen }).status, "PASS")
  fs.writeFileSync(path.join(root, "app.txt"), "two\n")
  assert.equal(verifyCandidate({ projectDir: root, candidate: frozen }).status, "CANDIDATE_MISMATCH")
})

test("staged candidate is bound to exact index blobs", () => {
  const root = initGitProject()
  fs.writeFileSync(path.join(root, "app.txt"), "staged-one\n")
  git(root, ["add", "app.txt"])
  const frozen = freezeCandidate({ projectDir: root, projection: "staged" })
  fs.writeFileSync(path.join(root, "app.txt"), "unstaged-only\n")
  assert.equal(verifyCandidate({ projectDir: root, candidate: frozen }).status, "PASS")
  git(root, ["add", "app.txt"])
  assert.equal(verifyCandidate({ projectDir: root, candidate: frozen }).status, "CANDIDATE_MISMATCH")
})

test("approval receipt binds candidate and required artifacts", () => {
  const root = initGitProject()
  const taskDir = path.join(root, ".ai", "tasks", "TASK-1")
  fs.mkdirSync(path.join(taskDir, "evidence"), { recursive: true })
  fs.mkdirSync(path.join(taskDir, "reviews"), { recursive: true })
  const files = {
    approved_requirements: "APPROVED_REQUIREMENTS.md",
    execution_packet: "evidence/EXECUTION_PACKET.md",
    verification_profile: "VERIFICATION_PROFILE.md",
    evidence_manifest: "evidence/VERIFICATION_EVIDENCE.md",
    implementation_review: "reviews/IMPLEMENTATION_REVIEW.md",
    architecture_review: "reviews/ARCHITECTURE_REVIEW.md",
    final_adjudication: "reviews/FINAL_ADJUDICATION.md",
  }
  for (const rel of Object.values(files)) {
    const full = path.join(taskDir, rel)
    fs.mkdirSync(path.dirname(full), { recursive: true })
    fs.writeFileSync(full, `${rel}\n`)
  }
  fs.writeFileSync(path.join(root, "app.txt"), "approved\n")
  git(root, ["add", "app.txt"])
  const candidate = freezeCandidate({ projectDir: root, projection: "staged" })
  const receiptPath = path.join(taskDir, "approval-receipt.json")
  createReceipt({ projectDir: root, taskId: "TASK-1", candidate, artifacts: files, receiptPath })
  assert.equal(verifyReceipt({ projectDir: root, receiptPath }).status, "PASS")
  fs.writeFileSync(path.join(taskDir, "reviews", "FINAL_ADJUDICATION.md"), "changed\n")
  assert.equal(verifyReceipt({ projectDir: root, receiptPath }).status, "APPROVAL_RECEIPT_MISMATCH")
})

test("pre-commit arming requires a valid staged receipt", () => {
  const root = initGitProject()
  const taskDir = path.join(root, ".ai", "tasks", "TASK-2")
  fs.mkdirSync(taskDir, { recursive: true })
  const receiptPath = path.join(taskDir, "approval-receipt.json")
  fs.writeFileSync(receiptPath, JSON.stringify({ schema: "invalid" }))
  assert.throws(() => armPreCommit({ projectDir: root, receiptPath }), /valid staged approval receipt/i)
})

test("non-terminal run state requires typed actionable continuation", () => {
  assert.throws(() => validateRunState({ state: "READY_FOR_REVIEW", next_action: "continue" }), /ACTIONABLE_CONTINUATION_V1/)
  const validated = validateRunState({
    state: "READY_FOR_REVIEW",
    terminal: false,
    next_action: {
      kind: "execute",
      command: "/ai-review",
      arguments: ["TASK-1"],
      expected_postcondition: "TASK_VALIDATED",
    },
  })
  assert.equal(validated.next_action.kind, "execute")
})

test("context intelligence enforces work-class budget and three-cycle terminal state", () => {
  const root = tempDir()
  const taskDir = path.join(root, ".ai", "tasks", "TASK-3")
  const started = startContext({ taskDir, workClass: "PATCH" })
  assert.equal(started.schema, "CONTEXT_BUDGET_V1")
  recordContextCycle({ taskDir, cycle: 1, admitted: ["a.js"], rejected: [], gaps: ["caller"], terminal: null })
  recordContextCycle({ taskDir, cycle: 2, admitted: ["b.js"], rejected: [], gaps: ["contract"], terminal: null })
  assert.throws(
    () => recordContextCycle({ taskDir, cycle: 3, admitted: [], rejected: [], gaps: ["contract"], terminal: null }),
    /CONTEXT_SUFFICIENT|BLOCKED_CONTEXT_GAP/,
  )
  const final = recordContextCycle({ taskDir, cycle: 3, admitted: [], rejected: [], gaps: ["contract"], terminal: "BLOCKED_CONTEXT_GAP" })
  assert.equal(final.terminal, "BLOCKED_CONTEXT_GAP")
})

test("skill selection respects trust, work class, conflicts and token budget", () => {
  const result = selectSkills({
    workClass: "PATCH",
    languages: ["javascript"],
    frameworks: [],
    tokenBudget: 120,
    candidates: [
      { skill_id: "broad", trust_class: "WORKSPACE_ADVISORY", supported_work_classes: ["PATCH"], languages: ["javascript"], estimated_context_tokens: 100, overlaps_with: ["focused"] },
      { skill_id: "focused", trust_class: "PROJECT_AUTHORITATIVE", supported_work_classes: ["PATCH"], languages: ["javascript"], estimated_context_tokens: 60, overlaps_with: ["broad"] },
      { skill_id: "wrong", trust_class: "PROJECT_AUTHORITATIVE", supported_work_classes: ["NEW_PRODUCT"], languages: ["javascript"], estimated_context_tokens: 10 },
    ],
  })
  assert.deepEqual(result.selected.map((item) => item.skill_id), ["focused"])
  assert.equal(result.rejected.find((item) => item.skill_id === "wrong").reason, "WORK_CLASS_MISMATCH")
})

test("evidence reuse requires prior PASS and byte-identical dependency map", () => {
  const root = tempDir()
  const recordPath = path.join(root, "evidence.json")
  createEvidenceRecord({ recordPath, result: "PASS", dependencies: { candidate: "abc", command: "npm test", node: "24" } })
  assert.equal(checkEvidenceReuse({ recordPath, dependencies: { node: "24", command: "npm test", candidate: "abc" } }).status, "PASS")
  assert.equal(checkEvidenceReuse({ recordPath, dependencies: { node: "24", command: "npm test", candidate: "def" } }).status, "EVIDENCE_STALE")
})

test("risk profile derives focused review lenses without removing baselines", () => {
  const lenses = deriveReviewLenses({ SECURITY: "HIGH", PUBLIC_CONTRACT: "LOW", PERFORMANCE: "HIGH" })
  assert.ok(lenses.implementation.includes("CORRECTNESS"))
  assert.ok(lenses.architecture.includes("SECURITY_BOUNDARIES"))
  assert.ok(lenses.conditional.includes("AUTHORIZATION"))
  assert.ok(lenses.conditional.includes("PUBLIC_CONTRACT"))
  assert.ok(lenses.conditional.includes("PERFORMANCE"))
})

test("governed memory lifecycle is Final-Reviewer controlled and advisory", () => {
  const root = tempDir()
  const memory = new GovernedMemory({ databasePath: path.join(root, "memory.sqlite") })
  const proposed = memory.propose({ topic: "dependency", content: "Prefer the existing parser.", taskId: "TASK-1", evidenceDigest: "abc" })
  assert.equal(proposed.status, "CANDIDATE")
  assert.throws(() => memory.adjudicate({ id: proposed.id, decision: "ACTIVE", role: "executor", reviewDigest: "r1" }), /Final Reviewer/)
  memory.adjudicate({ id: proposed.id, decision: "ACTIVE", role: "final-reviewer", reviewDigest: "r1" })
  const found = memory.search({ query: "parser", limit: 5 })
  assert.equal(found[0].status, "ACTIVE")
  assert.equal(found[0].advisory, true)
  memory.close()
})

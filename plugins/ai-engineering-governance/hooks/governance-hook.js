#!/usr/bin/env node
"use strict"

const fs = require("node:fs")
const path = require("node:path")
const { activeTaskId, isInside, projectRoot, readJson, relativePath, resolveInside } = require("../runtime/lib/project.js")
const { verifyArmedPreCommit } = require("../runtime/lib/approval-receipt.js")
const { validateRunState } = require("../runtime/lib/run-state.js")

let hookInput = {}
try {
  const raw = fs.readFileSync(0, "utf8")
  if (raw.trim()) hookInput = JSON.parse(raw)
} catch {
  hookInput = {}
}

function emit(value) {
  if (value && typeof value === "object") process.stdout.write(JSON.stringify(value))
}

function context(event, text) {
  return { hookSpecificOutput: { hookEventName: event, additionalContext: text } }
}

function deny(reason) {
  emit({ hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: reason } })
}

function toolName() {
  return String(hookInput.tool_name || hookInput.toolName || hookInput.tool || hookInput.name || "")
}

function toolPayload() {
  for (const key of ["tool_input", "toolInput", "input", "parameters", "args"]) {
    const value = hookInput[key]
    if (value && typeof value === "object" && !Array.isArray(value)) return value
  }
  return {}
}

function payloadText() {
  try { return JSON.stringify(toolPayload()) } catch { return "" }
}

function root() {
  return projectRoot(hookInput.cwd)
}

function activeRunState(projectDir) {
  const taskId = activeTaskId(projectDir)
  if (!taskId) return { taskId: null, state: null, path: null }
  const statePath = resolveInside(projectDir, path.join(".ai", "tasks", taskId, "RUN_STATE.json"))
  if (!fs.existsSync(statePath)) return { taskId, state: null, path: statePath }
  return { taskId, state: readJson(statePath), path: statePath }
}

function targetPaths(projectDir) {
  const payload = toolPayload()
  const values = []
  for (const key of ["file_path", "filePath", "path", "target", "filename"]) {
    if (typeof payload[key] === "string") values.push(payload[key])
  }
  return [...new Set(values.map((value) => path.resolve(hookInput.cwd || projectDir, value)).filter((value) => isInside(projectDir, value)))]
}

function commandText() {
  const payload = toolPayload()
  return typeof payload.command === "string" ? payload.command.trim() : ""
}

function isGitCommit(command) {
  return /(?:^|[\s;&|])git\s+(?:-[^\s]+\s+)*commit(?:\s|$)/i.test(command)
}

function isExternalAction(command) {
  const patterns = [
    /(?:^|[\s;&|])git\s+(?:-[^\s]+\s+)*push(?:\s|$)/i,
    /(?:^|[\s;&|])gh\s+pr\s+(?:create|merge)(?:\s|$)/i,
    /(?:^|[\s;&|])npm\s+publish(?:\s|$)/i,
    /(?:^|[\s;&|])docker\s+push(?:\s|$)/i,
    /(?:^|[\s;&|])kubectl\s+(?:apply|delete|rollout)(?:\s|$)/i,
    /(?:^|[\s;&|])terraform\s+apply(?:\s|$)/i,
  ]
  return patterns.some((pattern) => pattern.test(command))
}

function protectedRuntimePath(projectDir, candidate) {
  const rel = relativePath(projectDir, candidate)
  return rel === ".ai/runtime/pre-commit.json" || /(^|\/)approval-receipt\.json$/i.test(rel)
}

function payloadReferencesProtectedRuntime() {
  return /approval-receipt\.json|\.ai[\\/]runtime[\\/]pre-commit\.json/i.test(payloadText())
}

function nodeRuntimeSupported() {
  try {
    require("node:sqlite")
    return true
  } catch {
    return false
  }
}

function sessionStart() {
  const projectDir = root()
  const notes = [
    "[AI Engineering Governance 2.0.0] Deterministic runtime is active. Candidate receipts, context budgets, exact evidence reuse and governed memory are advisory or blocking according to persisted task state.",
  ]
  if (!nodeRuntimeSupported()) notes.push("BLOCKED_RUNTIME: Node.js 22.13.0+ is required for unflagged node:sqlite governed memory.")
  const active = activeRunState(projectDir)
  if (active.state) {
    try {
      const validated = validateRunState(active.state)
      if (!validated.terminal) notes.push(`Active task ${active.taskId}: execute ${validated.next_action.command || "the recorded human decision"}; narrative 'continue' is not authority.`)
    } catch (error) {
      notes.push(`BLOCKED_RUN_STATE: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  const precommit = verifyArmedPreCommit({ projectDir })
  if (precommit.status === "PASS") notes.push(`Staged pre-commit receipt is armed for task ${precommit.receipt.task_id}.`)
  else if (precommit.status !== "PRE_COMMIT_NOT_ARMED") notes.push(`Pre-commit receipt status: ${precommit.status}.`)
  emit(context("SessionStart", notes.join("\n")))
}

function preToolUse() {
  const projectDir = root()
  const name = toolName()
  const command = commandText()

  if (/bash/i.test(name) && isExternalAction(command)) {
    deny("External push, PR merge/create, publication and deployment actions are not performed automatically by this plugin. Run the exact action manually after explicit owner authorization.")
    return
  }

  if (/bash/i.test(name) && isGitCommit(command)) {
    const result = verifyArmedPreCommit({ projectDir })
    if (result.status !== "PASS") {
      deny(`Commit blocked: staged GOVERNANCE_APPROVAL_RECEIPT_V1 verification returned ${result.status}. Re-freeze staged candidate, complete required reviews, create a fresh receipt and arm the pre-commit gate.`)
    }
    return
  }

  if (/write|edit|applypatch/i.test(name)) {
    if (payloadReferencesProtectedRuntime()) {
      deny("Direct writes to approval receipts or the pre-commit pointer are blocked. Use the deterministic governance MCP tools.")
      return
    }
    const active = activeRunState(projectDir)
    const frozen = active.state?.review_frozen === true && ["READY_FOR_REVIEW", "VERIFYING", "TASK_VALIDATED"].includes(active.state.state)
    if (frozen && /applypatch/i.test(name)) {
      deny(`Reviewed target is frozen in state ${active.state.state}. ApplyPatch is denied until Architect replanning creates a new candidate.`)
      return
    }
    for (const target of targetPaths(projectDir)) {
      if (protectedRuntimePath(projectDir, target)) {
        deny(`Direct writes to ${relativePath(projectDir, target)} are blocked. Use the deterministic governance MCP tools.`)
        return
      }
      if (frozen) {
        const aiRoot = resolveInside(projectDir, ".ai")
        if (!isInside(aiRoot, target)) {
          deny(`Reviewed target is frozen in state ${active.state.state}. Return to Architect/replanning before modifying source or project documentation.`)
          return
        }
      }
    }
  }
}

function postToolUse() {
  const name = toolName()
  if (!/bash|write|edit|applypatch/i.test(name)) return
  const projectDir = root()
  const active = activeRunState(projectDir)
  if (!active.taskId) return
  const targets = targetPaths(projectDir).map((target) => relativePath(projectDir, target))
  const suffix = targets.length ? ` Touched: ${targets.join(", ")}.` : ""
  emit(context("PostToolUse", `Task ${active.taskId}: a mutating tool completed.${suffix} Re-derive any candidate, receipt, context selection or evidence whose declared dependencies changed; prior approval never renews automatically.`))
}

function main() {
  const event = process.argv[2] || ""
  try {
    if (event === "session-start") sessionStart()
    else if (event === "pre-tool-use") preToolUse()
    else if (event === "post-tool-use") postToolUse()
    else throw new Error(`unknown governance hook event: ${event}`)
  } catch (error) {
    if (event === "pre-tool-use" && /bash|write|edit|applypatch/i.test(toolName())) {
      deny(`Governance hook failed closed for a mutating action: ${error instanceof Error ? error.message : String(error)}`)
    } else {
      process.stderr.write(`[ai-engineering-governance hook] ${error instanceof Error ? error.message : String(error)}\n`)
    }
  }
}

if (require.main === module) main()

module.exports = { isExternalAction, isGitCommit, nodeRuntimeSupported, payloadReferencesProtectedRuntime, targetPaths }

"use strict"

const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")
const { spawnSync } = require("node:child_process")
const test = require("node:test")

const ROOT = path.resolve(__dirname, "../..")
const MCP = path.join(ROOT, "plugins/ai-engineering-governance/runtime/mcp-server.js")
const HOOK = path.join(ROOT, "plugins/ai-engineering-governance/hooks/governance-hook.js")

function tempProject() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aeg-integration-"))
  const git = (args) => {
    const result = spawnSync("git", args, { cwd: root, encoding: "utf8" })
    assert.equal(result.status, 0, result.stderr)
  }
  git(["init", "-q"])
  git(["config", "user.email", "test@example.invalid"])
  git(["config", "user.name", "Integration Test"])
  fs.writeFileSync(path.join(root, "app.txt"), "initial\n")
  git(["add", "app.txt"])
  git(["commit", "-qm", "initial"])
  return root
}

function runHook(projectDir, event, input) {
  const result = spawnSync(process.execPath, [HOOK, event], {
    cwd: projectDir,
    input: JSON.stringify({ cwd: projectDir, ...input }),
    encoding: "utf8",
  })
  assert.equal(result.status, 0, result.stderr)
  return result.stdout.trim() ? JSON.parse(result.stdout) : null
}

function seedFrozenState(root) {
  const taskDir = path.join(root, ".ai", "tasks", "TASK-1")
  fs.mkdirSync(taskDir, { recursive: true })
  fs.writeFileSync(path.join(root, ".ai", "STATUS.md"), "Current task: TASK-1\n")
  fs.writeFileSync(path.join(taskDir, "RUN_STATE.json"), JSON.stringify({
    state: "READY_FOR_REVIEW",
    terminal: false,
    review_frozen: true,
    next_action: {
      kind: "execute",
      command: "/ai-review",
      arguments: ["TASK-1"],
      expected_postcondition: "TASK_VALIDATED",
    },
  }))
}

test("MCP stdio initializes and exposes deterministic governance tools", () => {
  const input = [
    { jsonrpc: "2.0", id: 1, method: "initialize", params: {} },
    { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
  ].map(JSON.stringify).join("\n") + "\n"
  const result = spawnSync(process.execPath, [MCP], { input, encoding: "utf8" })
  assert.equal(result.status, 0, result.stderr)
  const messages = result.stdout.trim().split(/\r?\n/).map(JSON.parse)
  assert.equal(messages[0].result.serverInfo.version, "2.0.0")
  const names = messages[1].result.tools.map((item) => item.name)
  for (const required of [
    "governance_freeze_candidate",
    "governance_create_approval_receipt",
    "governance_validate_run_state",
    "governance_select_skills",
    "governance_check_evidence_reuse",
    "governance_memory_adjudicate",
  ]) assert.ok(names.includes(required), required)
})

test("PreToolUse denies direct and shell-wrapped external actions", () => {
  const root = tempProject()
  for (const command of ["git push origin main", "env git push origin main", "cd . && git push origin main"]) {
    const output = runHook(root, "pre-tool-use", {
      tool_name: "Bash",
      tool_input: { command },
    })
    assert.equal(output.hookSpecificOutput.permissionDecision, "deny", command)
    assert.match(output.hookSpecificOutput.permissionDecisionReason, /explicit owner authorization/i)
  }
})

test("PreToolUse denies commit without a valid armed staged receipt", () => {
  const root = tempProject()
  fs.writeFileSync(path.join(root, "app.txt"), "changed\n")
  spawnSync("git", ["add", "app.txt"], { cwd: root })
  for (const command of ["git commit -m test", "env git commit -m test"]) {
    const output = runHook(root, "pre-tool-use", {
      tool_name: "Bash",
      tool_input: { command },
    })
    assert.equal(output.hookSpecificOutput.permissionDecision, "deny")
    assert.match(output.hookSpecificOutput.permissionDecisionReason, /approval_receipt|approval receipt/i)
  }
})

test("PreToolUse blocks direct and ApplyPatch approval receipt mutation", () => {
  const root = tempProject()
  const target = path.join(root, ".ai", "tasks", "TASK-1", "approval-receipt.json")
  const write = runHook(root, "pre-tool-use", {
    tool_name: "Write",
    tool_input: { file_path: target, content: "{}" },
  })
  assert.equal(write.hookSpecificOutput.permissionDecision, "deny")

  const patch = runHook(root, "pre-tool-use", {
    tool_name: "ApplyPatch",
    tool_input: { patch: "*** Update File: .ai/tasks/TASK-1/approval-receipt.json\n@@\n-{}\n+{}" },
  })
  assert.equal(patch.hookSpecificOutput.permissionDecision, "deny")
  assert.match(patch.hookSpecificOutput.permissionDecisionReason, /deterministic governance MCP tools/i)
})

test("PreToolUse denies opaque ApplyPatch while review target is frozen", () => {
  const root = tempProject()
  seedFrozenState(root)
  const output = runHook(root, "pre-tool-use", {
    tool_name: "ApplyPatch",
    tool_input: { patch: "*** Update File: app.txt\n@@\n-initial\n+changed" },
  })
  assert.equal(output.hookSpecificOutput.permissionDecision, "deny")
  assert.match(output.hookSpecificOutput.permissionDecisionReason, /frozen/i)
})

test("SessionStart surfaces invalid actionable continuation", () => {
  const root = tempProject()
  const taskDir = path.join(root, ".ai", "tasks", "TASK-1")
  fs.mkdirSync(taskDir, { recursive: true })
  fs.writeFileSync(path.join(root, ".ai", "STATUS.md"), "Current task: TASK-1\n")
  fs.writeFileSync(path.join(taskDir, "RUN_STATE.json"), JSON.stringify({ state: "READY_FOR_REVIEW", next_action: "continue" }))
  const output = runHook(root, "session-start", {})
  assert.match(output.hookSpecificOutput.additionalContext, /BLOCKED_RUN_STATE/)
  assert.match(output.hookSpecificOutput.additionalContext, /ACTIONABLE_CONTINUATION_V1/)
})

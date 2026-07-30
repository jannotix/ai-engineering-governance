#!/usr/bin/env node
"use strict"

const readline = require("node:readline")
const path = require("node:path")
const { freezeCandidate, verifyCandidate } = require("./lib/candidate-authority.js")
const { armPreCommit, createReceipt, verifyArmedPreCommit, verifyReceipt } = require("./lib/approval-receipt.js")
const { validateRunState } = require("./lib/run-state.js")
const { persistSkillSelection, recordContextCycle, selectSkills, startContext } = require("./lib/context-intelligence.js")
const { checkEvidenceReuse, createEvidenceRecord } = require("./lib/evidence-reuse.js")
const { deriveReviewLenses } = require("./lib/review-lenses.js")
const { GovernedMemory } = require("./lib/governed-memory.js")
const { projectRoot, resolveInside } = require("./lib/project.js")

const TOOL_DEFINITIONS = [
  tool("governance_freeze_candidate", "Freeze workspace, staged, commit, or base-diff candidate identity.", {
    projectDir: stringProp(), projection: enumProp(["workspace", "staged", "commit", "base-diff"]), commit: stringProp(), base: stringProp(),
  }, ["projection"]),
  tool("governance_verify_candidate", "Re-derive and verify an immutable candidate.", {
    projectDir: stringProp(), candidate: objectProp(),
  }, ["candidate"]),
  tool("governance_create_approval_receipt", "Create a content-bound approval receipt after final adjudication.", {
    projectDir: stringProp(), taskId: stringProp(), candidate: objectProp(), artifacts: objectProp(), receiptPath: stringProp(), modelFamilies: objectProp(),
  }, ["taskId", "candidate", "artifacts"]),
  tool("governance_verify_approval_receipt", "Verify candidate and artifact hashes bound by an approval receipt.", {
    projectDir: stringProp(), receiptPath: stringProp(),
  }, ["receiptPath"]),
  tool("governance_arm_precommit", "Arm the project-scoped staged receipt pointer used by the PreToolUse commit gate.", {
    projectDir: stringProp(), receiptPath: stringProp(),
  }, ["receiptPath"]),
  tool("governance_verify_precommit", "Verify the armed staged approval receipt without a model call.", {
    projectDir: stringProp(),
  }),
  tool("governance_validate_run_state", "Validate ACTIONABLE_CONTINUATION_V1 for a RUN_STATE object.", {
    runState: objectProp(),
  }, ["runState"]),
  tool("governance_context_start", "Create CONTEXT_BUDGET_V1 for a task and work class.", {
    projectDir: stringProp(), taskId: stringProp(), workClass: stringProp(),
  }, ["taskId", "workClass"]),
  tool("governance_context_record_cycle", "Record one bounded context retrieval cycle.", {
    projectDir: stringProp(), taskId: stringProp(), cycle: numberProp(), admitted: arrayProp(), rejected: arrayProp(), gaps: arrayProp(), terminal: stringProp(), query: stringProp(), reason: stringProp(), edges: arrayProp(), trustBoundaries: arrayProp(), tests: arrayProp(), overrideReason: stringProp(),
  }, ["taskId", "cycle"]),
  tool("governance_select_skills", "Select task-relevant skills by trust, applicability, conflicts and token budget.", {
    projectDir: stringProp(), taskId: stringProp(), workClass: stringProp(), languages: arrayProp(), frameworks: arrayProp(), tokenBudget: numberProp(), availableTools: arrayProp(), candidates: arrayProp(),
  }, ["taskId", "workClass", "candidates"]),
  tool("governance_record_evidence", "Record dependency-bound evidence for possible exact reuse.", {
    projectDir: stringProp(), recordPath: stringProp(), result: stringProp(), dependencies: objectProp(), evidence: objectProp(),
  }, ["recordPath", "result", "dependencies"]),
  tool("governance_check_evidence_reuse", "Return PASS only for prior PASS with byte-identical dependency map.", {
    projectDir: stringProp(), recordPath: stringProp(), dependencies: objectProp(),
  }, ["recordPath", "dependencies"]),
  tool("governance_derive_review_lenses", "Derive focused review lenses from TASK_RISK_PROFILE.", {
    riskProfile: objectProp(),
  }, ["riskProfile"]),
  tool("governance_memory_propose", "Propose an advisory engineering lesson as CANDIDATE.", {
    databasePath: stringProp(), topic: stringProp(), content: stringProp(), taskId: stringProp(), evidenceDigest: stringProp(), staleWhen: stringProp(), supersedesId: numberProp(),
  }, ["topic", "content", "taskId", "evidenceDigest"]),
  tool("governance_memory_adjudicate", "Activate, reject, or supersede a memory; role must be final-reviewer.", {
    databasePath: stringProp(), id: numberProp(), decision: stringProp(), role: stringProp(), reviewDigest: stringProp(),
  }, ["id", "decision", "role", "reviewDigest"]),
  tool("governance_memory_search", "Search ACTIVE advisory memory using progressive metadata disclosure.", {
    databasePath: stringProp(), query: stringProp(), limit: numberProp(),
  }),
  tool("governance_memory_get", "Load one governed memory entry by ID.", {
    databasePath: stringProp(), id: numberProp(),
  }, ["id"]),
  tool("governance_memory_promotion_eligibility", "Check recurring validated occurrence threshold; never edits project policy.", {
    databasePath: stringProp(), id: numberProp(),
  }, ["id"]),
]

function stringProp() { return { type: "string" } }
function numberProp() { return { type: "number" } }
function objectProp() { return { type: "object" } }
function arrayProp() { return { type: "array" } }
function enumProp(values) { return { type: "string", enum: values } }
function tool(name, description, properties, required = []) {
  return { name, description, inputSchema: { type: "object", properties, required, additionalProperties: false } }
}

function rootFrom(args) {
  return projectRoot(args.projectDir)
}

function taskDir(args) {
  return resolveInside(rootFrom(args), path.join(".ai", "tasks", args.taskId))
}

function memoryCall(args, callback) {
  const memory = new GovernedMemory({ databasePath: args.databasePath })
  try { return callback(memory) } finally { memory.close() }
}

function callTool(name, args = {}) {
  switch (name) {
    case "governance_freeze_candidate": return freezeCandidate({ projectDir: rootFrom(args), projection: args.projection, commit: args.commit, base: args.base })
    case "governance_verify_candidate": return verifyCandidate({ projectDir: rootFrom(args), candidate: args.candidate })
    case "governance_create_approval_receipt": return createReceipt({ projectDir: rootFrom(args), taskId: args.taskId, candidate: args.candidate, artifacts: args.artifacts, receiptPath: args.receiptPath, modelFamilies: args.modelFamilies })
    case "governance_verify_approval_receipt": return verifyReceipt({ projectDir: rootFrom(args), receiptPath: args.receiptPath })
    case "governance_arm_precommit": return armPreCommit({ projectDir: rootFrom(args), receiptPath: args.receiptPath })
    case "governance_verify_precommit": return verifyArmedPreCommit({ projectDir: rootFrom(args) })
    case "governance_validate_run_state": return validateRunState(args.runState)
    case "governance_context_start": return startContext({ taskDir: taskDir(args), workClass: args.workClass })
    case "governance_context_record_cycle": return recordContextCycle({ taskDir: taskDir(args), cycle: args.cycle, admitted: args.admitted, rejected: args.rejected, gaps: args.gaps, terminal: args.terminal ?? null, query: args.query, reason: args.reason, edges: args.edges, trustBoundaries: args.trustBoundaries, tests: args.tests, overrideReason: args.overrideReason })
    case "governance_select_skills": {
      const selection = selectSkills(args)
      persistSkillSelection({ taskDir: taskDir(args), selection })
      return selection
    }
    case "governance_record_evidence": return createEvidenceRecord({ recordPath: resolveInside(rootFrom(args), args.recordPath), result: args.result, dependencies: args.dependencies, evidence: args.evidence })
    case "governance_check_evidence_reuse": return checkEvidenceReuse({ recordPath: resolveInside(rootFrom(args), args.recordPath), dependencies: args.dependencies })
    case "governance_derive_review_lenses": return deriveReviewLenses(args.riskProfile)
    case "governance_memory_propose": return memoryCall(args, (memory) => memory.propose(args))
    case "governance_memory_adjudicate": return memoryCall(args, (memory) => memory.adjudicate(args))
    case "governance_memory_search": return memoryCall(args, (memory) => memory.search(args))
    case "governance_memory_get": return memoryCall(args, (memory) => memory.get(args))
    case "governance_memory_promotion_eligibility": return memoryCall(args, (memory) => memory.promotionEligibility(args))
    default: throw new Error(`unknown governance tool: ${name}`)
  }
}

function success(id, result) {
  process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id, result })}\n`)
}

function failure(id, error) {
  process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id, error: { code: -32000, message: error instanceof Error ? error.message : String(error) } })}\n`)
}

function handle(message) {
  if (!message || message.jsonrpc !== "2.0") return
  if (message.method === "initialize") {
    success(message.id, { protocolVersion: "2025-06-18", capabilities: { tools: {} }, serverInfo: { name: "ai-engineering-governance", version: "2.0.0" } })
  } else if (message.method === "tools/list") {
    success(message.id, { tools: TOOL_DEFINITIONS })
  } else if (message.method === "tools/call") {
    try {
      const structuredContent = callTool(message.params?.name, message.params?.arguments || {})
      success(message.id, { content: [{ type: "text", text: JSON.stringify(structuredContent) }], structuredContent, isError: false })
    } catch (error) {
      success(message.id, { content: [{ type: "text", text: error instanceof Error ? error.message : String(error) }], isError: true })
    }
  } else if (message.id !== undefined) {
    failure(message.id, new Error(`unsupported method: ${message.method}`))
  }
}

if (require.main === module) {
  const lines = readline.createInterface({ input: process.stdin, crlfDelay: Infinity })
  lines.on("line", (line) => {
    if (!line.trim()) return
    try { handle(JSON.parse(line)) } catch (error) { failure(null, error) }
  })
}

module.exports = { TOOL_DEFINITIONS, callTool, handle }

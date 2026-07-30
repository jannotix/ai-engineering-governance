"use strict"

const fs = require("node:fs")
const path = require("node:path")
const { appendJsonLine, atomicWriteJson, ensureDir, readJson } = require("./project.js")

const BUDGETS = {
  PATCH: { max_cycles: 3, max_admitted_paths: 30, max_skill_tokens: 4000 },
  BOUNDED_FEATURE: { max_cycles: 3, max_admitted_paths: 60, max_skill_tokens: 7000 },
  MAJOR_FEATURE: { max_cycles: 3, max_admitted_paths: 120, max_skill_tokens: 12000 },
  EXISTING_PRODUCT_EVOLUTION: { max_cycles: 3, max_admitted_paths: 160, max_skill_tokens: 14000 },
  NEW_PRODUCT: { max_cycles: 3, max_admitted_paths: 220, max_skill_tokens: 18000 },
  HIGH_RISK_CHANGE: { max_cycles: 3, max_admitted_paths: 180, max_skill_tokens: 16000 },
}

const TRUST = {
  PROJECT_AUTHORITATIVE: 4,
  PROJECT_ADVISORY: 3,
  WORKSPACE_ADVISORY: 2,
  EXTERNAL_UNTRUSTED: 1,
}

function contextPaths(taskDir) {
  return {
    budget: path.join(taskDir, "CONTEXT_BUDGET.json"),
    retrieval: path.join(taskDir, "CONTEXT_RETRIEVAL.jsonl"),
    selection: path.join(taskDir, "SKILL_SELECTION.json"),
    metrics: path.join(taskDir, "CONTEXT_METRICS.jsonl"),
  }
}

function startContext({ taskDir, workClass }) {
  const limits = BUDGETS[workClass]
  if (!limits) throw new Error(`unsupported work class: ${workClass}`)
  ensureDir(taskDir)
  const budget = {
    schema: "CONTEXT_BUDGET_V1",
    work_class: workClass,
    ...limits,
    created_at: new Date().toISOString(),
  }
  atomicWriteJson(contextPaths(taskDir).budget, budget)
  return budget
}

function retrievalRecords(filePath) {
  if (!fs.existsSync(filePath)) return []
  return fs.readFileSync(filePath, "utf8").split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line))
}

function recordContextCycle({ taskDir, cycle, admitted = [], rejected = [], gaps = [], terminal = null, query = null, reason = null, edges = [], trustBoundaries = [], tests = [], overrideReason = null }) {
  const paths = contextPaths(taskDir)
  const budget = readJson(paths.budget)
  const existing = retrievalRecords(paths.retrieval)
  if (!Number.isInteger(cycle) || cycle !== existing.length + 1 || cycle < 1 || cycle > budget.max_cycles) {
    throw new Error(`context cycle must be sequential and within 1..${budget.max_cycles}`)
  }
  if (!Array.isArray(admitted) || !Array.isArray(rejected) || !Array.isArray(gaps)) throw new Error("context cycle arrays are required")
  if (admitted.length > budget.max_admitted_paths && !overrideReason) {
    throw new Error("context admitted-path budget exceeded without evidence-backed override")
  }
  const allowedTerminal = new Set([null, "CONTEXT_SUFFICIENT", "BLOCKED_CONTEXT_GAP"])
  if (!allowedTerminal.has(terminal)) throw new Error("invalid context terminal state")
  if (cycle === budget.max_cycles && terminal === null) {
    throw new Error("final context cycle requires CONTEXT_SUFFICIENT or BLOCKED_CONTEXT_GAP")
  }
  if (terminal === "CONTEXT_SUFFICIENT" && gaps.length) throw new Error("CONTEXT_SUFFICIENT cannot retain material gaps")
  const record = {
    schema: "CONTEXT_RETRIEVAL_CYCLE_V1",
    cycle,
    query,
    reason,
    admitted: [...new Set(admitted)].sort(),
    rejected,
    dependency_edges: edges,
    trust_boundaries: trustBoundaries,
    tests,
    gaps,
    terminal,
    override_reason: overrideReason,
    recorded_at: new Date().toISOString(),
  }
  appendJsonLine(paths.retrieval, record)
  appendJsonLine(paths.metrics, {
    schema: "CONTEXT_METRICS_V1",
    cycle,
    admitted_count: record.admitted.length,
    rejected_count: rejected.length,
    gap_count: gaps.length,
    terminal,
    recorded_at: record.recorded_at,
  })
  return record
}

function intersects(required, actual) {
  if (!Array.isArray(required) || required.length === 0) return true
  if (!Array.isArray(actual) || actual.length === 0) return false
  const actualSet = new Set(actual.map((item) => String(item).toLowerCase()))
  return required.some((item) => actualSet.has(String(item).toLowerCase()))
}

function selectSkills({ workClass, languages = [], frameworks = [], tokenBudget, availableTools = [], candidates = [] }) {
  if (!BUDGETS[workClass]) throw new Error(`unsupported work class: ${workClass}`)
  const budget = Number.isFinite(tokenBudget) ? tokenBudget : BUDGETS[workClass].max_skill_tokens
  const tools = new Set(availableTools)
  const selected = []
  const rejected = []
  let used = 0

  const sorted = [...candidates].sort((a, b) => {
    const trustDelta = (TRUST[b.trust_class] || 0) - (TRUST[a.trust_class] || 0)
    if (trustDelta) return trustDelta
    const tokenDelta = (a.estimated_context_tokens || 0) - (b.estimated_context_tokens || 0)
    return tokenDelta || String(a.skill_id).localeCompare(String(b.skill_id))
  })

  for (const candidate of sorted) {
    const id = candidate.skill_id
    let reason = null
    if (!id || !TRUST[candidate.trust_class]) reason = "INVALID_MANIFEST"
    else if (Array.isArray(candidate.supported_work_classes) && candidate.supported_work_classes.length && !candidate.supported_work_classes.includes(workClass)) reason = "WORK_CLASS_MISMATCH"
    else if (!intersects(candidate.languages, languages)) reason = "LANGUAGE_MISMATCH"
    else if (!intersects(candidate.frameworks, frameworks)) reason = "FRAMEWORK_MISMATCH"
    else if (Array.isArray(candidate.required_tools) && candidate.required_tools.some((tool) => !tools.has(tool))) reason = "REQUIRED_TOOL_UNAVAILABLE"
    else if (selected.some((item) => (candidate.conflicts_with || []).includes(item.skill_id) || (item.conflicts_with || []).includes(id))) reason = "SKILL_CONFLICT"
    else if (selected.some((item) => (candidate.overlaps_with || []).includes(item.skill_id) || (item.overlaps_with || []).includes(id))) reason = "CAPABILITY_OVERLAP"
    else if (used + Number(candidate.estimated_context_tokens || 0) > budget) reason = "SKILL_TOKEN_BUDGET"

    if (reason) rejected.push({ skill_id: id || null, reason })
    else {
      selected.push(candidate)
      used += Number(candidate.estimated_context_tokens || 0)
    }
  }

  return {
    schema: "SKILL_SELECTION_V1",
    work_class: workClass,
    token_budget: budget,
    estimated_tokens: used,
    selected,
    rejected,
  }
}

function persistSkillSelection({ taskDir, selection }) {
  atomicWriteJson(contextPaths(taskDir).selection, selection)
  return selection
}

module.exports = { BUDGETS, TRUST, persistSkillSelection, recordContextCycle, selectSkills, startContext }

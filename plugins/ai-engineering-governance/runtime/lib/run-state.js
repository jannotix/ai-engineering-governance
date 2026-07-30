"use strict"

const ALLOWED_COMMANDS = new Set([
  "/ai-init", "/ai-setup", "/ai-start", "/ai-status", "/ai-architect",
  "/ai-execute", "/ai-review", "/ai-arbiter", "/ai-release",
])

const TERMINAL_STATES = new Set([
  "LOCAL_COMMITTED",
  "READY_FOR_PRODUCTION",
  "NOT_READY_FOR_PRODUCTION",
  "BLOCKED",
  "BLOCKED_CONTEXT_GAP",
  "BASELINE_BLOCKED",
  "DISCOVERY_BLOCKED",
  "PRODUCT_BLOCKED",
])

function validateExecuteAction(action) {
  if (!ALLOWED_COMMANDS.has(action.command)) throw new Error("ACTIONABLE_CONTINUATION_V1 requires an allowed /ai-* command")
  if (!Array.isArray(action.arguments) || action.arguments.some((item) => typeof item !== "string")) {
    throw new Error("ACTIONABLE_CONTINUATION_V1 execute arguments must be a string array")
  }
  if (typeof action.expected_postcondition !== "string" || !action.expected_postcondition.trim()) {
    throw new Error("ACTIONABLE_CONTINUATION_V1 requires expected_postcondition")
  }
  return {
    kind: "execute",
    command: action.command,
    arguments: action.arguments,
    expected_postcondition: action.expected_postcondition.trim(),
  }
}

function validateHumanDecision(action) {
  if (typeof action.decision_required !== "string" || !action.decision_required.trim()) {
    throw new Error("ACTIONABLE_CONTINUATION_V1 human decision requires decision_required")
  }
  if (!Array.isArray(action.available_choices) || action.available_choices.length < 2 || action.available_choices.some((item) => typeof item !== "string" || !item.trim())) {
    throw new Error("ACTIONABLE_CONTINUATION_V1 human decision requires at least two choices")
  }
  return {
    kind: "human_decision",
    decision_required: action.decision_required.trim(),
    available_choices: [...new Set(action.available_choices.map((item) => item.trim()))],
  }
}

function validateRunState(state) {
  if (!state || typeof state !== "object" || Array.isArray(state)) throw new Error("RUN_STATE must be an object")
  if (typeof state.state !== "string" || !state.state.trim()) throw new Error("RUN_STATE requires state")
  const terminal = state.terminal === true || TERMINAL_STATES.has(state.state)
  if (terminal) return { ...state, terminal: true, next_action: null }
  const action = state.next_action
  if (!action || typeof action !== "object" || Array.isArray(action)) {
    throw new Error("ACTIONABLE_CONTINUATION_V1 requires typed next_action for every non-terminal state")
  }
  let normalized
  if (action.kind === "execute") normalized = validateExecuteAction(action)
  else if (action.kind === "human_decision") normalized = validateHumanDecision(action)
  else throw new Error("ACTIONABLE_CONTINUATION_V1 next_action kind must be execute or human_decision")
  return { ...state, terminal: false, next_action: normalized }
}

module.exports = { ALLOWED_COMMANDS, TERMINAL_STATES, validateRunState }

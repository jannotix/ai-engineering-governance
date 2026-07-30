# Deterministic Runtime Governance

Version 2.0.0 supplements prompt governance with local deterministic tools. Models still reason, plan and review; hashes, state validation, evidence reuse and commit authorization are computed by the runtime.

## Runtime requirement

The bundled hooks and MCP server require **Node.js 22.13.0 or newer** on `PATH`. This is the first Node 22 release where `node:sqlite` is available without an experimental command-line flag. The runtime uses only Node.js built-ins and installs no package or service. Governed memory stores its database under `${ZCODE_PLUGIN_DATA}` when available.

If the runtime is unavailable, no model may claim that a deterministic gate passed. Required runtime proof is `UNAVAILABLE` or `BLOCKED`.

## Candidate authority

`GOVERNANCE_CANDIDATE_V1` supports:

```text
workspace | staged | commit | base-diff
```

- `workspace` hashes project entries outside root `.git/**` and `.ai/**`, including file bytes, mode and symlink target.
- `staged` binds exact Git index modes, blob IDs and tree.
- `commit` binds the resolved commit and complete tree.
- `base-diff` binds resolved candidate, base, immutable merge base and raw diff identity.

Changing projection or any live dependency invalidates the candidate. A status summary or previous model statement is not candidate identity.

Governed file paths are lexically constrained to the project and reject symbolic-link or junction traversal. Candidate symlinks are hashed as links rather than followed.

## Approval receipts

After required independent reviews and Final Reviewer adjudication, create:

```text
.ai/tasks/<TASK-ID>/approval-receipt.json
```

`GOVERNANCE_APPROVAL_RECEIPT_V1` binds the candidate to:

- `APPROVED_REQUIREMENTS.md`;
- the execution packet;
- `VERIFICATION_PROFILE.md`;
- executed evidence manifest;
- Implementation Reviewer report;
- Architecture/Security Reviewer report;
- Final Reviewer adjudication;
- recorded role/model-family metadata when ZCode exposes or the governed packet authoritatively records it.

Every artifact is content-hashed. Reverification returns `APPROVAL_RECEIPT_MISMATCH` when the candidate or any bound artifact changes. A receipt never silently renews itself.

A staged receipt may arm `.ai/runtime/pre-commit.json`. The ZCode `PreToolUse` hook rederives the staged candidate before `git commit` and makes no model call.

## Actionable continuation

Every non-terminal `RUN_STATE.json` uses `ACTIONABLE_CONTINUATION_V1` and contains exactly one typed `next_action`:

```json
{
  "kind": "execute",
  "command": "/ai-review",
  "arguments": ["TASK-001"],
  "expected_postcondition": "TASK_VALIDATED"
}
```

or:

```json
{
  "kind": "human_decision",
  "decision_required": "Select the authorized migration strategy",
  "available_choices": ["forward-only", "reversible", "cancel"]
}
```

Narrative values such as `continue`, `retry` or `finish` are not executable authority. `/ai-start` remains the single continuation command and must follow the persisted typed action rather than chat memory.

## Context Intelligence

Each governed task may create:

```text
CONTEXT_BUDGET.json
CONTEXT_RETRIEVAL.jsonl
SKILL_SELECTION.json
CONTEXT_METRICS.jsonl
```

`CONTEXT_BUDGET_V1` derives admitted-path and skill-token limits from `WORK_CLASS`. Retrieval is bounded to three cycles:

```text
DISPATCH → EVALUATE → REFINE → CONTEXT_SUFFICIENT | BLOCKED_CONTEXT_GAP
```

Cycle three must terminate. A material gap cannot be hidden by reducing scope; use `BLOCKED_CONTEXT_GAP`.

`SKILL_CAPABILITY_MANIFEST_V1` fields are:

```text
skill_id
version
content_sha256
source
trust_class
triggers
supported_work_classes
languages
frameworks
required_tools
external_dependencies
conflicts_with
overlaps_with
estimated_context_tokens
sections
```

Selection checks trust, work class, technology, required tools, conflicts, overlap and token budget. Skills never authorize writes, dependency installation, requirement changes or external actions.

## Exact evidence reuse

A previous result is reusable only when it was `PASS` and the canonical dependency map is byte-identical. Dependencies should include candidate digest, affected contracts/call paths, validation command, environment/toolchain, policy hashes and selected skill hashes.

A change returns:

```text
EVIDENCE_STALE
```

Per-file hashes or prior AI approval alone are insufficient.

## Review lenses

`REVIEW_LENS_MATRIX_V1` always preserves:

- Implementation baseline: correctness, regression, test quality and maintainability;
- Architecture/Security baseline: architecture, security boundaries, data safety and recovery.

`TASK_RISK_PROFILE` adds focused conditional lenses for authorization, input validation, public contracts, migration, dependency supply chain, performance, accessibility, deployment, observability, resilience, recovery and tool capability. Focus changes; reviewer independence and Final Reviewer authority do not.

## Governed engineering memory

The local SQLite lifecycle is:

```text
CANDIDATE | ACTIVE | SUPERSEDED | REJECTED
```

Executor and reviewers may propose a candidate. Only `final-reviewer` may activate, reject or supersede it with a review digest. Search returns ACTIVE advisory lessons; current requirements, source, tests, contracts and runtime evidence remain controlling.

Policy promotion is never automatic. Eligibility requires at least two distinct validated task occurrences and still requires explicit owner authorization. The runtime reports eligibility but does not edit project policy.

## ZCode hooks

The plugin registers only verified ZCode events:

```text
SessionStart
PreToolUse
PostToolUse
```

- `SessionStart` reports runtime, task continuation and receipt status.
- `PreToolUse` blocks invalid commits, direct or patch-based receipt mutation, writes to frozen reviewed targets and automatic push/PR/publication/deployment actions.
- `PostToolUse` warns that dependent candidate, context, evidence or receipt data may now be stale.

Mutating hook failures are fail-closed. No undocumented `Stop` hook is required. Completion remains governed by `RUN_STATE.json`, `/ai-start`, Goal Mode and explicit postconditions.

## MCP tools

The local stdio MCP server exposes candidate freeze/verify, receipt create/verify/arm, run-state validation, context cycle recording, skill selection, evidence reuse, review lenses and governed memory operations. Tool output is evidence, not permission to widen scope or perform external actions.

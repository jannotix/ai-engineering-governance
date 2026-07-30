# Project State Contract

`/ai-init` creates or validates project-root `.ai/` non-destructively. It stores project-specific state, never reusable plugin policy or plaintext secrets.

## Canonical structure

```text
.ai/
├── CONFIG.md
├── PROJECT.md
├── REQUIREMENTS.md
├── ARCHITECTURE.md
├── CODEBASE_BASELINE.md
├── CONTEXT_INDEX.md
├── DEPLOYMENT_SCOPE.md
├── PROJECT_HISTORY.md
├── ROADMAP.md
├── STATUS.md
├── CURRENT_MILESTONE.md
├── TEST_STRATEGY.md
├── LOCAL_ENVIRONMENT.md
├── INSTALLATION_AND_MIGRATIONS.md
├── DEPENDENCIES.md
├── SECURITY_BASELINE.md
├── QUALITY_GATES.md
├── PRODUCTION_READINESS.md
├── product/                         # conditional product-affecting state
├── decisions/
├── milestones/
├── runtime/
│   └── pre-commit.json              # deterministic staged receipt pointer
├── tasks/
│   └── <TASK-ID>/
│       ├── ORIGINAL_USER_REQUEST.md
│       ├── CLARIFICATION_TRANSCRIPT.md
│       ├── APPROVED_REQUIREMENTS.md
│       ├── CONTEXT_MANIFEST.md
│       ├── CONTEXT_BUDGET.json
│       ├── CONTEXT_RETRIEVAL.jsonl
│       ├── CONTEXT_METRICS.jsonl
│       ├── SKILL_SELECTION.json
│       ├── TASK_PLAN.md
│       ├── VERIFICATION_PROFILE.md
│       ├── RUN_STATE.json
│       ├── STEERING.md              # optional authoritative direction
│       ├── approval-receipt.json    # only after Final Reviewer PASS
│       ├── evidence/
│       │   ├── CANDIDATE.json
│       │   ├── EXECUTION_PACKET.md
│       │   ├── REVIEW_IMPLEMENTATION_PACKET.md
│       │   ├── REVIEW_ARCHITECTURE_PACKET.md
│       │   ├── FINAL_PACKET.md
│       │   ├── VERIFICATION_EVIDENCE.md
│       │   └── reuse/
│       └── reviews/
├── arbitration/
├── migrations/
├── followups/
├── deferred/
└── release/
```

`PROJECT_HISTORY.md` and `product/PRODUCT_DECISIONS.md` are append-only. Completed historical task evidence is not rewritten by later tasks or plugin upgrades.

Product state remains lazy. A purely technical patch does not receive empty product artifacts when primary evidence proves no product-scope impact.

## Deterministic task artifacts

- `CONTEXT_BUDGET.json` is `CONTEXT_BUDGET_V1` derived from `WORK_CLASS`.
- `CONTEXT_RETRIEVAL.jsonl` records at most three sequential retrieval cycles.
- `SKILL_SELECTION.json` records admitted/rejected skills and exact reasons.
- `CANDIDATE.json` stores one `GOVERNANCE_CANDIDATE_V1` projection and digest.
- `approval-receipt.json` stores one `GOVERNANCE_APPROVAL_RECEIPT_V1` only after required review and Final Reviewer PASS.
- `.ai/runtime/pre-commit.json` points to a currently valid staged receipt. It is created by the runtime, not edited manually.
- Evidence reuse records live under `evidence/reuse/` and bind a prior PASS to its exact dependency map.

A stored Git HEAD or `git status` summary is never candidate identity. Continuation/review/commit must rederive the selected projection.

## RUN_STATE.json

Minimum schema:

```json
{
  "schema_version": 3,
  "task_id": "TASK-ID",
  "state": "TASK_PLANNING",
  "terminal": false,
  "baseline_reference": "<git/ref-or-NONE>",
  "repository_head": "<git-head-or-NONE>",
  "work_class": "PATCH",
  "discovery_depth": "LIGHT",
  "assistance_mode": "STANDARD",
  "assistance_confidence": "MEDIUM",
  "discovery_status": "IN_PROGRESS",
  "material_unknown_count": 0,
  "product_scope_status": "NOT_REQUIRED",
  "product_blueprint_version": null,
  "product_state": "NOT_REQUIRED",
  "affected_capability_ids": [],
  "user_approval_required": false,
  "user_approval_status": "NOT_REQUIRED",
  "context_state": "NOT_STARTED",
  "context_cycle": 0,
  "candidate_projection": null,
  "candidate_digest": null,
  "receipt_path": null,
  "receipt_digest": null,
  "review_depth": "STANDARD",
  "review_cycle": 0,
  "review_frozen": false,
  "execution_complete": false,
  "implementation_review_complete": false,
  "architecture_review_complete": false,
  "final_adjudication_complete": false,
  "last_safe_transition": "TASK_PLANNING",
  "resumable": true,
  "human_input_required": false,
  "blocker": null,
  "next_action": {
    "kind": "execute",
    "command": "/ai-architect",
    "arguments": ["TASK-ID"],
    "expected_postcondition": "READY_FOR_EXECUTION"
  },
  "updated_at": "<timestamp>"
}
```

Every non-terminal state must pass `ACTIONABLE_CONTINUATION_V1`. An alternative human-decision action is:

```json
{
  "kind": "human_decision",
  "decision_required": "Select the authorized migration strategy",
  "available_choices": ["forward-only", "reversible", "cancel"]
}
```

Narrative `continue`, `retry` or `finish` is invalid. Terminal states have `terminal: true` and `next_action: null`.

Schema-version-1/2 tasks adopt new fields lazily from current authoritative evidence. Never fabricate historical candidate, receipt, safepoint, review, evidence reuse or approval.

## Context states

```text
NOT_STARTED
DISPATCH
EVALUATE
REFINE
CONTEXT_SUFFICIENT
BLOCKED_CONTEXT_GAP
```

Cycle three must end in `CONTEXT_SUFFICIENT` or `BLOCKED_CONTEXT_GAP`.

## Review modes

- `STANDARD` — independent Implementation Reviewer.
- `ELEVATED` — independent Implementation and Architecture/Security reports followed by Final Reviewer.
- `DISCOVERY_REVIEW` — isolated discovery reports followed by Final Reviewer discovery adjudication.

All reviews reference one frozen candidate digest. Sibling reports are isolated until both complete.

## STATUS.md states

```text
INTAKE
BASELINING
PLANNING
PRODUCT_DISCOVERY
DISCOVERY_REVIEW
PRODUCT_SCOPE_APPROVAL
TASK_PLANNING
READY_FOR_EXECUTION
IMPLEMENTING
BLOCKED_CONTEXT_GAP
BLOCKED_RUNTIME
BLOCKED_ARCHITECTURE
BLOCKED_EXTERNAL
ARBITRATION_REQUIRED
ARBITRATION_IN_PROGRESS
TASK_VERIFYING
READY_FOR_REVIEW
VERIFYING
TASK_VALIDATED
MILESTONE_VALIDATED
PRODUCT_INCOMPLETE
PRODUCT_COMPLETE
LOCAL_COMMITTED
FIX_REQUIRED
RELEASE_CANDIDATE
ADVERSARIAL_REVIEW
NOT_READY_FOR_PRODUCTION
READY_FOR_PRODUCTION
```

`TASK_VALIDATED` means required evidence and review passed for the frozen candidate. It does not authorize commit until a current staged approval receipt verifies. `PRODUCT_COMPLETE` remains separate from `READY_FOR_PRODUCTION`. No state authorizes push, PR creation/merge, publication, deployment or rollback.

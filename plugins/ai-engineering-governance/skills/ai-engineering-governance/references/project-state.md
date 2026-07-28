# Project State Contract

`/ai-init` creates or validates `.ai/` in the workspace root.

Required reusable structure:

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
├── product/                         # conditional for product-affecting work
│   ├── PRODUCT_VISION.md
│   ├── USER_AND_ROLE_MODEL.md
│   ├── DOMAIN_AND_PROCESS_MODEL.md
│   ├── PRODUCT_COMPLETENESS_MATRIX.md
│   ├── PRODUCT_BLUEPRINT.md
│   └── PRODUCT_DECISIONS.md
├── decisions/
├── milestones/
├── tasks/
│   └── <TASK-ID>/
│       ├── ORIGINAL_USER_REQUEST.md
│       ├── CLARIFICATION_TRANSCRIPT.md
│       ├── APPROVED_REQUIREMENTS.md
│       ├── CONTEXT_MANIFEST.md
│       ├── TASK_PLAN.md
│       ├── VERIFICATION_PROFILE.md
│       ├── RUN_STATE.json
│       ├── STEERING.md              # optional authoritative mid-task direction
│       ├── evidence/
│       │   └── VERIFICATION_EVIDENCE.md
│       └── reviews/
├── reviews/
├── arbitration/
├── migrations/
├── followups/
├── deferred/
└── release/
```

The `.ai/` directory stores project state, not reusable governance policy. Do not store credentials or secret values in `.ai/`.

`PROJECT_HISTORY.md` and `product/PRODUCT_DECISIONS.md` are append-only where applicable.

`CODEBASE_BASELINE.md` and `CONTEXT_INDEX.md` are reusable routing state. Routine tasks use them plus the current Git delta; they do not require a complete rescan unless evidence makes the baseline stale.

Each task owns its requirement provenance, context, plan, verification profile, evidence, run state and review artifacts. Historical task evidence is not silently rewritten when later tasks change the project.

Product state is created lazily only when the current request is product-affecting. A purely technical patch does not receive empty product boilerplate when primary evidence proves no product-scope impact.

## Product-state rules

Product artifacts record stable product/schema versions, status, source references and last-updated evidence. `PRODUCT_COMPLETENESS_MATRIX.md` tracks stable capability IDs and `REQUIRED | OPTIONAL | NOT_APPLICABLE | DEFERRED` classification.

A validated task or milestone may leave:

```text
PRODUCT_INCOMPLETE
```

Task validation proves the scoped increment; it does not imply the complete approved product exists.

## RUN_STATE.json minimum fields

```json
{
  "schema_version": 2,
  "task_id": "TASK-ID",
  "state": "TASK_PLANNING",
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
  "review_depth": "STANDARD",
  "review_cycle": 0,
  "review_frozen": false,
  "execution_complete": false,
  "review_complete": false,
  "last_safe_transition": "TASK_PLANNING",
  "resumable": true,
  "human_input_required": false,
  "blocker": null,
  "updated_at": "<timestamp>"
}
```

A stored `repository_head` is not enough for a dirty worktree. Continuation/review must also reconcile Git status/diff and the target recorded by task evidence.

Existing schema-version-1 task state is upgraded lazily from authoritative evidence. Preserve history, do not fabricate product facts or approvals, and leave unsupported fields unknown or not required as appropriate.

## Review modes

- `STANDARD` — independent implementation review.
- `ELEVATED` — independent implementation plus architecture/security review followed by Final Reviewer adjudication.
- `DISCOVERY_REVIEW` — isolated product/discovery reviews followed by Final Reviewer `DISCOVERY_PASS | DISCOVERY_DEFECT | DISCOVERY_BLOCKED`.

## STATUS.md states

- INTAKE
- BASELINING
- PLANNING
- PRODUCT_DISCOVERY
- DISCOVERY_REVIEW
- PRODUCT_SCOPE_APPROVAL
- TASK_PLANNING
- READY_FOR_EXECUTION
- IMPLEMENTING
- BLOCKED_ARCHITECTURE
- BLOCKED_EXTERNAL
- ARBITRATION_REQUIRED
- ARBITRATION_IN_PROGRESS
- TASK_VERIFYING
- READY_FOR_REVIEW
- VERIFYING
- TASK_VALIDATED
- MILESTONE_VALIDATED
- PRODUCT_INCOMPLETE
- PRODUCT_COMPLETE
- LOCAL_COMMITTED
- FIX_REQUIRED
- RELEASE_CANDIDATE
- ADVERSARIAL_REVIEW
- NOT_READY_FOR_PRODUCTION
- READY_FOR_PRODUCTION

`TASK_VALIDATED` means implementation evidence and the review depth required by `VERIFICATION_PROFILE.md` have passed. `PRODUCT_COMPLETE` is a separate product-completeness verdict. Local commit follows validation; push never follows automatically.
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

`PROJECT_HISTORY.md` is append-only.

`CODEBASE_BASELINE.md` and `CONTEXT_INDEX.md` are reusable routing state. Routine tasks use them plus the current Git delta; they do not require a complete rescan unless evidence makes the baseline stale.

Each task owns its requirement provenance, context, plan, verification profile, evidence, run state, and review artifacts. Historical task evidence is not silently rewritten when later tasks change the project.

## RUN_STATE.json minimum fields

```json
{
  "schema_version": 1,
  "task_id": "TASK-ID",
  "state": "TASK_PLANNING",
  "baseline_reference": "<git/ref-or-NONE>",
  "repository_head": "<git-head-or-NONE>",
  "review_depth": "STANDARD",
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

## STATUS.md states

- INTAKE
- BASELINING
- PLANNING
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
- LOCAL_COMMITTED
- FIX_REQUIRED
- RELEASE_CANDIDATE
- ADVERSARIAL_REVIEW
- NOT_READY_FOR_PRODUCTION
- READY_FOR_PRODUCTION

`TASK_VALIDATED` means the implementation evidence and the review depth required by `VERIFICATION_PROFILE.md` have passed. Local commit follows validation; push never follows automatically.
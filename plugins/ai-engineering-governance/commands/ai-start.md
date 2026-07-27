---
description: Continue the current project from persisted governed state, reconciling task run state, Git target, requirement/context freshness, evidence freshness, and role boundaries.
skills: ai-engineering-governance
---

Read `.ai/STATUS.md`, `.ai/CONFIG.md`, latest `.ai/PROJECT_HISTORY.md`, reusable baseline/context state, current Git head/status/diff, and current task `RUN_STATE.json` when a task is active.

Do not resume from chat memory alone.

Before routing, reconcile:

- canonical task requirement provenance;
- baseline/context freshness;
- current Git target and dirty-worktree state;
- `CONTEXT_MANIFEST.md` target;
- task plan authorization;
- `VERIFICATION_PROFILE.md` and dependent evidence freshness;
- dependency/lockfile, migration, generator, runtime/tooling, and Operational Assurance inputs when applicable;
- frozen-review target state.

Invalidate only evidence/reviews whose inputs changed. Do not fabricate historical safepoints, dependency admission, approvals, runtime execution, or review results.

Routing:

- INTAKE, BASELINING, PLANNING, TASK_PLANNING → Architect.
- READY_FOR_EXECUTION, IMPLEMENTING, TASK_VERIFYING → Executor.
- BLOCKED_ARCHITECTURE → Architect.
- BLOCKED_EXTERNAL → report required authoritative input/access.
- ARBITRATION_REQUIRED or ARBITRATION_IN_PROGRESS → `/ai-arbiter`.
- READY_FOR_REVIEW or VERIFYING → `/ai-review` using current STANDARD/ELEVATED profile.
- TASK_VALIDATED → Executor performs scoped local commit if not already committed.
- LOCAL_COMMITTED → Architect plans/re-authorizes next task.
- FIX_REQUIRED or a review defect → Architect for PLAN_DEFECT; Executor only after Architect re-authorizes implementation defects.
- RELEASE_CANDIDATE or ADVERSARIAL_REVIEW → `/ai-release`.
- READY_FOR_PRODUCTION → report no pending governed work unless new requirements exist.

When safe reconstruction is impossible, stop with BLOCKED and state the missing authoritative evidence/input.

Respect `.ai/CONFIG.md` role bindings. Never push Git changes without explicit action-scoped authorization.
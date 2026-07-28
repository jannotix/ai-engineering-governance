---
description: Continue the current project from persisted governed state, reconciling product state, task run state, Git target, provenance/context, evidence freshness, approvals, and role boundaries.
skills: ai-engineering-governance
---

Read `.ai/STATUS.md`, `.ai/CONFIG.md`, latest `.ai/PROJECT_HISTORY.md`, reusable baseline/context state, applicable `.ai/product/` state, current Git head/status/diff, and current task `RUN_STATE.json` when active.

Do not resume from chat memory alone.

Before routing, reconcile:

- request classification, discovery depth/status and material unknown count;
- product state, product scope approval and user approval;
- applicable product blueprint version, capability matrix and append-only decisions;
- canonical task requirement provenance and unprocessed `STEERING.md`;
- baseline/context freshness;
- current Git target and dirty-worktree state;
- `CONTEXT_MANIFEST.md` target;
- task plan authorization and capability traceability;
- `VERIFICATION_PROFILE.md` and dependent evidence freshness;
- dependency/lockfile, migration, generator, runtime/tooling and Operational Assurance inputs;
- frozen discovery/review target state;
- current baseline/discovery/task/product-completeness cycle.

Invalidate only evidence/reviews whose inputs changed. Do not fabricate historical discovery, product facts, capability status, safepoints, dependency admission, approvals, runtime execution or review results.

Routing:

- INTAKE, BASELINING, PLANNING → Architect.
- PRODUCT_DISCOVERY → `/ai-architect` continues adaptive discovery.
- DISCOVERY_REVIEW → `/ai-review` in `DISCOVERY_REVIEW` mode.
- PRODUCT_SCOPE_APPROVAL → Architect reports exact required authoritative decision.
- TASK_PLANNING → Architect.
- READY_FOR_EXECUTION, IMPLEMENTING, TASK_VERIFYING → Executor.
- BLOCKED_ARCHITECTURE → Architect.
- BLOCKED_EXTERNAL → report required authoritative input/access.
- ARBITRATION_REQUIRED or ARBITRATION_IN_PROGRESS → `/ai-arbiter`.
- READY_FOR_REVIEW or VERIFYING → `/ai-review` using current STANDARD/ELEVATED profile.
- TASK_VALIDATED → Executor performs scoped local commit if not already committed.
- MILESTONE_VALIDATED or PRODUCT_INCOMPLETE → Architect reconciles remaining required capability IDs and plans next vertical milestone/task.
- PRODUCT_COMPLETE → route to release planning only when requested and release evidence is ready.
- LOCAL_COMMITTED → Architect plans/re-authorizes next task.
- FIX_REQUIRED or review defect → Architect for PLAN_DEFECT/DISCOVERY_DEFECT/product defect; Executor only after Architect re-authorizes implementation defects.
- RELEASE_CANDIDATE or ADVERSARIAL_REVIEW → `/ai-release`.
- READY_FOR_PRODUCTION → report no pending governed work unless new requirements exist.

After three failed cycles at the same baseline, discovery, task-adjudication or product-completeness gate, stop fail-closed with `HUMAN_INPUT_REQUIRED: YES`.

When safe reconstruction is impossible, stop with BLOCKED and state missing authoritative evidence/input.

Respect `.ai/CONFIG.md` role bindings. Never push Git changes without explicit action-scoped authorization. Emit `GOVERNANCE_RESULT`.
---
description: Invoke the configured Arbiter to resolve a material unresolved Architect/Executor disagreement against canonical requirement, plan, risk, and evidence state.
skills: ai-engineering-governance
---

Use only when project state is `ARBITRATION_REQUIRED` or `ARBITRATION_IN_PROGRESS`.

If Arbiter mode is EXTERNAL, do not impersonate the configured Arbiter. Prepare a task-specific handoff under `.ai/arbitration/` referencing canonical task files, current Git target, disputed evidence, and exact questions; append the handoff event to `.ai/PROJECT_HISTORY.md` and stop.

If Arbiter mode is INTERNAL, act strictly in the Arbiter role and independently inspect requirement provenance, context manifest, task plan, verification/risk profile, run state, repository diff, Executor evidence, tests/runtime evidence, and relevant security/migration/deployment/maintainability/tooling implications.

Do not treat Architect or Executor claims as authoritative merely because they agree with prior assumptions.

Record decision under `.ai/arbitration/` and append it to `.ai/PROJECT_HISTORY.md`.

Return exactly one:

- ARBITRATION_RESOLVED_ARCHITECT_PLAN
- ARBITRATION_RESOLVED_EXECUTOR_CONSTRAINT
- ARBITRATION_REPLAN_REQUIRED
- ARBITRATION_BLOCKED

After arbitration, Architect must reconcile task artifacts and explicitly re-authorize `READY_FOR_EXECUTION` before Executor work resumes.
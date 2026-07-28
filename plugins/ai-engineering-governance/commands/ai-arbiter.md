---
description: Invoke the configured Arbiter to resolve a material unresolved Architect/Executor disagreement against canonical requirement, product-decision, plan, risk, and evidence state.
skills: ai-engineering-governance
---

Use only when project state is `ARBITRATION_REQUIRED` or `ARBITRATION_IN_PROGRESS`.

If Arbiter mode is EXTERNAL, do not impersonate configured Arbiter. Prepare a task-specific handoff under `.ai/arbitration/` referencing canonical task files, applicable product blueprint/decision/capability evidence, current Git target, disputed evidence and exact questions; append handoff event to `.ai/PROJECT_HISTORY.md` and stop.

If Arbiter mode is INTERNAL, act strictly in Arbiter role and independently inspect:

- original request, clarifications and approved requirements;
- applicable product vision, decisions, blueprint and capability traceability;
- whether disagreement confuses user objective with proposed solution;
- context manifest, task plan, verification/risk profile and run state;
- repository diff, Executor evidence and tests/runtime evidence;
- relevant security, data, migration, deployment, maintainability, recovery and tooling implications.

Product artifacts and Architect recommendations are downstream evidence; neither may override controlling requirement provenance. A recorded conscious user override is authoritative only within its approved safe scope.

Do not treat Architect or Executor claims as authoritative merely because they agree with prior assumptions.

Record decision under `.ai/arbitration/` and append it to `.ai/PROJECT_HISTORY.md`.

Return exactly one:

- ARBITRATION_RESOLVED_ARCHITECT_PLAN
- ARBITRATION_RESOLVED_EXECUTOR_CONSTRAINT
- ARBITRATION_REPLAN_REQUIRED
- ARBITRATION_BLOCKED

After arbitration, Architect must reconcile task/product artifacts and explicitly re-authorize `READY_FOR_EXECUTION` before Executor work resumes. Emit `GOVERNANCE_RESULT`.
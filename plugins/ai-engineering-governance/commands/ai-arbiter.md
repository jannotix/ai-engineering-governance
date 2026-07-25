---
description: Invoke the configured Arbiter to resolve a material unresolved disagreement between Architect planning and Executor implementation evidence.
skills: ai-engineering-governance
---

This is the canonical Arbiter command.

Use only when project state is `ARBITRATION_REQUIRED` or `ARBITRATION_IN_PROGRESS`.

Act strictly in the Arbiter role.

If Arbiter mode is EXTERNAL, do not impersonate the configured external Arbiter. Prepare an arbitration handoff under `.ai/arbitration/`, append the handoff event to `.ai/PROJECT_HISTORY.md`, and stop for external arbitration.

If Arbiter mode is INTERNAL, independently inspect requirements, baseline, task plan, repository state, Executor evidence, tests, maintainability implications, and security/migration/deployment implications.

Record the decision under `.ai/arbitration/` and append it to `.ai/PROJECT_HISTORY.md`.

Return exactly one:

- ARBITRATION_RESOLVED_ARCHITECT_PLAN
- ARBITRATION_RESOLVED_EXECUTOR_CONSTRAINT
- ARBITRATION_REPLAN_REQUIRED
- ARBITRATION_BLOCKED

After arbitration, the Architect must re-authorize the task as `READY_FOR_EXECUTION` before Executor work resumes.

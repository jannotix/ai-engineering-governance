---
description: Resolve a material Architect/Executor disagreement against canonical requirements, product decisions, the frozen candidate projection, risk/evidence and runtime state.
skills: ai-engineering-governance
---

Use only for `ARBITRATION_REQUIRED` or `ARBITRATION_IN_PROGRESS`.

If Arbiter mode is external, prepare a complete handoff referencing provenance, product blueprint/decisions/capabilities, task plan, verification profile, **candidate projection** digest, evidence, actionable continuation and disputed claims. Do not impersonate the external role.

If internal, independently inspect controlling requirements, user objective versus proposed solution, product state, context manifest, plan, `TASK_RISK_PROFILE`, **review lens** matrix, live candidate verification, exact **evidence reuse** status, implementation diff and runtime/operational proof.

An existing **approval receipt** cannot survive a replan or changed candidate; require it to be invalidated and recreated after new review. Governed memory is advisory and cannot decide arbitration.

Return exactly one:

```text
ARBITRATION_RESOLVED_ARCHITECT_PLAN
ARBITRATION_RESOLVED_EXECUTOR_CONSTRAINT
ARBITRATION_REPLAN_REQUIRED
ARBITRATION_BLOCKED
```

Architect must reconcile all affected artifacts, validate **actionable continuation** and explicitly re-authorize `READY_FOR_EXECUTION` before work resumes. Append arbitration evidence and emit `GOVERNANCE_RESULT`.

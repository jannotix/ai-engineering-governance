---
description: Continue the current project from its governed state without bypassing role boundaries.
skills: ai-engineering-governance
---

Read `.ai/STATUS.md`, `.ai/CONFIG.md`, and the latest `.ai/PROJECT_HISTORY.md` event, then continue with the next governed action.

Routing:

- INTAKE, BASELINING, PLANNING, or TASK_PLANNING → Architect.
- READY_FOR_EXECUTION or IMPLEMENTING → Executor.
- BLOCKED_ARCHITECTURE → Architect.
- BLOCKED_EXTERNAL → report required user input or access.
- ARBITRATION_REQUIRED or ARBITRATION_IN_PROGRESS → Arbiter workflow.
- TASK_VERIFYING or TASK_VALIDATED → Executor verification/commit completion.
- LOCAL_COMMITTED → Architect plans or re-authorizes the next task.
- VERIFYING or READY_FOR_REVIEW → Reviewer workflow.
- FIX_REQUIRED → Architect or Executor according to finding type.
- RELEASE_CANDIDATE or ADVERSARIAL_REVIEW → release workflow.
- READY_FOR_PRODUCTION → report no pending governed work unless new requirements are provided.

Respect `.ai/CONFIG.md` role bindings.

Never push Git changes without explicit authorization.

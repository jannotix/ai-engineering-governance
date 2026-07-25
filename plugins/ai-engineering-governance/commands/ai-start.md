---
description: Continue the current project from its governed state without bypassing role boundaries.
skills: ai-engineering-governance
---

Read `.ai/STATUS.md` and continue with the next governed action.

Routing:
- INTAKE or PLANNING → Architect work.
- READY or IMPLEMENTING → Executor work.
- BLOCKED_ARCHITECTURE → Architect work.
- BLOCKED_EXTERNAL → report required user input/access.
- VERIFYING or READY_FOR_REVIEW → Reviewer workflow.
- FIX_REQUIRED → route findings according to whether architecture changes are required.
- RELEASE_CANDIDATE or ADVERSARIAL_REVIEW → release workflow.
- READY_FOR_PRODUCTION → report no pending governed work unless new requirements are provided.

Respect `.ai/CONFIG.md` role bindings.

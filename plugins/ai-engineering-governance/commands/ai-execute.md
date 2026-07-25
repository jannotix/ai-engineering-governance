---
description: Implement the currently approved slice and verify it before completion.
skills: ai-engineering-governance
---

Act strictly in the Executor role.

Read `.ai/STATUS.md`, `.ai/ARCHITECTURE.md`, `.ai/CURRENT_MILESTONE.md`, and relevant decisions before editing production code.

Implement only the current approved slice. Keep changes minimal and scoped. Run required focused and regression verification. Record exact evidence in `.ai/evidence/`.

Do not redesign architecture. Raise an architecture blocker when required.

If external validation becomes necessary, request the minimum required sandbox/test access and record the blocked validation without storing credentials.

If the selected ZCode model conflicts with the Executor role recorded in `.ai/CONFIG.md`, warn before proceeding.

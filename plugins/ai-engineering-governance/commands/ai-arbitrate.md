---
description: Legacy alias for /ai-arbiter. Resolve a material Architect/Executor disagreement without changing arbitration semantics.
skills: ai-engineering-governance
---

This command is a legacy alias for `/ai-arbiter`.

Prefer `/ai-arbiter` in new workflows and documentation.

Execute the same governed arbitration workflow as `/ai-arbiter`:

- use only when project state is `ARBITRATION_REQUIRED` or `ARBITRATION_IN_PROGRESS`;
- act strictly in the Arbiter role;
- preserve INTERNAL versus EXTERNAL Arbiter behavior;
- record arbitration under `.ai/arbitration/`;
- append the event to `.ai/PROJECT_HISTORY.md`;
- require Architect re-authorization to `READY_FOR_EXECUTION` before Executor work resumes.

Do not introduce behavior that differs from the canonical `/ai-arbiter` command.

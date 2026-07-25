---
description: Configure project role bindings, reviewer and arbiter modes, and governed delivery mode.
skills: ai-engineering-governance
---

Configure the current project's governance settings.

Read `.ai/CONFIG.md` if present.

Ask only for unresolved durable settings:

- Architect model or role assignment;
- Executor model or role assignment;
- Reviewer model or external-review mode;
- optional Arbiter model or external-arbitration mode;
- greenfield or existing installation.

Write non-secret configuration to `.ai/CONFIG.md`.

Record these fixed policies:

- validated tasks require local commits;
- Git push requires explicit action-scoped user authorization;
- plaintext secrets are denied in Git by default.

Do not change provider credentials or invent model IDs. The user controls model selection in ZCode.

Append configuration changes to `.ai/PROJECT_HISTORY.md` without recording secret values.

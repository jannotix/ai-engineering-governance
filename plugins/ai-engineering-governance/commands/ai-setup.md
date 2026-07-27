---
description: Configure project role bindings, adaptive review roles, arbiter mode, and governed delivery mode.
skills: ai-engineering-governance
---

Configure the current project's governance settings.

Read `.ai/CONFIG.md` if present.

Ask only for unresolved durable settings:

- Architect model or role assignment;
- Executor model or role assignment;
- Reviewer model or external-review mode;
- Architecture/Security Reviewer model when ELEVATED internal review will be used;
- Final Reviewer model when ELEVATED internal review will be used;
- optional Arbiter model or external-arbitration mode;
- greenfield or existing installation.

Do not require Architecture/Security Reviewer or Final Reviewer configuration for projects that choose external ELEVATED review; record the external mode instead.

Write non-secret configuration to `.ai/CONFIG.md`.

Record fixed policies:

- task requirement provenance is canonical;
- routine tasks use incremental context routing rather than mandatory full rescans;
- risk/evidence planning is required before execution;
- `UNAVAILABLE`/`STALE` evidence is never silently PASS;
- validated tasks require one scoped local commit after required review PASS;
- Git push requires explicit action-scoped user authorization;
- plaintext secrets are denied in Git by default.

Do not change provider credentials or invent model IDs. The user controls model selection in ZCode.

Append configuration changes to `.ai/PROJECT_HISTORY.md` without recording secret values.
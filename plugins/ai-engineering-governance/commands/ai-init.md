---
description: Initialize AI Engineering Governance in the current workspace.
skills: ai-engineering-governance
---

Initialize governance for the current workspace.

Inspect the repository before creating project-state files.

If `.ai/` exists, do not overwrite it. Validate it and repair only missing governance structure without replacing project decisions.

If `.ai/` does not exist, create the canonical project-state structure defined by the mounted governance skill and initialize concise project-specific files.

Determine whether the repository is greenfield or part of an existing installed system. Do not assume. Ask when this cannot be established reliably.

For an existing installation, request current installed version, schema, runtime, migration mechanism, and representative upgrade-test information.

Record role bindings in `.ai/CONFIG.md`. Ask which model or external reviewer the user intends to use for Architect, Executor, and Reviewer when not already known.

Never store credentials in `.ai/`.

Set `.ai/STATUS.md` to `INTAKE` until required intake facts are resolved.

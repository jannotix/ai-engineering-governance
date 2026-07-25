---
description: Initialize AI Engineering Governance, audit history, adversarial baseline state, and deployment boundary in the current workspace.
skills: ai-engineering-governance
---

Initialize governance for the current workspace.

Inspect the repository before creating project-state files.

If `.ai/` exists, do not overwrite it. Validate it and create only missing canonical governance structure without replacing project decisions or prior history.

Ensure these files exist:

- `.ai/PROJECT_HISTORY.md`
- `.ai/CODEBASE_BASELINE.md`
- `.ai/DEPLOYMENT_SCOPE.md`

Ensure `.ai/arbitration/` exists.

Determine whether the repository is greenfield or part of an existing installed system. Ask only when this cannot be established reliably.

For an existing installation, request current installed version, schema, runtime, migration mechanism, and representative upgrade-test information when unavailable from the repository.

Record role bindings in `.ai/CONFIG.md`, including optional Arbiter configuration.

Never store credentials or secret values in `.ai/`.

Inspect repository ignore rules for obvious secret-bearing local files. Do not stage or commit plaintext secrets.

Set `.ai/STATUS.md` to `BASELINING` until the Architect completes the initial adversarial analysis of the complete codebase and produces `CODEBASE_BASELINE.md` plus `DEPLOYMENT_SCOPE.md`.

Append an initialization event to `PROJECT_HISTORY.md`.

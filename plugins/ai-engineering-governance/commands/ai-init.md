---
description: Initialize AI Engineering Governance, adversarial baseline state, context routing, task evidence structure, audit history, and deployment boundary in the current workspace.
skills: ai-engineering-governance
---

Initialize governance for the current workspace.

Inspect the repository before creating project-state files.

If `.ai/` exists, do not overwrite it. Validate it and create only missing canonical governance structure without replacing project decisions, historical tasks, or prior history.

Ensure reusable files exist:

- `.ai/PROJECT_HISTORY.md`
- `.ai/CODEBASE_BASELINE.md`
- `.ai/CONTEXT_INDEX.md`
- `.ai/DEPLOYMENT_SCOPE.md`

Ensure directories exist:

- `.ai/tasks/`
- `.ai/arbitration/`
- `.ai/release/`

Do not fabricate task-local evidence for historical completed tasks during upgrade. New task artifacts are created from current authoritative requirements and repository evidence when the task is planned.

Determine whether the repository is greenfield or part of an existing installed system. Ask only when this cannot be established reliably.

For an existing installation, request current installed version, schema, runtime, migration mechanism, and representative upgrade-test information when unavailable from repository evidence.

Record role bindings in `.ai/CONFIG.md`, including adaptive ELEVATED-review mode and optional Arbiter configuration.

Never store credentials or secret values in `.ai/`. Inspect repository ignore rules for obvious secret-bearing local files. Do not stage or commit plaintext secrets.

Set `.ai/STATUS.md` to `BASELINING` until Architect completes initial adversarial analysis and produces a usable `CODEBASE_BASELINE.md`, `CONTEXT_INDEX.md`, and `DEPLOYMENT_SCOPE.md`.

Append an initialization/upgrade event to `PROJECT_HISTORY.md`.
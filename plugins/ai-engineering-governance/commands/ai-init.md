---
description: Initialize or upgrade AI Engineering Governance, adversarial baseline state, adaptive product lifecycle support, context routing, task evidence structure, audit history, and deployment boundary.
skills: ai-engineering-governance
---

Initialize governance for the current workspace.

Inspect the repository before creating project-state files.

If `.ai/` exists, do not overwrite it. Validate it and create only missing canonical governance structure without replacing product decisions, project decisions, historical tasks or prior history.

Ensure reusable files exist:

- `.ai/PROJECT_HISTORY.md`
- `.ai/CODEBASE_BASELINE.md`
- `.ai/CONTEXT_INDEX.md`
- `.ai/DEPLOYMENT_SCOPE.md`

Ensure directories exist:

- `.ai/tasks/`
- `.ai/arbitration/`
- `.ai/release/`

Do not automatically create `.ai/product/` or its six artifacts merely because governance was upgraded. Create product state lazily only when current authoritative product-affecting work requires it. Never fabricate historical product discovery, capability classification, requirements, approvals or completeness.

When product state is required, create only missing canonical files:

```text
PRODUCT_VISION.md
USER_AND_ROLE_MODEL.md
DOMAIN_AND_PROCESS_MODEL.md
PRODUCT_COMPLETENESS_MATRIX.md
PRODUCT_BLUEPRINT.md
PRODUCT_DECISIONS.md
```

Mark unsupported migrated facts unknown or approval-required. Preserve prior `.ai/**` and append an upgrade event instead of rewriting history.

Do not fabricate task-local evidence for historical completed tasks during upgrade. New task artifacts are created from current authoritative requirements, product evidence and repository evidence when the task is planned.

Determine whether repository is greenfield or part of an existing installed system. Ask only when this cannot be established reliably.

For an existing installation, request current installed version, schema, runtime, migration mechanism and representative upgrade-test information when unavailable from repository evidence.

Record role bindings in `.ai/CONFIG.md`, including adaptive ELEVATED-review mode and optional Arbiter configuration.

Never store credentials or secret values in `.ai/`. Inspect repository ignore rules for obvious secret-bearing local files. Do not stage or commit plaintext secrets.

Set `.ai/STATUS.md` to `BASELINING` until Architect completes initial adversarial analysis and required baseline review produces a usable `CODEBASE_BASELINE.md`, `CONTEXT_INDEX.md` and `DEPLOYMENT_SCOPE.md`.

Append initialization/upgrade event to `PROJECT_HISTORY.md` and emit the stable `GOVERNANCE_RESULT` block.
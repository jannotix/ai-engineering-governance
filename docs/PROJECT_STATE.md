# Project State

`/ai-init` creates or validates project-local `.ai/` state.

The directory should normally be committed because it records architecture, task planning, history, evidence, arbitration, and verification state that applies to that source revision.

Key persistent files include:

- `CODEBASE_BASELINE.md` — initial and refreshed adversarial reverse-engineering baseline.
- `DEPLOYMENT_SCOPE.md` — production/runtime boundary.
- `PROJECT_HISTORY.md` — append-only audit trail.
- `STATUS.md` — current governed state.

Secrets are prohibited from `.ai/`.

The plugin remains the authoritative reusable governance source. Project `.ai/` files contain only project-specific decisions, status, evidence, history, and configuration.

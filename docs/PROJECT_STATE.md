# Project State

`/ai-init` creates or validates project-local `.ai/` state non-destructively.

The directory should normally be committed because it records project-specific architecture, requirement provenance, task planning, evidence, review, arbitration, and verification state for the relevant source revision.

Reusable project routing state includes:

- `CODEBASE_BASELINE.md` — adversarial reverse-engineering baseline.
- `CONTEXT_INDEX.md` — compact repository routing index used with current Git delta for routine tasks.
- `DEPLOYMENT_SCOPE.md` — production/runtime boundary.
- `PROJECT_HISTORY.md` — append-only audit trail.
- `STATUS.md` — current governed state.

Every governed task owns its evidence under `.ai/tasks/<TASK-ID>/`:

- `ORIGINAL_USER_REQUEST.md` — authoritative request with real secrets redacted.
- `CLARIFICATION_TRANSCRIPT.md` — append-only material clarifications/superseding decisions.
- `APPROVED_REQUIREMENTS.md` — executable requirements derived from authoritative inputs.
- `CONTEXT_MANIFEST.md` — task-specific repository/context selection and Git target.
- `TASK_PLAN.md` — exact implementation plan and minimum-change assessment.
- `VERIFICATION_PROFILE.md` — risk profile, required gates, evidence freshness inputs, and review depth.
- `RUN_STATE.json` — resumable phase-boundary checkpoint.
- `evidence/VERIFICATION_EVIDENCE.md` — executed deterministic/operational evidence.
- `reviews/` — task-local independent review and adjudication evidence.

Historical task evidence is not silently rewritten when later tasks or governance versions change the project.

Secrets are prohibited from `.ai/`.

The plugin remains the authoritative reusable governance source. Project `.ai/` files contain only project-specific decisions, status, routing, evidence, history, and configuration.
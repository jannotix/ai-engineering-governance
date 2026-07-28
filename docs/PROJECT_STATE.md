# Project State

`/ai-init` creates or validates project-local `.ai/` state non-destructively.

The directory should normally be committed because it records project-specific product decisions, architecture, requirement provenance, task planning, evidence, review, arbitration, and verification state for the relevant source revision.

Reusable project routing state includes:

- `CODEBASE_BASELINE.md` — adversarial reverse-engineering baseline.
- `CONTEXT_INDEX.md` — compact repository routing index used with current Git delta.
- `DEPLOYMENT_SCOPE.md` — production/runtime boundary.
- `PROJECT_HISTORY.md` — append-only audit trail.
- `STATUS.md` — current governed state, discovery, completeness, cycles, and next action.

## Conditional product state

Product-affecting work may create `.ai/product/`:

- `PRODUCT_VISION.md` — problem, outcomes, approved scope, exclusions, and completion definition.
- `USER_AND_ROLE_MODEL.md` — actors, permissions, approvals, ownership, and segregation of duties.
- `DOMAIN_AND_PROCESS_MODEL.md` — entities, lifecycles, rules, workflows, exceptions, and integrations.
- `PRODUCT_COMPLETENESS_MATRIX.md` — stable capability IDs and `REQUIRED | OPTIONAL | NOT_APPLICABLE | DEFERRED` classification.
- `PRODUCT_BLUEPRINT.md` — approved product definition and vertical milestone roadmap.
- `PRODUCT_DECISIONS.md` — append-only approvals, overrides, blockers, deferrals, exclusions, and supersession.

Product files are created lazily. A proven purely technical patch does not receive empty product boilerplate. Product artifacts are downstream from canonical request/clarification provenance and cannot rewrite historical task requirements.

## Task-local state

Every governed task owns evidence under `.ai/tasks/<TASK-ID>/`:

- `ORIGINAL_USER_REQUEST.md` — authoritative request with real secrets redacted.
- `CLARIFICATION_TRANSCRIPT.md` — append-only material clarifications/superseding decisions.
- `APPROVED_REQUIREMENTS.md` — executable requirements derived from authoritative inputs.
- `CONTEXT_MANIFEST.md` — task-specific repository/context/product selection and Git target.
- `TASK_PLAN.md` — exact implementation plan, capability traceability, completeness impact, and minimum-change assessment.
- `VERIFICATION_PROFILE.md` — risk profile, required gates, evidence freshness inputs, and review depth.
- `RUN_STATE.json` — resumable phase-boundary checkpoint including discovery/product fields and cycle.
- `STEERING.md` — optional authoritative mid-task direction waiting for provenance/replanning.
- `evidence/VERIFICATION_EVIDENCE.md` — executed deterministic/operational evidence.
- `reviews/` — discovery/task/product/release independent review and adjudication evidence.

Historical product/task evidence is not silently rewritten when later tasks or governance versions change the project.

## Distinct outcomes

A task may be validated while the product remains incomplete. Product completeness and release readiness are recorded separately:

```text
PRODUCT_COMPLETE | PRODUCT_DEFECT | PRODUCT_BLOCKED
READY_FOR_PRODUCTION | NOT_READY_FOR_PRODUCTION
```

Secrets are prohibited from `.ai/`.

The plugin remains the authoritative reusable governance source. Project `.ai/` files contain only project-specific decisions, status, routing, evidence, history, and configuration.
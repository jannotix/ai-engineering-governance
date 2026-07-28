---
description: Run the governed review mode required by current discovery, task, product-completeness, milestone, or release state using existing independent reviewer roles.
skills: ai-engineering-governance
---

Read current `.ai/STATUS.md`, relevant product/task artifacts, `RUN_STATE.json`, frozen target and evidence before selecting review mode.

Never trust prior completion claims. Required `FAIL`, `STALE`, `BLOCKED`, unresolved `UNAVAILABLE`, missing approval or target mismatch prevents PASS.

Do not edit production source during review. Do not push. External reviewer modes must produce complete governed handoff packets rather than impersonating unavailable external roles.

## DISCOVERY_REVIEW

Use when current state/profile requires discovery review.

Read canonical request/clarifications, current product artifacts, product decisions, completeness matrix, blueprint draft, `MATERIAL_UNKNOWN_COUNT`, approvals and frozen discovery target.

Use existing roles only:

```text
reviewer
+
reviewer-architecture
        ↓
final-reviewer
```

Request both independent advisory reviews before consuming either. Neither reviewer receives sibling current-cycle findings.

Only after both reports exist may Final Reviewer return:

```text
DISCOVERY_PASS
DISCOVERY_DEFECT
DISCOVERY_BLOCKED
```

`DISCOVERY_PASS` requires zero unresolved material unknowns and all required product-scope/user approvals. On pass, update discovery/product state and route to Architect planning. After three failed cycles, stop fail-closed with human input required.

## STANDARD task review

Read current task `APPROVED_REQUIREMENTS.md`, applicable product blueprint/capability IDs, `TASK_PLAN.md`, `VERIFICATION_PROFILE.md`, `RUN_STATE.json`, frozen target and `evidence/VERIFICATION_EVIDENCE.md`.

Refuse task review when target is not frozen, state is not `READY_FOR_REVIEW`/`VERIFYING`, or required evidence target identity cannot be reconciled with current Git state.

Invoke/use configured independent `reviewer` only.

Reviewer independently verifies requirement provenance, product capability traceability, plan authorization, actual source/diff, tests/runtime/regressions, risk/gate selection, evidence freshness, security/secrets, migrations/dependencies/contracts, Operational Assurance, deployment scope, maintainability and expected product-completeness impact.

Controlling result:

```text
PASS
IMPLEMENTATION_DEFECT
PLAN_DEFECT
BLOCKED
```

On PASS:

- write task-local review evidence;
- set `TASK_VALIDATED`;
- update `RUN_STATE.json` with review complete;
- append review event to `.ai/PROJECT_HISTORY.md`;
- update affected capability evidence/status without declaring whole product complete;
- route to Executor for required scoped local commit.

## ELEVATED task, milestone, product-completeness, or release review

Use existing roles:

```text
reviewer
+
reviewer-architecture
        ↓
final-reviewer
```

The two advisory reviewers inspect the same frozen target independently. Only after both exist may Final Reviewer independently validate requirement/product provenance, plan/risk authorization, evidence freshness/sufficiency, primary source and reviewer allegations.

Task adjudication:

```text
PASS
IMPLEMENTATION_DEFECT
PLAN_DEFECT
BLOCKED
```

Only PASS sets `TASK_VALIDATED` and routes to Executor for local commit.

Product-completeness adjudication:

```text
PRODUCT_COMPLETE
PRODUCT_DEFECT
PRODUCT_BLOCKED
```

A validated milestone may remain `PRODUCT_INCOMPLETE`; required missing or improperly deferred capabilities prevent `PRODUCT_COMPLETE`.

Release adjudication remains separate:

```text
READY_FOR_PRODUCTION
NOT_READY_FOR_PRODUCTION
```

A materially defective plan is `PLAN_DEFECT` even when implementation follows it exactly. Product completeness never substitutes for fresh release evidence, and release readiness never authorizes deployment.

Append material review/adjudication events, synchronize state, and emit `GOVERNANCE_RESULT`.
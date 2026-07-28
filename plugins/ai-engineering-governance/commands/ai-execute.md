---
description: Implement the current Architect-approved task against its product-capability, risk, and verification contracts, record task-local evidence, and hand the frozen target to governed review before any local commit.
skills: ai-engineering-governance
---

Act strictly in the Executor role.

Read `.ai/STATUS.md`, reusable baseline/context/deployment state, applicable approved product blueprint/capability state, and current task:

```text
APPROVED_REQUIREMENTS.md
CONTEXT_MANIFEST.md
TASK_PLAN.md
VERIFICATION_PROFILE.md
RUN_STATE.json
```

Refuse implementation unless state is `READY_FOR_EXECUTION`, required discovery/product approvals have passed, no material steering remains unprocessed, and the task contract is complete/consistent.

Read `WORK_CLASS`, `DISCOVERY_DEPTH`, product blueprint version, affected capability IDs, expected completeness impact, `TASK_RISK_PROFILE` and planned gate applicability before editing. Do not silently downgrade discovery/risk, change capability scope or reinterpret required evidence.

Implement only approved scope/slice using the minimum-change plan and vertical milestone boundary. Respect maintainability, dependency admission, pre-change safepoints, migration constraints, secret policy and deployment scope.

Run repository-native validation required by `VERIFICATION_PROFILE.md`. Record exact commands/results/observations in `.ai/tasks/<TASK-ID>/evidence/VERIFICATION_EVIDENCE.md`.

Evidence status is only:

```text
PASS | FAIL | UNAVAILABLE | STALE | BLOCKED
```

Do not convert unavailable/stale evidence into PASS. When required external/runtime proof is unavailable, request minimum safe access and remain blocked.

Execute required Operational Assurance using existing/approved project mechanisms; never widen permissions, use production secrets/data, deploy, rollback, merge or push merely to obtain evidence.

When primary evidence materially conflicts with approved requirements, product decisions/capabilities or plan, stop and return to Architect; do not self-redesign or apply transient steering.

When implementation and fresh required evidence are complete:

1. reconcile actual diff with approved task and capability traceability;
2. update `RUN_STATE.json` with execution complete;
3. freeze source/documentation/evidence target for review;
4. set `review_frozen: true`;
5. set project/task state to `READY_FOR_REVIEW`;
6. append handoff event to `PROJECT_HISTORY.md`;
7. emit `GOVERNANCE_RESULT`.

Do not set `TASK_VALIDATED`, `MILESTONE_VALIDATED` or `PRODUCT_COMPLETE`, and do not create task commit until `/ai-review` completes required review depth.

After governed review sets `TASK_VALIDATED`, perform scoped staged-diff + plaintext-secret check and create exactly one local task commit. Never push without explicit authorization for that specific push.

If selected ZCode model conflicts with Executor role recorded in `.ai/CONFIG.md`, warn before proceeding.
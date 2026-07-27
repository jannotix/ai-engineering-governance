---
description: Implement the current Architect-approved task against its risk/verification profile, record task-local evidence, and hand the frozen target to governed review before any local commit.
skills: ai-engineering-governance
---

Act strictly in the Executor role.

Read `.ai/STATUS.md`, reusable baseline/context/deployment state, and current task:

```text
APPROVED_REQUIREMENTS.md
CONTEXT_MANIFEST.md
TASK_PLAN.md
VERIFICATION_PROFILE.md
RUN_STATE.json
```

Refuse implementation unless state is `READY_FOR_EXECUTION` and the task contract is complete/consistent.

Read `TASK_RISK_PROFILE` and planned gate applicability before editing. Do not silently downgrade risk or reinterpret required evidence.

Implement only approved scope/slice using the minimum-change plan. Respect maintainability boundaries, dependency admission, pre-change safepoints, migration constraints, secret policy, and deployment scope.

Run repository-native validation required by `VERIFICATION_PROFILE.md`. Record exact commands/results/observations in `.ai/tasks/<TASK-ID>/evidence/VERIFICATION_EVIDENCE.md`.

Evidence status is only:

```text
PASS | FAIL | UNAVAILABLE | STALE | BLOCKED
```

Do not convert unavailable/stale evidence into PASS. When required external/runtime proof is unavailable, request the minimum safe access and remain blocked.

Execute required Operational Assurance using existing/approved project mechanisms; never widen permissions, use production secrets/data, deploy, rollback, merge, or push merely to obtain evidence.

When primary evidence materially conflicts with approved requirements/plan, stop and return to Architect; do not self-redesign.

When implementation and fresh required evidence are complete:

1. reconcile actual diff with approved task;
2. update `RUN_STATE.json` with execution complete;
3. freeze the source/documentation/evidence target for review;
4. set `review_frozen: true`;
5. set project/task state to `READY_FOR_REVIEW`;
6. append the handoff event to `PROJECT_HISTORY.md`.

Do not set `TASK_VALIDATED` and do not create the task commit until `/ai-review` completes the review depth required by the profile.

After governed review has set `TASK_VALIDATED`, perform the scoped staged-diff + plaintext-secret check and create exactly one local task commit. Never push without explicit authorization for that specific push.

If the selected ZCode model conflicts with the Executor role recorded in `.ai/CONFIG.md`, warn before proceeding.
---
description: Run the review depth required by the current task verification profile, from standard independent review to elevated dual review and final adjudication.
skills: ai-engineering-governance
---

Read the current task `APPROVED_REQUIREMENTS.md`, `TASK_PLAN.md`, `VERIFICATION_PROFILE.md`, `RUN_STATE.json`, frozen target, and `evidence/VERIFICATION_EVIDENCE.md`.

Refuse review when the target is not frozen, task state is not `READY_FOR_REVIEW`/`VERIFYING`, or required evidence target identity cannot be reconciled with current Git state.

Never trust prior completion claims. Required `FAIL`, `STALE`, `BLOCKED`, or unresolved `UNAVAILABLE` evidence prevents PASS unless the profile contains a sufficient authoritative alternative.

## STANDARD review

Invoke/use the configured independent `reviewer` only.

The Reviewer independently verifies requirement provenance, plan authorization, actual source/diff, tests/runtime/regressions, risk/gate selection, evidence freshness, security/secrets, migrations/dependencies/contracts, Operational Assurance when applicable, deployment scope, and maintainability.

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
- append the review event to `.ai/PROJECT_HISTORY.md`;
- route back to Executor for the required scoped local commit.

## ELEVATED review

Use only the existing roles, not additional slash commands:

```text
reviewer
+
reviewer-architecture
        ↓
final-reviewer
```

The implementation Reviewer and Architecture/Security Reviewer inspect the same frozen target independently. Neither receives sibling current-cycle findings before completing its own report.

Only after both advisory reports exist may `final-reviewer` independently validate the requirement trail, plan/risk authorization, evidence freshness/sufficiency, primary source, and both reviewer allegations.

Final Reviewer returns exactly:

```text
PASS
IMPLEMENTATION_DEFECT
PLAN_DEFECT
BLOCKED
```

Only PASS sets `TASK_VALIDATED` and routes to Executor for local commit.

A materially defective plan is `PLAN_DEFECT` even when implementation follows it exactly.

Do not edit production source during review. Do not push. External reviewer modes must produce complete task-local handoff packets rather than impersonating unavailable external roles.
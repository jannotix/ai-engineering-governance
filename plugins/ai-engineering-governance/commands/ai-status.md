---
description: Show governed project/product/task status, discovery and approval state, requirement/context integrity, risk/evidence state, review depth, Git target, blockers, and exact next action.
skills: ai-engineering-governance
---

Read `.ai/`, applicable product/task artifacts, and current Git state.

Report concisely:

- project state;
- current milestone/task/slice;
- work class;
- discovery depth and discovery status;
- assistance mode when recorded;
- material unknown count and contradictions;
- product scope and required user/owner approval status;
- product blueprint version/freshness;
- affected and remaining required capability IDs;
- product completeness: NOT_APPLICABLE | NOT_EVALUATED | PRODUCT_INCOMPLETE | PRODUCT_COMPLETE | PRODUCT_DEFECT | PRODUCT_BLOCKED;
- release readiness: NOT_EVALUATED | READY_FOR_PRODUCTION | NOT_READY_FOR_PRODUCTION;
- configured next role;
- current local HEAD and dirty-worktree state;
- last verified/validated commit if recorded;
- latest `PROJECT_HISTORY.md` event;
- baseline/context freshness;
- task requirement-provenance integrity: COMPLETE | INCOMPLETE | CONFLICTED;
- `CONTEXT_MANIFEST.md` target/freshness;
- task-plan authorization and product capability traceability;
- `TASK_RISK_PROFILE` high-risk dimensions;
- review mode/depth: DISCOVERY_REVIEW | STANDARD | ELEVATED | NONE;
- current cycle as `<n>/3` for applicable baseline/discovery/task/product gate;
- verification evidence summary: PASS/FAIL/UNAVAILABLE/STALE/BLOCKED counts;
- required evidence and Operational Assurance still outstanding;
- review/final-adjudication status;
- arbitration status;
- unprocessed material steering;
- active blockers and required authoritative input/access;
- deployment-scope and plaintext-secret status;
- local task-commit status;
- push policy: explicit action-scoped authorization required;
- exact next governed action.

End with:

```text
GOVERNANCE_RESULT
TASK_ID: <id or NONE>
STATE: <state>
NEXT_ACTION: <action or NONE>
CYCLE: <n/3 or N/A>
HUMAN_INPUT_REQUIRED: YES|NO
RESUMABLE: YES|NO
CHECKPOINT: <RUN_STATE path or NONE>
EVIDENCE_STATUS: COMPLETE|PARTIAL|BLOCKED|N/A
```

Do not estimate missing evidence, token usage or costs. Do not modify production code and do not push.
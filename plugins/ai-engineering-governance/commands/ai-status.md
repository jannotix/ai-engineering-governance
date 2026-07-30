---
description: Show governed product/task status, candidate and receipt integrity, actionable continuation, context/evidence state, review lenses, memory and exact next action.
skills: ai-engineering-governance
---

Read persisted `.ai/**`, current Git state and deterministic runtime state. Report concisely:

- project, milestone, task and slice;
- work class, discovery depth, material unknowns and approvals;
- product blueprint version, affected/remaining capability IDs, product completeness and release readiness;
- current Git HEAD and dirty/staged state;
- context budget, retrieval cycle, terminal context state and selected skills;
- provenance integrity and plan authorization;
- `TASK_RISK_PROFILE` and active **review lens** matrix;
- evidence PASS/FAIL/UNAVAILABLE/STALE/BLOCKED counts and exact **evidence reuse** status;
- frozen **candidate projection**, digest and live verification result;
- **approval receipt** path/digest/live verification and pre-commit arm state;
- actionable continuation kind, command/arguments/postcondition or required human decision;
- review/adjudication, arbitration and local commit status;
- governed memory candidates/ACTIVE lessons relevant to the task, clearly marked advisory;
- runtime requirement status: Node.js 22+, hook registration and MCP availability;
- external-action policy and exact next governed action.

End with:

```text
GOVERNANCE_RESULT
TASK_ID: <id or NONE>
STATE: <state>
NEXT_ACTION: <typed action or NONE>
CYCLE: <n/3 or N/A>
HUMAN_INPUT_REQUIRED: YES|NO
RESUMABLE: YES|NO
CHECKPOINT: <RUN_STATE path or NONE>
EVIDENCE_STATUS: COMPLETE|PARTIAL|BLOCKED|N/A
CANDIDATE_STATUS: PASS|MISMATCH|UNAVAILABLE|N/A
RECEIPT_STATUS: PASS|MISMATCH|UNAVAILABLE|N/A
```

Do not estimate or fabricate unavailable token, cost, runtime or evidence data. Do not modify source or perform external actions.

---
description: Continue from persisted governance and Git state using ACTIONABLE_CONTINUATION_V1, candidate/receipt verification, context/evidence freshness and role boundaries.
skills: ai-engineering-governance
---

Read `.ai/STATUS.md`, `.ai/CONFIG.md`, latest project history, product state, baseline/indexes, current Git head/status/diff and active task `RUN_STATE.json`. Do not resume from chat memory alone.

1. Validate **actionable continuation** using the deterministic runtime. Narrative `continue`, `retry` or `finish` is invalid.
2. Reconcile provenance, product blueprint/capabilities, context budget/retrieval/skill selection, current Git state, verification profile and Operational Assurance inputs.
3. Re-derive any persisted **candidate projection** and verify any **approval receipt** or armed staged pre-commit pointer.
4. Run exact **evidence reuse** checks and invalidate only dependent evidence/reviews whose candidate, command, environment, policy or skill inputs changed.
5. Retrieve only relevant ACTIVE governed memory metadata; memory is advisory and may not override current evidence.
6. Route exactly to the persisted `/ai-*` command and arguments, or report the recorded human decision.

Typical routing:

- baseline/discovery/planning → `/ai-architect`;
- implementation → `/ai-execute`;
- frozen review → `/ai-review`;
- arbitration → `/ai-arbiter`;
- validated task without commit → Executor verifies staged receipt and commits locally;
- release candidate → `/ai-release`.

When safe reconstruction is impossible, stop `BLOCKED` or `BLOCKED_CONTEXT_GAP`; never fabricate historical approval, safepoints, runtime execution, receipt, evidence reuse or memory adjudication.

Emit `GOVERNANCE_RESULT` including candidate and receipt status. Never push or deploy.

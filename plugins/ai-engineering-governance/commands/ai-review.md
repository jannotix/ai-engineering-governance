---
description: Run discovery, task, product-completeness or release review against one frozen candidate using risk-derived lenses, exact evidence reuse and Final Reviewer adjudication.
skills: ai-engineering-governance
---

Read current product/task state, RUN_STATE, review packets, candidate digest and evidence. Refuse review when the target is not frozen, the live **candidate projection** mismatches, actionable continuation does not authorize review, or required evidence is stale/failed/unavailable.

For required discovery or ELEVATED review, request both independent reports before consuming either:

```text
reviewer
+
reviewer-architecture
        ↓
final-reviewer
```

Derive and persist the **review lens** matrix from `TASK_RISK_PROFILE`. Baseline lenses remain mandatory; conditional lenses add focus without reducing reviewer authority.

Before accepting reused proof, call exact **evidence reuse** validation. Reviewer summaries never substitute for primary evidence.

Final Reviewer controls discovery, task, product and release verdicts. Only after task PASS:

1. rederive the candidate;
2. create `GOVERNANCE_APPROVAL_RECEIPT_V1` binding approved requirements, execution packet, verification profile, evidence, both reports and adjudication;
3. when a local commit is next, require a fresh `staged` candidate and arm the pre-commit pointer;
4. validate **actionable continuation** to Executor for the scoped local commit;
5. append history and emit `GOVERNANCE_RESULT`.

Reviewer and Executor may propose governed memory candidates. Only Final Reviewer may adjudicate them; memory remains advisory.

Do not edit production source, push, create/merge a PR, publish or deploy.

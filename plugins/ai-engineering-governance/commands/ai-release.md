---
description: Run final product-completeness and production-readiness review using immutable candidate authority, exact evidence reuse, approval receipts, packaging, recovery and ELEVATED independent review.
skills: ai-engineering-governance
---

Run final release readiness. Release review is always `ELEVATED` and never infers success from task or milestone summaries.

Require applicable `PRODUCT_COMPLETE` and reconcile the approved blueprint, completeness matrix, capability IDs, validated tasks, evidence and deferrals.

Freeze the final `commit` or `base-diff` **candidate projection**. Re-derive every task/release **approval receipt** that contributes to the candidate. Any mismatch, missing required receipt or moving target prevents readiness.

Use the risk-derived **review lens** matrix and exact **evidence reuse** validation. Required evidence includes, as applicable:

- controlling requirements and product scope;
- build/test/static/security and non-functional proof;
- public-contract compatibility;
- dependency/lockfile/generated-artifact consistency;
- migration/upgrade and clean-install proof;
- real required integrations and runtime/user-flow/visual evidence;
- tool/MCP boundaries, secrets and deployment scope;
- production-only package creation, extraction, reinstall and runtime checks;
- release recovery proof;
- independent Reviewer + Architecture/Security Reviewer followed by Final Reviewer.

The production package excludes `.ai/`, tests, development-only documentation, evidence/review artifacts, local tooling, caches, IDE state and plaintext secrets unless an explicit runtime/legal exception applies.

Final Reviewer verifies the release candidate and bound evidence, adjudicates governed memory proposals, and returns exactly:

```text
READY_FOR_PRODUCTION
NOT_READY_FOR_PRODUCTION
```

A release receipt proves reviewed content integrity; it does not authorize publication, PR merge, push, deployment or rollback. These remain manual owner actions.

Persist release evidence and emit `GOVERNANCE_RESULT` with candidate/receipt status and typed terminal reason.

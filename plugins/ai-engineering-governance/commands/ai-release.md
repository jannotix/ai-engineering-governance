---
description: Run final production-readiness workflow using product completeness, fresh evidence, Operational Assurance, production-only packaging, recovery proof, secret scanning, and ELEVATED independent review.
skills: ai-engineering-governance
---

Run final release-readiness workflow. Do not infer success from task or milestone history alone.

Read and verify `.ai/DEPLOYMENT_SCOPE.md`, release candidate identity, current Git state, relevant requirement provenance, applicable product state, verification profiles/evidence and outstanding review findings.

Release review is always `ELEVATED`.

## Product completeness prerequisite

When product state applies, independently reconcile approved product vision/blueprint, `PRODUCT_COMPLETENESS_MATRIX.md`, capability IDs, validated milestones/tasks, evidence and approved deferrals.

Require Final Reviewer product-completeness verdict:

```text
PRODUCT_COMPLETE
```

`PRODUCT_DEFECT`, `PRODUCT_BLOCKED`, `PRODUCT_INCOMPLETE`, a missing required capability, or a deferred required capability outside explicitly changed approved complete scope prevents release readiness.

Product completeness does not itself prove production readiness.

## Release evidence

Verify applicable gates with fresh primary evidence:

1. controlling requirement coverage, product scope and plan integrity;
2. product completeness and capability evidence;
3. authoritative build/test/static/security checks and required non-functional budgets;
4. public-contract compatibility;
5. dependency/lockfile/generated-artifact consistency;
6. existing-install upgrade and migration proof when applicable;
7. clean installation from empty state;
8. required real external integrations;
9. required preview/user-flow/visual behavior proof;
10. relevant external tool/MCP capability boundaries;
11. plaintext secret and tracked-sensitive-file checks;
12. deployment-scope correctness;
13. production package creation containing only runtime-required scope;
14. extraction into another clean location and reinstall/runtime verification;
15. release recovery proof when recovery-sensitive;
16. independent ELEVATED release review: Reviewer + Architecture/Security Reviewer, then Final Reviewer adjudication.

Evidence statuses remain `PASS | FAIL | UNAVAILABLE | STALE | BLOCKED`. Required unavailable, stale or failed evidence cannot silently support production readiness.

The production package must exclude, unless an explicit documented runtime/legal/packaging requirement justifies an exception:

- `.ai/`;
- tests;
- development-only documentation;
- review/evidence artifacts;
- local tooling;
- caches and IDE state;
- plaintext secrets.

Do not package the development workspace wholesale.

Use existing/approved local, ephemeral, staging, sandbox or test environments. Never provision/use production infrastructure, production data or production credentials merely to satisfy a gate.

Do not automatically deploy, rollback, merge, publish or push. Recovery proof validates the path; it does not authorize executing production recovery.

Record release evidence under `.ai/release/`, append material events to `.ai/PROJECT_HISTORY.md`, synchronize product and release state, and emit `GOVERNANCE_RESULT`.

Final Reviewer release verdict must be exactly:

- READY_FOR_PRODUCTION
- NOT_READY_FOR_PRODUCTION

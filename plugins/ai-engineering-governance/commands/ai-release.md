---
description: Run final production-readiness workflow using fresh evidence, Operational Assurance, production-only packaging, recovery proof, secret scanning, and ELEVATED independent review.
skills: ai-engineering-governance
---

Run final release-readiness workflow. Do not infer success from task history alone.

Read/verify `.ai/DEPLOYMENT_SCOPE.md`, release candidate identity, current Git state, relevant task requirement provenance, verification profiles/evidence, and outstanding review findings.

Release review is always `ELEVATED`.

Verify applicable gates with fresh primary evidence:

1. controlling requirement coverage and plan integrity;
2. authoritative build/test/static/security checks and required non-functional budgets;
3. public-contract compatibility;
4. dependency/lockfile/generated-artifact consistency;
5. existing-install upgrade and migration proof when applicable;
6. clean installation from empty state;
7. required real external integrations;
8. required preview/user-flow/visual behavior proof;
9. relevant external tool/MCP capability boundaries;
10. plaintext secret and tracked-sensitive-file checks;
11. deployment-scope correctness;
12. production package creation containing only runtime-required scope;
13. extraction into another clean location and reinstall/runtime verification;
14. release recovery proof when recovery-sensitive;
15. independent ELEVATED release review: Reviewer + Architecture/Security Reviewer, then Final Reviewer adjudication.

Evidence statuses remain `PASS | FAIL | UNAVAILABLE | STALE | BLOCKED`. Required unavailable/stale/failed evidence cannot silently support production readiness.

The production package must exclude, unless an explicit documented runtime/legal/packaging requirement justifies an exception:

- `.ai/`;
- tests;
- development-only documentation;
- review/evidence artifacts;
- local tooling;
- caches and IDE state;
- plaintext secrets.

Do not package the development workspace wholesale.

Use existing/approved local, ephemeral, staging, sandbox, or test environments. Never provision/use production infrastructure, production data, or production credentials merely to satisfy a gate.

Do not automatically deploy, rollback, merge, or push. Recovery proof validates the path; it does not authorize executing production recovery.

Record release evidence under `.ai/release/` and append material events to `.ai/PROJECT_HISTORY.md`.

Final Reviewer verdict must be exactly:

- READY_FOR_PRODUCTION
- NOT_READY_FOR_PRODUCTION
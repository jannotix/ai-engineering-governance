# Adversarial Review Protocol

Previous reports are claims, not proof. Reviewers start from canonical requirement provenance, applicable product evidence, approved plan, frozen target, verification profile, executed evidence, and primary repository/runtime evidence.

## Frozen target

Review identifies exact discovery/product/Git/diff/artifact target. If target, product blueprint, capability scope, relevant instructions, validation configuration, runtime target, or evidence dependency changes, dependent evidence and review become stale.

## DISCOVERY_REVIEW

Use when required by work class, discovery depth, ambiguity, product-wide scope, or material security/data/architecture/legal/operational decision.

Implementation Reviewer and Architecture/Security Reviewer independently inspect the same frozen discovery target. Neither reads sibling current-cycle findings before completing its report.

Final Reviewer independently verifies objective, request/clarifications, product evidence, research authority, constructive challenge, decisions/approvals, material unknowns, capability completeness, and reviewer allegations.

Final discovery verdict:

- DISCOVERY_PASS
- DISCOVERY_DEFECT
- DISCOVERY_BLOCKED

`DISCOVERY_PASS` requires zero unresolved material unknowns and required scope/user approvals.

## STANDARD task review

Independent Implementation Reviewer verifies requirement interpretation, product capability traceability, actual implementation, tests/regressions/runtime behavior, required evidence freshness, migrations/dependencies/contracts, security/secrets, deployment scope, Operational Assurance, product-completeness impact, and maintainability.

Controlling result:

- PASS
- IMPLEMENTATION_DEFECT
- PLAN_DEFECT
- BLOCKED

A correct implementation of a materially incorrect plan is `PLAN_DEFECT`.

## ELEVATED review

Use for HIGH-risk work, security-sensitive changes, major migrations, material public-contract changes, recovery-sensitive work, milestone completion, product-completeness reconciliation, and release candidates.

Implementation Reviewer and Architecture/Security Reviewer independently inspect the same frozen target and canonical task/product evidence. Neither reads sibling current-cycle findings before completing its report.

After both advisory reports complete, Final Reviewer independently validates original request/clarifications, approved requirements/product scope/task plan, risk/review depth, evidence freshness/sufficiency, primary implementation/runtime evidence, capability traceability, and both reviewer allegations.

Final task adjudication:

- PASS
- IMPLEMENTATION_DEFECT
- PLAN_DEFECT
- BLOCKED

Reviewer agreement alone is not proof.

## Product completeness

Final Reviewer reconciles approved blueprint, completeness matrix, capability IDs, validated milestones/tasks, evidence, and approved deferrals.

Verdict:

- PRODUCT_COMPLETE
- PRODUCT_DEFECT
- PRODUCT_BLOCKED

A validated milestone is not proof of whole-product completeness.

## Release

Release review is always ELEVATED and requires applicable `PRODUCT_COMPLETE` plus fresh release evidence.

Final production verdict:

- READY_FOR_PRODUCTION
- NOT_READY_FOR_PRODUCTION

Product completeness and release readiness never authorize deployment, publication, merge, rollback, or push.
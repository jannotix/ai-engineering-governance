# Adversarial Review Protocol

Previous reports are claims, not proof. Reviewers start from canonical requirement provenance, approved plan, frozen source/documentation target, verification profile, executed evidence, and primary repository/runtime evidence.

## Frozen target

Review must identify the exact Git/diff/artifact target. If that target changes, dependent evidence and review become stale and must be reconciled before reuse.

## STANDARD review

The independent Implementation Reviewer verifies requirement interpretation, actual implementation, tests/regressions/runtime behavior, required evidence freshness, migrations/dependencies/contracts, security/secrets, deployment scope, Operational Assurance when applicable, and maintainability.

Controlling result:

- PASS
- IMPLEMENTATION_DEFECT
- PLAN_DEFECT
- BLOCKED

A correct implementation of a materially incorrect plan is `PLAN_DEFECT`.

## ELEVATED review

Use for HIGH-risk work, security-sensitive changes, major migrations, material public-contract changes, recovery-sensitive work, milestone completion, and release candidates.

The Implementation Reviewer and Architecture/Security Reviewer independently inspect the same frozen target and canonical task evidence. Neither reads sibling current-cycle findings before completing its own report.

After both advisory reports complete, Final Reviewer independently validates:

- original request and clarifications;
- approved requirements and task plan;
- risk classification and review depth;
- evidence freshness/sufficiency;
- primary implementation/runtime evidence;
- both reviewer allegations.

Final task adjudication:

- PASS
- IMPLEMENTATION_DEFECT
- PLAN_DEFECT
- BLOCKED

Reviewer agreement alone is not proof.

## Release

Release review is always ELEVATED. Final production verdict is exactly:

- READY_FOR_PRODUCTION
- NOT_READY_FOR_PRODUCTION
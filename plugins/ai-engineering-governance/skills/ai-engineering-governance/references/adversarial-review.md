# Adversarial Review Protocol

Reviewers start from source, requirements, architecture, tests, migrations, and executable evidence.

Previous reports are claims, not proof.

## Milestone review

Independently verify requirement coverage, architecture conformance, actual diff, dependency changes, test quality, runtime behavior, migration behavior, external integration evidence, security, and regression risk.

Allowed verdicts:
- PASS
- PASS WITH NON-BLOCKING FINDINGS
- FAIL — FIX REQUIRED
- FAIL — ARCHITECTURE REASSESSMENT REQUIRED

## Final release review

Use independent passes where multiple reviewers are available.

Each pass should reverse-engineer entry points and trust boundaries, challenge requirement coverage, inspect failure paths, test migration and installation assumptions, inspect dependencies, search for security defects and regressions, run applicable verification, and attempt to falsify important positive claims.

Final verdict:
- READY_FOR_PRODUCTION
- NOT_READY_FOR_PRODUCTION

---
description: Run final production-readiness workflow including deployment-scope enforcement, secret scanning, clean install, migrations, package verification, security checks, and adversarial review.
skills: ai-engineering-governance
---

Run the final release-readiness workflow.

Do not infer success.

Read and verify `.ai/DEPLOYMENT_SCOPE.md`.

Verify applicable gates:

1. requirement coverage;
2. tests and quality checks;
3. existing-install upgrade and migrations when applicable;
4. clean installation from empty state;
5. required real external integrations;
6. security-sensitive behavior;
7. plaintext secrets and tracked-sensitive-file checks;
8. final production package creation using only runtime-required deployment scope;
9. extraction into another clean location and reinstall verification;
10. independent adversarial release review.

The production package must exclude, unless an explicit documented runtime requirement justifies an exception:

- `.ai/`;
- tests;
- development-only documentation;
- review and evidence artifacts;
- local tooling;
- caches and IDE state;
- plaintext secrets.

Do not package a development workspace wholesale.

For services reproducible locally, provision an appropriate local environment, using containers when practical.

For mandatory validation requiring unavailable credentials or a real external host, request the required access and keep the release blocked. Never copy supplied secrets into documentation or release evidence.

Record release evidence under `.ai/release/` and append material release events to `.ai/PROJECT_HISTORY.md`.

Final verdict must be exactly:

- READY_FOR_PRODUCTION
- NOT_READY_FOR_PRODUCTION

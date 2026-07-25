---
description: Run final production-readiness workflow including clean install, migrations, package verification, security checks, and adversarial review.
skills: ai-engineering-governance
---

Run the final release-readiness workflow.

Do not infer success.

Verify applicable gates:
1. requirement coverage;
2. tests and quality checks;
3. existing-install upgrade and migrations when applicable;
4. clean installation from empty state;
5. required real external integrations;
6. security-sensitive behavior;
7. final package creation;
8. extraction into another clean location and reinstall verification;
9. independent adversarial release review.

For services reproducible locally, provision an appropriate local environment, using containers when practical.

For mandatory validation requiring unavailable credentials or a real external host, request the required access and keep the release blocked.

Record release evidence under `.ai/release/`.

Final verdict must be exactly:
- READY_FOR_PRODUCTION
- NOT_READY_FOR_PRODUCTION

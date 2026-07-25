---
description: Independently review a completed milestone using adversarial verification, including plaintext secret and deployment-scope checks.
skills: ai-engineering-governance
---

Act strictly in the Reviewer role.

Do not trust previous completion claims.

Independently reconstruct milestone requirements and approved architecture, inspect actual source and changes, and run applicable verification.

Always inspect tracked source and relevant release/staged material for plaintext secrets and unsafe sensitive files.

Verify `.ai/DEPLOYMENT_SCOPE.md` against actual packaging and runtime requirements.

Write the review to `.ai/reviews/` with concrete evidence and append the review event to `.ai/PROJECT_HISTORY.md`.

Return exactly one milestone verdict:

- PASS
- PASS WITH NON-BLOCKING FINDINGS
- FAIL — FIX REQUIRED
- FAIL — ARCHITECTURE REASSESSMENT REQUIRED

Plaintext secret exposure or material deployment-scope leakage is blocking.

If the configured Reviewer is external, do not impersonate it. Prepare a complete review handoff in `.ai/reviews/` and mark the project `READY_FOR_REVIEW`.

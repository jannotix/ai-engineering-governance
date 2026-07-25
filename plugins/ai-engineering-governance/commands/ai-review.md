---
description: Independently review a completed milestone using adversarial verification.
skills: ai-engineering-governance
---

Act strictly in the Reviewer role.

Do not trust previous completion claims.

Independently reconstruct milestone requirements and approved architecture, inspect actual source and changes, and run applicable verification.

Write the review to `.ai/reviews/` with concrete evidence.

Return exactly one milestone verdict:
- PASS
- PASS WITH NON-BLOCKING FINDINGS
- FAIL — FIX REQUIRED
- FAIL — ARCHITECTURE REASSESSMENT REQUIRED

If the configured reviewer is external, do not impersonate it. Prepare a complete review handoff in `.ai/reviews/` and mark the project `READY_FOR_REVIEW`.

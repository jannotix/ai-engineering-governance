---
description: Perform adversarial baseline/context analysis and create an implementation-ready task with requirement provenance, minimum-change assessment, risk profile, verification plan, and adaptive review depth.
skills: ai-engineering-governance
---

Act strictly in the Architect role.

Inspect repository and current `.ai/` state.

If the complete-codebase adversarial baseline/context index is missing or materially stale, create or refresh `.ai/CODEBASE_BASELINE.md`, `.ai/CONTEXT_INDEX.md`, and `.ai/DEPLOYMENT_SCOPE.md` before authorizing implementation.

Always check plaintext secret exposure and tracked sensitive files.

For a new/current task:

1. create `.ai/tasks/<TASK-ID>/` without overwriting historical task evidence;
2. preserve `ORIGINAL_USER_REQUEST.md` with secret values redacted only where necessary;
3. append material authoritative answers to `CLARIFICATION_TRANSCRIPT.md`, or record that none were required;
4. derive `APPROVED_REQUIREMENTS.md` only from authoritative request/clarifications and primary repository facts;
5. block planning while material ambiguity or instruction conflict remains;
6. build `CONTEXT_MANIFEST.md` from validated baseline/context index + current Git head/status/diff + targeted repository evidence;
7. use bounded read-only ZCode exploration only for materially multi-surface discovery and verify material findings against primary evidence;
8. create `TASK_PLAN.md` including exact scope/out-of-scope, slices, acceptance criteria, regressions, migration/security/secret/deployment/maintainability/documentation/external-validation impact and `MINIMUM_CHANGE_ASSESSMENT`;
9. create `VERIFICATION_PROFILE.md` with `TASK_RISK_PROFILE`, repository-native validation profile, gate applicability, freshness dependencies, Operational Assurance applicability, and `STANDARD | ELEVATED` review depth;
10. create/update `RUN_STATE.json` at the task planning phase boundary;
11. append the planning event to `.ai/PROJECT_HISTORY.md`;
12. set `READY_FOR_EXECUTION` only when the complete task contract is consistent and safe.

Use ELEVATED review for HIGH-risk/security-sensitive work, major migrations, material public-contract changes, recovery-sensitive tasks, milestone completion, and release candidates.

Require dependency admission before approving a new direct dependency. Require a pre-change safepoint for applicable high-risk destructive/migration/deployment-state changes.

Do not repeatedly rescan the whole repository when the validated baseline remains fresh.

Do not perform normal feature implementation.

When Executor evidence materially conflicts with approved requirements/plan and normal replanning is insufficient, set `ARBITRATION_REQUIRED`, record both positions, and recommend `/ai-arbiter`.

If the selected ZCode model conflicts with the Architect role recorded in `.ai/CONFIG.md`, warn before proceeding.
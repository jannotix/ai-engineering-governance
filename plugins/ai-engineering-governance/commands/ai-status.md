---
description: Show governed project/task status, requirement/context integrity, risk and verification state, review depth, Git target, blockers, and exact next action.
skills: ai-engineering-governance
---

Read `.ai/`, current task artifacts, and current Git state.

Report concisely:

- project state;
- current milestone/task/slice;
- configured next role;
- current local HEAD and dirty-worktree state;
- last verified/validated commit if recorded;
- latest `PROJECT_HISTORY.md` event;
- baseline/context freshness;
- task requirement-provenance integrity: COMPLETE | INCOMPLETE | CONFLICTED;
- `CONTEXT_MANIFEST.md` target/freshness;
- task-plan authorization state;
- `TASK_RISK_PROFILE` high-risk dimensions;
- review depth: STANDARD | ELEVATED | NONE;
- verification evidence summary: PASS/FAIL/UNAVAILABLE/STALE/BLOCKED counts for applicable gates;
- required evidence still outstanding;
- Operational Assurance gates still outstanding;
- review/final-adjudication status;
- arbitration status;
- active blockers and required authoritative input/access;
- deployment-scope status;
- plaintext-secret finding status;
- local task-commit status;
- push policy: explicit action-scoped authorization required;
- exact next governed action.

Do not estimate missing evidence, token usage, or costs. Do not modify production code and do not push.
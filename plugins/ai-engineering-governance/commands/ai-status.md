---
description: Show governed project status, latest history event, Git state, blockers, verification state, and next action.
skills: ai-engineering-governance
---

Read `.ai/` and current Git state.

Report:

- state;
- current milestone;
- current task;
- current slice;
- configured next role;
- last verified commit if recorded;
- current local HEAD;
- latest `PROJECT_HISTORY.md` event;
- active blockers;
- arbitration status;
- pending external validation;
- pending review;
- deployment-scope status;
- plaintext-secret finding status;
- whether the last validated task has a local commit;
- push policy: explicit authorization required;
- exact next governed action.

Do not modify production code and do not push.

---
description: Initialize or non-destructively upgrade AI Engineering Governance, including deterministic runtime capability checks, baseline, product/task state, evidence and deployment boundaries.
skills: ai-engineering-governance
---

Initialize governance for the current workspace without overwriting project history, decisions or completed task evidence.

1. Inspect the repository and existing `.ai/` state.
2. Require Node.js 22.13.0+ for deterministic runtime gates and unflagged `node:sqlite`. Verify the plugin MCP server is available and the ZCode hooks are registered. If unavailable, record `BLOCKED_RUNTIME`; never claim candidate, receipt, memory or exact evidence gates passed.
3. Ensure reusable state exists: `PROJECT_HISTORY.md`, `CODEBASE_BASELINE.md`, `CONTEXT_INDEX.md`, `DEPLOYMENT_SCOPE.md`, `STATUS.md`.
4. Ensure directories exist: `.ai/tasks/`, `.ai/product/` only when product-affecting work requires it, `.ai/arbitration/`, `.ai/release/`, `.ai/runtime/`.
5. Reject symbolic-link or junction traversal in governed `.ai/**` paths.
6. Do not fabricate historical product discovery, approval receipt, evidence reuse, safepoint, review or governed memory.
7. Determine GREENFIELD versus EXISTING_INSTALLATION and request only missing material installation/migration evidence.
8. Record role bindings and runtime policy in `.ai/CONFIG.md` without model/provider hardcoding or credentials.
9. Set `BASELINING` until the adversarial baseline is independently validated.
10. Append the initialization/upgrade event and emit `GOVERNANCE_RESULT` with actionable continuation to `/ai-architect`.

Automatic push, PR creation, merge, publication and deployment remain blocked.

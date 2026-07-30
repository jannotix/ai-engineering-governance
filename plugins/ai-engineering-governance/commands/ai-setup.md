---
description: Configure project role bindings, review/arbitration modes and deterministic runtime policy without changing providers or credentials.
skills: ai-engineering-governance
---

Read `.ai/CONFIG.md` and ask only for unresolved durable settings:

- Architect, Executor and Reviewer role assignments;
- Architecture/Security and Final Reviewer assignment or external ELEVATED mode;
- optional Arbiter assignment or external arbitration mode;
- greenfield or existing installation;
- whether governed memory is enabled;
- whether the project will use the optional staged approval-receipt commit gate.

Write only non-secret configuration. Record fixed policies:

- canonical requirement provenance and conditional product state;
- deterministic **candidate projection** and **approval receipt** required where applicable;
- **actionable continuation** for every non-terminal RUN_STATE;
- context budget and skill selection before implementation;
- exact **evidence reuse** and risk-derived **review lens** matrix;
- governed memory is advisory and Final-Reviewer-controlled;
- one scoped local commit only after review PASS and valid staged receipt;
- automatic push, PR creation/merge, publication and deployment are blocked;
- plaintext secrets are denied in Git by default.

Verify Node.js 22+, plugin hook registration and MCP availability. Record `BLOCKED_RUNTIME` when unavailable; do not weaken the contract.

Do not change provider credentials or invent model IDs. Append configuration changes to project history without secret values and emit `GOVERNANCE_RESULT`.

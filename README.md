# AI Engineering Governance

AI Engineering Governance is a model- and provider-agnostic ZCode plugin for controlled product discovery, software delivery, independent review and production readiness.

Version **2.0.0 — Deterministic Runtime Governance** combines prompt-level engineering governance with local content hashing, typed state, native ZCode hooks and a zero-dependency MCP runtime.

> Community project. Not affiliated with or maintained by the ZCode team.

## Why it exists

A capable coding model can still misunderstand requirements, plan from stale context, broaden scope, report unexecuted validation, review a different candidate from the one later committed, reuse stale evidence or stop at an intermediate phase while claiming completion.

The plugin separates authority, persists canonical state, freezes exact candidates, requires evidence and fails closed when required proof is missing, stale or inconsistent.

## Requirements

- ZCode with plugin, Hook and MCP support;
- Git for staged, commit and base-diff candidate projections;
- **Node.js 22.13.0 or newer** on `PATH`.

Node 22.13.0 is required because governed memory uses `node:sqlite` without an experimental command-line flag. The runtime uses only Node.js built-ins and installs no package, provider SDK, daemon or external service.

When a required runtime capability is unavailable, proof is `UNAVAILABLE` or `BLOCKED`; the model may not claim that a deterministic gate passed.

## Installation

1. Open a workspace in ZCode.
2. Open **Settings → Plugins → Marketplace**.
3. Add `https://github.com/jannotix/ai-engineering-governance`.
4. Install **AI Engineering Governance**.
5. Start a new Agent session after plugin reload when required.
6. Run:

```text
/ai-init
/ai-setup
```

ZCode model selection remains controlled by the user. The repository contains no provider IDs, model IDs, credentials, subscriptions or personal routing preferences.

## Roles

| Role | Responsibility |
|---|---|
| Architect | Baseline, discovery, constructive challenge, product definition, context routing, planning and execution authorization. |
| Executor | Implements only the approved packet and records exact evidence. |
| Reviewer | Independently reviews discovery, implementation, regression, runtime and maintainability. |
| Architecture/Security Reviewer | Independently reviews architecture, security, data, dependencies, migrations, deployment and recovery. |
| Final Reviewer | Adjudicates required discovery, ELEVATED review, product completeness, governed memory and release readiness. |
| Arbiter | Resolves material Architect/Executor disagreement before validation. |

Only Executor normally writes production source. Reviewer siblings inspect the same frozen candidate independently before Final Reviewer receives both reports.

## Commands

The public command surface remains nine commands:

| Command | Purpose |
|---|---|
| `/ai-init` | Initialize or non-destructively upgrade governance and runtime state. |
| `/ai-setup` | Configure roles, review, arbitration, memory and receipt policy. |
| `/ai-start` | Continue from persisted typed state rather than chat memory. |
| `/ai-status` | Report product, context, candidate, receipt, evidence, review and next action. |
| `/ai-architect` | Run baseline, adaptive discovery, context routing and planning. |
| `/ai-execute` | Implement approved work, verify it and freeze the review candidate. |
| `/ai-review` | Run discovery, task, completeness or release review. |
| `/ai-arbiter` | Resolve material planning/implementation disagreement. |
| `/ai-release` | Assess product completeness and final production readiness. |

No redundant `/ai-plan`, `/ai-discover`, `/ai-resume`, `/ai-workflow`, `/ai-metrics`, `/ai-audit` or `/ai-docs` commands are added.

## Product governance

Every request receives:

```text
WORK_CLASS:
PATCH | BOUNDED_FEATURE | MAJOR_FEATURE
EXISTING_PRODUCT_EVOLUTION | NEW_PRODUCT | HIGH_RISK_CHANGE

DISCOVERY_DEPTH:
LIGHT | STANDARD | DEEP
```

Discovery is never skipped. Constructive challenge separates:

```text
USER_OBJECTIVE
USER_PROPOSED_SOLUTION
GOVERNANCE_RECOMMENDATION
FINAL_USER_DECISION
```

Only conventional, reversible, low-risk, scope-neutral technical defaults may proceed without approval.

Product-affecting work may use:

```text
.ai/product/
├── PRODUCT_VISION.md
├── USER_AND_ROLE_MODEL.md
├── DOMAIN_AND_PROCESS_MODEL.md
├── PRODUCT_COMPLETENESS_MATRIX.md
├── PRODUCT_BLUEPRINT.md
└── PRODUCT_DECISIONS.md
```

These files are not created as boilerplate for a proven technical-only patch. Capabilities remain `REQUIRED | OPTIONAL | NOT_APPLICABLE | DEFERRED`.

Product completeness and release readiness are separate:

```text
PRODUCT_COMPLETE | PRODUCT_DEFECT | PRODUCT_BLOCKED
READY_FOR_PRODUCTION | NOT_READY_FOR_PRODUCTION
```

## Deterministic candidate authority

`GOVERNANCE_CANDIDATE_V1` supports:

```text
workspace | staged | commit | base-diff
```

- `workspace` hashes project entries outside root `.git/**` and `.ai/**`, including bytes, modes and symlink targets;
- `staged` binds exact Git index modes, blob IDs and tree;
- `commit` binds a resolved commit and complete tree;
- `base-diff` binds candidate, base, immutable merge base and raw diff identity.

Governed file paths are constrained to the project and reject symbolic-link or junction traversal. Candidate symlinks are hashed as links rather than followed.

A Git status summary is not candidate identity. Any candidate change invalidates previous approval.

## Approval receipts and commit gate

After required review PASS, Final Reviewer creates:

```text
.ai/tasks/<TASK-ID>/approval-receipt.json
```

`GOVERNANCE_APPROVAL_RECEIPT_V1` binds the candidate, approved requirements, execution packet, verification profile, evidence, both independent reviews and Final Reviewer adjudication.

A changed candidate or bound artifact returns `APPROVAL_RECEIPT_MISMATCH`. A receipt never renews itself.

A valid `staged` receipt may arm `.ai/runtime/pre-commit.json`. The ZCode `PreToolUse` hook rederives the Git index before `git commit` without a model call. Direct and patch-based receipt mutation is blocked.

The plugin does not install a project Git hook automatically. The runtime gate protects commits invoked through ZCode; owner actions outside ZCode remain the owner's responsibility.

## Actionable continuation

Every non-terminal `RUN_STATE.json` contains one typed action:

```json
{
  "kind": "execute",
  "command": "/ai-review",
  "arguments": ["TASK-001"],
  "expected_postcondition": "TASK_VALIDATED"
}
```

or a concrete human decision with explicit choices. Narrative `continue`, `retry` or `finish` is not executable authority.

`/ai-start` reconciles persisted state, Git, candidate, context, evidence, receipt and review before routing the exact next command.

## Context Intelligence and skills

Each task may persist:

```text
CONTEXT_BUDGET.json
CONTEXT_RETRIEVAL.jsonl
CONTEXT_METRICS.jsonl
SKILL_SELECTION.json
```

Retrieval is bounded:

```text
DISPATCH → EVALUATE → REFINE
        → CONTEXT_SUFFICIENT | BLOCKED_CONTEXT_GAP
```

Cycle three must terminate. A budget limits waste but never authorizes omission of required security, migration, recovery, contract or operational evidence.

Skill selection checks trust, work class, technologies, required tools, conflicts, overlap and estimated context tokens. Skills never authorize source writes, dependency installation, security weakening, requirement changes or external actions.

## Evidence and review

Risk dimensions use `NONE | LOW | HIGH`. Gate applicability uses `REQUIRED | CONDITIONAL | NOT_APPLICABLE`. Executed evidence uses:

```text
PASS | FAIL | UNAVAILABLE | STALE | BLOCKED
```

Prior evidence is reusable only when it was PASS and the complete dependency map is byte-identical, including candidate, contracts/call paths, validation command, environment/toolchain, policy and selected skill hashes. Any changed dependency returns `EVIDENCE_STALE`.

`REVIEW_LENS_MATRIX_V1` always preserves:

- Implementation: correctness, regression, test quality and maintainability;
- Architecture/Security: architecture, security boundaries, data safety and recovery.

Risk adds authorization, input validation, public-contract, migration, dependency, performance, accessibility, deployment, observability, resilience, recovery and tool-capability lenses. Focus changes; reviewer authority does not.

## Governed engineering memory

Local SQLite memory uses:

```text
CANDIDATE | ACTIVE | SUPERSEDED | REJECTED
```

Executor and reviewers may propose a lesson. Only Final Reviewer may activate, reject or supersede it. Memory is advisory and never outranks current requirements, source, tests, contracts or runtime evidence.

Policy promotion is never automatic. Eligibility requires at least two distinct validated task occurrences and explicit owner authorization.

## Native ZCode runtime

The plugin registers verified ZCode events:

```text
SessionStart
PreToolUse
PostToolUse
```

- `SessionStart` reports runtime, typed continuation and receipt state;
- `PreToolUse` blocks invalid commits, direct or patch-based receipt mutation, frozen-target writes and automatic external actions;
- `PostToolUse` warns when mutations may stale candidate, context, evidence or receipt dependencies.

Mutating hook failures are fail-closed. The plugin does not depend on an undocumented Stop hook.

The local stdio MCP server exposes deterministic tools for candidate freeze/verify, receipts, run-state validation, context cycles, skill selection, evidence reuse, review lenses and governed memory.

## Git and external actions

One scoped local commit follows task validation and a current staged receipt.

The plugin blocks automatic push, PR creation/merge, publication, deployment and production rollback. Those actions require explicit owner authorization and manual execution after reviewing the exact target. Prior authorization is not reusable.

Plaintext credentials, tokens, keys, passwords, private certificates, production `.env` files and equivalent secrets are excluded from Git by default. A tracked secret must be removed from tracking and assessed for revocation or rotation.

## Production scope

`.ai/DEPLOYMENT_SCOPE.md` defines the deployable boundary. Production packages exclude `.ai/`, tests, development-only documentation, evidence/review artifacts, local tooling, caches, IDE state and plaintext secrets unless an explicit runtime or legal exception applies.

## Verification

CI runs on Linux and Windows and validates:

- marketplace, plugin, Hook, MCP and package JSON;
- syntax of every runtime and test module;
- Python repository contracts;
- Node candidate, receipt, context, evidence, review, path-safety and memory tests;
- subprocess simulation of MCP stdio and ZCode Hook input/output;
- stale documentation and temporary/debug residue;
- obvious plaintext-secret patterns.

Run locally:

```bash
python -m unittest discover -s tests -v
npm run check:runtime
npm run test:runtime
```

## License

Functional Source License 1.1 with MIT Future License (`FSL-1.1-MIT`). Each released version becomes available under the MIT License on the second anniversary of its release date.

Copyright 2026 Gianluca Iannotta.

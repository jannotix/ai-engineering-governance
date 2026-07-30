# AI Engineering Governance

AI Engineering Governance is a model- and provider-agnostic ZCode plugin for controlled product discovery, software delivery, independent review and production readiness.

Version **2.0.0 — Deterministic Runtime Governance** combines prompt-level engineering governance with local content hashing, typed state, ZCode hooks and a zero-dependency MCP runtime.

> Community project. Not affiliated with or maintained by the ZCode team.

## Why it exists

A capable coding model can still:

- implement a misunderstood or incomplete requirement;
- plan from stale or unnecessarily broad context;
- expand scope or add avoidable dependencies;
- report tests or integrations that were not actually executed;
- review a different candidate from the one later committed;
- reuse stale evidence after source, toolchain or policy changes;
- treat one model lesson as permanent project policy;
- stop at an intermediate phase while calling the workflow complete.

The plugin separates authority, persists canonical project state, freezes exact candidates, requires evidence and fails closed when required proof is missing or stale.

## Runtime requirement

The 2.0.0 deterministic runtime requires:

- ZCode with plugin, Hook and MCP support;
- Git for staged, commit and base-diff candidate projections;
- **Node.js 22 or newer** available on `PATH`.

The runtime uses only Node.js built-ins. It installs no package, daemon, provider SDK or external service. Local governed memory uses `node:sqlite` and remains outside the project repository.

When Node.js or a required runtime capability is unavailable, deterministic proof is `UNAVAILABLE` or `BLOCKED`; the model may not claim that the gate passed.

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

ZCode model selection remains controlled by the user. The repository contains no provider IDs, model IDs, credentials, subscription details or personal routing preferences.

## Roles

| Role | Responsibility |
|---|---|
| Architect | Baseline, adaptive discovery, constructive challenge, product definition, context routing, task planning and execution authorization. |
| Executor | Implements only the approved packet and records exact evidence. |
| Reviewer | Independently reviews discovery, implementation, regression, runtime and maintainability evidence. |
| Architecture/Security Reviewer | Independently reviews architecture, security, data, dependency, migration, deployment and recovery risk. |
| Final Reviewer | Adjudicates required discovery, ELEVATED review, product completeness, governed memory and release readiness. |
| Arbiter | Resolves material Architect/Executor disagreement before validation. |

Only Executor normally writes production source. Reviewer siblings remain independent and inspect the same frozen candidate before Final Reviewer sees both reports.

## Commands

The public command surface remains intentionally small:

| Command | Purpose |
|---|---|
| `/ai-init` | Initialize or non-destructively upgrade governance state and runtime capability status. |
| `/ai-setup` | Configure role, review, arbitration, memory and staged-receipt policies. |
| `/ai-start` | Continue from persisted typed state rather than chat memory. |
| `/ai-status` | Report product, context, candidate, receipt, evidence, review and next-action state. |
| `/ai-architect` | Run baseline, adaptive discovery, context routing and implementation-ready planning. |
| `/ai-execute` | Implement approved work, run verification and freeze the review candidate. |
| `/ai-review` | Run discovery, STANDARD/ELEVATED task, product-completeness or release review. |
| `/ai-arbiter` | Resolve a material planning/implementation disagreement. |
| `/ai-release` | Assess product completeness and final production readiness. |

There are no redundant `/ai-plan`, `/ai-discover`, `/ai-resume`, `/ai-workflow`, `/ai-metrics`, `/ai-audit` or `/ai-docs` commands.

## Adaptive product governance

Every request receives:

```text
WORK_CLASS:
PATCH | BOUNDED_FEATURE | MAJOR_FEATURE
EXISTING_PRODUCT_EVOLUTION | NEW_PRODUCT | HIGH_RISK_CHANGE

DISCOVERY_DEPTH:
LIGHT | STANDARD | DEEP
```

Discovery is never skipped. A well-defined patch may use concise `LIGHT` discovery; new products, high-risk changes and materially vague or product-wide work use `DEEP` discovery.

Constructive challenge separates:

```text
USER_OBJECTIVE
USER_PROPOSED_SOLUTION
GOVERNANCE_RECOMMENDATION
FINAL_USER_DECISION
```

The Architect explains materially better alternatives rather than agreeing automatically. Only conventional, reversible, low-risk, scope-neutral technical defaults may proceed without approval.

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

These files are not created as boilerplate for a proven purely technical patch.

Capability states are:

```text
REQUIRED | OPTIONAL | NOT_APPLICABLE | DEFERRED
```

Product completeness is separate from release readiness:

```text
PRODUCT_COMPLETE | PRODUCT_DEFECT | PRODUCT_BLOCKED
READY_FOR_PRODUCTION | NOT_READY_FOR_PRODUCTION
```

A validated task or milestone does not prove that the complete product exists.

## Deterministic candidate authority

`GOVERNANCE_CANDIDATE_V1` supports four projections:

```text
workspace | staged | commit | base-diff
```

- `workspace` hashes project entries outside root `.git/**` and `.ai/**`, including bytes, modes and symlink targets.
- `staged` binds the exact Git index modes, blob IDs and tree.
- `commit` binds a resolved commit and complete tree.
- `base-diff` binds candidate, base, immutable merge base and raw diff identity.

Changing projection or live content invalidates prior approval. A Git status summary is not candidate identity.

## Approval receipts and commit gate

After required review PASS, Final Reviewer creates:

```text
.ai/tasks/<TASK-ID>/approval-receipt.json
```

`GOVERNANCE_APPROVAL_RECEIPT_V1` binds:

- candidate identity;
- approved requirements;
- execution packet;
- verification profile;
- evidence manifest;
- Implementation Reviewer report;
- Architecture/Security Reviewer report;
- Final Reviewer adjudication;
- authoritative model-family metadata when available.

Any changed candidate or artifact returns `APPROVAL_RECEIPT_MISMATCH`. A receipt never silently renews itself.

For a local commit, a valid `staged` receipt arms `.ai/runtime/pre-commit.json`. The ZCode `PreToolUse` hook rederives the Git index before `git commit` without a model call. Direct receipt or pointer editing is blocked.

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

or a concrete human decision with explicit choices.

Narrative values such as `continue`, `retry` or `finish` are not executable authority. `/ai-start` reconciles persisted state, Git, candidate, context, evidence, receipt and review before routing the exact next command.

## Context Intelligence

Each governed task may persist:

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

Cycle three must terminate. Context budget limits waste but never authorizes omission of required security, migration, recovery, public-contract or operational evidence.

Skill selection checks:

- source and trust class;
- work-class and technology applicability;
- required tools and external dependencies;
- conflicts and overlapping capabilities;
- estimated context-token budget;
- selected sections when declared.

A skill never authorizes source writes, dependency installation, security weakening, requirement changes or external actions.

## Evidence-Driven Verification

Risk dimensions use:

```text
NONE | LOW | HIGH
```

Gate applicability uses:

```text
REQUIRED | CONDITIONAL | NOT_APPLICABLE
```

Executed evidence uses:

```text
PASS | FAIL | UNAVAILABLE | STALE | BLOCKED
```

`UNAVAILABLE` and `STALE` never become PASS by assertion.

Prior evidence is reusable only when its previous result was PASS and the complete dependency map is byte-identical, including candidate, affected contracts/call paths, validation command, environment/toolchain, policy hashes and selected skill hashes. Any changed dependency returns `EVIDENCE_STALE`.

Operational Assurance covers preview/runtime targets, critical user flows, objective visual behavior, tool/MCP boundaries, recovery and safe experimentation when applicable.

## Risk-derived review lenses

Both ELEVATED reviewers remain mandatory. `REVIEW_LENS_MATRIX_V1` changes focus, not authority.

Implementation baseline:

```text
CORRECTNESS | REGRESSION | TEST_QUALITY | MAINTAINABILITY
```

Architecture/Security baseline:

```text
ARCHITECTURE | SECURITY_BOUNDARIES | DATA_SAFETY | RECOVERY
```

Risk adds lenses such as authorization, input validation, public contracts, migrations, dependency supply chain, performance, accessibility, deployment, observability, resilience and tool capability.

## Governed engineering memory

Local memory uses:

```text
CANDIDATE | ACTIVE | SUPERSEDED | REJECTED
```

Executor and reviewers may propose a lesson. Only Final Reviewer may activate, reject or supersede it after checking scope, candidate, evidence and staleness.

Memory is advisory. Current requirements, source, tests, contracts and runtime evidence remain controlling.

Promotion to project policy is never automatic. Eligibility requires at least two distinct validated task occurrences and explicit owner authorization.

## Native ZCode runtime components

The plugin registers:

```text
SessionStart
PreToolUse
PostToolUse
```

- `SessionStart` reports runtime, typed continuation and receipt state.
- `PreToolUse` blocks invalid commits, direct receipt mutation, writes to a frozen reviewed target and automatic external actions.
- `PostToolUse` warns when a mutation may stale candidate, context, evidence or receipt dependencies.

The local stdio MCP server exposes deterministic tools for candidate freeze/verify, receipts, run-state validation, context cycles, skill selection, evidence reuse, review lenses and governed memory.

The plugin intentionally does not depend on an undocumented Stop hook. Completion is controlled through persisted RUN_STATE, exact postconditions, `/ai-start` and ZCode Goal Mode.

## Git and external-action policy

One scoped local commit follows task validation and a current staged receipt.

The plugin blocks automatic:

```text
git push
PR creation or merge
publication
deployment
production rollback
```

These actions require explicit owner authorization and must be performed manually after reviewing the exact target. Prior authorization is not reusable.

Plaintext credentials, tokens, keys, passwords, private certificates, production `.env` files and equivalent secrets are excluded from Git by default. If a tracked secret was exposed, ignore rules alone are insufficient: remove it from tracking and assess revocation or rotation.

## Production scope

`.ai/DEPLOYMENT_SCOPE.md` defines the deployable boundary. Production packages contain only runtime-required files and exclude `.ai/`, tests, development-only documentation, review/evidence artifacts, local tooling, caches, IDE state and plaintext secrets unless an explicit runtime or legal exception applies.

## Verification

The repository CI validates:

- marketplace, plugin, Hook, MCP and package JSON;
- syntax of every runtime and test module;
- Python repository contracts;
- Node candidate, receipt, context, evidence, review and memory unit tests;
- real subprocess simulation of MCP stdio and ZCode Hook input/output;
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

---
name: ai-engineering-governance
description: Use when planning, implementing, reviewing, migrating, testing, packaging, or releasing software that should remain verifiable, minimally designed, locally testable, auditable, maintainable, and production-gated.
license: FSL-1.1-MIT
metadata:
  author: Gianluca Iannotta
  version: 1.0.3
---

# AI Engineering Governance

Use explicit role boundaries, project-local state, executable evidence, and conservative Git behavior.

## Authority

- **Architect:** owns codebase baseline, requirements, architecture, task plans, dependencies, migrations, test strategy, deployment scope, and technical decisions.
- **Executor:** implements only Architect-approved work and verifies it.
- **Reviewer:** independently challenges milestone and release completion claims.
- **Arbiter:** resolves material Architect/Executor disagreement when normal replanning cannot safely settle it.

Do not silently cross role boundaries.

## Initial adversarial codebase baseline

Before the first implementation in a repository, the Architect must perform an adversarial reverse-engineering analysis of the complete codebase and create `.ai/CODEBASE_BASELINE.md`.

The baseline must cover, as applicable:

- repository and installed-system state;
- architecture and module boundaries;
- entry points and data flows;
- trust boundaries and security-sensitive paths;
- dependencies and supported runtime versions;
- persistence, schema, and migrations;
- external integrations;
- tests and observable coverage gaps;
- deployment boundary;
- plaintext secret exposure and tracked sensitive files;
- defects, regression risks, and architecture constraints relevant to future work.

Generated outputs, dependency vendor trees, build caches, and other non-source artifacts may be classified rather than exhaustively read, but all authored source and configuration that can affect behavior must be accounted for.

Refresh the baseline when major repository, architecture, dependency, framework, merge, import, or deployment changes make it stale.

## Task planning gate

Large work is decomposed:

Project → Milestone → Task → Slice

The Architect may maintain a roadmap in advance, but before every task is handed to the Executor it must:

1. inspect current repository state and changes since the previous validated task;
2. reconcile the task with the current baseline and requirements;
3. perform adversarial impact analysis;
4. define exact scope and out-of-scope boundaries;
5. define slices and acceptance criteria;
6. identify regression surface and required tests;
7. identify migration, external-integration, security, secret, and deployment impact;
8. set the task state to `READY_FOR_EXECUTION`.

The Executor must never implement an unplanned task.

## Arbitration

When implementation evidence materially conflicts with the approved plan, the Architect must first determine whether normal replanning is sufficient.

Use `ARBITRATION_REQUIRED` when there is an unresolved material disagreement about feasibility, correctness, security, scope, architecture, migration safety, or acceptance evidence and neither side should unilaterally decide.

The Architect records the disagreement and recommends invoking the configured Arbiter. The canonical command is `/ai-arbiter`; `/ai-arbitrate` remains a compatibility alias.

The Arbiter must independently inspect the plan, implementation evidence, repository state, and relevant requirements. Arbitration is recorded under `.ai/arbitration/`.

No disputed implementation proceeds until arbitration is resolved or the Architect issues a revised approved plan.

## Project history

`.ai/PROJECT_HISTORY.md` is an append-only engineering audit trail.

Record material events including:

- initial baseline creation or refresh;
- Architect task planning and approval;
- role handoffs;
- implementation start and completion;
- verification results;
- architecture blockers;
- arbitration requests and resolutions;
- milestone reviews;
- release gates;
- local task commits.

Each event records timestamp, role, configured model or external role label, milestone/task/slice where applicable, action, result, evidence references, and next state.

Do not rewrite or delete prior history entries to make the project appear cleaner.

## Engineering rules

- Start meaningful work from a written specification.
- Preserve existing project conventions unless an approved decision changes them.
- Prefer the least complex architecture that safely satisfies current requirements.
- Use DDD only where domain complexity earns it.
- Reuse existing libraries before introducing new dependencies.
- Never add deprecated or end-of-life technology.
- Verify current stable supported technology before introducing it.
- Write the smallest clear implementation that satisfies acceptance criteria.
- Avoid speculative abstractions and future-proofing without a current requirement.
- Keep comments minimal, in English, and limited to non-obvious intent.
- Never add narrative comments about phases, agents, or implementation history.

## Maintainable source structure

Production source must remain understandable and maintainable over time.

- Prefer focused files and modules with one clear responsibility or one tightly cohesive concern.
- Do not create or extend monolithic god files that accumulate unrelated responsibilities, orchestration, persistence, validation, transport, and domain logic without a justified boundary.
- When an approved change would make an existing file materially harder to understand, test, review, or change in isolation, the Architect must include a targeted split or extraction in the task plan.
- Split by responsibility and stable domain or technical boundaries, not by arbitrary line-count targets.
- Do not create artificial micro-files, wrapper-only abstractions, one-use interfaces, or fragmentation that increases navigation and indirection without improving cohesion or testability.
- Prefer small cohesive functions, classes, components, modules, and files whose purpose can be understood without reading unrelated implementation details.
- Keep public interfaces narrow and explicit. Internal implementation may change without forcing unrelated consumers to change.
- Preserve existing repository conventions where they are maintainable; do not perform unrelated repository-wide refactors merely to satisfy a stylistic preference.
- New files and touched files are subject to this policy. Legacy oversized files outside task scope should be recorded as follow-up risk unless they materially block safe implementation.
- The Reviewer must treat unjustified monolithic growth or needless fragmentation as a maintainability finding and make it blocking when it creates material correctness, testing, security, or change-risk concerns.

## Secret safety

Secrets are excluded from Git by default.

Treat credentials, access tokens, API keys, passwords, private certificates, signing material, private connection strings, production `.env` files, and equivalent sensitive values as secrets.

- Never stage or commit plaintext secrets unless the user explicitly authorizes that exact exception after the risk is stated.
- Prefer environment variables, secret managers, encrypted secret stores, or non-secret references.
- Ensure repository-specific secret files are covered by `.gitignore` or equivalent ignore rules.
- A safe example file may be versioned only when it contains placeholders, never live values.
- If a secret is already tracked, ignore rules alone are insufficient. Remove it from tracking and assess whether revocation or rotation is required.
- Architect and Reviewer must always perform plaintext secret checks appropriate to the repository.
- Executor must inspect the staged diff for secret exposure before each task commit.
- A discovered plaintext secret in tracked source or a release package is blocking until safely resolved.

## Git policy

After all slices of a task satisfy acceptance criteria and task verification passes:

1. append the validation event to `PROJECT_HISTORY.md`;
2. inspect `git status` and the task diff;
3. stage only approved task files and relevant `.ai/` state/evidence;
4. inspect the staged diff;
5. perform a plaintext secret check on staged content;
6. create a local commit using the task identifier;
7. verify the commit succeeded.

Do not use blanket staging when unrelated changes may exist. Never use unrelated user changes to make a task commit appear complete.

Create a local commit for each validated task.

Never push by default.

A Git push requires explicit, action-scoped user authorization. Prior authorization for another push is not reusable. Do not create, update, or force remote branches without explicit authorization.

## Development workspace and deployment scope

The repository is a development workspace. The deployable production codebase is a defined subset.

`.ai/DEPLOYMENT_SCOPE.md` is the canonical deployment boundary.

For new projects, keep tests, documentation, governance state, review artifacts, development scripts, and other dev-only material outside the production runtime scope from the start.

For existing projects, do not blindly relocate files. Determine what the stack actually requires, document the current production scope, and plan safe separation where necessary.

Final production packages must include only runtime-required files and assets. They must exclude `.ai/`, tests, development-only documentation, local tooling, review/evidence files, caches, IDE state, and secrets unless a specific runtime requirement explicitly justifies an item and the Architect has documented it.

## Verification

Everything reasonably reproducible locally must be tested locally.

Use project-appropriate local infrastructure, including containers when useful for databases, caches, queues, object storage, search, mail, or other services.

Mocks can support tests but do not prove a real external integration works.

When meaningful validation requires an external sandbox, test account, credential, licensed host product, or remote environment:

1. identify the minimum required access;
2. request it explicitly;
3. test the actual integration;
4. record what was executed;
5. keep production readiness blocked while mandatory validation remains unexecuted.

Never persist supplied secret values in `.ai/`, documentation, logs, commits, or evidence.

## Installation and migrations

At intake, determine whether the target is:

- a new installation; or
- an existing installed system.

For existing systems, inspect the current version and state before designing migrations.

Final delivery always requires a verified clean installation from zero.

Existing-system work additionally requires a verified upgrade path and data-preservation checks.

## Completion

No completion claim without fresh evidence.

A final release requires:

- required tests;
- applicable build/static/security checks;
- plaintext secret scanning;
- deployment-scope verification;
- clean installation;
- upgrade verification when applicable;
- required external validation;
- final-package extraction and reinstall verification;
- independent adversarial release review.

Final production status is exactly:

- READY_FOR_PRODUCTION
- NOT_READY_FOR_PRODUCTION

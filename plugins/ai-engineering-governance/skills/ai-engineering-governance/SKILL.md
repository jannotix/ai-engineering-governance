---
name: ai-engineering-governance
description: Use when planning, implementing, reviewing, migrating, testing, packaging, or releasing software that should remain verifiable, minimally designed, locally testable, auditable, maintainable, evidence-driven, and production-gated.
license: FSL-1.1-MIT
metadata:
  author: Gianluca Iannotta
  version: 1.1.0
---

# AI Engineering Governance

Use explicit role boundaries, task-local provenance/evidence, executable verification, and conservative Git behavior.

Detailed contracts:

- `references/requirement-provenance.md`
- `references/context-routing.md`
- `references/verification.md`
- `references/operational-assurance.md`
- `references/project-state.md`
- `references/templates.md`

## Authority

- **Architect:** owns baseline/context routing, requirement normalization, architecture, task plans, risk/evidence planning, dependencies, migrations, test strategy, deployment scope, and technical decisions.
- **Executor:** is the only normal production-source writer; implements Architect-approved work and records execution evidence.
- **Reviewer:** independently challenges implementation/runtime/regression evidence for every completed governed task and release surface in scope.
- **Architecture/Security Reviewer:** independently challenges architecture/security/data/dependency/deployment/recovery evidence only when review depth is `ELEVATED`.
- **Final Reviewer:** adjudicates `ELEVATED` task/milestone/release review after both independent advisory reviews complete.
- **Arbiter:** resolves material Architect/Executor disagreement before validation when normal replanning cannot safely settle it.

Do not silently cross role boundaries.

## Initial adversarial baseline

Before first implementation, Architect performs adversarial reverse engineering of the complete authored codebase and creates/refreshes:

```text
.ai/CODEBASE_BASELINE.md
.ai/CONTEXT_INDEX.md
.ai/DEPLOYMENT_SCOPE.md
```

Account for source/configuration, architecture/modules, entry points, data flows, trust boundaries, dependencies, persistence/migrations, external integrations, tests, deployment, maintainability, plaintext secrets/tracked sensitive files, known defects, and material risks.

Generated/vendor/cache trees may be classified rather than exhaustively read, but authored behavior-affecting source/configuration must be accounted for.

Refresh the full baseline only when repository/architecture/framework/dependency/import/merge/deployment changes make it materially stale. Routine tasks use the validated baseline/context index plus current Git delta and targeted discovery.

## Requirement provenance

Every task stores under `.ai/tasks/<TASK-ID>/`:

```text
ORIGINAL_USER_REQUEST.md
CLARIFICATION_TRANSCRIPT.md
APPROVED_REQUIREMENTS.md
```

The task plan is downstream from these files and cannot override them.

Block `READY_FOR_EXECUTION` while controlling requirements are materially ambiguous, conflicting, omitted, weakened, or unauthorizedly broadened.

Secret values are redacted before persistence without changing semantic intent.

## Context efficiency

Every task creates `CONTEXT_MANIFEST.md` from:

- validated baseline/context index;
- current Git head/status/diff;
- task requirement provenance;
- targeted primary repository evidence;
- bounded read-only ZCode exploration for materially multi-surface tasks when useful.

Discovery summaries are hypotheses until verified against primary evidence.

Do not repeatedly scan the entire repository merely because a new task starts.

Every implementation-ready plan includes `MINIMUM_CHANGE_ASSESSMENT`: existing/native/stdlib and installed capabilities first, justification for new dependency/abstraction, and why the diff is the smallest correct secure maintainable solution.

## Task planning gate

Large work is decomposed:

```text
Project → Milestone → Task → Slice
```

Before each Executor handoff, Architect must create/update task-local:

```text
APPROVED_REQUIREMENTS.md
CONTEXT_MANIFEST.md
TASK_PLAN.md
VERIFICATION_PROFILE.md
RUN_STATE.json
```

`TASK_PLAN.md` defines exact scope/out-of-scope, slices, acceptance criteria, regression surface, migration/security/secret/deployment/maintainability/documentation impact, external validation, and minimum-change assessment.

`VERIFICATION_PROFILE.md` defines `TASK_RISK_PROFILE`, authoritative validation commands/capabilities, gate applicability, evidence freshness dependencies, and review depth.

Only then may the task become `READY_FOR_EXECUTION`.

## Evidence-Driven Verification

Task risk dimensions are `NONE | LOW | HIGH` for security, migration, public contract, dependency, deployment, performance, generated artifacts, destructive actions, input validation, test reliability, human ownership, user flow, visual behavior, external tooling, recovery, and experimentation.

Gate planning states:

```text
REQUIRED | CONDITIONAL | NOT_APPLICABLE
```

Evidence states:

```text
PASS | FAIL | UNAVAILABLE | STALE | BLOCKED
```

`UNAVAILABLE` or `STALE` is never silently treated as `PASS`.

Use repository-native verification first. Do not invent commands, thresholds, or dependencies merely to satisfy governance.

Applicable core gates include bugfix proof, test-impact mapping, contract compatibility, environment fingerprint, dependency admission/delta, generated-artifact synchronization, pre-change safepoint, and migration proof.

New direct dependencies require an admitted dependency decision before installation.

Required high-risk destructive/migration/deployment-state mutations require a pre-change recoverable safepoint before mutation.

## Operational Assurance

When applicable, plan/record realistic runtime and external-side-effect proof through the same verification profile/evidence surface:

- `PREVIEW_ENVIRONMENT_GATE`
- `USER_FLOW_VERIFICATION`
- `VISUAL_BEHAVIOR_GATE`
- `RELEASE_RECOVERY_PROOF`
- `TOOL_CAPABILITY_PROFILE` including relevant MCP capabilities
- `SAFE_EXPERIMENTATION`

Verification may require more proof but never grants more privilege.

Mocks can support testing but do not replace required real runtime/integration evidence.

Never use production credentials/data/infrastructure merely to satisfy a test gate.

## Adaptive independent review

Executor completion with fresh required evidence moves the task to `READY_FOR_REVIEW`, not directly to final validation.

### STANDARD

Independent `reviewer` verifies canonical requirements, plan authorization, frozen diff/target, required evidence, security/secrets, runtime/regression behavior, maintainability, deployment scope, and applicable Operational Assurance.

Reviewer PASS makes the task `TASK_VALIDATED`.

### ELEVATED

Use for HIGH-risk tasks, security-sensitive work, major migrations, material public-contract changes, recovery-sensitive work, milestone completion, or release candidates:

```text
reviewer
+
reviewer-architecture
        ↓
final-reviewer
```

The two advisory reviewers inspect the same frozen target independently and do not consume sibling current-cycle findings. Final Reviewer receives both only after completion and independently verifies requirement provenance, plan/risk authorization, evidence freshness, and allegations.

Final Reviewer returns exactly:

```text
PASS
IMPLEMENTATION_DEFECT
PLAN_DEFECT
BLOCKED
```

Only `PASS` makes an ELEVATED task `TASK_VALIDATED`.

A correct implementation of a materially incorrect plan is `PLAN_DEFECT`, not PASS.

## Arbitration

If Executor evidence materially conflicts with the approved plan, Executor stops and returns evidence to Architect.

Architect first evaluates normal replanning. If an unresolved material disagreement remains about feasibility, correctness, security, scope, architecture, migration safety, maintainability, or acceptance evidence, set `ARBITRATION_REQUIRED` and recommend `/ai-arbiter`.

Arbiter independently inspects requirements, plan, implementation evidence, repository state, tests, and relevant risk/evidence implications. Neither Architect nor Executor automatically wins.

Executor resumes only after Architect re-authorizes the revised/current task as `READY_FOR_EXECUTION`.

## Maintainable source structure

Production source must remain understandable and maintainable over time.

- Prefer focused files/modules with one clear responsibility or tightly cohesive concern.
- Do not create or extend monolithic god files that accumulate unrelated responsibilities.
- When an approved change materially worsens an oversized/multi-responsibility file, Architect includes a targeted split/extraction in scope.
- Split by responsibility and stable domain/technical boundaries, not arbitrary line-count targets.
- Do not create artificial micro-files, wrapper-only abstractions, one-use interfaces, or needless indirection.
- Prefer narrow explicit interfaces and independently testable units.
- Do not perform unrelated repository-wide refactors solely for style.

## Secret safety

Secrets are excluded from Git by default.

Treat credentials, access tokens, API keys, passwords, private certificates/signing material, private connection strings, production `.env` files, and equivalents as secrets.

- Never stage/commit plaintext secrets without explicit authorization for that exact exception after stating risk.
- Prefer environment variables, secret managers, encrypted stores, or non-secret references.
- Ensure repository-specific local secret files are ignored.
- Safe example files contain placeholders only.
- If a secret is already tracked, ignore rules alone are insufficient: remove from tracking and assess revocation/rotation.
- Architect, Reviewer, Architecture/Security Reviewer, and Final Reviewer check plaintext-secret exposure appropriate to their scope.
- Executor checks staged content before commit.
- Plaintext secret exposure in tracked source or release package is blocking.

## Git policy

A task commit occurs only after `TASK_VALIDATED`.

Before commit:

1. append validation/review result to `PROJECT_HISTORY.md`;
2. reconcile Git status and validated frozen target;
3. stage only approved task files and relevant `.ai/` state/evidence;
4. inspect staged diff;
5. secret-scan staged content;
6. create one local commit identifying the task;
7. verify the commit succeeded.

Do not blanket-stage unrelated changes.

Never push by default. Every push requires explicit action-scoped user authorization; prior authorization is not reusable.

## Development workspace and deployment scope

The repository is a development workspace. The deployable production codebase is a defined subset in `.ai/DEPLOYMENT_SCOPE.md`.

For new projects keep tests, development documentation, `.ai/`, review/evidence artifacts, local tooling, caches, IDE state, and secrets outside production runtime scope.

For existing projects, do not blindly relocate files; determine actual runtime requirements and plan safe separation.

Final production packages include only runtime-required files/assets unless an explicit documented runtime/legal/packaging exception applies.

## Installation, migrations, and release

At intake determine `GREENFIELD` versus `EXISTING_INSTALLATION`.

Existing systems require current installed/schema/runtime/migration-state understanding, representative forward-upgrade/data-preservation proof, and final clean-install proof from zero.

Final release requires fresh applicable evidence including tests/build/static/security checks, secret scanning, deployment scope, migration/upgrade proof, clean install, required external/runtime verification, production-package extraction/reinstall verification, recovery proof when applicable, and independent release review.

Final production status is exactly:

```text
READY_FOR_PRODUCTION
NOT_READY_FOR_PRODUCTION
```
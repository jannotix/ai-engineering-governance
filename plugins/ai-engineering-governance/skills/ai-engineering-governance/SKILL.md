---
name: ai-engineering-governance
description: Use when discovering, planning, implementing, reviewing, migrating, testing, packaging, or releasing software that should remain product-correct, verifiable, minimally designed, locally testable, auditable, maintainable, evidence-driven, and production-gated.
license: FSL-1.1-MIT
metadata:
  author: Gianluca Iannotta
  version: 1.2.0
---

# AI Engineering Governance

Use explicit role boundaries, adaptive product discovery, task-local provenance/evidence, executable verification, and conservative Git behavior.

Detailed contracts:

- `references/product-lifecycle.md`
- `references/requirement-provenance.md`
- `references/context-routing.md`
- `references/verification.md`
- `references/operational-assurance.md`
- `references/project-state.md`
- `references/templates.md`

## Authority

- **Architect:** owns baseline/context routing, adaptive product discovery, requirement normalization, constructive challenge, product definition, architecture, task plans, risk/evidence planning, dependencies, migrations, test strategy, deployment scope, and technical decisions.
- **Executor:** is the only normal production-source writer; implements Architect-approved work and records execution evidence.
- **Reviewer:** independently challenges discovery and implementation/runtime/regression evidence for every completed governed task and release surface in scope.
- **Architecture/Security Reviewer:** independently challenges product, architecture, security, data, dependency, deployment and recovery evidence when discovery review or review depth is elevated.
- **Final Reviewer:** adjudicates required discovery review, ELEVATED task/milestone review, product completeness and release review after independent advisory reviews complete.
- **Arbiter:** resolves material Architect/Executor disagreement before validation when normal replanning cannot safely settle it.

Do not silently cross role boundaries.

## Initial adversarial baseline

Before first implementation, Architect performs adversarial reverse engineering of the complete authored codebase and creates or refreshes:

```text
.ai/CODEBASE_BASELINE.md
.ai/CONTEXT_INDEX.md
.ai/DEPLOYMENT_SCOPE.md
```

Account for source/configuration, architecture/modules, entry points, data flows, trust boundaries, dependencies, persistence/migrations, external integrations, tests, deployment, maintainability, plaintext secrets/tracked sensitive files, known defects, product-affecting surfaces and material risks.

Generated/vendor/cache trees may be classified rather than exhaustively read, but authored behavior-affecting source/configuration must be accounted for.

Refresh the full baseline only when repository/architecture/framework/dependency/import/merge/deployment changes make it materially stale. Routine tasks use the validated baseline/context index plus current Git delta and targeted discovery.

For a new, materially stale or explicitly re-audited baseline, use independent ELEVATED baseline review. Final Reviewer controls `BASELINE_PASS | BASELINE_DEFECT | BLOCKED`. Implementation remains blocked until the baseline is validated.

## Adaptive product discovery

Every governed request receives exactly one `WORK_CLASS`, one `DISCOVERY_DEPTH: LIGHT | STANDARD | DEEP`, and one `ASSISTANCE_MODE: GUIDED | STANDARD | EXPERT`.

Discovery is always present. A small patch may use concise `LIGHT` discovery against established evidence. New products, high-risk change, materially vague/product-wide work and decisions that could invalidate architecture or delivery use `DEEP` discovery.

Discovery covers applicable objectives, users/roles, workflows/exceptions, data/rules, UX/accessibility/states, security/privacy/audit, administration/reporting/communications, integrations/constraints, installation/operation/recovery/support, and completeness/delivery.

Do not repeat questions answered by authoritative evidence or prior user decisions. Track only unresolved material decisions in `MATERIAL_UNKNOWN_COUNT`.

### Constructive challenge

Do not agree with a proposed solution merely because the user requested it. Separate:

```text
USER_OBJECTIVE
USER_PROPOSED_SOLUTION
GOVERNANCE_RECOMMENDATION
FINAL_USER_DECISION
```

Explain material alternatives and consequences across security, data safety, correctness, complexity, maintenance, compatibility, cost, reversibility, accessibility and operational burden.

A conscious non-blocking override is `USER_OVERRIDE_ACCEPTED`. Block foreseeable critical insecurity, unacceptable data loss, applicable legal violation, impossible approved requirements or false validation/completeness claims.

### Guided decisions

Only a conventional, low-risk, reversible, scope-neutral `REVERSIBLE_TECHNICAL_DEFAULT` may proceed without explicit approval. Material product, architecture, data, privacy, security, retention, commercial, licensing and operational decisions require user or authoritative owner approval.

Never fabricate approval. Preserve material decisions, overrides, blockers, exclusions, deferrals and supersession chronologically in product decisions and project history.

### Conditional product state

Create `.ai/product/` only for product-affecting work:

```text
PRODUCT_VISION.md
USER_AND_ROLE_MODEL.md
DOMAIN_AND_PROCESS_MODEL.md
PRODUCT_COMPLETENESS_MATRIX.md
PRODUCT_BLUEPRINT.md
PRODUCT_DECISIONS.md
```

Do not create empty product boilerplate for a purely technical patch whose lack of product-scope effect is established by primary evidence.

Product artifacts remain downstream from canonical request and clarification provenance. They cannot rewrite historical task requirements.

### Discovery review

Use `DISCOVERY_REVIEW` for `NEW_PRODUCT`, `HIGH_RISK_CHANGE`, `DEEP`, materially vague/product-wide work, or discovery decisions with material security/data/architecture/legal/operational impact.

The independent Reviewer and Architecture/Security Reviewer inspect the same frozen discovery target without sibling findings. Final Reviewer returns exactly:

```text
DISCOVERY_PASS
DISCOVERY_DEFECT
DISCOVERY_BLOCKED
```

Required discovery cannot unlock planning until `DISCOVERY_PASS`, `MATERIAL_UNKNOWN_COUNT: 0`, and all required product-scope/user approvals are present.

## Requirement provenance

Every task stores under `.ai/tasks/<TASK-ID>/`:

```text
ORIGINAL_USER_REQUEST.md
CLARIFICATION_TRANSCRIPT.md
APPROVED_REQUIREMENTS.md
```

The task plan and product artifacts are downstream from these files and cannot override them.

Block `READY_FOR_EXECUTION` while controlling requirements are materially ambiguous, conflicting, omitted, weakened or unauthorizedly broadened. Secret values are redacted before persistence without changing semantic intent.

Material mid-task direction is first recorded in `.ai/tasks/<TASK-ID>/STEERING.md`, then appended to `CLARIFICATION_TRANSCRIPT.md`, reflected in `APPROVED_REQUIREMENTS.md` when authorized, and triggers replanning when it invalidates current scope, plan, product state or evidence. Executor never applies material steering directly from transient chat.

## Context efficiency

Every task creates `CONTEXT_MANIFEST.md` from:

- validated baseline/context index;
- current Git head/status/diff;
- task requirement provenance;
- applicable approved product blueprint and capability evidence;
- targeted primary repository evidence;
- bounded read-only ZCode exploration for materially multi-surface tasks when useful.

Discovery summaries are hypotheses until verified against primary evidence. Do not repeatedly scan the entire repository merely because a new task starts.

Every implementation-ready plan includes `MINIMUM_CHANGE_ASSESSMENT`: existing/native/stdlib and installed capabilities first, justification for new dependency/abstraction, and why the diff is the smallest correct secure maintainable solution.

## Product completeness and vertical delivery

`PRODUCT_COMPLETENESS_MATRIX.md` classifies stable capability IDs as:

```text
REQUIRED | OPTIONAL | NOT_APPLICABLE | DEFERRED
```

A deferred required capability remains visible and keeps the product incomplete unless approved complete scope changes explicitly.

Product delivery uses coherent `VERTICAL_MILESTONE` increments. Product-affecting tasks record product blueprint version, affected capability IDs, requirement/acceptance traceability and expected completeness impact.

`MILESTONE_VALIDATED` proves the increment, not the complete product.

Product completeness and release readiness are separate:

```text
PRODUCT_COMPLETENESS_VERDICT:
PRODUCT_COMPLETE | PRODUCT_DEFECT | PRODUCT_BLOCKED

RELEASE_VERDICT:
READY_FOR_PRODUCTION | NOT_READY_FOR_PRODUCTION
```

A technically valid milestone may leave `PRODUCT_INCOMPLETE`. Production readiness requires `PRODUCT_COMPLETE` for approved complete scope plus fresh release evidence. Neither verdict authorizes deploy, publish, merge, rollback or push.

## Task planning gate

Large work is decomposed:

```text
Project → Vertical Milestone → Task → Slice
```

Before each Executor handoff, Architect must create or update task-local:

```text
APPROVED_REQUIREMENTS.md
CONTEXT_MANIFEST.md
TASK_PLAN.md
VERIFICATION_PROFILE.md
RUN_STATE.json
```

`TASK_PLAN.md` defines exact scope/out-of-scope, slices, acceptance criteria, capability traceability, product-completeness impact, regression surface, migration/security/secret/deployment/maintainability/documentation impact, external validation and minimum-change assessment.

`VERIFICATION_PROFILE.md` defines `TASK_RISK_PROFILE`, authoritative validation commands/capabilities, gate applicability, evidence freshness dependencies and review depth.

Only then may the task become `READY_FOR_EXECUTION`.

## Evidence-Driven Verification

Task risk dimensions are `NONE | LOW | HIGH` for security, migration, public contract, dependency, deployment, performance, generated artifacts, destructive actions, input validation, test reliability, human ownership, user flow, visual behavior, external tooling, recovery and experimentation.

Gate planning states:

```text
REQUIRED | CONDITIONAL | NOT_APPLICABLE
```

Evidence states:

```text
PASS | FAIL | UNAVAILABLE | STALE | BLOCKED
```

`UNAVAILABLE` or `STALE` is never silently treated as `PASS`.

Use repository-native verification first. Do not invent commands, thresholds or dependencies merely to satisfy governance.

Applicable core gates include bugfix proof, test-impact mapping, contract compatibility, environment fingerprint, dependency admission/delta, generated-artifact synchronization, pre-change safepoint and migration proof.

New direct dependencies require an admitted dependency decision before installation. Required high-risk destructive/migration/deployment-state mutations require a pre-change recoverable safepoint before mutation.

## Operational Assurance

When applicable, plan and record realistic runtime and external-side-effect proof through the same verification profile/evidence surface:

- `PREVIEW_ENVIRONMENT_GATE`
- `USER_FLOW_VERIFICATION`
- `VISUAL_BEHAVIOR_GATE`
- `RELEASE_RECOVERY_PROOF`
- `TOOL_CAPABILITY_PROFILE` including relevant MCP capabilities
- `SAFE_EXPERIMENTATION`

Verification may require more proof but never grants more privilege. Mocks can support testing but do not replace required real runtime/integration evidence. Never use production credentials, data or infrastructure merely to satisfy a test gate.

## Adaptive independent review

Executor completion with fresh required evidence moves the task to `READY_FOR_REVIEW`, not directly to final validation.

### STANDARD

Independent Reviewer verifies canonical requirements, plan authorization, frozen diff/target, required evidence, security/secrets, runtime/regression behavior, maintainability, deployment scope, applicable Operational Assurance and product capability traceability.

Reviewer PASS makes the task `TASK_VALIDATED`.

### ELEVATED

Use for HIGH-risk tasks, security-sensitive work, major migrations, material public-contract changes, recovery-sensitive work, milestone completion, product completeness reconciliation or release candidates:

```text
reviewer
+
reviewer-architecture
        ↓
final-reviewer
```

The two advisory reviewers inspect the same frozen target independently and do not consume sibling current-cycle findings. Final Reviewer receives both only after completion and independently verifies requirement provenance, product scope, plan/risk authorization, evidence freshness and allegations.

Final Reviewer task verdicts:

```text
PASS
IMPLEMENTATION_DEFECT
PLAN_DEFECT
BLOCKED
```

Only `PASS` makes an ELEVATED task `TASK_VALIDATED`. A correct implementation of a materially incorrect plan is `PLAN_DEFECT`, not PASS.

## Bounded correction cycles

Baseline review, required discovery review, task final adjudication and product-completeness reconciliation each allow a maximum three failed correction cycles.

After the third failed cycle, stop fail-closed, set a blocking state and emit:

```text
HUMAN_INPUT_REQUIRED: YES
```

Do not run unbounded autonomous repair/review loops merely to force convergence.

## Arbitration

If Executor evidence materially conflicts with the approved plan, Executor stops and returns evidence to Architect.

Architect first evaluates normal replanning. If an unresolved material disagreement remains about feasibility, correctness, security, scope, architecture, migration safety, maintainability or acceptance evidence, set `ARBITRATION_REQUIRED` and recommend `/ai-arbiter`.

Arbiter independently inspects requirements, applicable product decisions, plan, implementation evidence, repository state, tests and relevant risk/evidence implications. Neither Architect nor Executor automatically wins.

Executor resumes only after Architect re-authorizes the revised/current task as `READY_FOR_EXECUTION`.

## Maintainable source structure

Production source must remain understandable and maintainable over time.

- Prefer focused, cohesive files/modules with one clear responsibility or tightly cohesive concern.
- Do not create or extend monolithic god files that accumulate unrelated responsibilities.
- When an approved change materially worsens an oversized/multi-responsibility file, Architect includes a targeted split or extraction in scope.
- Split by responsibility and stable domain/technical boundaries, not arbitrary line-count targets.
- Do not create artificial micro-files, wrapper-only abstractions, one-use interfaces or needless indirection.
- Prefer narrow explicit interfaces and independently testable units.
- Do not perform unrelated repository-wide refactors solely for style.

## Secret safety

Plaintext secrets are excluded from Git by default.

Treat credentials, access tokens, API keys, passwords, private certificates/signing material, private connection strings, production `.env` files and equivalents as secrets.

- Never stage or commit plaintext secrets without explicit authorization for that exact exception after stating risk.
- Prefer environment variables, secret managers, encrypted stores or non-secret references.
- Ensure repository-specific local secret files are ignored.
- Safe example files contain placeholders only.
- If a secret is already tracked, ignore rules alone are insufficient: remove from tracking and assess revocation/rotation.
- Architect, Reviewer, Architecture/Security Reviewer and Final Reviewer check plaintext-secret exposure appropriate to scope.
- Executor checks staged content before commit.

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

For new projects keep tests, development documentation, `.ai/`, review/evidence artifacts, local tooling, caches, IDE state and secrets outside production runtime scope.

For existing projects, do not blindly relocate files; determine actual runtime requirements and plan safe separation.

Final production packages include only runtime-required files/assets unless an explicit documented runtime/legal/packaging exception applies.

## Installation, migrations and release

At intake determine `GREENFIELD` versus `EXISTING_INSTALLATION`.

Existing systems require current installed/schema/runtime/migration-state understanding, representative forward-upgrade/data-preservation proof and final clean-install proof from zero.

Final release requires `PRODUCT_COMPLETE` when product state applies and fresh applicable evidence including tests/build/static/security checks, secret scanning, deployment scope, migration/upgrade proof, clean install, required external/runtime verification, production-package extraction/reinstall verification, recovery proof when applicable and independent ELEVATED release review.

Final production status is exactly:

```text
READY_FOR_PRODUCTION
NOT_READY_FOR_PRODUCTION
```

## Machine-readable result

Task-oriented commands end with:

```text
GOVERNANCE_RESULT
TASK_ID: <id or NONE>
STATE: <state>
NEXT_ACTION: <action or NONE>
CYCLE: <n/3 or N/A>
HUMAN_INPUT_REQUIRED: YES|NO
RESUMABLE: YES|NO
CHECKPOINT: <RUN_STATE path or NONE>
EVIDENCE_STATUS: COMPLETE|PARTIAL|BLOCKED|N/A
```

Keep `.ai/STATUS.md`, applicable product state, task `RUN_STATE.json`, evidence and `PROJECT_HISTORY.md` synchronized. Concise narrative may explain the result, but the block is the stable routing surface.
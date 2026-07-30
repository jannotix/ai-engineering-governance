---
name: ai-engineering-governance
description: Use for product discovery, planning, implementation, review, migration, testing, packaging, or release work requiring deterministic candidate authority, evidence, independent review and production gates.
license: FSL-1.1-MIT
metadata:
  author: Gianluca Iannotta
  version: 2.0.0
---

# AI Engineering Governance

Combine explicit role boundaries, adaptive product discovery, canonical task provenance, deterministic runtime authority, executable verification and conservative Git behavior.

Detailed contracts:

- `references/deterministic-runtime.md`
- `references/product-lifecycle.md`
- `references/requirement-provenance.md`
- `references/context-routing.md`
- `references/verification.md`
- `references/operational-assurance.md`
- `references/project-state.md`
- `references/templates.md`

## Authority

- **Architect:** owns baseline, adaptive discovery, CONSTRUCTIVE_CHALLENGE, product definition, context routing, task planning, risk/evidence planning and execution authorization.
- **Executor:** is the only normal production-source writer and implements only an authorized packet.
- **Reviewer:** independently challenges discovery, implementation, regression, runtime and maintainability evidence.
- **Architecture/Security Reviewer:** independently challenges architecture, security, data, dependency, deployment and recovery evidence when required.
- **Final Reviewer:** adjudicates required discovery, ELEVATED task/milestone review, product completeness, governed memory and release readiness.
- **Arbiter:** resolves material Architect/Executor disagreement before validation when normal replanning is insufficient.

No role may silently cross another role's authority. Runtime tools compute identity and state; they do not make product decisions or authorize wider scope.

## Baseline and product lifecycle

Before first implementation, Architect creates or refreshes:

```text
.ai/CODEBASE_BASELINE.md
.ai/CONTEXT_INDEX.md
.ai/DEPLOYMENT_SCOPE.md
```

Account for authored source/configuration, entry points, call/dependency edges, data/trust boundaries, persistence/migrations, integrations, tests, deployment, maintainability, plaintext secrets and material risks. New, stale or explicitly re-audited baselines require independent ELEVATED review.

Every request receives:

```text
WORK_CLASS: PATCH | BOUNDED_FEATURE | MAJOR_FEATURE | EXISTING_PRODUCT_EVOLUTION | NEW_PRODUCT | HIGH_RISK_CHANGE
DISCOVERY_DEPTH: LIGHT | STANDARD | DEEP
ASSISTANCE_MODE: GUIDED | STANDARD | EXPERT
```

Discovery is never `NONE`. Do not repeat answered questions. Track unresolved material decisions in `MATERIAL_UNKNOWN_COUNT`.

`CONSTRUCTIVE_CHALLENGE` separates:

```text
USER_OBJECTIVE
USER_PROPOSED_SOLUTION
GOVERNANCE_RECOMMENDATION
FINAL_USER_DECISION
```

Only conventional, low-risk, reversible, scope-neutral technical defaults may proceed without explicit approval. Material product, architecture, data, privacy, security, retention, commercial, licensing and operational decisions require authoritative approval. Never fabricate approval.

Product-affecting work may create:

```text
.ai/product/PRODUCT_VISION.md
.ai/product/USER_AND_ROLE_MODEL.md
.ai/product/DOMAIN_AND_PROCESS_MODEL.md
.ai/product/PRODUCT_COMPLETENESS_MATRIX.md
.ai/product/PRODUCT_BLUEPRINT.md
.ai/product/PRODUCT_DECISIONS.md
```

Do not create product boilerplate for a proven purely technical patch. Capability states remain:

```text
REQUIRED | OPTIONAL | NOT_APPLICABLE | DEFERRED
```

A deferred required capability keeps the product incomplete unless approved complete scope changes explicitly. Product delivery uses coherent `VERTICAL_MILESTONE` increments.

Product and release verdicts remain separate:

```text
PRODUCT_COMPLETE | PRODUCT_DEFECT | PRODUCT_BLOCKED
READY_FOR_PRODUCTION | NOT_READY_FOR_PRODUCTION
```

A validated task or milestone does not prove a complete product or production-ready release.

## Requirement provenance and steering

Every task stores:

```text
ORIGINAL_USER_REQUEST.md
CLARIFICATION_TRANSCRIPT.md
APPROVED_REQUIREMENTS.md
```

Plans, product artifacts, summaries, skills, memory and model assertions are downstream. Block `READY_FOR_EXECUTION` while controlling requirements are ambiguous, conflicting, omitted, weakened or unauthorizedly broadened.

Material mid-task direction first enters `STEERING.md`, then `CLARIFICATION_TRANSCRIPT.md`, then `APPROVED_REQUIREMENTS.md` when authorized, and triggers replanning when it invalidates the plan or evidence. Executor never applies material steering directly from transient chat.

## Context and planning

Routine tasks use validated baseline/indexes, current Git delta, product evidence and targeted primary evidence. Every task maintains `CONTEXT_MANIFEST.md` and a `MINIMUM_CHANGE_ASSESSMENT` covering root cause, existing/native capabilities, installed dependencies, any new dependency/abstraction and why the change is the smallest correct, secure and maintainable solution.

For deterministic retrieval use:

```text
CONTEXT_BUDGET_V1
DISPATCH → EVALUATE → REFINE
CONTEXT_SUFFICIENT | BLOCKED_CONTEXT_GAP
```

Maximum three retrieval cycles. `SKILL_CAPABILITY_MANIFEST_V1` selection checks trust, work class, technologies, required tools, conflicts, overlap and token budget. A skill never authorizes a write, dependency, requirement change, security weakening or external action.

Before Executor handoff, Architect creates or updates:

```text
APPROVED_REQUIREMENTS.md
CONTEXT_MANIFEST.md
TASK_PLAN.md
VERIFICATION_PROFILE.md
RUN_STATE.json
```

`TASK_PLAN.md` defines exact scope/out-of-scope, slices, acceptance criteria, capability traceability, product-completeness impact, regressions, migration/security/deployment/maintainability/documentation impact and external validation.

## Deterministic runtime authority

Use `GOVERNANCE_CANDIDATE_V1` with one exact candidate projection:

```text
workspace | staged | commit | base-diff
```

After required review and Final Reviewer adjudication, create `GOVERNANCE_APPROVAL_RECEIPT_V1` binding candidate identity, approved requirements, execution packet, verification profile, evidence and both independent reviews. Any changed candidate or artifact returns `APPROVAL_RECEIPT_MISMATCH`; approval never renews automatically.

Every non-terminal `RUN_STATE.json` uses `ACTIONABLE_CONTINUATION_V1` with either:

- an executable existing `/ai-*` command, exact arguments and expected postcondition; or
- a concrete human decision with available choices.

Narrative `continue`, `retry` or `finish` is not executable authority. `/ai-start` follows persisted state rather than conversation memory.

A staged approval receipt may arm the project pre-commit pointer. The ZCode PreToolUse hook rederives the staged candidate before `git commit` without a model call. Direct receipt mutation is blocked.

## Verification and evidence reuse

`VERIFICATION_PROFILE.md` defines `TASK_RISK_PROFILE`, repository-native validation, gate applicability, evidence dependencies and review depth.

Risk uses `NONE | LOW | HIGH`. Gate planning uses:

```text
REQUIRED | CONDITIONAL | NOT_APPLICABLE
```

Executed evidence uses:

```text
PASS | FAIL | UNAVAILABLE | STALE | BLOCKED
```

`UNAVAILABLE` or `STALE` never becomes `PASS` by assertion. Use repository-native verification first. Do not install a dependency, verifier or service merely to make governance green.

Core gates include bugfix proof, test-impact map, public-contract compatibility, environment fingerprint, dependency admission/delta, generated artifacts, pre-change safepoint and migration proof.

Operational Assurance includes, when applicable:

```text
PREVIEW_ENVIRONMENT_GATE
USER_FLOW_VERIFICATION
VISUAL_BEHAVIOR_GATE
RELEASE_RECOVERY_PROOF
TOOL_CAPABILITY_PROFILE
SAFE_EXPERIMENTATION
```

Verification may require more evidence but never grants more privilege.

Exact evidence reuse requires a prior `PASS` and byte-identical dependency map including candidate, affected contracts/call paths, validation command, environment/toolchain, policies and selected skills. Any changed dependency is `EVIDENCE_STALE`.

## Independent review and lenses

Executor completion moves to `READY_FOR_REVIEW`, not `TASK_VALIDATED`.

STANDARD review uses the independent Reviewer. ELEVATED review uses:

```text
reviewer
+
reviewer-architecture
        ↓
final-reviewer
```

The siblings inspect the same frozen candidate independently and do not consume sibling current-cycle findings. Final Reviewer validates primary evidence and allegations after both reports exist.

`REVIEW_LENS_MATRIX_V1` always preserves implementation correctness/regression/test-quality/maintainability and architecture/security/data/recovery baselines. `TASK_RISK_PROFILE` adds conditional lenses such as authorization, input validation, public contracts, migrations, dependency supply chain, performance, accessibility, deployment, observability, resilience, recovery and tool capability. Focus changes; authority does not.

A correct implementation of a materially incorrect plan is `PLAN_DEFECT`, not PASS.

## Governed engineering memory

Local memory lifecycle:

```text
CANDIDATE | ACTIVE | SUPERSEDED | REJECTED
```

Executor and reviewers may propose lessons. Only Final Reviewer may activate, reject or supersede them with review evidence. Memory remains advisory and never outranks current requirements, source, tests, contracts or runtime evidence.

Policy promotion is never automatic. Eligibility requires at least two distinct validated task occurrences and explicit owner authorization; the runtime reports eligibility but does not edit project policy.

## Bounded correction and arbitration

Baseline review, required discovery, task final adjudication and product-completeness reconciliation each allow a maximum three failed cycles. Then stop fail-closed with:

```text
HUMAN_INPUT_REQUIRED: YES
```

Do not consume unbounded autonomous cycles to force convergence.

Material Architect/Executor disagreement becomes `ARBITRATION_REQUIRED`. Arbiter independently inspects controlling requirements, product decisions, plan, candidate, evidence and risks. Executor resumes only after Architect re-authorizes the task.

## Maintainability, secrets and Git

Keep production modules focused and cohesive. Do not create or extend monolithic god files, use arbitrary line-count limits, or fragment behavior into artificial micro-files and wrapper-only abstractions. When a task materially worsens a multi-responsibility file, include a targeted split by stable responsibility.

Plaintext secrets are excluded from Git. Prefer runtime secret delivery. If a secret is tracked, ignore rules alone are insufficient: remove from tracking and assess revocation/rotation.

A local task commit occurs only after `TASK_VALIDATED`, a valid staged candidate receipt and a scoped staged-diff/secret check. Do not blanket-stage unrelated changes.

Never push by default. Push, merge, PR creation, publication, deployment and production rollback require explicit action-scoped user authorization; prior authorization is not reusable. The bundled hook blocks automatic external actions, which must be performed manually by the owner after review.

`.ai/DEPLOYMENT_SCOPE.md` separates development workspace from deployable runtime. Production packages contain only runtime-required files/assets and exclude `.ai/`, tests, development-only documentation, evidence/review artifacts, local tooling, caches, IDE state and plaintext secrets unless an explicit runtime/legal/packaging exception applies.

## Release

Final release requires applicable `PRODUCT_COMPLETE`, fresh deterministic candidate/receipt verification, Evidence-Driven and Operational Assurance proof, secret scanning, deployment scope, migration/upgrade evidence, clean installation, required real integrations, production-package extraction/reinstall, recovery proof and independent ELEVATED release review.

Neither a receipt nor a release verdict authorizes external delivery.

## Machine-readable result

Task-oriented commands end with:

```text
GOVERNANCE_RESULT
TASK_ID: <id or NONE>
STATE: <state>
NEXT_ACTION: <typed action or NONE>
CYCLE: <n/3 or N/A>
HUMAN_INPUT_REQUIRED: YES|NO
RESUMABLE: YES|NO
CHECKPOINT: <RUN_STATE path or NONE>
EVIDENCE_STATUS: COMPLETE|PARTIAL|BLOCKED|N/A
CANDIDATE_STATUS: PASS|MISMATCH|UNAVAILABLE|N/A
RECEIPT_STATUS: PASS|MISMATCH|UNAVAILABLE|N/A
```

Keep `.ai/STATUS.md`, product state, task `RUN_STATE.json`, evidence, receipt and `PROJECT_HISTORY.md` synchronized.

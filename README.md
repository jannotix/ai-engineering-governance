# AI Engineering Governance

AI Engineering Governance is a model-agnostic ZCode plugin for structured, auditable, product-aware, evidence-driven software delivery.

It keeps the command surface small while separating discovery, planning, implementation, independent review, product completeness, release readiness, and dispute resolution.

## Roles

Core roles:

- **Architect** — adversarial baseline/context analysis, adaptive product discovery, constructive challenge, requirement provenance, product definition, architecture, task planning, risk/evidence planning, and execution authorization.
- **Executor** — implements only approved work and records execution evidence.
- **Reviewer** — independently reviews discovery and every completed governed task.
- **Arbiter** — resolves material unresolved Architect/Executor disagreement before validation.

ELEVATED review reuses two specialized roles only when risk or lifecycle phase requires them:

- **Architecture/Security Reviewer** — independent product, architecture, security, data, dependency, deployment, recovery, and maintainability review.
- **Final Reviewer** — adjudicates required discovery, ELEVATED task/milestone review, product completeness, and release readiness after both independent advisory reviews complete.

No provider or model ID is hard-coded.

## Core guarantees

- Complete adversarial codebase baseline before first implementation.
- Adaptive discovery for every request: `LIGHT`, `STANDARD`, or `DEEP`.
- Constructive challenge instead of automatic agreement with a proposed solution.
- Material product, security, privacy, architecture, legal, commercial, and operational decisions require approval.
- Conditional product definition and capability traceability for product-affecting work.
- Product completeness separated from milestone validation and production readiness.
- Incremental context routing instead of repeated full-repository rescans.
- Canonical task requirement provenance separated from Architect interpretation.
- Architect approval before every Executor task.
- Minimum-change assessment before implementation.
- Task risk profile and planned verification before code changes.
- `UNAVAILABLE` or `STALE` evidence is never silently treated as PASS.
- Operational Assurance for runtime, user-flow, visual, tooling, recovery, and isolated experimentation when applicable.
- Adaptive independent review: STANDARD for normal tasks, ELEVATED for high-risk/milestone/product/release work.
- Maximum three failed correction cycles at baseline, required discovery, task adjudication, or product-completeness gates.
- Local Git commit only after required governed review PASS.
- No Git push without explicit action-scoped authorization.
- Plaintext secrets excluded from Git by default and checked by planning/review roles.
- Production runtime scope separated from tests, development documentation, `.ai/`, evidence, and local tooling.
- Focused, cohesive production source without arbitrary line-count rules or artificial micro-file fragmentation.

## Install in ZCode

1. Open a workspace in ZCode.
2. Open **Settings → Plugins → Marketplace**.
3. Add `https://github.com/jannotix/ai-engineering-governance`.
4. Install **AI Engineering Governance**.
5. Start a new Agent session when required by ZCode plugin reload behavior.

## First use

Run:

```text
/ai-init
/ai-setup
```

`/ai-init` creates or non-destructively upgrades project-local governance state. Existing history is preserved and product state is adopted lazily.

Reusable state includes:

```text
.ai/
├── CODEBASE_BASELINE.md
├── CONTEXT_INDEX.md
├── DEPLOYMENT_SCOPE.md
├── PROJECT_HISTORY.md
├── CONFIG.md
├── STATUS.md
├── product/                 # only when product-affecting work requires it
├── tasks/
└── arbitration/
```

The Architect completes and validates the initial adversarial baseline before implementation begins.

`/ai-setup` records role assignments. ZCode model selection remains controlled by the user.

## Adaptive product discovery

Every governed request is classified:

```text
WORK_CLASS:
PATCH | BOUNDED_FEATURE | MAJOR_FEATURE
EXISTING_PRODUCT_EVOLUTION | NEW_PRODUCT | HIGH_RISK_CHANGE

DISCOVERY_DEPTH:
LIGHT | STANDARD | DEEP
```

A well-defined technical patch uses concise `LIGHT` discovery. New products, high-risk changes, materially vague or product-wide requests use `DEEP` discovery.

The Architect investigates only materially applicable areas:

```text
objective and outcomes
users, roles, permissions, approvals
workflows, failures and exceptions
data, rules, retention and states
UX, accessibility and all interface states
security, privacy, authorization and audit
administration, reporting and communications
integrations and compatibility
installation, operations, recovery and support
completeness, exclusions and delivery
```

Discovery is integrated into `/ai-architect`; there is no redundant `/ai-discover` command.

### Constructive challenge

The governance separates:

```text
USER_OBJECTIVE
USER_PROPOSED_SOLUTION
GOVERNANCE_RECOMMENDATION
FINAL_USER_DECISION
```

The Architect explains materially better alternatives and trade-offs instead of agreeing automatically. A conscious safe override is recorded, while critical insecurity, unacceptable data loss, applicable legal violations, impossible requirements, or false completion claims remain blocking.

Only conventional, reversible, low-risk, scope-neutral technical defaults may be selected without explicit approval.

## Conditional product state

Product-affecting work uses:

```text
.ai/product/
├── PRODUCT_VISION.md
├── USER_AND_ROLE_MODEL.md
├── DOMAIN_AND_PROCESS_MODEL.md
├── PRODUCT_COMPLETENESS_MATRIX.md
├── PRODUCT_BLUEPRINT.md
└── PRODUCT_DECISIONS.md
```

These files are not created as empty boilerplate for a purely technical patch.

Capabilities receive stable IDs and one classification:

```text
REQUIRED | OPTIONAL | NOT_APPLICABLE | DEFERRED
```

A deferred required capability remains visible and keeps the product incomplete unless the approved complete scope changes explicitly.

Product decisions are append-only and preserve approvals, overrides, blockers, exclusions, deferrals, and superseding decisions.

## Vertical delivery

Product work is planned as coherent end-to-end vertical milestones rather than disconnected technical-layer milestones.

Every product-affecting task records:

- product blueprint version;
- affected capability IDs;
- requirement and acceptance traceability;
- expected completeness impact;
- remaining required capabilities.

A validated milestone proves the increment, not the whole product.

## Separate completeness and release verdicts

```text
PRODUCT_COMPLETENESS_VERDICT:
PRODUCT_COMPLETE | PRODUCT_DEFECT | PRODUCT_BLOCKED

RELEASE_VERDICT:
READY_FOR_PRODUCTION | NOT_READY_FOR_PRODUCTION
```

A milestone can be fully tested and still leave `PRODUCT_INCOMPLETE`. Release readiness requires applicable `PRODUCT_COMPLETE` plus fresh security, migration, packaging, deployment, recovery, operational, and independent release evidence.

Neither verdict authorizes deployment, publication, merge, rollback, or push.

## Task-local governance

Each governed task keeps canonical evidence under:

```text
.ai/tasks/<TASK-ID>/
├── ORIGINAL_USER_REQUEST.md
├── CLARIFICATION_TRANSCRIPT.md
├── APPROVED_REQUIREMENTS.md
├── CONTEXT_MANIFEST.md
├── TASK_PLAN.md
├── VERIFICATION_PROFILE.md
├── RUN_STATE.json
├── STEERING.md              # optional authoritative mid-task direction
├── evidence/
│   └── VERIFICATION_EVIDENCE.md
└── reviews/
```

### Requirement provenance

```text
ORIGINAL_USER_REQUEST
        +
CLARIFICATION_TRANSCRIPT
        ↓
APPROVED_REQUIREMENTS
        ↓
PRODUCT/TASK PLAN
        ↓
EXECUTOR
```

A plan or product blueprint cannot silently replace or weaken controlling user requirements. A correct implementation of a materially incorrect plan is a plan defect, not a pass.

Material mid-task direction is processed through `STEERING.md`, clarification provenance, and replanning before it can change implementation.

### Context routing

The initial baseline analyzes the complete authored codebase. Routine tasks use:

```text
CODEBASE_BASELINE
+ CONTEXT_INDEX
+ current Git delta
+ applicable approved product evidence
+ targeted primary evidence
+ bounded read-only ZCode exploration when useful
        ↓
CONTEXT_MANIFEST
```

This preserves repository understanding without repeatedly rescanning large codebases.

### Planning and verification

Before `READY_FOR_EXECUTION`, Architect creates a task plan with scope, capability traceability, acceptance criteria, regressions, migration/security/deployment/maintainability/documentation impact, external validation, and `MINIMUM_CHANGE_ASSESSMENT`.

Risk dimensions are:

```text
NONE | LOW | HIGH
```

Planned gates are:

```text
REQUIRED | CONDITIONAL | NOT_APPLICABLE
```

Executed evidence is:

```text
PASS | FAIL | UNAVAILABLE | STALE | BLOCKED
```

Applicable gates include bugfix proof, test-impact mapping, contract compatibility, dependency admission/delta, generated artifacts, pre-change safepoints, migration proof, runtime/user-flow/visual verification, tool/MCP capability assessment, recovery proof, and safe experimentation.

Governance uses existing repository/tooling capabilities first. It does not install verification dependencies or invent project thresholds merely to satisfy a gate.

## Typical lifecycle

```text
ADVERSARIAL BASELINE
        ↓
WORK CLASSIFICATION
        ↓
LIGHT | STANDARD | DEEP DISCOVERY
        ↓
CONSTRUCTIVE CHALLENGE
        ↓
PRODUCT DEFINITION / APPROVAL when applicable
        ↓
REQUIREMENT PROVENANCE
        ↓
INCREMENTAL CONTEXT ROUTING
        ↓
VERTICAL TASK PLAN + RISK/EVIDENCE PROFILE
        ↓
READY_FOR_EXECUTION
        ↓
EXECUTOR + VERIFICATION EVIDENCE
        ↓
READY_FOR_REVIEW
        ↓
STANDARD or ELEVATED REVIEW
        ↓
TASK_VALIDATED
        ↓
SCOPED LOCAL COMMIT
        ↓
PRODUCT COMPLETENESS RECONCILIATION
        ↓
RELEASE READINESS
```

## Independent review

Normal tasks use the independent Reviewer.

Required discovery, HIGH-risk tasks, security-sensitive work, major migrations, material public-contract changes, recovery-sensitive work, milestone completion, product completeness, and release candidates use:

```text
Reviewer
+
Architecture/Security Reviewer
        ↓
Final Reviewer
```

The two advisory reviewers inspect the same frozen target independently. Final Reviewer adjudicates only after both reports complete.

Discovery verdicts:

```text
DISCOVERY_PASS | DISCOVERY_DEFECT | DISCOVERY_BLOCKED
```

Task verdicts:

```text
PASS | IMPLEMENTATION_DEFECT | PLAN_DEFECT | BLOCKED
```

## Bounded correction cycles

Baseline, required discovery, task final adjudication, and product-completeness reconciliation stop after three failed cycles and require authoritative human input. The workflow never runs an unbounded repair/review loop merely to force a pass.

## Arbitration

When Executor evidence materially conflicts with the approved plan and normal replanning cannot safely resolve it:

```text
ARBITRATION_REQUIRED
        ↓
/ai-arbiter
        ↓
Arbiter
        ↓
Architect replan/re-authorization
```

Arbiter is independent; neither Architect nor Executor automatically wins.

## Continue later

Use `/ai-start` to reconcile persisted product/task state with current Git head/status/diff, provenance, product blueprint/capabilities, evidence freshness, and frozen review state. It does not depend on chat history and invalidates only evidence/reviews affected by changed inputs.

Use `/ai-status` for a concise report of work class, discovery, material unknowns, product scope/completeness, release readiness, provenance, evidence, cycles, blockers, Git state, and exact next action.

Task-oriented commands end with a stable `GOVERNANCE_RESULT` block for deterministic routing.

## Git and secret policy

A validated task gets one scoped local commit. Executor inspects staged diff and plaintext-secret exposure before committing.

Git push requires explicit authorization for that specific push; prior authorization is not reusable.

Plaintext credentials, tokens, keys, passwords, private certificates/signing material, production `.env` files, and equivalent secrets are excluded from Git by default. If a tracked secret was exposed, ignore rules alone are insufficient; remove it from tracking and assess revocation/rotation.

## Production scope

`.ai/DEPLOYMENT_SCOPE.md` defines deployable runtime boundary.

Production packages contain only runtime-required files/assets and exclude `.ai/`, tests, development-only documentation, review/evidence artifacts, local tooling, caches, IDE state, and plaintext secrets unless a documented runtime/legal/packaging exception applies.

## Release

Run:

```text
/ai-release
```

Release review is always ELEVATED. When product state applies, `PRODUCT_COMPLETE` is a prerequisite, not a substitute for release evidence.

The workflow revalidates fresh applicable evidence including build/tests/security, migrations/upgrades, clean install, external/runtime behavior, production package extraction/reinstall, deployment scope, secrets, and recovery proof.

It never automatically deploys, rolls back, publishes, merges, or pushes.

## Commands

| Command | Purpose |
| --- | --- |
| `/ai-init` | Initialize or non-destructively upgrade governance state |
| `/ai-setup` | Configure role bindings and review/arbitration modes |
| `/ai-status` | Show discovery, product, evidence, Git, blockers, and next action |
| `/ai-architect` | Baseline, adaptive discovery, product definition, and task planning |
| `/ai-execute` | Implement approved work and record task-local evidence |
| `/ai-review` | Run discovery, STANDARD/ELEVATED task, completeness, or release review |
| `/ai-arbiter` | Resolve a material Architect/Executor disagreement |
| `/ai-start` | Continue safely from persisted product/task + Git state |
| `/ai-release` | Run final production-readiness workflow |

## Architecture policy

Prefer, in order:

1. existing maintainable project architecture;
2. simple modular design;
3. modular monolith for larger applications;
4. tactical DDD only for genuinely complex domains;
5. distributed services only with explicit operational justification.

Patterns are tools, not goals.

## License

Functional Source License 1.1 with MIT Future License (`FSL-1.1-MIT`).

Copyright 2026 Gianluca Iannotta.

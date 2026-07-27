# AI Engineering Governance

AI Engineering Governance is a model-agnostic ZCode plugin for structured, auditable, evidence-driven software delivery.

It keeps the command surface small while separating planning, implementation, independent review, and dispute resolution.

## Roles

Core roles:

- **Architect** — adversarial baseline/context analysis, requirement provenance, architecture, task planning, risk/evidence planning, and execution authorization.
- **Executor** — implements only approved work and records execution evidence.
- **Reviewer** — independently reviews every completed governed task.
- **Arbiter** — resolves material unresolved Architect/Executor disagreement before validation.

ELEVATED review adds two specialized roles only when risk requires them:

- **Architecture/Security Reviewer** — independent architecture, security, data, dependency, deployment, recovery, and maintainability review.
- **Final Reviewer** — adjudicates ELEVATED review after both independent advisory reviews complete.

No provider or model ID is hard-coded.

## Core guarantees

- Complete adversarial codebase baseline before first implementation.
- Incremental context routing for routine tasks instead of repeated full-repository rescans.
- Canonical task requirement provenance separated from Architect interpretation.
- Architect approval before every Executor task.
- Minimum-change assessment before implementation.
- Task risk profile and planned verification before code changes.
- `UNAVAILABLE` or `STALE` evidence is never silently treated as PASS.
- Operational Assurance for runtime, user-flow, visual, tooling, recovery, and isolated experimentation when applicable.
- Adaptive independent review: STANDARD for normal tasks, ELEVATED for high-risk/milestone/release work.
- Local Git commit only after required governed review PASS.
- No Git push without explicit action-scoped authorization.
- Plaintext secrets excluded from Git by default and checked by planning/review roles.
- Production runtime scope separated from tests, development documentation, `.ai/`, evidence, and local tooling.
- Focused, cohesive production source without arbitrary line-count rules or artificial micro-file fragmentation.
- Clean-install and existing-install migration verification.

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

`/ai-init` creates or non-destructively upgrades project-local governance state.

Reusable state includes:

```text
.ai/
├── CODEBASE_BASELINE.md
├── CONTEXT_INDEX.md
├── DEPLOYMENT_SCOPE.md
├── PROJECT_HISTORY.md
├── CONFIG.md
├── STATUS.md
├── tasks/
└── arbitration/
```

The Architect completes the initial adversarial baseline before implementation begins.

`/ai-setup` records role assignments. ZCode model selection remains controlled by the user.

## Task-local governance

Each governed task keeps its own canonical evidence under:

```text
.ai/tasks/<TASK-ID>/
├── ORIGINAL_USER_REQUEST.md
├── CLARIFICATION_TRANSCRIPT.md
├── APPROVED_REQUIREMENTS.md
├── CONTEXT_MANIFEST.md
├── TASK_PLAN.md
├── VERIFICATION_PROFILE.md
├── RUN_STATE.json
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
TASK_PLAN
        ↓
EXECUTOR
```

A plan cannot silently replace or weaken controlling user requirements. A correct implementation of a materially incorrect plan is a plan defect, not a pass.

### Context routing

The initial baseline analyzes the complete authored codebase. Routine tasks use:

```text
CODEBASE_BASELINE
+ CONTEXT_INDEX
+ current Git delta
+ targeted primary evidence
+ bounded read-only ZCode exploration when useful
        ↓
CONTEXT_MANIFEST
```

This preserves repository understanding without repeatedly rescanning large codebases.

### Planning and verification

Before `READY_FOR_EXECUTION`, Architect creates a task plan with scope, acceptance criteria, regression surface, migration/security/deployment/maintainability/documentation impact, external validation, and `MINIMUM_CHANGE_ASSESSMENT`.

`VERIFICATION_PROFILE.md` classifies risk dimensions as:

```text
NONE | LOW | HIGH
```

and planned gates as:

```text
REQUIRED | CONDITIONAL | NOT_APPLICABLE
```

Executed evidence is recorded as:

```text
PASS | FAIL | UNAVAILABLE | STALE | BLOCKED
```

Applicable evidence gates include bugfix proof, test-impact mapping, contract compatibility, dependency admission/delta, generated artifacts, pre-change safepoints, migration proof, runtime/user-flow/visual verification, tool/MCP capability assessment, recovery proof, and safe experimentation.

Governance uses existing repository/tooling capabilities first. It does not install verification dependencies or invent project thresholds merely to satisfy a gate.

## Typical workflow

```text
INITIAL ADVERSARIAL BASELINE
          ↓
REQUIREMENT PROVENANCE
          ↓
INCREMENTAL CONTEXT ROUTING
          ↓
TASK PLAN + MINIMUM CHANGE
          ↓
RISK + VERIFICATION PROFILE
          ↓
READY_FOR_EXECUTION
          ↓
EXECUTOR
          ↓
VERIFICATION EVIDENCE
          ↓
READY_FOR_REVIEW
          ↓
STANDARD or ELEVATED REVIEW
          ↓
TASK_VALIDATED
          ↓
SCOPED LOCAL COMMIT
          ↓
NO PUSH
```

### STANDARD review

Normal tasks use the independent Reviewer.

### ELEVATED review

HIGH-risk tasks, security-sensitive work, major migrations, material public-contract changes, recovery-sensitive work, milestone completion, and release candidates use:

```text
Reviewer
+
Architecture/Security Reviewer
        ↓
Final Reviewer
```

The two advisory reviewers inspect the same frozen target independently. Final Reviewer adjudicates only after both reports complete.

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

Use:

```text
/ai-start
```

It reconciles persisted `.ai/` task state with current Git head/status/diff, requirement/context freshness, verification inputs, and frozen review state. It does not depend on chat history and invalidates only evidence/reviews affected by changed inputs.

Use `/ai-status` for a concise report of provenance integrity, context freshness, high-risk dimensions, evidence state, review depth, blockers, Git state, and exact next action.

## Git and secret policy

A validated task gets one scoped local commit. The Executor must inspect the staged diff and plaintext-secret exposure before committing.

Git push requires explicit authorization for that specific push; prior authorization is not reusable.

Plaintext credentials, tokens, keys, passwords, private certificates/signing material, production `.env` files, and equivalent secrets are excluded from Git by default. If a tracked secret was exposed, ignore rules alone are insufficient; remove it from tracking and assess revocation/rotation.

## Production scope

`.ai/DEPLOYMENT_SCOPE.md` defines the deployable runtime boundary.

Production packages contain only runtime-required files/assets and exclude `.ai/`, tests, development-only documentation, review/evidence artifacts, local tooling, caches, IDE state, and plaintext secrets unless a documented runtime/legal/packaging exception applies.

## Release

Run:

```text
/ai-release
```

Release review is always ELEVATED and revalidates fresh applicable evidence including build/tests/security, migrations/upgrades, clean install, external/runtime behavior, production package extraction/reinstall, deployment scope, secrets, and recovery proof when applicable.

The release workflow never automatically deploys, rolls back, merges, or pushes.

Final verdict:

```text
READY_FOR_PRODUCTION
NOT_READY_FOR_PRODUCTION
```

## Commands

| Command | Purpose |
| --- | --- |
| `/ai-init` | Initialize or non-destructively upgrade governance state |
| `/ai-setup` | Configure role bindings and review/arbitration modes |
| `/ai-status` | Show provenance, risk/evidence, review, Git, blockers, and next action |
| `/ai-architect` | Baseline/context analysis and implementation-ready task planning |
| `/ai-execute` | Implement approved work and record task-local evidence |
| `/ai-review` | Run STANDARD or ELEVATED independent review |
| `/ai-arbiter` | Resolve a material Architect/Executor disagreement |
| `/ai-start` | Continue safely from persisted governance + Git state |
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

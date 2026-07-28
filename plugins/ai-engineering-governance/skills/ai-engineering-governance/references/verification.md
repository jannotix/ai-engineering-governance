# Evidence-Driven Verification

Each governed task defines required proof before implementation and records executed proof separately from model claims.

Canonical task files:

```text
.ai/tasks/<TASK-ID>/VERIFICATION_PROFILE.md
.ai/tasks/<TASK-ID>/evidence/VERIFICATION_EVIDENCE.md
```

## TASK_RISK_PROFILE

`VERIFICATION_PROFILE.md` contains the canonical `TASK_RISK_PROFILE`.

Classify applicable dimensions as `NONE | LOW | HIGH`:

```text
SECURITY
DATA_MIGRATION
PUBLIC_CONTRACT
DEPENDENCY
DEPLOYMENT
PERFORMANCE
GENERATED_ARTIFACT
DESTRUCTIVE_ACTION
INPUT_VALIDATION
TEST_RELIABILITY
HUMAN_OWNERSHIP
USER_FLOW
VISUAL_BEHAVIOR
EXTERNAL_TOOLING
RECOVERY
EXPERIMENTATION
```

Risk may increase required proof. It never removes requirement provenance, product capability traceability, baseline validity, secret safety, or review requirements.

## Verification applicability

Each planned gate is:

```text
REQUIRED | CONDITIONAL | NOT_APPLICABLE
```

Executed evidence is:

```text
PASS | FAIL | UNAVAILABLE | STALE | BLOCKED
```

`UNAVAILABLE` and `STALE` are never silently treated as `PASS`.

## Validation profile

Discover existing authoritative repository checks first:

- build/package scripts;
- CI commands;
- lint/type/static analysis;
- unit/integration/system tests;
- schema/contract checks;
- project-native security/release tooling.

Do not invent commands, thresholds, or dependencies merely to satisfy governance.

## Core gates

Use when applicable:

- `BUGFIX_PROOF` — reproduce failure before fix and pass after it when technically possible; otherwise record honest characterization evidence.
- `TEST_IMPACT_MAP` — map changed paths to direct, dependent, integration, and authoritative full-suite checks.
- `CONTRACT_COMPATIBILITY` — classify affected public APIs, schemas, libraries, CLI/config/event contracts as compatible or explicitly authorized breaking changes.
- `ENVIRONMENT_FINGERPRINT` — record non-secret OS/runtime/compiler/package-manager/test-tool facts needed for reproducibility.
- `DEPENDENCY_ADMISSION_GATE` — before new direct dependency, verify exact identity/version, necessity, compatibility, maintenance, and available security/license evidence.
- `DEPENDENCY_DELTA` — record direct/transitive additions, removals, upgrades, lockfile consistency, and available vulnerability/license/deprecation evidence.
- `GENERATED_ARTIFACT_GATE` — run repository's real generator when generator inputs change and verify outputs are synchronized.
- `PRE_CHANGE_SAFEPOINT` — before required high-risk destructive, migration, or deployment-state mutation, capture a recoverable non-secret starting reference.
- `MIGRATION_PROOF` — classify migrations as `REVERSIBLE | FORWARD_ONLY | IRREVERSIBLE` and verify apply/result/rollback or approved recovery evidence.

Conditional gates may include existing non-functional budgets, flakiness evidence, adversarial input validation, and authoritative human-owner approval.

## Evidence freshness

Evidence is dependency-specific. Changes to source, contracts, product blueprint/capability scope, dependency/lockfile state, generator inputs, migrations, environment/toolchain, validation configuration, runtime target, or relevant project instructions invalidate only dependent evidence and downstream review.

## Review routing

Default task review uses independent `reviewer`.

Use `ELEVATED` review for HIGH-risk tasks, security-sensitive changes, major migrations, material public-contract changes, recovery-sensitive work, milestone completion, product-completeness reconciliation, or release candidates:

```text
reviewer
+
reviewer-architecture
        ↓
final-reviewer
```

The advisory reviewers inspect same frozen target independently and must not use sibling current-cycle findings as evidence. `final-reviewer` receives both reports only after completion and independently validates requirements, product scope, plan authorization, evidence freshness, and allegations.

A reviewed task is not `TASK_VALIDATED` until the review depth required by its profile passes.
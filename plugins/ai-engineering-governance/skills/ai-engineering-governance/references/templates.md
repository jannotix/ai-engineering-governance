# Canonical Project Templates

Create concise project-specific documents. Do not copy governance prose into every file.

## CONFIG.md

```markdown
# Governance Configuration

Architect: <model selected by user>
Executor: <model selected by user>
Reviewer: <model or external reviewer selected by user>
Architecture Reviewer: <optional model selected by user>
Final Reviewer: <optional model selected by user>
Arbiter: <optional model or external arbiter selected by user>

Reviewer mode: INTERNAL | EXTERNAL
Elevated review: ENABLED | EXTERNAL
Arbiter mode: DISABLED | INTERNAL | EXTERNAL
Delivery mode: GREENFIELD | EXISTING_INSTALLATION
Task commits: LOCAL_REQUIRED
Push: EXPLICIT_AUTHORIZATION_REQUIRED
Git plaintext secrets: DENIED_BY_DEFAULT
```

## STATUS.md

```markdown
# Status

State: BASELINING
Current milestone: NONE
Current task: NONE
Current slice: NONE
Work class: NONE
Discovery depth: NONE
Discovery status: NOT_STARTED
Material unknown count: 0
Product scope: NOT_REQUIRED
Product blueprint version: NONE
Product completeness: NOT_EVALUATED
Review depth: NONE
Review cycle: 0/3
Release readiness: NOT_EVALUATED
Last verified commit: NONE

## Blockers
None.

## Required external access
None.

## Next action
Architect performs the initial adversarial codebase baseline.
```

## CODEBASE_BASELINE.md

```markdown
# Codebase Baseline

## Repository state
## Existing installation state
## Stack and runtime
## Architecture and modules
## Entry points and data flows
## Trust boundaries
## Persistence and migrations
## External integrations
## Tests and coverage gaps
## Deployment boundary
## Maintainability risks
## Plaintext secret and tracked-sensitive-file check
## Known defects and regression risks
## Constraints and blocking unknowns
## Baseline source revision
## Baseline freshness triggers
```

## CONTEXT_INDEX.md

```markdown
# Context Index

## Baseline reference
## Material modules and entry points
## Dependency and call edges
## Data flows and trust boundaries
## Security-sensitive surfaces
## Canonical documentation
## Tests and validation capabilities
## Deployment scope
## Product-affecting surfaces
## Known risks
## Freshness triggers
```

## DEPLOYMENT_SCOPE.md

```markdown
# Deployment Scope

## Production runtime scope
## Runtime-required files outside primary source directories
## Development-only scope
- tests
- development documentation
- .ai governance state
- review and evidence artifacts
- local tooling
- caches and IDE state

## Secret delivery
Secrets are supplied at runtime and are not committed or packaged in plaintext.

## Package exclusions
## Stack-specific exceptions
```

## PROJECT_HISTORY.md

```markdown
# Project History

Append new events. Do not rewrite previous events.

## <ISO-8601 timestamp>
Role: <Architect | Executor | Reviewer | Architecture Reviewer | Final Reviewer | Arbiter | User>
Model: <configured model or external role label>
Milestone: <id or NONE>
Task: <id or NONE>
Slice: <id or NONE>
Action: <material action>
Result: <result>
Evidence: <paths or NONE>
Git action: <NONE | LOCAL_COMMIT_REQUIRED | LOCAL_COMMIT_CREATED | PUSH_EXPLICITLY_AUTHORIZED>
Next state: <governance state>
```

# Conditional product templates

Create `.ai/product/` only for product-affecting work. A purely technical patch with established no-product-scope impact does not require these files.

Each product artifact begins with:

```markdown
Product ID: <stable-id>
Product schema version: 1
Product version: <monotonic-version>
Status: DRAFT | APPROVAL_REQUIRED | APPROVED | STALE | BLOCKED
Source references: <paths/events>
Last updated: <ISO-8601 timestamp>
```

## PRODUCT_VISION.md

```markdown
# Product Vision

## Problem
## Intended outcomes
## Stakeholders
## Complete approved scope
## Constraints
## Explicit exclusions
## Completion definition
## Material unknowns
```

## USER_AND_ROLE_MODEL.md

```markdown
# User and Role Model

## Actors
## Responsibilities
## Permission matrix
## Approvals
## Ownership
## Segregation of duties
## Abuse and authorization boundaries
```

## DOMAIN_AND_PROCESS_MODEL.md

```markdown
# Domain and Process Model

## Entities and value concepts
## Lifecycles and state transitions
## Business rules
## Primary workflows
## Negative workflows and exceptions
## Data ownership and retention
## Integrations
```

## PRODUCT_COMPLETENESS_MATRIX.md

```markdown
# Product Completeness Matrix

| Capability ID | Capability | Classification | Provenance | Acceptance criteria | Impact | Approval | Evidence | Status |
|---|---|---|---|---|---|---|---|---|
| CAP-EXAMPLE-001 | <capability> | REQUIRED | <reference> | <criteria> | <impact> | <approval> | <evidence> | NOT_STARTED |

Allowed classification: REQUIRED | OPTIONAL | NOT_APPLICABLE | DEFERRED

## Remaining required capabilities
## Completeness blockers
```

## PRODUCT_BLUEPRINT.md

```markdown
# Product Blueprint

Blueprint version: <version>
Approval status: DRAFT | APPROVAL_REQUIRED | APPROVED | STALE | BLOCKED

## Approved product definition
## Delivery architecture
## Vertical milestones
### <MILESTONE-ID>
Type: VERTICAL_MILESTONE
Outcome: <coherent end-to-end user/business result>
Capability IDs: <IDs>
Acceptance boundary: <boundary>

## Compatibility and migration strategy
## Operational and recovery model
## Traceability to product decisions
```

## PRODUCT_DECISIONS.md

```markdown
# Product Decisions

Append new entries. Do not rewrite prior decisions.

## <ISO-8601 timestamp> — <decision-id>
Class: ESTABLISHED_FACT | REVERSIBLE_TECHNICAL_DEFAULT | MATERIAL_TECHNICAL_DECISION | MATERIAL_PRODUCT_DECISION | LEGAL_OR_SAFETY_CONSTRAINT | EXPLICITLY_DEFERRED_DECISION
Context: <context>
Options: <options>
Governance recommendation: <recommendation>
Final user/owner decision: <decision>
Override: NONE | USER_OVERRIDE_ACCEPTED | BLOCKED
Consequences: <consequences>
Supersedes: <decision-id or NONE>
Source references: <references>
```

# Task templates

## Task requirement files

`.ai/tasks/<TASK-ID>/ORIGINAL_USER_REQUEST.md`

```markdown
# Original User Request

<authoritative request with secret values redacted only where required>
```

`.ai/tasks/<TASK-ID>/CLARIFICATION_TRANSCRIPT.md`

```markdown
# Clarification Transcript

No clarification required.
```

When clarification is required, append timestamped question/answer entries and explicit superseding decisions. Material `STEERING.md` entries are appended here before they can alter scope or implementation.

`.ai/tasks/<TASK-ID>/APPROVED_REQUIREMENTS.md`

```markdown
# Approved Requirements

## Requirements
- R1: <requirement> — Source: <original request or clarification reference>

## Resolved ambiguities
None.

## Explicitly out of scope
```

## CONTEXT_MANIFEST.md

```markdown
# Task Context Manifest

Repository head: <sha>
Worktree state: CLEAN | DIRTY
Baseline reference: <sha/ref>
Product blueprint version: <version or NOT_REQUIRED>
Affected capability IDs: <IDs or NONE>

## Selected surfaces
## Relevant callers/callees and dependency edges
## Affected data flows/trust boundaries
## Applicable project instructions
## Relevant tests/documentation
## Product evidence
## Safe exclusions
## Context expansion triggers
```

## TASK_PLAN.md

```markdown
# Task Plan

Task: <TASK-ID>
Goal: <goal>
Work class: PATCH | BOUNDED_FEATURE | MAJOR_FEATURE | EXISTING_PRODUCT_EVOLUTION | NEW_PRODUCT | HIGH_RISK_CHANGE
Discovery depth: LIGHT | STANDARD | DEEP
Product blueprint version: <version or NOT_REQUIRED>
Affected capability IDs: <IDs or NONE>

## Exact scope
## Out of scope
## Slices
## Acceptance criteria
## Product capability traceability
## Expected product-completeness impact
## Regression surface
## Migration impact
## Security and secret impact
## Deployment impact
## Maintainability impact
## Documentation impact
NONE | UPDATE_REQUIRED | CREATE_REQUIRED

## External validation
## Minimum change assessment
Root cause/evidence-backed hypothesis: <...>
Existing/native capability considered: <...>
Installed dependency capability considered: <...>
New dependency/abstraction justification: <NONE or reason>
Why this is the smallest correct secure maintainable change: <...>

Authorization: READY_FOR_EXECUTION | NOT_READY
```

## VERIFICATION_PROFILE.md

```markdown
# Verification Profile

Review depth: STANDARD | ELEVATED

## Task risk profile
SECURITY: NONE | LOW | HIGH
DATA_MIGRATION: NONE | LOW | HIGH
PUBLIC_CONTRACT: NONE | LOW | HIGH
DEPENDENCY: NONE | LOW | HIGH
DEPLOYMENT: NONE | LOW | HIGH
PERFORMANCE: NONE | LOW | HIGH
GENERATED_ARTIFACT: NONE | LOW | HIGH
DESTRUCTIVE_ACTION: NONE | LOW | HIGH
INPUT_VALIDATION: NONE | LOW | HIGH
TEST_RELIABILITY: NONE | LOW | HIGH
HUMAN_OWNERSHIP: NONE | LOW | HIGH
USER_FLOW: NONE | LOW | HIGH
VISUAL_BEHAVIOR: NONE | LOW | HIGH
EXTERNAL_TOOLING: NONE | LOW | HIGH
RECOVERY: NONE | LOW | HIGH
EXPERIMENTATION: NONE | LOW | HIGH

## Validation profile
## Required/conditional/not-applicable gates
## Evidence freshness dependencies
```

## evidence/VERIFICATION_EVIDENCE.md

```markdown
# Verification Evidence

Target: <git/diff/artifact reference>

| Gate | Status | Evidence |
|---|---|---|
| <gate> | PASS | <command/result/path> |

Allowed status: PASS | FAIL | UNAVAILABLE | STALE | BLOCKED

## Outstanding required evidence
None.
```

## RUN_STATE.json

Use the minimum schema defined in `project-state.md`. Update only at meaningful phase boundaries.

## STEERING.md

```markdown
# Governed Steering

## <ISO-8601 timestamp>
Direction: <authoritative new direction>
Source: <user/owner reference>
Materiality: MATERIAL | NON_MATERIAL
Processed into clarification transcript: YES | NO
Replanning required: YES | NO
```

## Arbitration record

Store under `.ai/arbitration/` with context, Architect position, Executor evidence, material disagreement, independent analysis, decision, required replan/constraints, and resolution.

## Production readiness

```markdown
# Production Readiness

## Release candidate
## Product completeness verdict
PRODUCT_COMPLETE | PRODUCT_DEFECT | PRODUCT_BLOCKED

## Verification evidence
## Operational Assurance evidence
## Deployment-scope verification
## Plaintext secret scan
## Adversarial reviews
## Unresolved blockers
## Release verdict
READY_FOR_PRODUCTION | NOT_READY_FOR_PRODUCTION
```

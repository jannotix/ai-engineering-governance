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
Review depth: NONE
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

When clarification is required, append timestamped question/answer entries and explicit superseding decisions.

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

## Selected surfaces
## Relevant callers/callees and dependency edges
## Affected data flows/trust boundaries
## Applicable project instructions
## Relevant tests/documentation
## Safe exclusions
## Context expansion triggers
```

## TASK_PLAN.md

```markdown
# Task Plan

Task: <TASK-ID>
Goal: <goal>

## Exact scope
## Out of scope
## Slices
## Acceptance criteria
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

## Arbitration record

Store under `.ai/arbitration/` with context, Architect position, Executor evidence, material disagreement, independent analysis, decision, required replan/constraints, and resolution.

## Production readiness

```markdown
# Production Readiness

## Release candidate
## Verification evidence
## Operational Assurance evidence
## Deployment-scope verification
## Plaintext secret scan
## Adversarial reviews
## Unresolved blockers
## Verdict
READY_FOR_PRODUCTION | NOT_READY_FOR_PRODUCTION
```
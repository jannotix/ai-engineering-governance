# Canonical Project Templates

Create concise project-specific documents. Do not copy governance prose into every file.

## CONFIG.md

```markdown
# Governance Configuration

## Role bindings
Architect: <model selected by user>
Executor: <model selected by user>
Reviewer: <model or external reviewer selected by user>
Arbiter: <optional model or external arbiter selected by user>

## Reviewer mode
INTERNAL | EXTERNAL

## Arbiter mode
DISABLED | INTERNAL | EXTERNAL

## Delivery mode
GREENFIELD | EXISTING_INSTALLATION

## Git policy
Task commits: LOCAL_REQUIRED
Push: EXPLICIT_AUTHORIZATION_REQUIRED

## Secret policy
Git plaintext secrets: DENIED_BY_DEFAULT
```

## STATUS.md

```markdown
# Status

State: BASELINING
Current milestone: NONE
Current task: NONE
Current slice: NONE
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

## Plaintext secret and tracked-sensitive-file check

## Known defects and regression risks

## Constraints and blocking unknowns

## Baseline source revision

## Baseline freshness triggers
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
Role: <Architect | Executor | Reviewer | Arbiter | User>
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

## CURRENT_MILESTONE.md

```markdown
# Current Milestone

## Goal

## Requirements covered

## Tasks

Each task defines:
- task identifier;
- goal;
- exact scope;
- out of scope;
- Architect approval state;
- adversarial impact analysis;
- regression surface;
- slices;
- acceptance criteria;
- tests;
- migration impact;
- security and secret impact;
- deployment impact;
- external validation;
- expected working end state.

## Follow-ups

## Deferrals

## Exit criteria
```

## Arbitration record

Store under `.ai/arbitration/`.

```markdown
# Arbitration

## Context

## Architect position

## Executor evidence or constraint

## Material disagreement

## Independent analysis

## Decision

## Required replan or implementation constraints

## Resolution
```

## Production readiness

```markdown
# Production Readiness

## Release candidate

## Verification evidence

## Deployment-scope verification

## Plaintext secret scan

## Adversarial reviews

## Unresolved blockers

## Verdict
READY_FOR_PRODUCTION | NOT_READY_FOR_PRODUCTION
```

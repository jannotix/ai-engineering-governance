# AI Engineering Governance

AI Engineering Governance is a model-agnostic ZCode plugin for structured, auditable software delivery.

It separates work into three primary roles and one optional dispute role:

- **Architect** — adversarially reverse-engineers the codebase, owns requirements and architecture, and approves every task before implementation.
- **Executor** — implements only approved tasks, verifies them, records evidence, and creates local task commits.
- **Reviewer** — independently verifies completed milestones and final release candidates.
- **Arbiter** — resolves material unresolved disagreement between Architect planning and Executor implementation evidence.

The plugin does not require a specific model or provider.

## Core guarantees

- Initial adversarial analysis of the complete codebase before implementation.
- Architect planning and approval before every Executor task.
- Append-only project engineering history.
- Local Git commit for every validated task.
- No Git push without explicit authorization.
- Plaintext secrets excluded from Git by default.
- Architect and Reviewer always check for plaintext secret exposure.
- Development workspace separated from the production deployment scope.
- Tests, development documentation, governance, and evidence excluded from production packages by default.
- Independent milestone and release review.
- Optional independent arbitration when planning and implementation materially disagree.
- Clean-install and existing-install migration verification.
- Evidence before completion claims.

## Install in ZCode

1. Open any workspace in ZCode.
2. Open **Settings → Plugins → Marketplace**.
3. Click **+**.
4. Add `https://github.com/jannotix/ai-engineering-governance`.
5. Install **AI Engineering Governance**.
6. Start a new Agent session if needed.

## First use

Run:

```text
/ai-init
/ai-setup
```

`/ai-init` creates or validates project-local `.ai/` state.

The initial project state includes:

```text
.ai/
├── CODEBASE_BASELINE.md
├── DEPLOYMENT_SCOPE.md
├── PROJECT_HISTORY.md
├── CONFIG.md
├── STATUS.md
├── CURRENT_MILESTONE.md
├── ...
└── arbitration/
```

The Architect must complete the initial adversarial codebase baseline before implementation can begin.

`/ai-setup` records role assignments:

```text
Architect: your preferred architecture/reasoning model
Executor: your preferred coding model
Reviewer: your preferred review model or external reviewer
Reviewer mode: INTERNAL or EXTERNAL
Arbiter: optional dispute-resolution model or external arbiter
Arbiter mode: DISABLED, INTERNAL, or EXTERNAL
```

Role bindings are governance configuration. They do not switch the ZCode model automatically.

## Typical workflow

### Initial baseline

Select the configured Architect model and run:

```text
/ai-architect
```

The Architect first performs:

```text
complete codebase
    ↓
adversarial reverse engineering
    ↓
security and plaintext-secret check
    ↓
deployment boundary
    ↓
CODEBASE_BASELINE.md
```

### Every task

Before each task, the Architect returns:

```text
current repository state
    ↓
changes since previous task
    ↓
adversarial impact analysis
    ↓
task scope and slices
    ↓
acceptance criteria
    ↓
tests / regressions / migrations
    ↓
security / secrets / deployment impact
    ↓
READY_FOR_EXECUTION
```

Then select the configured Executor model and run:

```text
/ai-execute
```

The Executor performs:

```text
approved task
    ↓
implementation
    ↓
focused tests
    ↓
regression and runtime verification
    ↓
TASK_VALIDATED
    ↓
staged diff + plaintext-secret check
    ↓
local task commit
    ↓
NO PUSH
```

The Architect then plans or re-authorizes the next task.

### Arbitration

When Executor evidence materially conflicts with the approved plan, the Executor stops and returns the evidence to the Architect.

If normal replanning cannot safely resolve the disagreement, the Architect sets:

```text
ARBITRATION_REQUIRED
```

Then run:

```text
/ai-arbitrate
```

For an internal Arbiter, select its configured model first.

For an external Arbiter, `/ai-arbitrate` prepares the handoff under `.ai/arbitration/`.

The Arbiter is independent. Neither Architect nor Executor automatically wins the disagreement.

### Milestone review

For an internal Reviewer:

```text
/ai-review
```

For an external Reviewer, the command prepares the handoff and the external reviewer inspects the same repository and `.ai/` state.

The Reviewer always checks security, plaintext secrets, migrations, tests, runtime evidence, and deployment-scope correctness.

### Continue later

When reopening a governed project:

```text
/ai-start
```

The plugin reads `.ai/STATUS.md` and the latest `PROJECT_HISTORY.md` event to route the next role.

Use:

```text
/ai-status
```

to see current task, latest history event, Git state, blockers, arbitration, local commit state, and the exact next action.

### Final release

Run:

```text
/ai-release
```

The final package is built from `.ai/DEPLOYMENT_SCOPE.md`, not by uploading the entire development workspace.

The release workflow verifies:

```text
requirements
    ↓
tests and quality gates
    ↓
migration/upgrade path when applicable
    ↓
clean installation
    ↓
external integrations
    ↓
plaintext-secret scan
    ↓
production-only deployment package
    ↓
package extraction and reinstall
    ↓
adversarial release review
    ↓
READY_FOR_PRODUCTION
or
NOT_READY_FOR_PRODUCTION
```

## Project history

`.ai/PROJECT_HISTORY.md` is append-only.

It records material actions with timestamp, role, configured model or external-role label, milestone/task/slice, result, evidence, Git action, and next state.

This history survives chat/session changes and is versioned with the project.

## Git policy

Each validated task requires a local commit.

The Executor stages only the approved task files and relevant `.ai/` evidence/state. It must inspect staged content before committing.

Git push is disabled by policy unless the user explicitly authorizes that specific push action.

A previous push authorization does not authorize future pushes.

## Secret policy

Plaintext secrets are excluded from Git by default.

Architect and Reviewer always inspect for plaintext secret exposure. Executor checks staged content before task commits.

If a secret is already tracked, adding it to ignore rules is not enough. It must be removed from tracking and potential exposure assessed for revocation or rotation.

Prefer runtime environment variables, secret managers, or encrypted secret stores.

## Development workspace and production codebase

The repository is the development workspace.

`.ai/DEPLOYMENT_SCOPE.md` defines the production runtime scope.

For new projects, development-only content should live outside the deployable production scope. This includes tests, development documentation, `.ai/`, review artifacts, evidence, local tooling, and similar material.

For existing projects, the Architect identifies the current safe runtime boundary instead of blindly restructuring the repository.

Production packages contain only runtime-required files.

## Commands

| Command | Purpose |
| --- | --- |
| `/ai-init` | Initialize or upgrade governance state |
| `/ai-setup` | Configure role bindings and review/arbitration modes |
| `/ai-status` | Show state, history, Git status, blockers, and next action |
| `/ai-architect` | Baseline the codebase and plan/re-authorize the next task |
| `/ai-execute` | Implement and validate approved work, then create the local task commit |
| `/ai-arbitrate` | Resolve or hand off a material Architect/Executor disagreement |
| `/ai-review` | Independently review a completed milestone |
| `/ai-start` | Continue from current governed state |
| `/ai-release` | Run final production-readiness workflow |

## Model selection

Plugin subagents do not hard-code model IDs. They inherit the model selected in ZCode.

Before invoking a role, select its configured model in the ZCode model picker.

External Reviewer and Arbiter modes allow those roles to run outside ZCode.

## Architecture policy

The Architect chooses the least complex structure that safely satisfies the requirements:

1. Preserve the existing architecture when appropriate.
2. Prefer simple modular design.
3. Prefer a modular monolith for larger applications.
4. Apply tactical DDD patterns only to genuinely complex domains.
5. Introduce distributed services only with explicit operational justification.

Patterns are tools, not goals.

## License

Functional Source License 1.1 with MIT Future License (`FSL-1.1-MIT`).

Copyright 2026 Gianluca Iannotta.

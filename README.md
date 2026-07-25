# AI Engineering Governance

AI Engineering Governance is a model-agnostic ZCode plugin for structured software delivery.

It separates software work into three roles:

- **Architect** — owns requirements, architecture, milestones, tasks, slices, acceptance criteria, migrations, test strategy, and technical decisions.
- **Executor** — implements approved slices, keeps the repository working, and produces executable verification evidence.
- **Reviewer** — independently verifies completed milestones and final release candidates.

The plugin does not require a specific model or provider. Each role uses the model selected by the user.

## Principles

- Specification-driven development for meaningful changes.
- Existing project conventions before new abstractions.
- Simple modular design by default.
- Domain-driven design only when domain complexity justifies it.
- Minimal code and minimal dependencies.
- No deprecated or end-of-life technology.
- Small, independently verifiable slices.
- Local-first testing.
- Docker or equivalent local infrastructure when practical.
- Real sandbox or test-environment validation for external integrations.
- Clean-install verification for every final release.
- Upgrade and migration verification for existing installations.
- Independent adversarial review before production readiness.
- Evidence before completion claims.

## Install in ZCode

1. Open any workspace in ZCode.
2. Open **Settings → Plugins → Marketplace**.
3. Click **+**.
4. Add `https://github.com/jannotix/ai-engineering-governance`.
5. Install **AI Engineering Governance**.
6. Start a new Agent session if needed.

## First use

Run `/ai-init`.

The plugin inspects the current workspace and creates the project-local `.ai/` state required for governance.

The `.ai/` directory belongs to the project and should normally be committed with the source code. It stores project-specific architecture, requirements, milestones, evidence, decisions, reviews, and release state. The governance method itself remains in this plugin.

Then run `/ai-setup` and record the models or review mode you want to use for the three roles.

Example:

```text
Architect: your preferred architecture/reasoning model
Executor: your preferred coding model
Reviewer: your preferred review model or external reviewer
Reviewer mode: INTERNAL or EXTERNAL
```

## Typical workflow

### 1. Initialize the project

```text
/ai-init
/ai-setup
```

The plugin creates or validates `.ai/`, identifies whether the project is greenfield or an existing installation, and records the configured role bindings.

### 2. Architecture and planning

Select the model configured for the **Architect** role in the ZCode model picker, then run:

```text
/ai-architect
```

or invoke the plugin subagent directly:

```text
@ai-engineering-governance:architect
```

The Architect is responsible for:

```text
requirements
    ↓
architecture
    ↓
roadmap
    ↓
milestones
    ↓
tasks
    ↓
small verifiable slices
    ↓
acceptance criteria
    ↓
test and migration strategy
```

The Architect does not perform normal feature implementation.

### 3. Implementation

When an approved slice is ready, select the model configured for the **Executor** role, then run:

```text
/ai-execute
```

or:

```text
@ai-engineering-governance:executor
```

The Executor implements only the approved slice and must leave the project in a working state.

```text
approved slice
    ↓
implementation
    ↓
focused tests
    ↓
regression verification
    ↓
local runtime verification
    ↓
evidence
```

If the Executor discovers an architectural problem, it must stop and raise an architecture blocker instead of redesigning the system independently.

### 4. Milestone review

When the milestone is complete, review it independently.

For an **internal reviewer**, select the configured Reviewer model and run:

```text
/ai-review
```

or:

```text
@ai-engineering-governance:reviewer
```

For an **external reviewer**, run:

```text
/ai-review
```

The plugin prepares the review handoff and marks the project ready for external review. Run the external reviewer against the same repository and `.ai/` state, then record the resulting review artifact in the project.

The reviewer must treat previous implementation reports as claims, not proof.

### 5. Continue the project

For normal daily use, run:

```text
/ai-start
```

The command reads `.ai/STATUS.md` and routes the next governed action according to the current state.

### 6. Final release

When all milestones are complete, run:

```text
/ai-release
```

The release workflow verifies, where applicable:

```text
requirements
    ↓
full test and quality gates
    ↓
existing-install migrations
    ↓
clean installation from zero
    ↓
external integrations
    ↓
security verification
    ↓
final package
    ↓
package extraction and reinstall
    ↓
adversarial release review
    ↓
READY_FOR_PRODUCTION
or
NOT_READY_FOR_PRODUCTION
```

## Important: role binding does not switch models automatically

`/ai-setup` records which model you intend to use for each role. It does **not** change the active ZCode model automatically.

Before invoking a role, select its configured model in the ZCode model picker:

```text
Select Architect model
    ↓
/ai-architect
    ↓
Select Executor model
    ↓
/ai-execute
    ↓
Select Reviewer model or use external review
    ↓
/ai-review
```

Plugin subagents currently use **Inherit**, so they inherit the active ZCode model. This is intentional and keeps the plugin provider-neutral.

## Commands

| Command | Purpose |
| --- | --- |
| `/ai-init` | Initialize governance in the current repository |
| `/ai-setup` | Define role bindings and project execution preferences |
| `/ai-status` | Show current milestone, slice, blockers, and next action |
| `/ai-architect` | Run architecture and planning work |
| `/ai-execute` | Implement the currently approved slice |
| `/ai-review` | Independently review a completed milestone |
| `/ai-start` | Continue from the current governed project state |
| `/ai-release` | Run final release-readiness workflow |

## Model selection

The plugin is deliberately provider-neutral.

Plugin subagents do not hard-code model IDs. They inherit the model selected in ZCode. This avoids coupling the workflow to a vendor-specific identifier and keeps the plugin usable with current and future providers.

For workflows that use different models for different roles, select the intended model before invoking the relevant role or command. Record the chosen role assignments with `/ai-setup`.

## Architecture policy

The architect chooses the least complex structure that safely satisfies the requirements:

1. Preserve the existing architecture when appropriate.
2. Prefer simple modular design.
3. Prefer a modular monolith for larger applications.
4. Apply tactical DDD patterns only to genuinely complex domains.
5. Introduce distributed services only with explicit operational justification.

Patterns are tools, not goals.

## Delivery policy

A final release is not complete until:

- required tests pass;
- relevant local runtime paths are exercised;
- upgrade migrations pass when applicable;
- a clean installation from empty state passes;
- required external integrations are tested in an appropriate environment;
- the final release package is extracted and verified again;
- adversarial release review is complete;
- production readiness is explicitly determined.

The only final production verdicts are:

- `READY_FOR_PRODUCTION`
- `NOT_READY_FOR_PRODUCTION`

## License

Functional Source License 1.1 with MIT Future License (`FSL-1.1-MIT`).

Copyright 2026 Gianluca Iannotta.

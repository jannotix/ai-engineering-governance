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

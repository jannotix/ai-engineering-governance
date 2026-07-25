# Plugin Architecture

The repository is both a ZCode marketplace and the source distribution for one plugin.

```text
marketplace.json
└── plugins/
    └── ai-engineering-governance/
        ├── .zcode-plugin/plugin.json
        ├── commands/
        ├── agents/
        └── skills/
```

## Separation of concerns

The plugin owns reusable engineering policy, role system prompts, commands, and canonical state contracts.

Each governed repository owns only project-specific `.ai/` state: requirements, architecture decisions, roadmap, milestones, status, evidence, migration state, reviews, and release readiness.

## Model neutrality

No provider or model identifier is hard-coded.

Plugin subagents inherit the model selected by the user. Project role bindings are recorded for governance and human clarity. ZCode model selection remains under user control.

## Reviewer independence

The reviewer may be an internal ZCode model or an external reviewer. External review is represented as a governed handoff; the plugin never impersonates a reviewer that has not executed the review.

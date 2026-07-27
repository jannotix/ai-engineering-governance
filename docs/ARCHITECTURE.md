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

The plugin owns reusable engineering policy, role prompts, commands, verification semantics, and canonical state contracts.

Governed repositories own only project-specific `.ai/` state. Reusable baseline/context state is kept separate from task-local requirement, plan, evidence, and review artifacts.

```text
.ai/
├── CODEBASE_BASELINE.md
├── CONTEXT_INDEX.md
├── DEPLOYMENT_SCOPE.md
├── PROJECT_HISTORY.md
└── tasks/<TASK-ID>/
    ├── requirement provenance
    ├── context manifest
    ├── task plan
    ├── verification profile
    ├── run state
    ├── evidence/
    └── reviews/
```

## Model neutrality

No provider or model identifier is hard-coded. Plugin subagents inherit the model selected by the user. Project role bindings are governance configuration only; ZCode model selection remains under user control.

## Adaptive review

Normal tasks use one independent implementation Reviewer.

ELEVATED risk/milestone/release review uses two independent advisory views over the same frozen target:

```text
Reviewer
+
Architecture/Security Reviewer
        ↓
Final Reviewer
```

The two advisory reviewers do not consume sibling current-cycle findings before their reports complete. Final Reviewer independently validates requirement provenance, plan/risk authorization, primary evidence, and reviewer allegations.

Arbiter is not part of normal review. It is reserved for unresolved Architect/Executor disagreement before validation.

## Command minimalism

The plugin intentionally does not duplicate ZCode-native planning, goal/session continuation, usage statistics, or task-management surfaces with additional slash commands.

`/ai-start` performs governance-state reconciliation; `/ai-review` routes STANDARD/ELEVATED review; evidence and Operational Assurance are contracts inside existing task workflow rather than separate commands.
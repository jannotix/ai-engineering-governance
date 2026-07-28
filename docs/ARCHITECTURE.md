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

The plugin owns reusable product/engineering policy, role prompts, commands, discovery/review semantics, verification semantics, and canonical state contracts.

Governed repositories own only project-specific `.ai/` state. Reusable baseline/context state is separate from conditional product state and task-local requirement, plan, evidence, and review artifacts.

```text
.ai/
├── CODEBASE_BASELINE.md
├── CONTEXT_INDEX.md
├── DEPLOYMENT_SCOPE.md
├── PROJECT_HISTORY.md
├── product/                     # only for product-affecting work
│   ├── vision and users/roles
│   ├── domain/process model
│   ├── completeness matrix
│   ├── approved blueprint
│   └── append-only decisions
└── tasks/<TASK-ID>/
    ├── requirement provenance
    ├── context manifest
    ├── task plan and capability traceability
    ├── verification profile
    ├── run state and optional steering
    ├── evidence/
    └── reviews/
```

Product artifacts are downstream from canonical task provenance and never rewrite historical requirements.

## Product lifecycle routing

`/ai-architect` owns request classification, `LIGHT | STANDARD | DEEP` discovery, constructive challenge, guided decisions, conditional product definition, vertical milestone planning, and normal task planning. A separate discovery command is intentionally not added.

`/ai-review` routes:

- `DISCOVERY_REVIEW`;
- STANDARD task review;
- ELEVATED task/milestone review;
- product-completeness reconciliation;
- release review.

The same reviewer roles are reused rather than adding discovery-specific agents.

## Model neutrality

No provider or model identifier is hard-coded. Plugin subagents inherit the model selected by the user. Project role bindings are governance configuration only; ZCode model selection remains under user control.

## Adaptive independent review

Normal tasks use one independent Implementation Reviewer.

Required discovery, ELEVATED risk/milestone/product/release review uses two isolated advisory views over the same frozen target:

```text
Reviewer
+
Architecture/Security Reviewer
        ↓
Final Reviewer
```

The advisory reviewers do not consume sibling current-cycle findings before their reports complete. Final Reviewer independently validates requirement/product provenance, plan/risk authorization, primary evidence, and allegations.

Final Reviewer controls distinct verdict families:

```text
DISCOVERY_PASS | DISCOVERY_DEFECT | DISCOVERY_BLOCKED
PASS | IMPLEMENTATION_DEFECT | PLAN_DEFECT | BLOCKED
PRODUCT_COMPLETE | PRODUCT_DEFECT | PRODUCT_BLOCKED
READY_FOR_PRODUCTION | NOT_READY_FOR_PRODUCTION
```

Arbiter is not part of normal review. It is reserved for unresolved Architect/Executor disagreement before validation.

## Command minimalism

The plugin intentionally does not duplicate ZCode-native planning, goal/session continuation, usage statistics, or task-management surfaces with additional slash commands.

- `/ai-architect` includes adaptive discovery and product definition.
- `/ai-start` performs product/task/Git/evidence-state reconciliation.
- `/ai-review` routes discovery, task, product, and release review.
- Evidence and Operational Assurance remain contracts inside the existing workflow.

The public command surface remains nine commands.

## Repository verification

GitHub Actions validates JSON manifests, repository tests, stale references, temporary/diagnostic residue, and obvious secret patterns on push and pull request.
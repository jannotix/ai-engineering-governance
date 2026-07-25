# Project State Contract

`/ai-init` creates `.ai/` in the workspace root.

Required structure:

```text
.ai/
├── CONFIG.md
├── PROJECT.md
├── REQUIREMENTS.md
├── ARCHITECTURE.md
├── ROADMAP.md
├── STATUS.md
├── CURRENT_MILESTONE.md
├── TEST_STRATEGY.md
├── LOCAL_ENVIRONMENT.md
├── INSTALLATION_AND_MIGRATIONS.md
├── DEPENDENCIES.md
├── SECURITY_BASELINE.md
├── QUALITY_GATES.md
├── PRODUCTION_READINESS.md
├── decisions/
├── milestones/
├── evidence/
├── reviews/
├── migrations/
├── followups/
├── deferred/
└── release/
```

The `.ai/` directory stores project state, not reusable governance policy.

Do not store credentials or secrets in `.ai/`.

## STATUS.md states

- INTAKE
- PLANNING
- READY
- IMPLEMENTING
- BLOCKED_ARCHITECTURE
- BLOCKED_EXTERNAL
- VERIFYING
- READY_FOR_REVIEW
- FIX_REQUIRED
- RELEASE_CANDIDATE
- ADVERSARIAL_REVIEW
- NOT_READY_FOR_PRODUCTION
- READY_FOR_PRODUCTION

# Project State Contract

`/ai-init` creates or validates `.ai/` in the workspace root.

Required structure:

```text
.ai/
├── CONFIG.md
├── PROJECT.md
├── REQUIREMENTS.md
├── ARCHITECTURE.md
├── CODEBASE_BASELINE.md
├── DEPLOYMENT_SCOPE.md
├── PROJECT_HISTORY.md
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
├── arbitration/
├── migrations/
├── followups/
├── deferred/
└── release/
```

The `.ai/` directory stores project state, not reusable governance policy.

Do not store credentials or secret values in `.ai/`.

`PROJECT_HISTORY.md` is append-only.

## STATUS.md states

- INTAKE
- BASELINING
- PLANNING
- TASK_PLANNING
- READY_FOR_EXECUTION
- IMPLEMENTING
- BLOCKED_ARCHITECTURE
- BLOCKED_EXTERNAL
- ARBITRATION_REQUIRED
- ARBITRATION_IN_PROGRESS
- TASK_VERIFYING
- TASK_VALIDATED
- LOCAL_COMMITTED
- VERIFYING
- READY_FOR_REVIEW
- FIX_REQUIRED
- RELEASE_CANDIDATE
- ADVERSARIAL_REVIEW
- NOT_READY_FOR_PRODUCTION
- READY_FOR_PRODUCTION

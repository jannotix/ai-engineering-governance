# Changelog

## 1.0.4 — 2026-07-25

- Removed the legacy `/ai-arbitrate` command.
- Kept `/ai-arbiter` as the single canonical Arbiter command.
- Updated documentation, governance policy, and regression tests to enforce one arbitration command name.

## 1.0.3 — 2026-07-25

- Added `/ai-arbiter` as the canonical command for the Arbiter role.
- Added role-aligned arbitration naming across governance documentation and routing.

## 1.0.2 — 2026-07-25

- Added maintainable source-structure governance for production code.
- Added Architect responsibility for identifying monolithic or multi-responsibility files during baseline and task planning.
- Added targeted extraction requirements when a task would materially worsen an oversized or low-cohesion file.
- Added Executor rules to keep changed production files and modules focused, cohesive, and testable.
- Added Reviewer checks for god files, oversized responsibility boundaries, coupling, narrow interfaces, and testability.
- Explicitly rejected arbitrary line-count limits and artificial micro-file fragmentation.

## 1.0.1 — 2026-07-25

- Added append-only project history and governed role/action audit trail.
- Added mandatory initial adversarial complete-codebase baseline.
- Added Architect approval before every Executor task.
- Added optional Arbiter role and arbitration workflow for material plan/implementation disagreements.
- Added local commit requirement for every validated task.
- Added explicit no-push-by-default policy.
- Added plaintext-secret exclusion and mandatory Architect/Reviewer secret checks.
- Added staged-secret checks before task commits.
- Added deployment scope separating production runtime content from tests, documentation, governance, and development artifacts.
- Added release enforcement for production-only packaging.

## 1.0.0 — 2026-07-25

Initial public release.

- Model-agnostic architect, executor, and reviewer roles.
- Specification-driven project governance.
- Milestone, task, and slice decomposition.
- Selective DDD architecture policy.
- Local-first and clean-install verification.
- Existing-install migration requirements.
- External integration validation policy.
- Adversarial milestone and release review.
- ZCode marketplace, plugin, commands, skills, and subagents.

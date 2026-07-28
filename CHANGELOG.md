# Changelog

## 1.2.0 — 2026-07-28

- Added adaptive product discovery with `WORK_CLASS`, `LIGHT | STANDARD | DEEP` depth, assistance mode, and material-unknown tracking for every governed request.
- Integrated discovery into `/ai-architect` without adding a redundant `/ai-discover` command.
- Added constructive challenge that separates user objective, proposed solution, governance recommendation, and final user decision instead of agreeing automatically.
- Added guided decision policy: only conventional low-risk reversible scope-neutral defaults may proceed without approval.
- Added conditional `.ai/product/` state for product vision, users/roles, domain/process model, capability completeness, approved blueprint, and append-only product decisions.
- Added stable capability IDs, vertical milestone delivery, and product capability traceability for product-affecting tasks.
- Added independent `DISCOVERY_REVIEW` using existing Reviewer and Architecture/Security Reviewer roles with Final Reviewer adjudication.
- Separated `PRODUCT_COMPLETE | PRODUCT_DEFECT | PRODUCT_BLOCKED` from `READY_FOR_PRODUCTION | NOT_READY_FOR_PRODUCTION`.
- Added governed mid-task `STEERING.md`, lazy adoption for existing projects, machine-readable `GOVERNANCE_RESULT`, and maximum three failed correction cycles.
- Added GitHub Actions verification for repository tests, stale documentation references, tracked temporary/diagnostic residue, and secret-pattern checks.
- Preserved the existing nine slash commands, model/provider neutrality, Evidence-Driven Verification, Operational Assurance, Arbiter workflow, secret safety, production-only packaging, and explicit push authorization.

## 1.1.0 — 2026-07-27

- Added canonical per-task Requirement Provenance with original request, clarification transcript, and approved requirements.
- Added reusable `CONTEXT_INDEX.md` plus task-local `CONTEXT_MANIFEST.md` for incremental context routing from validated baseline + Git delta.
- Added mandatory `MINIMUM_CHANGE_ASSESSMENT` before implementation.
- Added task-local `VERIFICATION_PROFILE.md`, `TASK_RISK_PROFILE`, `RUN_STATE.json`, and `VERIFICATION_EVIDENCE.md`.
- Added evidence states `PASS | FAIL | UNAVAILABLE | STALE | BLOCKED`; unavailable/stale required evidence cannot silently pass.
- Added Evidence-Driven gates for bugfix proof, test impact, contract compatibility, dependencies, generated artifacts, safepoints, and migrations.
- Added Operational Assurance for preview/runtime, user flows, visual behavior, tool/MCP capabilities, recovery, and safe experimentation without adding new slash commands.
- Added adaptive review: STANDARD Reviewer for normal tasks; independent Reviewer + Architecture/Security Reviewer + Final Reviewer for ELEVATED high-risk/milestone/release work.
- Moved task local commit after the review depth required by the verification profile has passed.
- Extended `/ai-start` to reconcile persisted task state, Git state, and evidence freshness without adding a redundant resume command.
- Preserved model/provider neutrality, `/ai-arbiter`, secret safety, production-only deployment scope, maintainable source rules, and explicit push authorization.

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

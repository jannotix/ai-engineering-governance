# Changelog

## 2.0.0 — 2026-07-30

- Added a zero-dependency Node.js 22.13.0+ deterministic runtime alongside the existing prompt governance.
- Added immutable `workspace`, `staged`, `commit`, and `base-diff` candidate projections with content-aware SHA-256 identity.
- Added fail-closed governed-path validation that rejects symbolic-link and junction traversal outside canonical project state.
- Added `GOVERNANCE_APPROVAL_RECEIPT_V1`, binding approved requirements, execution packet, verification profile, evidence, both independent reviews, and Final Reviewer adjudication to the exact reviewed candidate.
- Added a ZCode `PreToolUse` staged receipt gate that blocks `git commit` when the Git index or bound evidence changes; direct and patch-based receipt mutation is denied.
- Added `ACTIONABLE_CONTINUATION_V1` so every non-terminal `RUN_STATE.json` contains an exact `/ai-*` command and expected postcondition or a concrete human decision.
- Added deterministic `CONTEXT_BUDGET_V1`, a maximum of three retrieval cycles, explicit `CONTEXT_SUFFICIENT | BLOCKED_CONTEXT_GAP`, context metrics, and governed skill selection by trust, applicability, conflicts, overlap, tools, and token budget.
- Added exact evidence reuse: only a prior PASS with a byte-identical dependency map is reusable; changed inputs return `EVIDENCE_STALE`.
- Added `REVIEW_LENS_MATRIX_V1` with invariant implementation and architecture/security baselines plus risk-derived authorization, contract, migration, dependency, performance, accessibility, deployment, observability, resilience, recovery, and tooling lenses.
- Added Final-Reviewer-governed local SQLite engineering memory with `CANDIDATE | ACTIVE | SUPERSEDED | REJECTED`; policy promotion remains owner-authorized and requires at least two validated task occurrences.
- Added native ZCode `SessionStart`, `PreToolUse`, and `PostToolUse` process hooks and a local stdio MCP server exposing deterministic candidate, receipt, state, context, evidence, lens, and memory tools.
- Added fail-closed blocking for automatic push, PR creation/merge, publication, deployment, production rollback, frozen-target mutation, and invalid commits, including common shell-wrapper and opaque ApplyPatch cases.
- Added Node unit and subprocess contract simulations for MCP and Hook behavior; CI now validates Python contracts, Node syntax/runtime, JSON manifests, path safety, repository hygiene, and obvious secret patterns on Linux and Windows.
- Preserved all nine public commands, adaptive product discovery, requirement provenance, Evidence-Driven Verification, Operational Assurance, independent review, Arbiter authority, model/provider neutrality, production-only packaging, and explicit external-action authorization.

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

---
name: ai-engineering-governance
description: Use when planning, implementing, reviewing, migrating, testing, packaging, or releasing software that should remain verifiable, minimally designed, locally testable, and production-gated.
license: FSL-1.1-MIT
metadata:
  author: Gianluca Iannotta
  version: 1.0.0
---

# AI Engineering Governance

Use role boundaries and project-local evidence to keep software work controlled and reproducible.

## Authority

- **Architect:** owns requirements, architecture, decomposition, dependencies, migrations, test strategy, and technical decisions.
- **Executor:** implements only approved work and verifies it.
- **Reviewer:** independently challenges completion claims.

Do not silently cross role boundaries.

## Engineering rules

- Start meaningful work from a written specification.
- Preserve existing project conventions unless an approved decision changes them.
- Prefer the least complex architecture that safely satisfies current requirements.
- Use DDD only where domain complexity earns it.
- Reuse existing libraries before introducing new dependencies.
- Never add deprecated or end-of-life technology.
- Verify current stable supported technology before introducing it.
- Write the smallest clear implementation that satisfies acceptance criteria.
- Avoid speculative abstractions and future-proofing without a current requirement.
- Keep comments minimal, in English, and limited to non-obvious intent.
- Never add narrative comments about phases, steps, agents, or implementation history.

## Work decomposition

Large work must be decomposed:

Project → Milestone → Task → Slice

Each slice must:
- have explicit scope and acceptance criteria;
- be independently testable;
- preserve a runnable repository;
- include verification evidence;
- avoid unrelated refactoring.

Separate follow-ups and deferrals from required scope.

## Verification

Everything reasonably reproducible locally must be tested locally.

Use project-appropriate local infrastructure, including containers when useful for databases, caches, queues, object storage, search, mail, or other services.

Mocks can support tests but do not prove a real external integration works.

When meaningful validation requires an external sandbox, test account, credential, licensed host product, or remote environment:
1. identify the minimum required access;
2. request it explicitly;
3. test the actual integration;
4. record what was executed;
5. keep production readiness blocked while mandatory validation remains unexecuted.

## Installation and migrations

At intake, determine whether the target is:
- a new installation; or
- an existing installed system.

For existing systems, inspect the current version and state before designing migrations.

Final delivery always requires a verified clean installation from zero.

Existing-system work additionally requires a verified upgrade path and data-preservation checks.

## Completion

No completion claim without fresh evidence.

A final release requires:
- required tests;
- applicable build/static/security checks;
- clean installation;
- upgrade verification when applicable;
- required external validation;
- final-package extraction and reinstall verification;
- independent adversarial release review.

Final production status is exactly:
- READY_FOR_PRODUCTION
- NOT_READY_FOR_PRODUCTION

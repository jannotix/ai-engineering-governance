# Incremental Context Routing

The complete codebase is analyzed adversarially at initial baseline. Routine tasks must not repeatedly rescan the entire repository without evidence that the baseline is stale.

## Reusable context index

Maintain `.ai/CONTEXT_INDEX.md` as a compact routing map covering material modules, entry points, dependency/call edges, data and trust boundaries, security-sensitive surfaces, canonical documentation, tests/validation capabilities, deployment scope, and known risks.

It is a routing index, not a source-code copy.

## Per-task context

Each task keeps `.ai/tasks/<TASK-ID>/CONTEXT_MANIFEST.md` with:

- repository head and dirty-worktree state used for planning;
- selected modules/files/components;
- relevant callers, callees, and dependency edges;
- affected data flows and trust boundaries;
- applicable requirements and project instructions;
- relevant tests and canonical documentation;
- explicit safe exclusions;
- reasons for any context expansion.

Routine planning starts from the validated baseline/context index plus the current Git delta and expands only when primary evidence shows wider impact.

## Bounded read-only discovery

For materially multi-surface tasks, the Architect may use bounded parallel read-only discovery with available ZCode exploration capabilities.

Default bound: 2–4 independent discovery assignments.

Rules:

- discovery workers remain read-only;
- they do not make project/product decisions;
- summaries are hypotheses, not proof;
- material claims are verified against primary repository evidence before entering `CONTEXT_MANIFEST.md` or the task plan;
- trivial single-surface work does not use parallel discovery merely for speed.

## Minimum necessary change

Every implementation-ready task plan includes `MINIMUM_CHANGE_ASSESSMENT` covering:

- root cause or evidence-backed hypothesis;
- existing project/native/stdlib capability;
- already-installed dependency capability;
- justification for any new dependency or abstraction;
- why the proposed diff is the smallest correct, secure, maintainable solution.

Minimalism never removes required correctness, security, data-loss protection, error handling, accessibility, or approved behavior.
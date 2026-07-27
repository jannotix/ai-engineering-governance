# Requirement Provenance

Every governed task keeps the user's controlling intent separate from Architect interpretation.

Canonical task files live under `.ai/tasks/<TASK-ID>/`:

```text
ORIGINAL_USER_REQUEST.md
CLARIFICATION_TRANSCRIPT.md
APPROVED_REQUIREMENTS.md
```

## ORIGINAL_USER_REQUEST.md

Preserve the request that authorized the task. Redact real secret values before persistence, but do not silently replace the request with an Architect summary.

## CLARIFICATION_TRANSCRIPT.md

Append only material questions and authoritative user answers. When a later answer intentionally supersedes an earlier one, preserve both and identify the superseding decision.

When no clarification was required, record that explicitly.

## APPROVED_REQUIREMENTS.md

Normalize executable requirements only from:

- the original request;
- authoritative clarification answers;
- primary repository evidence establishing facts about the existing system.

Material requirements retain provenance to the authorizing input.

## Authority order

```text
ORIGINAL_USER_REQUEST
        +
CLARIFICATION_TRANSCRIPT
        ↓
APPROVED_REQUIREMENTS
        ↓
TASK_PLAN
        ↓
EXECUTOR IMPLEMENTATION
```

A plan cannot override the canonical requirement trail.

A task cannot become `READY_FOR_EXECUTION` while a material ambiguity, conflict, omission, unauthorized broadening, or unresolved controlling instruction remains.

If implementation follows a materially defective plan, review must classify the defect as a plan/requirements defect rather than approving it because the Executor followed instructions exactly.

Real credentials, tokens, passwords, private keys, and equivalent secrets must never be persisted in requirement artifacts.
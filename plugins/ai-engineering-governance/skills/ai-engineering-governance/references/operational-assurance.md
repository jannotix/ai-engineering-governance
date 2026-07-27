# Operational Assurance

Operational Assurance extends verification from code/test correctness to realistic runtime behavior, recovery, and external side-effect boundaries without adding new slash commands or mandatory runtime dependencies.

The governing invariant is:

> Verification may require more proof, but it may never grant more privilege.

Operational gates are planned in `VERIFICATION_PROFILE.md` and recorded in `evidence/VERIFICATION_EVIDENCE.md`.

## PREVIEW_ENVIRONMENT_GATE

When realistic runtime evidence is required, use an existing or explicitly approved local preview, ephemeral environment, staging, sandbox, or test environment.

Record the exact source/artifact, environment type, required services, and production-isolation boundary. A label such as "staging" is not proof of isolation.

Governance never provisions production infrastructure or uses production data/credentials merely to satisfy verification.

## USER_FLOW_VERIFICATION

For affected critical flows, use existing browser/E2E/native UI automation, project scripts, or deterministic manual reproduction when automation is unavailable.

Mocks do not replace required end-to-end runtime evidence.

## VISUAL_BEHAVIOR_GATE

For affected UI surfaces, verify objective behavior such as reachability, clipping/overflow, responsive states, loading/error/empty states, existing screenshot/visual-regression baselines, and explicit accessibility/visual requirements.

Subjective aesthetics are not governance defects without an authoritative requirement.

## RELEASE_RECOVERY_PROOF

For recovery-sensitive tasks/releases, record the previous stable reference/artifact, authoritative rollback or forward-recovery mechanism, application/config/schema/data compatibility, backup/restore requirements, and safe recovery validation evidence.

Never automatically execute production rollback.

## TOOL_CAPABILITY_PROFILE

Before relevant external tool/MCP use, classify capabilities as applicable:

```text
READ_ONLY | WRITE | EXECUTE | PRIVILEGED | DESTRUCTIVE
```

Record network exposure, secret boundary, external side effects, permitted role/task use, and required authorization without storing secret values.

Tool availability is not authorization.

## SAFE_EXPERIMENTATION

For genuinely experimental or high-risk work, use only an already permitted isolation mechanism such as a project-local sandbox, container, worktree/temporary clone, preview/test environment, or project-native equivalent.

Isolation must protect the canonical workspace, production data, secrets, and deployment boundaries. If the required isolation mechanism is unavailable or forbidden, record `UNAVAILABLE` or `BLOCKED`; do not weaken permissions to make the test possible.
# Release Gates

Release readiness relies on fresh required evidence. `UNAVAILABLE`, `STALE`, `FAIL`, or `BLOCKED` required proof cannot silently become PASS.

## Task/slice evidence gate

Implementation work may progress slice by slice, but task review begins only when acceptance criteria, planned focused/regression checks, required runtime/Operational Assurance evidence, migrations, and other REQUIRED gates are complete enough for the frozen target.

## Milestone gate

Milestone completion uses ELEVATED review and requires all governed tasks/required follow-ups, milestone regressions, applicable migrations/contracts/dependencies, runtime evidence, and unresolved blocker state to be revalidated for the milestone target.

## Clean-install gate

Required for every final release.

From a clean location:

1. install dependencies;
2. provision reproducible non-production infrastructure;
3. initialize empty persistent state;
4. run installers and migrations;
5. start the application;
6. run applicable smoke/integration/end-to-end/user-flow checks.

## Existing-install gate

When an installed baseline exists, verify baseline version/schema/runtime, forward migration path, representative data preservation, compatibility, and rollback/forward-recovery evidence as applicable.

## Package gate

Create the production distributable from `.ai/DEPLOYMENT_SCOPE.md`, not the entire development workspace. Exclude tests, `.ai/`, development-only documentation, review/evidence artifacts, local tooling, caches, IDE state, and plaintext secrets unless an explicit documented runtime/legal/packaging exception applies.

Extract into another clean location, perform the documented install/start procedure, rerun required checks, and record artifact identity/hash evidence.

## Operational gate

When applicable, require fresh evidence for preview/runtime target, critical user flows, objective visual behavior, external tool/MCP capability boundaries, recovery, and safe experimentation.

Operational proof never authorizes production deployment, rollback, merge, push, use of production secrets/data, or permission widening.

## External-integration gate

Mandatory integrations remain blocked until meaningful approved sandbox/test/real-environment validation has run. Mocks do not substitute for required real integration evidence.

## Security and secret gate

Plaintext secret exposure in tracked source or production package is blocking. Security-sensitive release evidence and relevant high-risk findings must be resolved or explicitly remain NOT_READY_FOR_PRODUCTION.

## Production gate

Release review is always ELEVATED: independent Implementation Reviewer + Architecture/Security Reviewer, followed by Final Reviewer adjudication.

`READY_FOR_PRODUCTION` requires fresh sufficient required evidence, deployment-scope correctness, clean install, applicable upgrade/migration proof, package extraction/reinstall proof, mandatory external/runtime validation, recovery proof when applicable, no unresolved blocking findings, and Final Reviewer approval.
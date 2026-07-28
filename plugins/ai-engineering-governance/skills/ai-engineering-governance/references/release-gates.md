# Release Gates

Release readiness relies on fresh required evidence. `UNAVAILABLE`, `STALE`, `FAIL`, or `BLOCKED` required proof cannot silently become PASS.

## Discovery and scope gate

When product state applies, required discovery must have `DISCOVERY_PASS`, zero unresolved material unknowns, and required product/user approvals. Product blueprint and completeness matrix must be current for the release candidate.

## Task and slice evidence gate

Implementation may progress slice by slice, but task review begins only when acceptance criteria, capability traceability, planned focused/regression checks, required runtime/Operational Assurance evidence, migrations, and other REQUIRED gates are complete enough for frozen target.

## Milestone gate

Milestone completion uses ELEVATED review and requires all governed tasks/required follow-ups, milestone regressions, applicable migrations/contracts/dependencies, runtime evidence, capability impact, and unresolved blocker state to be revalidated for milestone target.

`MILESTONE_VALIDATED` does not imply whole-product completeness.

## Product completeness gate

When product state applies, Final Reviewer must reconcile approved product vision/blueprint, `PRODUCT_COMPLETENESS_MATRIX.md`, stable capability IDs, validated tasks/milestones, evidence, and approved deferrals.

Release requires:

```text
PRODUCT_COMPLETE
```

`PRODUCT_INCOMPLETE`, `PRODUCT_DEFECT`, `PRODUCT_BLOCKED`, a missing required capability, or a deferred required capability outside explicitly changed approved complete scope blocks release readiness.

## Clean-install gate

Required for every final release.

From a clean location:

1. install dependencies;
2. provision reproducible non-production infrastructure;
3. initialize empty persistent state;
4. run installers and migrations;
5. start application;
6. run applicable smoke/integration/end-to-end/user-flow checks.

## Existing-install gate

When installed baseline exists, verify baseline version/schema/runtime, forward migration path, representative data preservation, compatibility, and rollback/forward-recovery evidence as applicable.

## Package gate

Create production distributable from `.ai/DEPLOYMENT_SCOPE.md`, not entire development workspace. Exclude tests, `.ai/`, development-only documentation, review/evidence artifacts, local tooling, caches, IDE state, and plaintext secrets unless an explicit documented runtime/legal/packaging exception applies.

Extract into another clean location, perform documented install/start procedure, rerun required checks, and record artifact identity/hash evidence.

## Operational gate

When applicable, require fresh evidence for preview/runtime target, critical user flows, objective visual behavior, external tool/MCP capability boundaries, recovery, and safe experimentation.

Operational proof never authorizes production deployment, rollback, publication, merge, push, use of production secrets/data, or permission widening.

## External-integration gate

Mandatory integrations remain blocked until meaningful approved sandbox/test/real-environment validation has run. Mocks do not substitute for required real integration evidence.

## Security and secret gate

Plaintext secret exposure in tracked source or production package is blocking. Security-sensitive release evidence and relevant high-risk findings must be resolved or explicitly remain NOT_READY_FOR_PRODUCTION.

## Production gate

Release review is always ELEVATED: independent Implementation Reviewer + Architecture/Security Reviewer, followed by Final Reviewer adjudication.

`READY_FOR_PRODUCTION` requires applicable `PRODUCT_COMPLETE`, fresh sufficient required evidence, deployment-scope correctness, clean install, applicable upgrade/migration proof, package extraction/reinstall proof, mandatory external/runtime validation, recovery proof when applicable, no unresolved blocking findings, and Final Reviewer approval.

Product completeness and release readiness remain distinct and neither authorizes deployment.
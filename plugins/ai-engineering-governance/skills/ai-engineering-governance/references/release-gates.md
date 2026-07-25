# Release Gates

## Slice gate

Pass only when acceptance criteria, focused tests, affected regression tests, runtime usability, and evidence all pass.

## Milestone gate

Pass only when required slices, milestone regressions, applicable migrations, local runtime, external-validation status, and independent review all pass.

## Clean-install gate

Required for every final release.

From a clean location:
1. install dependencies;
2. provision reproducible local infrastructure;
3. initialize empty persistent state;
4. run all installers and migrations;
5. start the application;
6. run applicable smoke, integration, and end-to-end checks.

## Existing-install gate

Required when an installed baseline exists.

Verify baseline version and schema, forward migrations, representative data preservation, compatibility requirements, and failure recovery where applicable.

## Package gate

Create the final distributable, extract it into another clean location, perform the documented clean install, rerun required checks, and record package hash and evidence.

## External-integration gate

Mandatory integrations remain blocking until meaningful sandbox, test, or required real-environment validation has run.

## Production gate

`READY_FOR_PRODUCTION` requires no unresolved blocking or critical/high security defect, all mandatory verification, clean install, applicable upgrade verification, package reinstall, mandatory external validation, and adversarial final review.

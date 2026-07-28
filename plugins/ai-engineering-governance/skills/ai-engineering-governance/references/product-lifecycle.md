# Product Lifecycle Governance

Product discovery prevents technically correct implementation of the wrong or incomplete product. It is adaptive, evidence-based, and integrated into `/ai-architect`; no separate discovery command is required.

## Request classification

Every governed request receives exactly one:

```text
WORK_CLASS:
PATCH | BOUNDED_FEATURE | MAJOR_FEATURE | EXISTING_PRODUCT_EVOLUTION | NEW_PRODUCT | HIGH_RISK_CHANGE

DISCOVERY_DEPTH:
LIGHT | STANDARD | DEEP

ASSISTANCE_MODE:
GUIDED | STANDARD | EXPERT
```

Discovery is always present. `LIGHT` may be a short confirmation against established evidence; `STANDARD` examines all materially affected product surfaces; `DEEP` performs complete product definition and independent discovery review.

Use `DEEP` for new products, materially vague product-wide requests, high-risk change, or when unresolved product decisions could invalidate architecture or delivery. User expertise may change explanation style but never lower safety, evidence, or approval requirements.

## Progressive discovery

Process applicable blocks in order, skipping only items proven irrelevant by authoritative evidence:

1. objective, outcomes, success and exclusions;
2. users, roles, permissions, approvals and segregation of duties;
3. end-to-end workflows, negative paths and exceptions;
4. data, lifecycle, business rules, retention and state transitions;
5. UX, accessibility, responsive behavior and loading/error/empty states;
6. security, privacy, authorization, audit and abuse cases;
7. administration, configuration, reporting, communications and support;
8. integrations, compatibility, technical constraints and public contracts;
9. installation, operation, observability, recovery and ownership;
10. product completeness, delivery boundaries and consciously deferred capabilities.

For each material block record confirmed facts, reversible defaults, material unknowns, contradictions, recommendations and user confirmation. Do not repeat a question that authoritative evidence or an earlier answer already resolves.

`MATERIAL_UNKNOWN_COUNT` counts unresolved decisions whose outcome could materially affect approved scope, safety, architecture, cost, legal obligations, data handling, operations or acceptance criteria. A consciously approved deferral no longer counts as unknown, but remains visible and may keep the product incomplete.

## Governed domain research

Classify external findings as one of:

```text
USER_REQUIREMENT
DOMAIN_EVIDENCE
RECOMMENDATION
LEGAL_OR_SAFETY_CONSTRAINT
OPTIONAL_OPPORTUNITY
```

Record source, source class, access date, applicability, evidence summary and product impact. Research, industry convention and competitor behavior never become requirements automatically. Binding legal, security or technical claims require applicable authoritative evidence; uncertainty remains explicit.

## CONSTRUCTIVE_CHALLENGE

The governance must not agree with a proposed solution merely because the user requested it. Separate:

```text
USER_OBJECTIVE
USER_PROPOSED_SOLUTION
GOVERNANCE_RECOMMENDATION
FINAL_USER_DECISION
```

Challenge only material differences in security, data safety, correctness, complexity, maintenance, compatibility, cost, reversibility, accessibility or operational burden. Explain concrete alternatives, consequences and the recommended option without being contrarian for its own sake.

A conscious non-blocking override is recorded as:

```text
USER_OVERRIDE_ACCEPTED
```

Do not proceed when the direction creates foreseeable critical insecurity, unacceptable data loss, an applicable legal violation, impossible approved requirements, or a false claim of validation/completeness. Record the blocking reason and required authoritative decision.

## GUIDED_DECISION_POLICY

Classify decisions as:

```text
ESTABLISHED_FACT
REVERSIBLE_TECHNICAL_DEFAULT
MATERIAL_TECHNICAL_DECISION
MATERIAL_PRODUCT_DECISION
LEGAL_OR_SAFETY_CONSTRAINT
EXPLICITLY_DEFERRED_DECISION
```

Only a conventional, low-risk, reversible, scope-neutral `REVERSIBLE_TECHNICAL_DEFAULT` may be selected without explicit approval. Material product, architecture, data, privacy, security, retention, commercial, licensing and operational decisions require user or authoritative owner approval.

Every material approval, override, blocker, exclusion, deferral and superseding decision is recorded chronologically. The governance never fabricates approval.

## Conditional canonical product state

Create or maintain `.ai/product/` only for product-affecting work. Do not create six product documents as boilerplate for a purely technical patch whose lack of product-scope effect is established by primary evidence.

```text
.ai/product/
├── PRODUCT_VISION.md
├── USER_AND_ROLE_MODEL.md
├── DOMAIN_AND_PROCESS_MODEL.md
├── PRODUCT_COMPLETENESS_MATRIX.md
├── PRODUCT_BLUEPRINT.md
└── PRODUCT_DECISIONS.md
```

Each product file records a stable product identifier, schema/version, status, source references and last-updated evidence.

### PRODUCT_VISION.md

Defines the real problem, intended outcomes, stakeholders, complete approved scope, constraints, exclusions and product completion definition.

### USER_AND_ROLE_MODEL.md

Defines actors, responsibilities, permission matrix, approvals, ownership and segregation-of-duty requirements.

### DOMAIN_AND_PROCESS_MODEL.md

Defines entities, states, lifecycles, business rules, primary and negative workflows, exceptions and integrations.

### PRODUCT_COMPLETENESS_MATRIX.md

Every capability has a stable `CAPABILITY_ID`, provenance, acceptance criteria, impact, approval and one classification:

```text
REQUIRED | OPTIONAL | NOT_APPLICABLE | DEFERRED
```

A deferred required capability remains visible and keeps the product incomplete unless the approved complete scope is explicitly changed.

### PRODUCT_BLUEPRINT.md

Defines the approved product architecture and vertical delivery roadmap. Each product-affecting task records blueprint version, affected capability IDs and expected completeness impact.

### PRODUCT_DECISIONS.md

Append-only record of facts, defaults, recommendations, approvals, overrides, blockers, exclusions, deferrals and superseding decisions.

Product artifacts are downstream from canonical request/clarification provenance. They cannot silently rewrite historical task requirements.

## Discovery review

Use independent `DISCOVERY_REVIEW` for `NEW_PRODUCT`, `HIGH_RISK_CHANGE`, `DEEP`, materially vague product-wide work, or when discovery decisions materially affect security, data, architecture, legal obligations or operations.

Use the existing review roles against one frozen discovery target:

```text
reviewer
+
reviewer-architecture
        ↓
final-reviewer
```

Advisory reviewers remain isolated from sibling current-cycle findings. Final Reviewer returns exactly:

```text
DISCOVERY_PASS | DISCOVERY_DEFECT | DISCOVERY_BLOCKED
```

Required discovery cannot unlock implementation until `DISCOVERY_PASS`, `MATERIAL_UNKNOWN_COUNT: 0`, and required product-scope/user approvals are present.

## Vertical delivery and capability traceability

Product delivery uses `VERTICAL_MILESTONE` increments that produce coherent end-to-end behavior across the necessary UI, domain, data, integration, security, validation and documentation surfaces. Do not replace a required user outcome with disconnected database/backend/frontend milestones unless authoritative project constraints require that decomposition.

Each product-affecting milestone and task records:

- product blueprint version;
- affected `CAPABILITY_ID` values;
- requirement and acceptance traceability;
- expected completeness impact;
- remaining required capabilities.

`MILESTONE_VALIDATED` proves the increment, not the whole product.

## Separate final verdicts

Product completeness and release readiness are distinct:

```text
PRODUCT_COMPLETENESS_VERDICT:
PRODUCT_COMPLETE | PRODUCT_DEFECT | PRODUCT_BLOCKED

RELEASE_VERDICT:
READY_FOR_PRODUCTION | NOT_READY_FOR_PRODUCTION
```

A technically valid milestone may leave the state `PRODUCT_INCOMPLETE`. Production readiness requires `PRODUCT_COMPLETE` for the approved complete scope plus fresh legal/ownership, packaging, security, deployment, migration, recovery, operational and release evidence.

Neither verdict authorizes deployment, publication, merge, rollback or push.

## Bounded correction cycles

Baseline, required discovery, task final adjudication and product-completeness reconciliation each allow a maximum three failed correction cycles. After the third failed cycle, stop with a fail-closed state and:

```text
HUMAN_INPUT_REQUIRED: YES
```

Do not consume unbounded model cycles attempting to force convergence.

## Lazy adoption

Existing governed repositories adopt product state lazily. Preserve history and completed task evidence. Create only missing product artifacts needed by current product-affecting work; reconstruct facts only from authoritative evidence; mark unsupported content unknown; never fabricate requirements, approvals or historical discovery.
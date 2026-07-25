# Security

Report security issues privately to the repository maintainer.

Do not include secrets, access tokens, customer data, private signing material, production credentials, or exploitable details in public issues.

## Plugin trust

ZCode plugins can cause an Agent to read, modify, and execute content in the current workspace. Review third-party changes before updating or enabling a modified distribution.

AI Engineering Governance does not ship API keys, credentials, remote executable dependencies, hooks, or MCP servers.

## Governed project secrets

Plaintext secrets are excluded from Git by default.

Architect and Reviewer are required to inspect governed repositories for plaintext secret exposure and tracked sensitive files. Executor checks staged content before each validated task commit.

Ignore rules are not a remedy for a secret that is already tracked or exposed. Remove tracked material and assess revocation or rotation as appropriate.

Generated `.ai/` state must never contain credential values. Record only the name and purpose of required credentials.

# Security

Report security issues privately to the repository maintainer.

Do not include secrets, access tokens, customer data, private keys, production credentials, or exploitable details in public issues.

## Plugin trust

ZCode plugins can cause an Agent to read, modify, and execute content in the current workspace. Review third-party changes before updating or enabling a modified distribution.

AI Engineering Governance does not ship API keys, credentials, remote executable dependencies, hooks, or MCP servers.

## Project secrets

Generated `.ai/` state must never contain credentials. Record only the name and purpose of required credentials, never their values.

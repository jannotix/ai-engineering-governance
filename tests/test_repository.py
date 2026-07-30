from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLUGIN = ROOT / "plugins" / "ai-engineering-governance"
SKILL_ROOT = PLUGIN / "skills" / "ai-engineering-governance"


class RepositoryTests(unittest.TestCase):
    def read(self, rel: str) -> str:
        return (ROOT / rel).read_text(encoding="utf-8")

    def plugin_read(self, rel: str) -> str:
        return (PLUGIN / rel).read_text(encoding="utf-8")

    def skill_read(self, rel: str) -> str:
        return (SKILL_ROOT / rel).read_text(encoding="utf-8")

    def test_manifests_are_2_0_0_and_expose_runtime_components(self):
        marketplace = json.loads(self.read("marketplace.json"))
        plugin = json.loads(self.plugin_read(".zcode-plugin/plugin.json"))
        self.assertEqual(marketplace["plugins"][0]["version"], "2.0.0")
        self.assertEqual(plugin["version"], "2.0.0")
        self.assertEqual(plugin["hooks"], "hooks/hooks.json")
        server = plugin["mcpServers"]["ai-engineering-governance"]
        self.assertEqual(server["type"], "stdio")
        self.assertEqual(server["command"], "node")
        self.assertIn("runtime/mcp-server.js", " ".join(server["args"]))
        self.assertEqual(plugin["license"], "FSL-1.1-MIT")
        self.assertEqual(plugin["author"]["name"], "Gianluca Iannotta")

    def test_required_components_exist(self):
        required = [
            "agents/architect.md",
            "agents/executor.md",
            "agents/reviewer.md",
            "agents/reviewer-architecture.md",
            "agents/final-reviewer.md",
            "agents/arbiter.md",
            "commands/ai-init.md",
            "commands/ai-setup.md",
            "commands/ai-start.md",
            "commands/ai-status.md",
            "commands/ai-architect.md",
            "commands/ai-execute.md",
            "commands/ai-review.md",
            "commands/ai-arbiter.md",
            "commands/ai-release.md",
            "hooks/hooks.json",
            "hooks/governance-hook.js",
            ".mcp.json",
            "runtime/mcp-server.js",
            "runtime/lib/canonical.js",
            "runtime/lib/project.js",
            "runtime/lib/candidate-authority.js",
            "runtime/lib/approval-receipt.js",
            "runtime/lib/run-state.js",
            "runtime/lib/context-intelligence.js",
            "runtime/lib/evidence-reuse.js",
            "runtime/lib/review-lenses.js",
            "runtime/lib/governed-memory.js",
            "skills/ai-engineering-governance/SKILL.md",
            "skills/ai-engineering-governance/references/deterministic-runtime.md",
        ]
        for rel in required:
            self.assertTrue((PLUGIN / rel).is_file(), rel)

    def test_command_surface_remains_minimal(self):
        expected = {
            "ai-init", "ai-setup", "ai-start", "ai-status", "ai-architect",
            "ai-execute", "ai-review", "ai-arbiter", "ai-release",
        }
        actual = {path.stem for path in (PLUGIN / "commands").glob("*.md")}
        self.assertEqual(actual, expected)
        pattern = re.compile(r"^[a-z0-9][a-z0-9_:-]{0,63}$")
        for name in actual:
            self.assertRegex(name, pattern)

    def test_model_provider_neutrality_remains(self):
        prohibited = ("glm-", "minimax", "codex", "claude-", "gpt-", "gemini-", "qwen", "kimi", "grok")
        for path in (PLUGIN / "agents").glob("*.md"):
            text = path.read_text(encoding="utf-8").lower()
            for token in prohibited:
                self.assertNotIn(token, text, f"{token} in {path}")

    def test_deterministic_runtime_contract(self):
        text = self.skill_read("references/deterministic-runtime.md")
        for token in (
            "GOVERNANCE_CANDIDATE_V1",
            "workspace | staged | commit | base-diff",
            "GOVERNANCE_APPROVAL_RECEIPT_V1",
            "APPROVAL_RECEIPT_MISMATCH",
            "ACTIONABLE_CONTINUATION_V1",
            "CONTEXT_BUDGET_V1",
            "CONTEXT_SUFFICIENT | BLOCKED_CONTEXT_GAP",
            "SKILL_CAPABILITY_MANIFEST_V1",
            "EVIDENCE_STALE",
            "REVIEW_LENS_MATRIX_V1",
            "CANDIDATE | ACTIVE | SUPERSEDED | REJECTED",
            "Node.js 22",
        ):
            self.assertIn(token, text)

    def test_hooks_use_supported_zcode_events_and_node_processes(self):
        hooks = json.loads(self.plugin_read("hooks/hooks.json"))["hooks"]
        self.assertEqual(set(hooks), {"SessionStart", "PreToolUse", "PostToolUse"})
        for entries in hooks.values():
            for entry in entries:
                for hook in entry["hooks"]:
                    self.assertEqual(hook["type"], "process")
                    self.assertEqual(hook["command"], "node")
                    self.assertIn("${ZCODE_PLUGIN_ROOT}", " ".join(hook["args"]))
        self.assertNotIn("Stop", hooks)

    def test_mcp_is_local_stdio_and_dependency_free(self):
        mcp = json.loads(self.plugin_read(".mcp.json"))
        server = mcp["mcpServers"]["ai-engineering-governance"]
        self.assertEqual(server["type"], "stdio")
        self.assertEqual(server["command"], "node")
        self.assertIn("${ZCODE_PLUGIN_ROOT}/runtime/mcp-server.js", server["args"])
        package = json.loads(self.read("package.json"))
        self.assertEqual(package.get("dependencies", {}), {})
        self.assertEqual(package["engines"]["node"], ">=22")

    def test_agents_and_commands_require_runtime_authority(self):
        combined = "\n".join([
            self.plugin_read("agents/architect.md"),
            self.plugin_read("agents/executor.md"),
            self.plugin_read("agents/reviewer.md"),
            self.plugin_read("agents/reviewer-architecture.md"),
            self.plugin_read("agents/final-reviewer.md"),
            self.plugin_read("commands/ai-start.md"),
            self.plugin_read("commands/ai-status.md"),
            self.plugin_read("commands/ai-execute.md"),
            self.plugin_read("commands/ai-review.md"),
            self.plugin_read("commands/ai-release.md"),
        ]).lower()
        for token in (
            "candidate projection", "approval receipt", "actionable continuation",
            "context budget", "evidence reuse", "review lens", "governed memory",
        ):
            self.assertIn(token, combined)

    def test_existing_product_and_evidence_contracts_remain(self):
        combined = "\n".join([
            self.skill_read("SKILL.md"),
            self.skill_read("references/product-lifecycle.md"),
            self.skill_read("references/requirement-provenance.md"),
            self.skill_read("references/context-routing.md"),
            self.skill_read("references/verification.md"),
            self.skill_read("references/operational-assurance.md"),
        ])
        for token in (
            "CONSTRUCTIVE_CHALLENGE", "PRODUCT_COMPLETENESS_MATRIX.md",
            "PRODUCT_COMPLETE | PRODUCT_DEFECT | PRODUCT_BLOCKED",
            "ORIGINAL_USER_REQUEST.md", "MINIMUM_CHANGE_ASSESSMENT",
            "TASK_RISK_PROFILE", "PASS | FAIL | UNAVAILABLE | STALE | BLOCKED",
            "PREVIEW_ENVIRONMENT_GATE", "SAFE_EXPERIMENTATION",
        ):
            self.assertIn(token, combined)

    def test_ci_runs_python_and_node_runtime_suites(self):
        workflow = self.read(".github/workflows/verify.yml")
        for token in (
            "python -m unittest discover -s tests",
            "npm run test:runtime",
            "node --check",
            "tracked temporary or diagnostic residue",
            "Scan obvious secret patterns",
        ):
            self.assertIn(token, workflow)

    def test_no_secret_like_material(self):
        patterns = [
            re.compile(r"sk-[A-Za-z0-9_-]{20,}"),
            re.compile(r"AKIA[0-9A-Z]{16}"),
            re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
        ]
        for path in ROOT.rglob("*"):
            if not path.is_file():
                continue
            text = path.read_text(encoding="utf-8", errors="ignore")
            for pattern in patterns:
                self.assertIsNone(pattern.search(text), str(path))


if __name__ == "__main__":
    unittest.main()

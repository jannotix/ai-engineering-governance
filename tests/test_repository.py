from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLUGIN = ROOT / "plugins" / "ai-engineering-governance"


class RepositoryTests(unittest.TestCase):
    def read(self, rel: str) -> str:
        return (ROOT / rel).read_text(encoding="utf-8")

    def plugin_read(self, rel: str) -> str:
        return (PLUGIN / rel).read_text(encoding="utf-8")

    def test_marketplace_manifest(self):
        data = json.loads(self.read("marketplace.json"))
        self.assertEqual(data["name"], "ai-engineering-governance")
        self.assertEqual(data["plugins"][0]["version"], "1.0.2")
        self.assertEqual(data["plugins"][0]["source"], "./plugins/ai-engineering-governance")
        self.assertNotIn("pluginRoot", data)

    def test_plugin_manifest(self):
        data = json.loads(self.plugin_read(".zcode-plugin/plugin.json"))
        self.assertEqual(data["name"], "ai-engineering-governance")
        self.assertEqual(data["version"], "1.0.2")
        self.assertEqual(data["license"], "FSL-1.1-MIT")
        self.assertEqual(data["author"]["name"], "Gianluca Iannotta")

    def test_required_components_exist(self):
        required = [
            "agents/architect.md",
            "agents/executor.md",
            "agents/reviewer.md",
            "agents/arbiter.md",
            "commands/ai-init.md",
            "commands/ai-setup.md",
            "commands/ai-start.md",
            "commands/ai-status.md",
            "commands/ai-architect.md",
            "commands/ai-execute.md",
            "commands/ai-review.md",
            "commands/ai-arbitrate.md",
            "commands/ai-release.md",
            "skills/ai-engineering-governance/SKILL.md",
        ]
        for rel in required:
            self.assertTrue((PLUGIN / rel).is_file(), rel)

    def test_agents_do_not_hardcode_models(self):
        prohibited = ("glm-", "minimax", "codex", "claude-", "gpt-", "gemini-", "qwen", "kimi", "grok")
        for path in (PLUGIN / "agents").glob("*.md"):
            text = path.read_text(encoding="utf-8").lower()
            for token in prohibited:
                self.assertNotIn(token, text, f"{token} in {path}")

    def test_manifest_versions_are_current(self):
        skill = self.plugin_read("skills/ai-engineering-governance/SKILL.md")
        self.assertIn("version: 1.0.2", skill)
        self.assertNotIn("v3", self.read("README.md").lower())

    def test_project_state_has_audit_baseline_deployment_and_arbitration(self):
        state = self.plugin_read("skills/ai-engineering-governance/references/project-state.md")
        for token in (
            "PROJECT_HISTORY.md",
            "CODEBASE_BASELINE.md",
            "DEPLOYMENT_SCOPE.md",
            "arbitration/",
            "READY_FOR_EXECUTION",
            "ARBITRATION_REQUIRED",
            "LOCAL_COMMITTED",
        ):
            self.assertIn(token, state)

    def test_central_policy_requires_history_commits_no_push_and_secret_safety(self):
        skill = self.plugin_read("skills/ai-engineering-governance/SKILL.md").lower()
        for token in (
            "project_history.md",
            "append-only",
            "local commit",
            "never push",
            "explicit authorization",
            "plaintext secret",
            "deployment_scope.md",
            "codebase_baseline.md",
            "arbitration_required",
        ):
            self.assertIn(token, skill)

    def test_maintainable_source_structure_policy(self):
        skill = self.plugin_read("skills/ai-engineering-governance/SKILL.md").lower()
        architect = self.plugin_read("agents/architect.md").lower()
        executor = self.plugin_read("agents/executor.md").lower()
        reviewer = self.plugin_read("agents/reviewer.md").lower()
        for token in ("maintainable source structure", "god files", "micro-files", "cohesive", "line-count"):
            self.assertIn(token, skill)
        self.assertIn("targeted split", architect)
        self.assertIn("god files", architect)
        self.assertIn("micro-file", executor)
        self.assertIn("maintainability", reviewer)
        self.assertIn("line-count", reviewer)

    def test_architect_is_adversarial_and_task_gated(self):
        text = self.plugin_read("agents/architect.md").lower()
        for token in (
            "complete codebase",
            "adversarial",
            "codebase_baseline.md",
            "before every task",
            "ready_for_execution",
            "secret",
            "arbitration_required",
        ):
            self.assertIn(token, text)

    def test_executor_commits_validated_tasks_locally_and_never_pushes(self):
        text = self.plugin_read("agents/executor.md").lower()
        for token in (
            "ready_for_execution",
            "task_validated",
            "local commit",
            "never push",
            "explicit authorization",
            "staged",
            "secret",
        ):
            self.assertIn(token, text)
        self.assertNotIn("git add .", text)

    def test_reviewer_always_scans_plaintext_secrets(self):
        text = self.plugin_read("agents/reviewer.md").lower()
        self.assertIn("plaintext secret", text)
        self.assertIn("blocking", text)
        self.assertIn("deployment_scope.md", text)

    def test_arbiter_is_independent_and_only_for_disputes(self):
        text = self.plugin_read("agents/arbiter.md").lower()
        for token in ("independent", "architect", "executor", "disagreement", "arbitration"):
            self.assertIn(token, text)

    def test_release_excludes_non_production_artifacts(self):
        text = self.plugin_read("commands/ai-release.md").lower()
        for token in (
            "deployment_scope.md",
            ".ai/",
            "tests",
            "documentation",
            "plaintext secrets",
            "runtime-required",
        ):
            self.assertIn(token, text)

    def test_init_creates_history_baseline_and_deployment_scope(self):
        text = self.plugin_read("commands/ai-init.md")
        for token in ("PROJECT_HISTORY.md", "CODEBASE_BASELINE.md", "DEPLOYMENT_SCOPE.md"):
            self.assertIn(token, text)

    def test_command_names_are_valid(self):
        pattern = re.compile(r"^[a-z0-9][a-z0-9_:-]{0,63}$")
        for path in (PLUGIN / "commands").glob("*.md"):
            self.assertRegex(path.stem, pattern)

    def test_agents_have_required_frontmatter(self):
        for path in (PLUGIN / "agents").glob("*.md"):
            text = path.read_text(encoding="utf-8")
            self.assertTrue(text.startswith("---\n"))
            head = text.split("---", 2)[1]
            self.assertIn("name:", head)
            self.assertIn("description:", head)
            self.assertNotIn("\nmodel:", head)

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

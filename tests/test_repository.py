from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLUGIN = ROOT / "plugins" / "ai-engineering-governance"


class RepositoryTests(unittest.TestCase):
    def test_marketplace_manifest(self):
        data = json.loads((ROOT / "marketplace.json").read_text(encoding="utf-8"))
        self.assertEqual(data["name"], "ai-engineering-governance")
        self.assertEqual(data["plugins"][0]["version"], "1.0.0")
        self.assertEqual(data["plugins"][0]["source"], "./ai-engineering-governance")

    def test_plugin_manifest(self):
        data = json.loads((PLUGIN / ".zcode-plugin" / "plugin.json").read_text(encoding="utf-8"))
        self.assertEqual(data["name"], "ai-engineering-governance")
        self.assertEqual(data["version"], "1.0.0")
        self.assertEqual(data["license"], "FSL-1.1-MIT")
        self.assertEqual(data["author"]["name"], "Gianluca Iannotta")

    def test_required_components_exist(self):
        required = ["agents/architect.md","agents/executor.md","agents/reviewer.md","commands/ai-init.md","commands/ai-setup.md","commands/ai-start.md","commands/ai-status.md","commands/ai-architect.md","commands/ai-execute.md","commands/ai-review.md","commands/ai-release.md","skills/ai-engineering-governance/SKILL.md"]
        for rel in required:
            self.assertTrue((PLUGIN / rel).is_file(), rel)

    def test_agents_do_not_hardcode_models(self):
        prohibited = ("glm-", "minimax", "codex", "claude-", "gpt-", "gemini-", "qwen", "kimi", "grok")
        for path in (PLUGIN / "agents").glob("*.md"):
            text = path.read_text(encoding="utf-8").lower()
            for token in prohibited:
                self.assertNotIn(token, text, f"{token} in {path}")

    def test_only_public_version_is_used(self):
        allowed = "1.0.0"
        versions = set()
        pattern = re.compile(r'(?<![0-9])([0-9]+\.[0-9]+\.[0-9]+)(?![0-9])')
        for path in ROOT.rglob("*"):
            if path.is_file() and "__pycache__" not in path.parts:
                text = path.read_text(encoding="utf-8", errors="ignore")
                versions.update(pattern.findall(text))
        self.assertEqual(versions, {allowed})

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
        patterns = [re.compile(r"sk-[A-Za-z0-9_-]{20,}"),re.compile(r"AKIA[0-9A-Z]{16}"),re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----")]
        for path in ROOT.rglob("*"):
            if not path.is_file():
                continue
            text = path.read_text(encoding="utf-8", errors="ignore")
            for pattern in patterns:
                self.assertIsNone(pattern.search(text), str(path))


if __name__ == "__main__":
    unittest.main()

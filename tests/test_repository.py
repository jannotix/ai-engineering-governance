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

    def test_marketplace_manifest(self):
        data = json.loads(self.read("marketplace.json"))
        self.assertEqual(data["name"], "ai-engineering-governance")
        self.assertEqual(data["plugins"][0]["version"], "1.1.0")
        self.assertEqual(data["plugins"][0]["source"], "./plugins/ai-engineering-governance")
        self.assertNotIn("pluginRoot", data)

    def test_plugin_manifest(self):
        data = json.loads(self.plugin_read(".zcode-plugin/plugin.json"))
        self.assertEqual(data["name"], "ai-engineering-governance")
        self.assertEqual(data["version"], "1.1.0")
        self.assertEqual(data["license"], "FSL-1.1-MIT")
        self.assertEqual(data["author"]["name"], "Gianluca Iannotta")

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
            "skills/ai-engineering-governance/SKILL.md",
            "skills/ai-engineering-governance/references/requirement-provenance.md",
            "skills/ai-engineering-governance/references/context-routing.md",
            "skills/ai-engineering-governance/references/verification.md",
            "skills/ai-engineering-governance/references/operational-assurance.md",
        ]
        for rel in required:
            self.assertTrue((PLUGIN / rel).is_file(), rel)

    def test_no_redundant_commands_added(self):
        prohibited = (
            "ai-arbitrate.md",
            "ai-resume.md",
            "ai-metrics.md",
            "ai-plan.md",
            "ai-workflow.md",
            "ai-audit.md",
            "ai-docs.md",
        )
        for name in prohibited:
            self.assertFalse((PLUGIN / "commands" / name).exists(), name)

    def test_agents_do_not_hardcode_models(self):
        prohibited = ("glm-", "minimax", "codex", "claude-", "gpt-", "gemini-", "qwen", "kimi", "grok")
        for path in (PLUGIN / "agents").glob("*.md"):
            text = path.read_text(encoding="utf-8").lower()
            for token in prohibited:
                self.assertNotIn(token, text, f"{token} in {path}")

    def test_manifest_versions_are_current(self):
        skill = self.skill_read("SKILL.md")
        self.assertIn("version: 1.1.0", skill)
        self.assertNotIn("v3", self.read("README.md").lower())

    def test_project_state_is_task_centric(self):
        state = self.skill_read("references/project-state.md")
        for token in (
            "CONTEXT_INDEX.md",
            "tasks/",
            "ORIGINAL_USER_REQUEST.md",
            "CLARIFICATION_TRANSCRIPT.md",
            "APPROVED_REQUIREMENTS.md",
            "CONTEXT_MANIFEST.md",
            "TASK_PLAN.md",
            "VERIFICATION_PROFILE.md",
            "RUN_STATE.json",
            "VERIFICATION_EVIDENCE.md",
            "READY_FOR_REVIEW",
            "TASK_VALIDATED",
            "LOCAL_COMMITTED",
        ):
            self.assertIn(token, state)

    def test_requirement_provenance_contract(self):
        text = self.skill_read("references/requirement-provenance.md").lower()
        for token in (
            "original_user_request.md",
            "clarification_transcript.md",
            "approved_requirements.md",
            "cannot override",
            "ready_for_execution",
            "secret",
        ):
            self.assertIn(token, text)

    def test_incremental_context_routing_contract(self):
        text = self.skill_read("references/context-routing.md").lower()
        for token in (
            "context_index.md",
            "context_manifest.md",
            "current git delta",
            "read-only",
            "2–4",
            "minimum_change_assessment",
            "smallest correct, secure, maintainable solution",
        ):
            self.assertIn(token, text)

    def test_evidence_driven_verification_contract(self):
        text = self.skill_read("references/verification.md")
        for token in (
            "TASK_RISK_PROFILE",
            "NONE | LOW | HIGH",
            "REQUIRED | CONDITIONAL | NOT_APPLICABLE",
            "PASS | FAIL | UNAVAILABLE | STALE | BLOCKED",
            "BUGFIX_PROOF",
            "TEST_IMPACT_MAP",
            "CONTRACT_COMPATIBILITY",
            "DEPENDENCY_ADMISSION_GATE",
            "PRE_CHANGE_SAFEPOINT",
            "MIGRATION_PROOF",
            "ELEVATED",
            "reviewer-architecture",
            "final-reviewer",
        ):
            self.assertIn(token, text)

    def test_operational_assurance_contract(self):
        text = self.skill_read("references/operational-assurance.md")
        for token in (
            "PREVIEW_ENVIRONMENT_GATE",
            "USER_FLOW_VERIFICATION",
            "VISUAL_BEHAVIOR_GATE",
            "RELEASE_RECOVERY_PROOF",
            "TOOL_CAPABILITY_PROFILE",
            "SAFE_EXPERIMENTATION",
            "Tool availability is not authorization",
        ):
            self.assertIn(token, text)

    def test_architect_requires_full_task_contract(self):
        text = self.plugin_read("agents/architect.md").lower()
        for token in (
            "original_user_request.md",
            "approved_requirements.md",
            "context_manifest.md",
            "task_plan.md",
            "verification_profile.md",
            "run_state.json",
            "task_risk_profile",
            "minimum_change_assessment",
            "ready_for_execution",
            "elevated",
        ):
            self.assertIn(token, text)

    def test_executor_cannot_self_validate_or_bypass_evidence(self):
        text = self.plugin_read("agents/executor.md").lower()
        for token in (
            "task_risk_profile",
            "dependency_admission_gate",
            "pre_change_safepoint",
            "verification_evidence.md",
            "unavailable",
            "stale",
            "ready_for_review",
            "do not mark the task `task_validated` yourself",
            "local task commit",
            "never push",
        ):
            self.assertIn(token, text)
        self.assertNotIn("git add .", text)

    def test_adaptive_review_roles_are_independent(self):
        reviewer = self.plugin_read("agents/reviewer.md").lower()
        architecture = self.plugin_read("agents/reviewer-architecture.md").lower()
        final = self.plugin_read("agents/final-reviewer.md").lower()
        self.assertIn("standard", reviewer)
        self.assertIn("elevated", reviewer)
        self.assertIn("do not read or rely on the sibling", architecture)
        self.assertIn("original_user_request.md", final)
        self.assertIn("plan_defect", final)
        self.assertIn("pass", final)

    def test_start_reconciles_persisted_state_instead_of_new_resume_command(self):
        text = self.plugin_read("commands/ai-start.md").lower()
        for token in (
            "run_state.json",
            "git head/status/diff",
            "evidence freshness",
            "invalidate only evidence/reviews whose inputs changed",
            "ready_for_review",
        ):
            self.assertIn(token, text)
        self.assertFalse((PLUGIN / "commands" / "ai-resume.md").exists())

    def test_maintainable_source_structure_policy(self):
        skill = self.skill_read("SKILL.md").lower()
        architect = self.plugin_read("agents/architect.md").lower()
        executor = self.plugin_read("agents/executor.md").lower()
        reviewer = self.plugin_read("agents/reviewer.md").lower()
        for token in ("god files", "micro-files", "cohesive", "line-count"):
            self.assertIn(token, skill)
        self.assertIn("targeted split", architect)
        self.assertIn("micro-files", executor)
        self.assertIn("maintainability", reviewer)

    def test_secret_git_and_deployment_safety_remain(self):
        skill = self.skill_read("SKILL.md").lower()
        for token in (
            "plaintext secrets",
            "remove from tracking",
            "revocation/rotation",
            "never push by default",
            "explicit action-scoped user authorization",
            "deployment_scope.md",
            "production packages",
        ):
            self.assertIn(token, skill)

    def test_release_requires_elevated_fresh_operational_evidence(self):
        text = self.plugin_read("commands/ai-release.md").lower()
        for token in (
            "always `elevated`",
            "operational assurance",
            "public-contract compatibility",
            "release recovery proof",
            "reviewer + architecture/security reviewer",
            ".ai/",
            "tests",
            "plaintext secrets",
            "runtime-required",
        ):
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

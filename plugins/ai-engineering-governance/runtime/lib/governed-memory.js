"use strict"

const path = require("node:path")
const os = require("node:os")
const fs = require("node:fs")
const { DatabaseSync } = require("node:sqlite")
const { ensureDir } = require("./project.js")

function defaultDatabasePath() {
  const base = process.env.ZCODE_PLUGIN_DATA
    ? path.resolve(process.env.ZCODE_PLUGIN_DATA)
    : path.join(os.homedir(), ".zcode", "plugin-data", "ai-engineering-governance")
  return path.join(base, "governance-memory.sqlite")
}

class GovernedMemory {
  constructor({ databasePath = defaultDatabasePath() } = {}) {
    ensureDir(path.dirname(databasePath))
    this.databasePath = databasePath
    this.db = new DatabaseSync(databasePath)
    this.db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS memories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topic TEXT NOT NULL,
        content TEXT NOT NULL,
        status TEXT NOT NULL CHECK(status IN ('CANDIDATE','ACTIVE','SUPERSEDED','REJECTED')),
        task_id TEXT NOT NULL,
        evidence_digest TEXT NOT NULL,
        review_digest TEXT,
        stale_when TEXT,
        supersedes_id INTEGER,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY(supersedes_id) REFERENCES memories(id)
      );
      CREATE INDEX IF NOT EXISTS idx_memories_status_topic ON memories(status, topic);
      CREATE TABLE IF NOT EXISTS occurrences (
        memory_id INTEGER NOT NULL,
        task_id TEXT NOT NULL,
        evidence_digest TEXT NOT NULL,
        created_at TEXT NOT NULL,
        UNIQUE(memory_id, task_id, evidence_digest),
        FOREIGN KEY(memory_id) REFERENCES memories(id) ON DELETE CASCADE
      );
    `)
  }

  propose({ topic, content, taskId, evidenceDigest, staleWhen = null, supersedesId = null }) {
    if (![topic, content, taskId, evidenceDigest].every((value) => typeof value === "string" && value.trim())) {
      throw new Error("memory proposal requires topic, content, taskId and evidenceDigest")
    }
    const now = new Date().toISOString()
    const result = this.db.prepare(`
      INSERT INTO memories(topic, content, status, task_id, evidence_digest, stale_when, supersedes_id, created_at, updated_at)
      VALUES (?, ?, 'CANDIDATE', ?, ?, ?, ?, ?, ?)
    `).run(topic.trim(), content.trim(), taskId.trim(), evidenceDigest.trim(), staleWhen, supersedesId, now, now)
    return this.get({ id: Number(result.lastInsertRowid) })
  }

  adjudicate({ id, decision, role, reviewDigest }) {
    if (role !== "final-reviewer") throw new Error("only Final Reviewer may adjudicate governed memory")
    if (!["ACTIVE", "REJECTED", "SUPERSEDED"].includes(decision)) throw new Error("invalid memory adjudication")
    if (typeof reviewDigest !== "string" || !reviewDigest.trim()) throw new Error("memory adjudication requires reviewDigest")
    const current = this.get({ id })
    if (!current) throw new Error(`memory not found: ${id}`)
    if (current.status !== "CANDIDATE" && decision !== "SUPERSEDED") throw new Error(`memory ${id} is not a candidate`)
    const now = new Date().toISOString()
    this.db.prepare("UPDATE memories SET status = ?, review_digest = ?, updated_at = ? WHERE id = ?")
      .run(decision, reviewDigest.trim(), now, id)
    if (decision === "ACTIVE") {
      this.db.prepare("INSERT OR IGNORE INTO occurrences(memory_id, task_id, evidence_digest, created_at) VALUES (?, ?, ?, ?)")
        .run(id, current.task_id, current.evidence_digest, now)
      if (current.supersedes_id) {
        this.db.prepare("UPDATE memories SET status = 'SUPERSEDED', updated_at = ? WHERE id = ? AND status = 'ACTIVE'")
          .run(now, current.supersedes_id)
      }
    }
    return this.get({ id })
  }

  recordOccurrence({ id, taskId, evidenceDigest }) {
    const memory = this.get({ id })
    if (!memory || memory.status !== "ACTIVE") throw new Error("occurrences require an ACTIVE memory")
    const now = new Date().toISOString()
    this.db.prepare("INSERT OR IGNORE INTO occurrences(memory_id, task_id, evidence_digest, created_at) VALUES (?, ?, ?, ?)")
      .run(id, taskId, evidenceDigest, now)
    return this.occurrenceCount({ id })
  }

  occurrenceCount({ id }) {
    return Number(this.db.prepare("SELECT COUNT(DISTINCT task_id) AS count FROM occurrences WHERE memory_id = ?").get(id).count)
  }

  promotionEligibility({ id }) {
    const memory = this.get({ id })
    if (!memory || memory.status !== "ACTIVE") return { eligible: false, reason: "MEMORY_NOT_ACTIVE" }
    const occurrences = this.occurrenceCount({ id })
    return occurrences >= 2
      ? { eligible: true, occurrences, owner_authorization_required: true }
      : { eligible: false, occurrences, reason: "INSUFFICIENT_VALIDATED_OCCURRENCES" }
  }

  search({ query = "", limit = 10 }) {
    const normalized = `%${String(query).toLowerCase()}%`
    const rows = this.db.prepare(`
      SELECT id, topic, content, status, task_id, evidence_digest, review_digest, stale_when, supersedes_id, created_at, updated_at
      FROM memories
      WHERE status = 'ACTIVE' AND (lower(topic) LIKE ? OR lower(content) LIKE ?)
      ORDER BY updated_at DESC, id DESC
      LIMIT ?
    `).all(normalized, normalized, Math.max(1, Math.min(Number(limit) || 10, 50)))
    return rows.map((row) => ({
      ...row,
      advisory: true,
      occurrence_count: this.occurrenceCount({ id: row.id }),
      preview: row.content.length > 240 ? `${row.content.slice(0, 237)}...` : row.content,
    }))
  }

  get({ id }) {
    const row = this.db.prepare(`
      SELECT id, topic, content, status, task_id, evidence_digest, review_digest, stale_when, supersedes_id, created_at, updated_at
      FROM memories WHERE id = ?
    `).get(id)
    return row ? { ...row, advisory: true } : null
  }

  close() {
    this.db.close()
  }
}

module.exports = { GovernedMemory, defaultDatabasePath }

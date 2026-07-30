"use strict"

const fs = require("node:fs")
const { canonicalHash } = require("./canonical.js")
const { atomicWriteJson, readJson } = require("./project.js")

function dependencyDigest(dependencies) {
  if (!dependencies || typeof dependencies !== "object" || Array.isArray(dependencies)) {
    throw new Error("evidence dependencies must be an object")
  }
  return canonicalHash(dependencies)
}

function createEvidenceRecord({ recordPath, result, dependencies, evidence = {} }) {
  if (!["PASS", "FAIL", "UNAVAILABLE", "STALE", "BLOCKED"].includes(result)) throw new Error("invalid evidence result")
  const record = {
    schema: "EVIDENCE_REUSE_RECORD_V1",
    result,
    dependencies,
    dependency_digest: dependencyDigest(dependencies),
    evidence,
    created_at: new Date().toISOString(),
  }
  atomicWriteJson(recordPath, record)
  return record
}

function checkEvidenceReuse({ recordPath, dependencies }) {
  if (!fs.existsSync(recordPath)) return { status: "EVIDENCE_UNAVAILABLE" }
  let record
  try {
    record = readJson(recordPath)
  } catch (error) {
    return { status: "EVIDENCE_INVALID", reason: error instanceof Error ? error.message : String(error) }
  }
  if (record.schema !== "EVIDENCE_REUSE_RECORD_V1" || record.dependency_digest !== dependencyDigest(record.dependencies || {})) {
    return { status: "EVIDENCE_INVALID", reason: "record schema or digest mismatch" }
  }
  if (record.result !== "PASS") return { status: "EVIDENCE_STALE", reason: `prior result was ${record.result}` }
  const liveDigest = dependencyDigest(dependencies)
  return liveDigest === record.dependency_digest
    ? { status: "PASS", record }
    : { status: "EVIDENCE_STALE", expected: record.dependency_digest, actual: liveDigest }
}

module.exports = { checkEvidenceReuse, createEvidenceRecord, dependencyDigest }

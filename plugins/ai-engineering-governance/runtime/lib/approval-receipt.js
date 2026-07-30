"use strict"

const fs = require("node:fs")
const path = require("node:path")
const { canonicalHash, fileSha256 } = require("./canonical.js")
const { freezeCandidate, verifyCandidate } = require("./candidate-authority.js")
const { atomicWriteJson, projectRoot, readJson, relativePath, resolveInside } = require("./project.js")

const REQUIRED_ARTIFACTS = [
  "approved_requirements",
  "execution_packet",
  "verification_profile",
  "evidence_manifest",
  "implementation_review",
  "architecture_review",
  "final_adjudication",
]

function artifactManifest(root, taskDir, artifacts) {
  const output = {}
  for (const role of REQUIRED_ARTIFACTS) {
    const rel = artifacts?.[role]
    if (typeof rel !== "string" || !rel.trim()) throw new Error(`missing required approval artifact: ${role}`)
    const full = resolveInside(taskDir, rel)
    if (!fs.statSync(full).isFile()) throw new Error(`approval artifact is not a file: ${rel}`)
    output[role] = { path: relativePath(root, full), sha256: fileSha256(full) }
  }
  return output
}

function receiptDigest(receipt) {
  const clone = { ...receipt }
  delete clone.receipt_digest
  return canonicalHash(clone)
}

function createReceipt({ projectDir, taskId, candidate, artifacts, receiptPath, modelFamilies = {} }) {
  const root = projectRoot(projectDir)
  const taskDir = resolveInside(root, path.join(".ai", "tasks", taskId))
  const candidateResult = verifyCandidate({ projectDir: root, candidate })
  if (candidateResult.status !== "PASS") throw new Error(`candidate is not current: ${candidateResult.status}`)
  const manifest = artifactManifest(root, taskDir, artifacts)
  const receipt = {
    schema: "GOVERNANCE_APPROVAL_RECEIPT_V1",
    task_id: taskId,
    candidate,
    artifacts: manifest,
    model_families: Object.fromEntries(Object.entries(modelFamilies || {}).sort(([a], [b]) => a.localeCompare(b))),
    created_at: new Date().toISOString(),
  }
  receipt.receipt_digest = receiptDigest(receipt)
  const destination = receiptPath ? resolveInside(root, receiptPath) : path.join(taskDir, "approval-receipt.json")
  atomicWriteJson(destination, receipt)
  return { receipt, receiptPath: destination }
}

function verifyReceipt({ projectDir, receiptPath }) {
  const root = projectRoot(projectDir)
  let receipt
  try {
    receipt = readJson(resolveInside(root, receiptPath))
  } catch (error) {
    return { status: "APPROVAL_RECEIPT_INVALID", reason: error instanceof Error ? error.message : String(error) }
  }
  if (receipt.schema !== "GOVERNANCE_APPROVAL_RECEIPT_V1" || receiptDigest(receipt) !== receipt.receipt_digest) {
    return { status: "APPROVAL_RECEIPT_INVALID", reason: "schema or receipt digest mismatch" }
  }
  const candidateResult = verifyCandidate({ projectDir: root, candidate: receipt.candidate })
  if (candidateResult.status !== "PASS") {
    return { status: "APPROVAL_RECEIPT_MISMATCH", reason: candidateResult.status, candidate: candidateResult }
  }
  for (const role of REQUIRED_ARTIFACTS) {
    const item = receipt.artifacts?.[role]
    if (!item || typeof item.path !== "string" || typeof item.sha256 !== "string") {
      return { status: "APPROVAL_RECEIPT_INVALID", reason: `missing artifact ${role}` }
    }
    try {
      const full = resolveInside(root, item.path)
      if (!fs.statSync(full).isFile() || fileSha256(full) !== item.sha256) {
        return { status: "APPROVAL_RECEIPT_MISMATCH", reason: `artifact changed: ${role}` }
      }
    } catch (error) {
      return { status: "APPROVAL_RECEIPT_MISMATCH", reason: `artifact unavailable: ${role}` }
    }
  }
  return { status: "PASS", receipt }
}

function armPreCommit({ projectDir, receiptPath }) {
  const root = projectRoot(projectDir)
  const verification = verifyReceipt({ projectDir: root, receiptPath })
  if (verification.status !== "PASS" || verification.receipt.candidate.projection !== "staged") {
    throw new Error("pre-commit gate requires a valid staged approval receipt")
  }
  const pointer = {
    schema: "GOVERNANCE_PRE_COMMIT_POINTER_V1",
    receipt_path: relativePath(root, resolveInside(root, receiptPath)),
    receipt_digest: verification.receipt.receipt_digest,
    armed_at: new Date().toISOString(),
  }
  const pointerPath = path.join(root, ".ai", "runtime", "pre-commit.json")
  atomicWriteJson(pointerPath, pointer)
  return { pointer, pointerPath }
}

function verifyArmedPreCommit({ projectDir }) {
  const root = projectRoot(projectDir)
  const pointerPath = path.join(root, ".ai", "runtime", "pre-commit.json")
  if (!fs.existsSync(pointerPath)) return { status: "PRE_COMMIT_NOT_ARMED" }
  let pointer
  try {
    pointer = readJson(pointerPath)
  } catch (error) {
    return { status: "PRE_COMMIT_POINTER_INVALID", reason: error instanceof Error ? error.message : String(error) }
  }
  const result = verifyReceipt({ projectDir: root, receiptPath: pointer.receipt_path })
  if (result.status !== "PASS" || result.receipt.receipt_digest !== pointer.receipt_digest) {
    return { status: "APPROVAL_RECEIPT_MISMATCH", reason: result.reason || result.status }
  }
  return { status: "PASS", pointer, receipt: result.receipt }
}

module.exports = {
  REQUIRED_ARTIFACTS,
  armPreCommit,
  createReceipt,
  verifyArmedPreCommit,
  verifyReceipt,
}

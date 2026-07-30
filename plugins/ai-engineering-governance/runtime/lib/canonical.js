"use strict"

const crypto = require("node:crypto")
const fs = require("node:fs")

function normalize(value) {
  if (value === null || typeof value === "string" || typeof value === "boolean") return value
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("canonical JSON does not allow non-finite numbers")
    return value
  }
  if (Array.isArray(value)) return value.map(normalize)
  if (typeof value === "object") {
    const output = {}
    for (const key of Object.keys(value).sort()) {
      if (value[key] === undefined) continue
      output[key] = normalize(value[key])
    }
    return output
  }
  throw new TypeError(`unsupported canonical value type: ${typeof value}`)
}

function canonicalStringify(value) {
  return JSON.stringify(normalize(value))
}

function sha256(value) {
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(String(value), "utf8")
  return crypto.createHash("sha256").update(buffer).digest("hex")
}

function canonicalHash(value) {
  return sha256(canonicalStringify(value))
}

function fileSha256(filePath) {
  return sha256(fs.readFileSync(filePath))
}

module.exports = { canonicalHash, canonicalStringify, fileSha256, normalize, sha256 }

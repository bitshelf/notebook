import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { latestStable } from "./sync-quartz.mjs"
import { verify } from "./check-quartz-vendor.mjs"
test("release selection excludes branches and prereleases and sorts numerically", () => {
  assert.equal(
    latestStable(
      "a refs/tags/v5.9.0\nb refs/tags/v5.10.0\nc refs/tags/v6.0.0-beta.1\nd refs/heads/v7",
    ),
    "v5.10.0",
  )
  assert.throws(() => latestStable("x refs/heads/v5"))
})
test("site baseline matches official stable release", () =>
  assert.match(verify().tag, /^v\d+\.\d+\.\d+$/))
test("core drift is rejected while site overrides remain editable", () => {
  const fixture = fs.mkdtempSync(
    path.join(os.tmpdir(), "bitshelf-vendor-test-"),
  )
  try {
    const site = path.resolve(import.meta.dirname, "..")
    const manifest = JSON.parse(
      fs.readFileSync(path.join(site, "vendor/quartz-manifest.json")),
    )
    fs.mkdirSync(path.join(fixture, "vendor"), { recursive: true })
    for (const rel of [
      "vendor/quartz-upstream.json",
      "vendor/quartz-manifest.json",
      ...Object.keys(manifest.files),
    ]) {
      fs.mkdirSync(path.dirname(path.join(fixture, rel)), { recursive: true })
      fs.copyFileSync(path.join(site, rel), path.join(fixture, rel))
    }
    fs.appendFileSync(
      path.join(fixture, "quartz/styles/custom.scss"),
      "/* local */",
    )
    verify(fixture)
    fs.appendFileSync(path.join(fixture, "quartz/build.ts"), "// drift")
    assert.throws(() => verify(fixture), /Unregistered core modification/)
  } finally {
    const resolved = fs.realpathSync(fixture)
    assert.equal(path.dirname(resolved), fs.realpathSync(os.tmpdir()))
    fs.rmSync(resolved, { recursive: true, force: true })
  }
})

import { execSync } from "node:child_process";
import fs from "node:fs";

const patchFile = ".ai/out.patch";

function run(cmd) {
  return execSync(cmd, { stdio: "inherit" });
}

function runCapture(cmd) {
  return execSync(cmd, { stdio: ["ignore", "pipe", "pipe"] }).toString("utf8");
}

if (!fs.existsSync(patchFile)) {
  console.error(`No patch file found at ${patchFile}`);
  process.exit(1);
}

try {
  const status = runCapture("git status --porcelain").trim();
  if (status) {
    console.error("Working tree not clean. Commit or stash first.");
    process.exit(1);
  }
} catch {
  console.error("Git not available.");
  process.exit(1);
}

run(`git apply --check "${patchFile}"`);
run(`git apply "${patchFile}"`);

console.log("Patch applied successfully.");


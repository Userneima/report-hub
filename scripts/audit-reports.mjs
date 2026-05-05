import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const REPORTS_DIR = join(ROOT, "reports");

const blockedNames = new Set([
  ".DS_Store",
  "node_modules",
  ".screenshots"
]);

const blockedFilePatterns = [
  /\.env(\.|$)/,
  /\.dev-server\./,
  /\.log$/,
  /\.pid$/,
  /\.port$/,
  /\.bat$/,
  /\.ps1$/,
  /\.command$/,
  /\.applescript$/,
  /pnpm-lock\.yaml$/,
  /push-to-github\.sh$/,
  /SKILL\.md$/,
  /react\.svg$/,
  /vite\.svg$/
];

function walk(dir, results = []) {
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    const stat = statSync(fullPath);
    if (blockedNames.has(name)) {
      results.push(fullPath);
      if (stat.isDirectory()) continue;
    }
    if (stat.isDirectory()) {
      walk(fullPath, results);
    } else if (blockedFilePatterns.some((pattern) => pattern.test(name))) {
      results.push(fullPath);
    }
  }
  return results;
}

if (!existsSync(REPORTS_DIR)) {
  console.error(`Missing reports directory: ${REPORTS_DIR}`);
  process.exit(1);
}

const findings = walk(REPORTS_DIR);
if (findings.length === 0) {
  console.log("Report structure audit passed.");
} else {
  console.log("Report structure audit found cleanup candidates:");
  for (const item of findings) console.log(`- ${item}`);
  process.exitCode = 1;
}

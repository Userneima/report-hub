import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const CONFIG_PATH = join(ROOT, "report-hub.config.json");

function loadConfig() {
  const config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
  return {
    ...config,
    reports: config.reports.map((report) => ({
      ...report,
      absolutePath: resolvePath(report.path)
    }))
  };
}

function resolvePath(value) {
  if (!value) return "";
  if (value.startsWith("/")) return value;
  return resolve(ROOT, value);
}

function findReport(config, id) {
  return config.reports.find((report) => report.id === id);
}

function reportState(report) {
  const folderExists = Boolean(report.absolutePath && existsSync(report.absolutePath));
  const entryExists = folderExists && existsSync(join(report.absolutePath, report.entry || "dist/index.html"));
  const fallbackExists = folderExists && report.fallbackEntry && existsSync(join(report.absolutePath, report.fallbackEntry));
  return { folderExists, entryExists, fallbackExists };
}

function list() {
  const config = loadConfig();
  for (const report of config.reports) {
    const state = reportState(report);
    const readiness = state.entryExists ? "ready" : state.fallbackExists ? "source-only" : state.folderExists ? "needs-build" : "missing";
    console.log(`${report.id}\t${readiness}\t${report.title}\t${report.absolutePath}`);
  }
}

function check() {
  const config = loadConfig();
  let failures = 0;

  for (const report of config.reports) {
    const state = reportState(report);
    if (!state.folderExists) {
      failures += 1;
      console.log(`MISSING  ${report.id}: ${report.absolutePath}`);
      if (report.repo) console.log(`         clone: git clone ${report.repo} ${JSON.stringify(report.absolutePath)}`);
      if (report.notes) console.log(`         note: ${report.notes}`);
      continue;
    }
    if (!state.entryExists) {
      console.log(`BUILD    ${report.id}: ${report.entry || "dist/index.html"} not found`);
      if (state.fallbackExists) console.log(`         fallback exists: ${report.fallbackEntry}`);
      if (report.buildCommand) console.log(`         build: cd ${JSON.stringify(report.absolutePath)} && ${report.buildCommand}`);
      continue;
    }
    console.log(`READY    ${report.id}: ${join(report.absolutePath, report.entry || "dist/index.html")}`);
  }

  if (failures > 0) {
    console.log(`\n${failures} report folder(s) are missing.`);
    process.exitCode = 1;
  }
}

function runInReport(report, command) {
  if (!report.absolutePath || !existsSync(report.absolutePath)) {
    console.error(`Report folder missing: ${report.absolutePath}`);
    process.exit(1);
  }
  const result = spawnSync(command, {
    cwd: report.absolutePath,
    shell: true,
    stdio: "inherit",
    env: process.env
  });
  process.exitCode = result.status || 0;
}

function build(id) {
  const config = loadConfig();
  const targets = id ? [findReport(config, id)].filter(Boolean) : config.reports.filter((report) => report.status !== "missing");
  if (id && targets.length === 0) {
    console.error(`Unknown report id: ${id}`);
    process.exit(1);
  }
  for (const report of targets) {
    if (!report.buildCommand) {
      console.log(`SKIP     ${report.id}: no buildCommand`);
      continue;
    }
    console.log(`BUILD    ${report.id}`);
    runInReport(report, report.buildCommand);
  }
}

function archive(id) {
  const config = loadConfig();
  const report = findReport(config, id);
  if (!report) {
    console.error("Usage: npm run archive -- <report-id>");
    process.exit(1);
  }
  const state = reportState(report);
  if (!state.folderExists) {
    console.error(`Report folder missing: ${report.absolutePath}`);
    process.exit(1);
  }

  const stamp = new Date().toISOString().slice(0, 10);
  const outputDir = join(ROOT, "archive", report.id, stamp);
  mkdirSync(outputDir, { recursive: true });

  const note = [
    `# ${report.title} Archive`,
    "",
    `- id: ${report.id}`,
    `- source: ${report.absolutePath}`,
    `- entry: ${report.entry || "dist/index.html"}`,
    `- created: ${new Date().toISOString()}`,
    "",
    "This archive command creates compressed files only. It does not delete source files."
  ].join("\n");
  writeFileSync(join(outputDir, "archive-note.md"), note);

  if (state.entryExists) {
    zip(report.absolutePath, "dist", join(outputDir, `${report.id}-dist.zip`));
  } else {
    console.log(`WARN     ${report.id}: dist entry missing, skipped dist zip`);
  }
  zip(report.absolutePath, ".", join(outputDir, `${report.id}-source.zip`), [
    "node_modules/*",
    "dist/*",
    ".git/*"
  ]);
  console.log(`ARCHIVE  ${outputDir}`);
}

function zip(cwd, source, output, excludes = []) {
  const args = ["-qry", output, source];
  for (const pattern of excludes) args.push("-x", pattern);
  const result = spawnSync("zip", args, { cwd, stdio: "inherit" });
  if (result.status !== 0) {
    console.error(`zip failed for ${source}`);
    process.exit(result.status || 1);
  }
}

const [command, id] = process.argv.slice(2);

switch (command) {
  case "list":
    list();
    break;
  case "check":
    check();
    break;
  case "build":
    build(id);
    break;
  case "archive":
    archive(id);
    break;
  default:
    console.log("Usage: node scripts/report-hub.mjs <list|check|build|archive> [report-id]");
    process.exitCode = 1;
}

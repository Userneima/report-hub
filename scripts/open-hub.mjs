import { createReadStream, existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { createServer, get } from "node:http";
import { extname, join, resolve, relative } from "node:path";
import { spawn } from "node:child_process";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const HUB_DIR = join(ROOT, "hub");
const CONFIG_PATH = join(ROOT, "report-hub.config.json");
const PORT = Number(process.env.REPORT_HUB_PORT || 4260);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf"
};

function loadConfig() {
  const config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
  return {
    ...config,
    reports: config.reports.map((report) => ({
      ...report,
      absolutePath: resolveReportPath(report.path)
    }))
  };
}

function resolveReportPath(reportPath) {
  if (!reportPath) return "";
  if (reportPath.startsWith("/")) return reportPath;
  return resolve(ROOT, reportPath);
}

function safeResolve(base, requestPath) {
  const target = resolve(base, requestPath);
  const rel = relative(base, target);
  if (rel.startsWith("..") || rel === ".." || rel.startsWith("/")) return null;
  return target;
}

function sendJson(res, payload, status = 200) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

function sendText(res, body, status = 200) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(body);
}

function serveFile(res, filePath) {
  if (!filePath || !existsSync(filePath)) {
    sendText(res, "Not found", 404);
    return;
  }
  const stats = statSync(filePath);
  if (stats.isDirectory()) {
    serveFile(res, join(filePath, "index.html"));
    return;
  }
  const type = MIME_TYPES[extname(filePath).toLowerCase()] || "application/octet-stream";
  res.writeHead(200, {
    "Content-Type": type,
    "Content-Length": stats.size,
    "Cache-Control": "no-store"
  });
  createReadStream(filePath).pipe(res);
}

function publicConfig() {
  const config = loadConfig();
  return {
    ...config,
    reports: config.reports.map((report) => {
      const hasPath = Boolean(report.absolutePath && existsSync(report.absolutePath));
      const entryPath = hasPath ? join(report.absolutePath, report.entry || "dist/index.html") : "";
      const fallbackPath = hasPath && report.fallbackEntry ? join(report.absolutePath, report.fallbackEntry) : "";
      const hasEntry = Boolean(entryPath && existsSync(entryPath));
      const hasFallback = Boolean(fallbackPath && existsSync(fallbackPath));
      const workspace = hasPath ? workspaceState(report.absolutePath) : null;
      return {
        ...report,
        exists: hasPath,
        ready: hasEntry,
        hasFallback,
        workspace,
        openUrl: hasEntry ? `/report/${report.id}/${report.entry}` : hasFallback ? `/report/${report.id}/${report.fallbackEntry}` : "",
        folderUrl: `/folder/${report.id}`
      };
    })
  };
}

function countFiles(dir) {
  if (!existsSync(dir)) return 0;
  let count = 0;
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    if (item.name.startsWith(".")) continue;
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) count += countFiles(fullPath);
    else count += 1;
  }
  return count;
}

function workspaceState(reportPath) {
  const briefFile = join(reportPath, "0.brief", "brief.md");
  const researchDir = join(reportPath, "1.research");
  const rawDir = join(reportPath, "2.assets", "raw");
  const selectedDir = join(reportPath, "2.assets", "selected");
  const sourcesFile = join(reportPath, "2.assets", "sources.md");
  return {
    brief: existsSync(briefFile),
    researchFiles: countFiles(researchDir),
    rawAssets: countFiles(rawDir),
    selectedAssets: countFiles(selectedDir),
    sources: existsSync(sourcesFile)
  };
}

function findReport(id) {
  return loadConfig().reports.find((report) => report.id === id);
}

function handleReport(req, res, url) {
  const match = url.pathname.match(/^\/report\/([^/]+)\/?(.*)$/);
  if (!match) {
    sendText(res, "Invalid report route", 400);
    return;
  }
  const report = findReport(decodeURIComponent(match[1]));
  if (!report) {
    sendText(res, "Unknown report", 404);
    return;
  }
  if (!report.absolutePath || !existsSync(report.absolutePath)) {
    sendText(res, "Report folder is missing", 404);
    return;
  }
  const rest = decodeURIComponent(match[2] || report.entry || "dist/index.html");
  const filePath = safeResolve(report.absolutePath, rest);
  serveFile(res, filePath);
}

function handleFolder(res, url) {
  const id = decodeURIComponent(url.pathname.replace(/^\/folder\//, ""));
  const report = findReport(id);
  if (!report || !report.absolutePath || !existsSync(report.absolutePath)) {
    sendText(res, "Report folder is missing", 404);
    return;
  }
  spawn("open", [report.absolutePath], { detached: true, stdio: "ignore" }).unref();
  sendText(res, "Opened");
}

function openUrl(url) {
  spawn("open", [url], { detached: true, stdio: "ignore" }).unref();
}

function probeExistingServer(url) {
  return new Promise((resolveProbe) => {
    const req = get(`${url}/api/config`, (res) => {
      res.resume();
      resolveProbe(res.statusCode && res.statusCode < 500);
    });
    req.setTimeout(800, () => {
      req.destroy();
      resolveProbe(false);
    });
    req.on("error", () => resolveProbe(false));
  });
}

const server = createServer((req, res) => {
  const url = new URL(req.url || "/", `http://127.0.0.1:${PORT}`);

  if (url.pathname === "/api/config") {
    sendJson(res, publicConfig());
    return;
  }
  if (url.pathname.startsWith("/report/")) {
    handleReport(req, res, url);
    return;
  }
  if (url.pathname.startsWith("/folder/")) {
    handleFolder(res, url);
    return;
  }

  const requestPath = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname.slice(1));
  serveFile(res, safeResolve(HUB_DIR, requestPath));
});

const url = `http://127.0.0.1:${PORT}`;

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.log(`Report Hub already running at ${url}`);
    openUrl(url);
    return;
  }
  throw error;
});

if (await probeExistingServer(url)) {
  console.log(`Report Hub already running at ${url}`);
  openUrl(url);
  process.exit(0);
}

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Report Hub running at ${url}`);
  openUrl(url);
});

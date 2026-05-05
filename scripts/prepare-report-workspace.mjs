import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const CONFIG_PATH = join(ROOT, "report-hub.config.json");

function ensureFile(path, content) {
  if (!existsSync(path)) writeFileSync(path, content);
}

function resolveReportPath(reportPath) {
  if (!reportPath) return "";
  if (reportPath.startsWith("/")) return reportPath;
  return join(ROOT, reportPath);
}

function prepareReport(report) {
  const reportDir = resolveReportPath(report.path);
  if (!reportDir || !existsSync(reportDir)) return false;
  const title = report.title || report.id || reportDir.split("/").pop();
  mkdirSync(join(reportDir, "0.brief"), { recursive: true });
  mkdirSync(join(reportDir, "1.research"), { recursive: true });
  mkdirSync(join(reportDir, "2.assets", "raw"), { recursive: true });
  mkdirSync(join(reportDir, "2.assets", "selected"), { recursive: true });
  mkdirSync(join(reportDir, "public", "media"), { recursive: true });
  ensureFile(join(reportDir, "2.assets", "raw", ".gitkeep"), "");
  ensureFile(join(reportDir, "2.assets", "selected", ".gitkeep"), "");
  ensureFile(join(reportDir, "public", "media", ".gitkeep"), "");

  ensureFile(join(reportDir, "0.brief", "brief.md"), `# ${title} Brief

## 汇报目标

- 待补充。

## 受众 / 评分点

- 待补充。

## 页面规划

| 页 / 章节 | 核心观点 | 需要的证据或素材 |
| --- | --- | --- |
| 01 | 待补充 | 待补充 |
`);

  ensureFile(join(reportDir, "1.research", "notes.md"), `# ${title} Research Notes

## 已核验事实

- 待补充。

## 待核验线索

- 待补充。

## 参考链接

- 待补充。
`);

  ensureFile(join(reportDir, "2.assets", "sources.md"), `# ${title} Asset Sources

用户手动下载的素材先放入 \`2.assets/raw/\`。AI 负责筛选、重命名、记录来源，并把最终使用的素材复制到 \`public/media/\`。

| 文件 | 来源 URL | 用途 | 状态 | 备注 |
| --- | --- | --- | --- | --- |
| 待填写 | 待填写 | 待填写 | raw / selected / used | 待填写 |
`);
  return true;
}

const config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
const prepared = (config.reports || []).filter(prepareReport).length;

console.log(`Prepared ${prepared} report workspaces.`);

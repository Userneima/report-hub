import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const CONFIG_PATH = join(ROOT, "report-hub.config.json");

const [rawId, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(" ").trim();

if (!rawId || !title) {
  console.error("Usage: npm run new-report -- <report-id> <report-title>");
  console.error("Example: npm run new-report -- ai-product-review AI 产品调研报告");
  process.exit(1);
}

const id = rawId
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9-]+/g, "-")
  .replace(/^-+|-+$/g, "");

if (!id) {
  console.error("Invalid report id. Use letters, numbers, and hyphens.");
  process.exit(1);
}

const reportDir = join(ROOT, "reports", id);

if (existsSync(reportDir)) {
  console.error(`Report already exists: ${reportDir}`);
  process.exit(1);
}

mkdirSync(join(reportDir, "src"), { recursive: true });
mkdirSync(join(reportDir, "public", "media"), { recursive: true });
mkdirSync(join(reportDir, "0.brief"), { recursive: true });
mkdirSync(join(reportDir, "1.research"), { recursive: true });
mkdirSync(join(reportDir, "2.assets", "raw"), { recursive: true });
mkdirSync(join(reportDir, "2.assets", "selected"), { recursive: true });

writeFileSync(join(reportDir, "2.assets", "raw", ".gitkeep"), "");
writeFileSync(join(reportDir, "2.assets", "selected", ".gitkeep"), "");
writeFileSync(join(reportDir, "public", "media", ".gitkeep"), "");

writeFileSync(join(reportDir, "package.json"), JSON.stringify({
  name: id,
  private: true,
  version: "0.0.0",
  type: "module",
  scripts: {
    dev: "vite",
    build: "vite build",
    preview: "vite preview"
  },
  dependencies: {},
  devDependencies: {
    vite: "^7.0.0"
  }
}, null, 2) + "\n");

writeFileSync(join(reportDir, "index.html"), `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <script type="module" src="/src/main.js"></script>
  </head>
  <body>
    <main class="slide">
      <p class="label">New Report</p>
      <h1>${title}</h1>
      <p>从这里开始制作新的网页 PPT。先写清汇报目标、评分点和页面结构，再进入视觉设计。</p>
    </main>
  </body>
</html>
`);

writeFileSync(join(reportDir, "src", "main.js"), `import "./style.css";
`);

writeFileSync(join(reportDir, "src", "style.css"), `:root {
  color: #102033;
  background: #f4efe6;
  font-family: "Avenir Next", "PingFang SC", sans-serif;
}

body {
  margin: 0;
}

.slide {
  min-height: 100vh;
  display: grid;
  align-content: center;
  gap: 24px;
  padding: 8vw;
}

.label {
  margin: 0;
  color: #0f766e;
  font-size: 18px;
  font-weight: 800;
}

h1 {
  max-width: 980px;
  margin: 0;
  font-size: clamp(56px, 8vw, 120px);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

p {
  max-width: 760px;
  margin: 0;
  font-size: 28px;
  line-height: 1.5;
}
`);

writeFileSync(join(reportDir, "README.md"), `# ${title}

## 目录约定

- \`0.brief/\`: 主题、受众、评分点、页面框架。
- \`1.research/\`: AI 初步填充、调研资料、参考链接。
- \`2.assets/raw/\`: 用户手动保存的原始图片/视频/PDF，不直接在页面引用。
- \`2.assets/selected/\`: AI 筛选、重命名后确认会进入页面的素材。
- \`public/media/\`: 页面实际加载的媒体资源，只放最终使用版本。
- \`src/\`: 页面源码。

## 制作规则

- 先明确汇报目标和评分点，再写页面。
- 手动下载素材时统一放入 \`2.assets/raw/\`，不要散落到桌面或 \`src/\`。
- 使用素材前先记录到 \`2.assets/sources.md\`，再复制最终版本到 \`public/media/\`。
- 中文正文必须适合投影阅读。
- 内容少时主动补充事实、图表、对比、案例或风险边界。
- 完成后运行 \`npm run build\`，再回到报告中心检查入口。
`);

writeFileSync(join(reportDir, "0.brief", "brief.md"), `# ${title} Brief

## 汇报目标

- 待填写。

## 受众 / 评分点

- 待填写。

## 叙事模块

1. 待填写。
2. 待填写。
3. 待填写。
4. 待填写。

## 页面规划

| 页 / 章节 | 核心观点 | 需要的证据或素材 |
| --- | --- | --- |
| 01 | 待填写 | 待填写 |
`);

writeFileSync(join(reportDir, "1.research", "notes.md"), `# ${title} Research Notes

把 AI 初步填充、调研摘录、参考链接和待核验事实放在这里。

## 已核验事实

- 待填写。

## 待核验线索

- 待填写。

## 参考链接

- 待填写。
`);

writeFileSync(join(reportDir, "2.assets", "sources.md"), `# ${title} Asset Sources

用户手动下载的素材先放入 \`2.assets/raw/\`。AI 负责筛选、重命名、记录来源，并把最终使用的素材复制到 \`public/media/\`。

| 文件 | 来源 URL | 用途 | 状态 | 备注 |
| --- | --- | --- | --- | --- |
| 待填写 | 待填写 | 待填写 | raw / selected / used | 待填写 |
`);

const config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
config.reports.push({
  id,
  title,
  subtitle: "New web presentation report",
  path: `reports/${id}`,
  entry: "dist/index.html",
  fallbackEntry: "index.html",
  repo: "",
  status: "active",
  tags: ["PPT", "Draft"],
  buildCommand: "npm run build",
  devCommand: "npm run dev",
  notes: "由 new-report 脚本创建；完成内容后运行 build。"
});
writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + "\n");

console.log(`Created report: ${reportDir}`);

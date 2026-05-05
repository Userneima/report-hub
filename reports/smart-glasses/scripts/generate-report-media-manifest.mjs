/**
 * 扫描 public/report_media 下的图片和视频，根据文件名推断用途，
 * 生成 manifest.json 供网页自动放到对应章节。
 * 运行：node scripts/generate-report-media-manifest.mjs
 * 或在 npm run dev 前执行一次：npm run update-media
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const mediaDir = path.join(projectRoot, "public", "report_media");

const EXT = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".webm"];

/** 每个章节的匹配关键词（小写），命中则加分 */
const SECTION_KEYWORDS = {
  design: [
    "设计",
    "设计创新",
    "design",
    "06",
    "无感化",
    "形态",
    "创新",
    "design_media",
  ],
  scenarios: [
    "场景",
    "应用场景",
    "scenarios",
    "07",
    "使用",
    "场景图",
    "scenarios_media",
  ],
  market: [
    "市场",
    "市场反响",
    "market",
    "08",
    "数据",
    "销量",
    "市占",
    "market_media",
  ],
};

function score(filenameNoExt, section) {
  const lower = filenameNoExt.toLowerCase().replace(/\s/g, "");
  const keywords = SECTION_KEYWORDS[section];
  let score = 0;
  for (const kw of keywords) {
    if (lower.includes(kw.toLowerCase())) score += 1;
    if (lower === kw.toLowerCase() || lower.startsWith(kw.toLowerCase() + "_") || lower.endsWith("_" + kw.toLowerCase()))
      score += 2;
  }
  return score;
}

function inferSection(filename) {
  const base = path.basename(filename, path.extname(filename));
  let best = { section: null, score: 0 };
  for (const section of Object.keys(SECTION_KEYWORDS)) {
    const s = score(base, section);
    if (s > best.score) best = { section, score: s };
  }
  return best.score > 0 ? best.section : null;
}

if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir, { recursive: true });
  console.log("已创建 public/report_media 目录");
  fs.writeFileSync(
    path.join(mediaDir, "manifest.json"),
    JSON.stringify({ design: null, scenarios: null, market: null }, null, 2)
  );
  console.log("已生成空 manifest.json，放入媒体文件后重新运行本脚本即可。");
  process.exit(0);
}

const files = fs.readdirSync(mediaDir).filter((f) => {
  const ext = path.extname(f).toLowerCase();
  return EXT.includes(ext) && !f.startsWith(".");
});

const manifest = { design: null, scenarios: null, market: null };
const assigned = new Set();

for (const file of files) {
  const section = inferSection(file);
  if (section && !assigned.has(section)) {
    manifest[section] = file;
    assigned.add(section);
  }
}

// 若某节未匹配到，保留旧约定文件名（若存在）
if (!manifest.design && files.some((f) => f.startsWith("design_media"))) {
  manifest.design = files.find((f) => f.startsWith("design_media"));
}
if (!manifest.scenarios && files.some((f) => f.startsWith("scenarios_media"))) {
  manifest.scenarios = files.find((f) => f.startsWith("scenarios_media"));
}
if (!manifest.market && files.some((f) => f.startsWith("market_media"))) {
  manifest.market = files.find((f) => f.startsWith("market_media"));
}

const manifestPath = path.join(mediaDir, "manifest.json");
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");

console.log("report_media 清单已更新：", manifest);
process.exit(0);

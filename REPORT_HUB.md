# Report Hub

这个仓库用于统一管理网页形式的汇报 PPT，目标是减少桌面启动器、减少分散仓库，并把制作经验沉淀到一个长期有效的位置。

现在采用 monorepo 结构：报告中心和各个报告源码都放在同一个仓库里。

## 常用命令

```bash
npm run hub
npm run check
npm run audit
npm run prepare-workspaces
npm run list
npm run build -- smart-glasses
npm run archive -- smart-glasses
npm run new-report -- ai-product-review AI 产品调研报告
```

## 当前报告状态

- `reports/smart-glasses`: AI 眼镜报告。
- `reports/feishu-recorder`: 飞书 × 安克 AI 录音豆产品调研报告。
- `reports/agibot-security`: 具身安保报告。
- `reports/embodied-robot`: 机器人与具身 AI 调研报告。

旧目录仍保留在 `/Users/yuchao/Documents/GitHub` 下，当前没有删除。确认统一仓库稳定后，再决定是否清理旧目录。

## 归档原则

汇报结束后不要马上删除源文件。推荐流程：

1. 运行 `npm run build -- <report-id>` 生成 `dist/`。
2. 运行 `npm run archive -- <report-id>` 生成压缩包和归档说明。
3. 确认压缩包可打开后，再决定是否清理该报告的 `node_modules/`。

`archive` 命令只压缩，不删除，避免误伤源项目。

## 新建报告

以后新报告不要新建仓库，直接运行：

```bash
npm run new-report -- <report-id> <报告标题>
```

例如：

```bash
npm run new-report -- ai-product-review AI 产品调研报告
```

脚本会自动创建 `reports/<report-id>/`，并把配置写入 `report-hub.config.json`。

## 资料与素材工作流

以后制作新报告时，资料不要散落在桌面或临时下载目录。固定流程如下：

1. `0.brief/brief.md`: 写主题、受众、评分点、叙事模块和页面规划。
2. `1.research/notes.md`: 放 AI 初步填充、调研摘录、参考链接和待核验事实。
3. `2.assets/raw/`: 放用户手动下载的原始图片、视频、PDF 或截图。
4. `2.assets/selected/`: 放 AI 筛选、重命名、确认会进入页面的素材。
5. `2.assets/sources.md`: 记录素材来源 URL、用途、状态和备注。
6. `public/media/`: 只放页面最终实际加载的媒体资源。

这个结构吸收了旧 `autoresearch-cursor` 的有效部分：保留“资料收件箱”和“来源索引”的思想，但不再维护独立搜索应用和后端服务。

## 报告制作 Skill

已将多份报告的共性沉淀为 `web-ppt-report` skill：

- 仓库副本：`skills/web-ppt-report/SKILL.md`
- 本机激活副本：`/Users/yuchao/.agents/skills/web-ppt-report/SKILL.md`

它适用于后续创建、优化、审查网页形式 PPT，重点约束评分点映射、内容补足、中文投影可读性、页面密度与最终 QA。

## GitHub 统一仓库

当前统一仓库已推送到 `https://github.com/Userneima/report-hub`。

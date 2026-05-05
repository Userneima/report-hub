# Report Hub

这个仓库用于统一管理网页形式的汇报 PPT，目标是减少桌面启动器、减少分散仓库，并把制作经验沉淀到一个长期有效的位置。

现在采用 monorepo 结构：报告中心和各个报告源码都放在同一个仓库里。

## 常用命令

```bash
npm run hub
npm run check
npm run list
npm run build -- smart-glasses
npm run archive -- smart-glasses
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

## GitHub 统一仓库

目标是把这里作为唯一线上仓库。当前本地已经初始化 git，但还需要一个 GitHub 远程仓库 URL。

推荐远程仓库名：

```bash
Userneima/report-hub
```

拿到远程 URL 后执行：

```bash
git remote add origin https://github.com/Userneima/report-hub.git
git push -u origin main
```

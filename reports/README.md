# Reports Directory

这里存放网页 PPT 的主版本。每个报告一个目录，统一由根目录 `report-hub.config.json` 管理。

## Standard Shape

```text
reports/<report-id>/
├── 0.brief/         # 汇报目标、受众、评分点、页面框架
├── 1.research/      # 调研笔记、AI 初稿、参考链接、待核验线索
├── 2.assets/        # 素材收件箱与筛选区
├── src/              # 页面源码
├── public/           # 页面实际加载的静态资源
├── dist/             # 构建后的可打开版本
├── README.md         # 报告用途与修改入口
├── package.json      # 报告自己的开发命令
└── vite.config.*     # 构建配置
```

## Rules

- 新报告用 `npm run new-report -- <id> <标题>` 创建。
- 不再为单份报告保留桌面 `.app`、`.command`、`.bat` 或 `.ps1` 启动器。
- `dist/` 目前保留，用于报告中心无需安装依赖即可打开报告。
- 临时截图、运行日志、端口文件、`node_modules`、`.env*` 不应提交。
- 统一使用 `npm` 与 `package-lock.json`；不要同时保留 `pnpm-lock.yaml`。
- 用户手动下载的素材先放入 `2.assets/raw/`，不要放在桌面、`src/` 或散落到根目录。
- AI 筛选后把会使用的素材复制到 `2.assets/selected/`，并在 `2.assets/sources.md` 记录来源、用途和状态。
- 页面只引用 `public/media/` 中的最终素材；不要直接引用 `2.assets/raw/`。
- 调研资料、AI 初稿、事实核验和参考链接放在 `1.research/`，不要混进页面源码。

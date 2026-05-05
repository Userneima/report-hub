# Reports Directory

这里存放网页 PPT 的主版本。每个报告一个目录，统一由根目录 `report-hub.config.json` 管理。

## Standard Shape

```text
reports/<report-id>/
├── src/              # 页面源码
├── public/           # 原始媒体与静态资源
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
- 研究资料和原始素材可以保留，但要放在报告目录内的明确文件夹中。

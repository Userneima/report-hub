项目概述

- 说明：本仓库是 Ray‑Ban Meta 智能眼镜的深色极简长图文展示页，作为智能设计课程的案例调研与汇报展示。页面以单页长文形式呈现品牌、产品、技术、市场与用户反馈的多维拆解。

快速技术栈

- 前端：React + TypeScript（React 19）
- 构建：Vite（vite.config.ts）
- 样式：Tailwind CSS（自定义变量在 `src/index.css`）
- 路由：wouter（hash 路由，支持 file:// 打开）
- 组件/库：Radix UI、framer-motion、recharts、sonner 等

关键文件位置（快速导航）

- 入口： [src/main.tsx](src/main.tsx#L1)
- 应用与全局配置： [src/App.tsx](src/App.tsx#L1)
- 报告主页面： [src/pages/Home.tsx](src/pages/Home.tsx#L1)
- 全局样式： [src/index.css](src/index.css#L1)
- 构建配置： [vite.config.ts](vite.config.ts#L1)
- 依赖与脚本： [package.json](package.json#L1)
- 报告素材： `public/report/` 与 `public/report_media/`（图片/视频/Markdown）

如何本地运行（推荐 pnpm）

```bash
pnpm install
pnpm dev
```

生产构建与预览：

```bash
pnpm build
pnpm preview
```

开发约定与快速修改指南

- 导航（TOC）：顶部导航在 [src/pages/Home.tsx](src/pages/Home.tsx#L160) 的 `nav` 数组中定义，调整标签或顺序直接编辑该数组。
- 章节与锚点：每章节以 `<section id="...">` 标识，支持 `/#/{id}` 的 hash 路由跳转（见 `Home.tsx`）。
- 媒体资源：所有媒体放在 `public/report_media/`，通过 `/report_media/文件名` 引用。
- Caption/来源：图片下方标题与来源样式已在 `Home.tsx` 中统一为与 02 章节一致（标题：`text-white/75`，来源：`text-white/45`）。
- 关键样式点：新增 `.highlight-marker`（`src/index.css`）用于技术表格的关键词高亮。

近期已完成的关键改动（交接要点）

- 导航：数字后缀改为默认隐藏，悬停显示；产品下拉改为绝对定位浮窗，修复悬浮断层问题（使用 padding-top）。
- 03 章节：重构为 3:7 栅格、移除图片外框、图片铺满右列、添加标题/来源、文字优化为深度描述、关键字高亮、图文间距/容器 overflow 修复。
- 视频卡片：拆分为上部圆角媒体与下部独立文本块，防止文字被圆角遮挡。
- 技术参数表：添加 `.highlight-marker` 并为指定关键词应用高亮样式。

建议的后续工作

- 移动端断点：为 03 章节在窄屏下恢复单列并优化图片高度与裁切。
- 组件化：将重复的媒体 caption/credit 提取为 `MediaCaption` 或 `MediaFigure` 复用组件。
- 视觉体验：为图片添加轻量 Lightbox 预览（大图查看）。
- 可访问性：补充 alt 文本、语义标签与键盘导航支持。

交付说明

- 该文档旨在快速让其他 AI 或开发者上手：包含项目目的、运行步骤、关键文件与近期改动摘要。把本文件与仓库一起交付，接收方即可快速定位并作进一步开发或生成 PR。

我可以帮你：
- 1) 运行开发服务器并截取关键页面截图；
- 2) 将重复 caption 抽成组件并替换现有用法；
- 3) 优化移动端响应式断点。

请选择要我执行的下一步（回复 1 / 2 / 3 或给出其他指示）。

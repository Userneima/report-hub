# 设计 Brainstorm（按工作流要求）

> 目标：Web-native 长图文研究报告（深色模式 + 荧光绿点缀），强调“模块化”与“流线感”。

## 方案 A：Dataflow Tech Noir（我选择的方案）
- **Design Movement**：Tech Noir × 信息可视化 UI（偏干净的 HUD，而非杂乱 Cyberpunk）
- **Core Principles**：高对比可读性 / 模块化 Bento 卡片 / 数据流分隔带 / 粗体标题+短句扫读
- **Color Philosophy**：深蓝黑作为“静场”，荧光绿作为“结构骨架”（线、边、数字高亮），避免大面积纯绿造成眩光
- **Layout Paradigm**：单页长图文 + 顶部章节轨道（scroll spy）+ 章节间“数据流”过渡
- **Signature Elements**：扫描线叠层、微弱噪声纹理、霓虹边框 glow
- **Interaction Philosophy**：导航即“章节切换”；可预测但有仪式感
- **Animation**：进入视口的 reveal（150–220ms）；进度条；尊重 prefers-reduced-motion
- **Probability（<1.0）**：0.73

## 方案 B：Neo-Brutalist Lab Notes
- **Design Movement**：Neo-Brutalism × 工程实验记录
- **Core Principles**：强烈线框 / 大字号数字 / 断裂式排版 / 高密度参数板
- **Color Philosophy**：黑白灰为底，荧光绿“硬切”强调（更激进）
- **Layout Paradigm**：破格排版 + 斜切分区 + 超大编号章节
- **Signature Elements**：粗线网格、警示条纹、印章式标签
- **Interaction Philosophy**：滚动触发“章节点亮”，带更强戏剧性
- **Animation**：夸张的滑入/切割转场（更重）
- **Probability（<1.0）**：0.41

## 方案 C：Glass Bento SaaS Premium
- **Design Movement**：Premium SaaS Glassmorphism × Bento Grid
- **Core Principles**：通透玻璃卡 / 柔和渐变 / 层级阴影 / 极简图标
- **Color Philosophy**：深色渐变背景 + 荧光绿轻点缀（更“安全”）
- **Layout Paradigm**：更规整的栅格与对齐（更易读但不够大胆）
- **Signature Elements**：玻璃高光、柔光边界、圆角一致性
- **Interaction Philosophy**：hover 高光，整体克制
- **Animation**：轻微浮动与渐显
- **Probability（<1.0）**：0.58

## 最终选择
我选择 **方案 A（Dataflow Tech Noir）**：在“大胆”与“可读”之间更适合课堂展示型研究报告——既有强科技感，也能承载密集的事实与引用。

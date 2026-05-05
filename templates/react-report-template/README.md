# React Report Template

新报告建议从统一模板开始，而不是每次从零搭一个仓库。

建议约定：

- `0.brief/`: 主题、受众、评分点、页面规划。
- `1.research/`: AI 初稿、调研资料、参考链接、待核验事实。
- `2.assets/raw/`: 用户手动下载的原始素材。
- `2.assets/selected/`: AI 筛选后准备进入页面的素材。
- `src/content/`: 报告内容与引用资料。
- `src/slides/`: 页面组件。
- `src/shared/`: 可复用图表、卡片、脚注、导航。
- `public/media/`: 页面最终加载的图片、视频、截图。
- `dist/`: 汇报完成后的静态输出。

新增报告后，把目录加入根目录 `report-hub.config.json`。

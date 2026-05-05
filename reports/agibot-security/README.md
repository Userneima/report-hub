# 具身智能的安保黎明：智元远征 A2 商业落地实测

基于智元机器人(AgiBot)与策安集团(Certis)合作的具身智能安保机器人研究报告网页，用于浙江大学《智能设计》课程案例分享。风格：瑞士平面主义×赛博极简，深黑底+冷青强调色，Bento Grid布局，顶部导航。

## 本地开发

```bash
npm install
npm run dev
```

## 推送到 GitHub

1. 在 GitHub 网页 **[New repository](https://github.com/new)** 创建**公开**仓库，名称填 **`agibot-embodied-security-report`**，**不要**勾选 README / .gitignore / license（保持空仓库）。
2. 在项目根目录执行（把 `你的用户名` 换成你的 GitHub 用户名）：

```bash
chmod +x scripts/push-to-github.sh
GITHUB_USERNAME=你的用户名 bash scripts/push-to-github.sh
```

或手动：

```bash
git remote add origin https://github.com/你的用户名/agibot-embodied-security-report.git
git branch -M main
git push -u origin main
```

若已配置过 `origin`，只需：`git push -u origin main`。

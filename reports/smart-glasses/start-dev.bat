@echo off
REM 启动 Dev Server：在新 cmd 窗口运行 pnpm run dev，然后在当前窗口等待并打开浏览器
cd /d "%~dp0"
start "Dev Server" cmd /k "pnpm run dev"
REM 等待 5 秒再打开浏览器（若服务器尚未就绪请刷新页面）
timeout /t 5 /nobreak >nul
start "" http://localhost:5185
pause
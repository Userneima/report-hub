@echo off
chcp 65001 >nul
title Ray-Ban Meta 汇报 PPT - 开发服务器

REM 若未在“保持打开”模式下运行，则在新窗口中重新运行本脚本（该窗口会一直保留）
if "%1" neq ":keepopen" (
  start "Ray-Ban Meta 汇报" cmd /k "%~f0" :keepopen
  exit /b 0
)

cd /d "%~dp0"
if errorlevel 1 (
  echo 错误：无法进入项目目录。
  echo 当前路径：%cd%
  goto :end
)

if not exist "package.json" (
  echo 错误：未找到 package.json，请确认本脚本在 Ray-Ban Meta 项目根目录下。
  goto :end
)

where npm >nul 2>nul
if errorlevel 1 (
  echo 错误：未找到 npm 命令。请先安装 Node.js 并确认已勾选“添加到 PATH”。
  goto :end
)

REM 若依赖未安装（缺少 vite），先自动执行 npm install
if not exist "node_modules\vite\bin\vite.js" (
  echo  未检测到依赖，正在执行 npm install...
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo 错误：npm install 失败，请检查网络或在本目录手动执行 npm install。
    goto :end
  )
  echo.
  echo  依赖安装完成。
  echo.
)

echo  正在启动开发服务器，浏览器将自动打开...
echo  关闭本窗口即可停止服务器。
echo.

call npm run dev

:end
echo.
pause

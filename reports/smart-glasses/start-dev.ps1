# start-dev.ps1
# 作用：优先使用 pnpm 启动 dev，回退到 npm；等待服务器可用后自动打开浏览器

$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $projectDir

# 端口和 URL（与 vite.config.ts 中 server.port 保持一致）
$port = 5185
$url = "http://localhost:$port/"

# 选择包管理器并在新窗口中启动开发服务器（保持可见）
$exe = $null
$exeArgs = $null
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
  $exe = "pnpm"
  $exeArgs = @("run","dev")
  Write-Host 'Starting dev server using pnpm'
} elseif (Get-Command npm -ErrorAction SilentlyContinue) {
  $exe = "npm"
  $exeArgs = @("run","dev")
  Write-Host 'pnpm not found, using npm to start dev server'
} elseif (Get-Command npx -ErrorAction SilentlyContinue) {
  $exe = "npx"
  $exeArgs = @("vite")
  Write-Host 'pnpm/npm not found, using npx to run vite'
} else {
  Write-Host 'No pnpm/npm/npx found. Please install Node.js and a package manager, then run "pnpm run dev" or "npm run dev".'
  exit 1
}

# 在新进程中直接运行包管理器命令（会打开新的终端窗口）
Start-Process -FilePath $exe -ArgumentList $exeArgs -WorkingDirectory $projectDir

# 等待服务器就绪
Write-Host "Waiting for dev server at $url to become ready... (max 60s)"
$ready = $false
$max = 60
for ($i = 0; $i -lt $max; $i++) {
  try {
    $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    if ($r.StatusCode -eq 200) { $ready = $true; break }
  } catch {
    Start-Sleep -Seconds 1
  }
}

if ($ready) {
  Write-Host "Server ready, opening browser: $url"
  Start-Process $url
} else {
  Write-Host "Timeout: could not reach $url within $max seconds. Check dev server output or run 'pnpm run dev'/'npm run dev' manually."
}

Write-Host 'Script finished.'
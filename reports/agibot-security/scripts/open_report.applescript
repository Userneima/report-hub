-- AgiBot × Certis Report Launcher
-- Double-click to start dev server and open report in browser

-- Resolve repo on the current user's Desktop (folder name must match checkout)
set projectPath to (POSIX path of (path to desktop folder)) & "agibot-embodied-security-report"
set scriptPath to projectPath & "/scripts/open_report.sh"

try
	do shell script "bash " & quoted form of scriptPath
on error errMsg
	display dialog "启动失败: " & errMsg buttons {"OK"} default button "OK" with icon stop
end try

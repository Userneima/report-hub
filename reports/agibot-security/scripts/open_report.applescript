-- AgiBot × Certis Report Launcher
-- Double-click to start dev server and open report in browser

set projectPath to "/Users/yuchao/Documents/GitHub/report-hub/reports/agibot-security"
set scriptPath to projectPath & "/scripts/open_report.sh"

try
	do shell script "bash " & quoted form of scriptPath
on error errMsg
	display dialog "启动失败: " & errMsg buttons {"OK"} default button "OK" with icon stop
end try

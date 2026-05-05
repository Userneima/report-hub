-- Double-click launcher for report dev server.
-- It installs dependencies if needed, starts Vite in background,
-- waits for localhost:5180, then opens browser.

set projectPath to "/Users/yuchao/Documents/GitHub/Embodied Robot Investigation"
set targetUrl to "http://localhost:5180"
set logFile to "/tmp/embodied_robot_report_dev.log"
set ready to false

set shellScript to "set -e; " & ¬
	"cd " & quoted form of projectPath & "; " & ¬
	"if [ ! -d node_modules ]; then npm install; fi; " & ¬
	"if ! lsof -i :5180 -sTCP:LISTEN >/dev/null 2>&1; then " & ¬
	"nohup npm run dev -- --port 5180 > " & quoted form of logFile & " 2>&1 & " & ¬
	"fi"

do shell script shellScript

repeat with i from 1 to 30
	try
		do shell script "curl -fsS " & quoted form of targetUrl & " >/dev/null 2>&1"
		set ready to true
		exit repeat
	on error
		delay 1
	end try
end repeat

if ready then
	do shell script "open " & quoted form of targetUrl
else
	display dialog "服务未在30秒内启动。可查看日志：" & return & logFile buttons {"OK"} default button "OK"
end if

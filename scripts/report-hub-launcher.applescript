set projectPath to "/Users/yuchao/Documents/GitHub/report-hub"
set hubURL to "http://127.0.0.1:4260"
set logFile to "/tmp/report-hub-launcher.log"
set maxWait to 30

try
	do shell script "curl -fsS --max-time 2 " & quoted form of (hubURL & "/api/config") & " >/dev/null"
	do shell script "open " & quoted form of hubURL
	return
end try

try
	do shell script "cd " & quoted form of projectPath & " && /bin/zsh -lic " & quoted form of "nohup npm run hub >> /tmp/report-hub-launcher.log 2>&1 &"
on error errMsg
	display dialog "报告中心启动失败：" & return & return & errMsg & return & return & "日志：" & logFile buttons {"OK"} default button "OK" with icon stop
	return
end try

repeat maxWait times
	delay 1
	try
		do shell script "curl -fsS --max-time 2 " & quoted form of (hubURL & "/api/config") & " >/dev/null"
		do shell script "open " & quoted form of hubURL
		return
	end try
end repeat

display dialog "报告中心未能在 " & maxWait & " 秒内启动。" & return & return & "请查看日志：" & logFile buttons {"OK"} default button "OK" with icon caution

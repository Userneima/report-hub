-- Desktop launcher: install/build if needed, start vite preview on 4173, open browser.
-- Relies on scripts/launch-preview-desktop.sh for a full login-style PATH (Homebrew/nvm).

set projectPath to "/Users/yuchao/Documents/GitHub/Embodied Robot Investigation"
set targetUrl to "http://127.0.0.1:4173/"
set logFile to "/tmp/embodied_robot_report_preview.log"
set launcher to projectPath & "/scripts/launch-preview-desktop.sh"

-- Do not use `zsh -lc` + path here: spaces in "Embodied Robot Investigation" break `-c` parsing.
-- Run the executable script directly; shebang selects zsh.
with timeout of 600 seconds
	try
		do shell script quoted form of launcher
	on error errMsg number errNum
		display dialog "服务未在时限内就绪或启动失败。" & return & return & errMsg & return & return & "日志：" & logFile buttons {"OK"} default button "OK"
		error number -128
	end try
end timeout

do shell script "open " & quoted form of targetUrl

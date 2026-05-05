#!/bin/zsh
set -euo pipefail

# AppleScript `do shell script` uses a minimal PATH; Node may live under Homebrew or nvm.
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
if [[ -s "$HOME/.nvm/nvm.sh" ]]; then
  # shellcheck disable=SC1090
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  . "$HOME/.nvm/nvm.sh"
fi

PROJECT="/Users/yuchao/Documents/GitHub/Embodied Robot Investigation"
LOG="/tmp/embodied_robot_report_preview.log"
cd "$PROJECT"

exec >>"$LOG" 2>&1
echo "---- $(date) launch-preview-desktop ----"

if ! command -v npm >/dev/null 2>&1; then
  echo "ERROR: npm not found. Install Node or ensure PATH includes it (Homebrew/nvm)."
  exit 127
fi

if [[ ! -d node_modules ]]; then
  echo "Installing npm dependencies..."
  npm install
fi
if [[ ! -f dist/index.html ]]; then
  echo "Building production bundle..."
  npm run build
fi
if ! lsof -iTCP:4173 -sTCP:LISTEN -P >/dev/null 2>&1; then
  echo "Starting preview on 4173..."
  nohup npm run preview -- --host 127.0.0.1 --port 4173 --strictPort >>"$LOG" 2>&1 &
fi

for i in {1..120}; do
  if curl -fsS http://127.0.0.1:4173/ >/dev/null 2>&1; then
    echo "Preview ready after ${i}s"
    exit 0
  fi
  sleep 1
done
echo "ERROR: preview did not respond within 120s"
exit 1

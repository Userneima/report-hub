#!/bin/bash
# Launcher script for AgiBot × Certis Report
# Starts Vite dev server if not already running, then opens browser.

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PIDFILE="${PROJECT_DIR}/.dev-server.pid"
PORTFILE="${PROJECT_DIR}/.dev-server.port"
PREFERRED_PORT=5666

# Ensure node/npm are on PATH regardless of how this script is invoked
export PATH="/usr/local/bin:/opt/homebrew/bin:$HOME/.nvm/versions/node/$(ls "$HOME/.nvm/versions/node/" 2>/dev/null | sort -V | tail -1)/bin:/usr/bin:/bin:$PATH"

check_url() {
  curl -s -o /dev/null -w "%{http_code}" "$1" 2>/dev/null | grep -q "200"
}

first_free_port() {
  local p
  for p in $(seq 5666 5699); do
    if ! lsof -nP -iTCP:"$p" -sTCP:LISTEN >/dev/null 2>&1; then
      echo "$p"
      return 0
    fi
  done
  return 1
}

cd "$PROJECT_DIR" || exit 1

# Auto-install if node_modules is missing
if [ ! -d "node_modules" ]; then
  if command -v pnpm &>/dev/null; then
    pnpm install
  else
    npm install
  fi
fi

# Reuse: recorded process still up and responds on saved port
if [ -f "$PIDFILE" ]; then
  OLD_PID=$(tr -d '[:space:]' <"$PIDFILE")
  if [ -n "$OLD_PID" ] && kill -0 "$OLD_PID" 2>/dev/null; then
    PORT=$(tr -d '[:space:]' <"$PORTFILE" 2>/dev/null)
    PORT=${PORT:-$PREFERRED_PORT}
    URL="http://localhost:${PORT}"
    if check_url "$URL"; then
      open "$URL"
      exit 0
    fi
    kill "$OLD_PID" 2>/dev/null || true
  fi
  rm -f "$PIDFILE" "$PORTFILE"
fi

# Something already listening on preferred port with a usable page (e.g. manual vite)
URL="http://localhost:${PREFERRED_PORT}"
if check_url "$URL"; then
  open "$URL"
  exit 0
fi

PORT=$(first_free_port) || {
  echo "No free TCP port in 5666–5699" >&2
  exit 1
}
URL="http://localhost:${PORT}"

# Start dev server in background (strictPort so URL matches what we poll)
npx vite --port "$PORT" --strictPort >>"${PROJECT_DIR}/.dev-server.log" 2>&1 &
DEV_PID=$!
echo "$DEV_PID" >"$PIDFILE"
echo "$PORT" >"$PORTFILE"

# Poll until server responds (cold start / 首次装依赖后编译可能较慢)
WAITED=0
MAX_WAIT=120
while [ "$WAITED" -lt "$MAX_WAIT" ]; do
  if check_url "$URL"; then
    open "$URL"
    exit 0
  fi
  sleep 1
  WAITED=$((WAITED + 1))
done

echo "Server did not start within ${MAX_WAIT}s. See ${PROJECT_DIR}/.dev-server.log" >&2
exit 1

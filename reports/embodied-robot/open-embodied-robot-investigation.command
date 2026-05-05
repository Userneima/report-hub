#!/bin/zsh
# Quick open for macOS Finder/desktop.
# Opens built report via local http server (vite preview).
# Direct `file://.../dist/index.html` opening triggers browser CORS/security blocks.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

if [ ! -f "dist/index.html" ]; then
  echo "[embodied] dist/index.html not found; running npm run build..."
  npm run build
fi

HOST="127.0.0.1"
PORT="${EMBODIED_PREVIEW_PORT:-4173}"
URL="http://${HOST}:${PORT}/"

is_listening() {
  if command -v lsof >/dev/null 2>&1; then
    lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1
    return $?
  fi
  # Fallback: if curl exists, probe the URL.
  if command -v curl >/dev/null 2>&1; then
    curl -fsS "$URL" >/dev/null 2>&1
    return $?
  fi
  return 1
}

if is_listening; then
  echo "[embodied] Preview server already running at ${URL}"
else
  echo "[embodied] Starting preview server at ${URL} ..."
  # Start in background; keep logs in a temp file.
  # shellcheck disable=SC2026
  (npm run preview -- --host "$HOST" --port "$PORT" --strictPort > /tmp/embodied-preview.log 2>&1 &)

  # Wait until server responds.
  for _ in {1..30}; do
    if curl -fsS "$URL" >/dev/null 2>&1; then
      break
    fi
    sleep 0.2
  done
fi

echo "[embodied] Opening ${URL} ..."
open "$URL"


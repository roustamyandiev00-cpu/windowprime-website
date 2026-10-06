#!/bin/bash
cd "$(dirname "$0")"
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

if ! command -v node >/dev/null 2>&1; then
  osascript -e 'display dialog "Node.js is niet gevonden. Installeer Node.js 22 of nieuwer (nodejs.org)." buttons {"OK"} default button 1 with icon stop'
  exit 1
fi

NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]")
if [ "$NODE_MAJOR" -lt 22 ]; then
  osascript -e 'display dialog "Node.js 22+ is vereist. Huidige versie: '"$(node -v)"'" buttons {"OK"} default button 1 with icon caution'
  exit 1
fi

if lsof -ti:3000 >/dev/null 2>&1; then
  open "http://localhost:3000/"
  osascript -e 'display dialog "De website draait al op http://localhost:3000/" buttons {"OK"} default button 1'
  exit 0
fi

npm run dev &
SERVER_PID=$!

for _ in $(seq 1 45); do
  if curl -sf "http://localhost:3000/" >/dev/null 2>&1; then
    open "http://localhost:3000/"
    wait "$SERVER_PID"
    exit 0
  fi
  sleep 1
done

kill "$SERVER_PID" 2>/dev/null
osascript -e 'display dialog "De server startte niet binnen 45 seconden. Open Terminal in deze map en voer uit: npm run dev" buttons {"OK"} default button 1 with icon stop'
exit 1

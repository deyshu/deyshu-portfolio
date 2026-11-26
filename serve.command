#!/bin/bash
# Double-click to preview the portfolio locally (works fully offline).
cd "$(dirname "$0")" || exit 1
PORT=8080
echo "Serving DEYSHU portfolio at http://localhost:$PORT"
echo "Opening your browser... press Ctrl+C here to stop."
( sleep 1; open "http://localhost:$PORT" ) &
python3 -m http.server "$PORT"

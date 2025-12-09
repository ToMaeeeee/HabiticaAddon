#!/usr/bin/env bash

# ===== CONFIG =====
BASE_URL="https://script.google.com/macros/s/AKfycbz06a6BkRCqtZRSJRNphi79u_m5KlmdQNYwONK-2sveR7I7kJu_DyZBW2A5jWisF__b/exec"

# ===== USAGE =====
# ./run.sh foo
# ==================

ACTION="$1"

if [ -z "$ACTION" ]; then
  echo "Usage: ./run.sh <action>"
  exit 1
fi

# CALL THE WEB APP
echo "→ Calling GAS action: $ACTION"
curl -s "$BASE_URL"
echo

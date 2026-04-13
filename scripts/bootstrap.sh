#!/usr/bin/env sh
set -eu

echo "Bootstrapping sovereign AI environment..."

if ! command -v ollama >/dev/null 2>&1; then
  echo "Ollama not installed (missing 'ollama' on PATH)." >&2
  exit 1
fi

OLLAMA_MODEL="${OLLAMA_MODEL:-qwen2.5-coder}"
echo "Pulling model: ${OLLAMA_MODEL}"
ollama pull "${OLLAMA_MODEL}"

echo "Done."


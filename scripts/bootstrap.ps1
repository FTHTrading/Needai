Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Write-Host "Bootstrapping sovereign AI environment..."

if (-not (Get-Command ollama -ErrorAction SilentlyContinue)) {
  Write-Error "Ollama not installed (missing 'ollama' on PATH)."
  exit 1
}

if (-not $env:OLLAMA_MODEL) {
  $env:OLLAMA_MODEL = "qwen2.5-coder"
}

Write-Host "Pulling model: $env:OLLAMA_MODEL"
ollama pull $env:OLLAMA_MODEL

Write-Host "Done."


# AI RULES (AUTHORITATIVE)

These rules apply to all AI-assisted work in this repository.

## Core Principles

- AI is subordinate to the human operator.
- No autonomous execution.
- No assumptions. Ask if uncertain.
- Prefer code over prose.
- Output must be reproducible.
- Never print, store, or infer secrets.
- Return ONLY what the prompt explicitly requests.

## System Context: Weather Intake OS

This is a sovereign AI-powered phone routing system with:
- 45 phone numbers across 7 personas (STORM, HAIL, HVAC, CLAIMS, LAW, MONEY, NEED)
- Weather-triggered activation rules
- Telnyx telephony integration
- Next.js dashboard and marketplace

### Canonical References
- `CANONICAL_NUMBERS.md` - Single source of truth for all numbers
- `lib/routing/engine.ts` - Core routing logic with NUMBER_TO_PERSONA
- `lib/weather-trigger/rules.ts` - Weather activation rules
- `personas/*.md` - AI behavior scripts per vertical

## Clawdbot Integration

Clawdbot is the sovereign AI layer that:
1. Runs locally when possible (Ollama @ localhost:11434)
2. Falls back to remote APIs when needed (OpenAI-compatible)
3. Never makes autonomous decisions
4. Always produces deterministic, auditable outputs

### Execution Modes
- `local` - Ollama/LM Studio only (no rate limits, works offline)
- `remote` - OpenAI/Azure API (for complex reasoning)
- `auto` - Try local first, fallback to remote

### CLI Usage
```bash
npm run clawdbot -- <prompt_name> [input.json]
npm run clawdbot -- --list
npm run clawdbot -- --audit
```

## Output Standards

All AI outputs must:
- Be structured (JSON, YAML, or typed code)
- Include confidence scores where applicable
- Reference source files explicitly
- Be reproducible given the same inputs
- Never invent APIs, versions, or phone numbers

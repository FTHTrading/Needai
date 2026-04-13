# TASK: Audit Routing Configuration

## Input
- CANONICAL_NUMBERS.md
- lib/routing/engine.ts
- lib/weather-trigger/rules.ts

## Checks
1. All numbers in CANONICAL_NUMBERS.md exist in NUMBER_TO_PERSONA
2. All numbers in NUMBER_TO_PERSONA have a persona script
3. All weather rules reference valid numbers
4. No duplicate number assignments
5. All personas have at least one number

## Output Format
```json
{
  "status": "pass" | "fail",
  "checks": {
    "canonical_to_routing": { "pass": true, "missing": [] },
    "routing_to_personas": { "pass": true, "missing": [] },
    "weather_rules": { "pass": true, "invalid": [] },
    "duplicates": { "pass": true, "duplicates": [] },
    "orphan_personas": { "pass": true, "orphans": [] }
  },
  "summary": "string"
}
```

## Validation
- Output must be valid JSON
- All arrays must be populated or empty (never null)

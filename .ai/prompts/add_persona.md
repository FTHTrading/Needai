# TASK: Add New Persona

## Input
- Persona name (e.g., "SOLAR")
- Vertical description
- Phone numbers to assign

## Constraints
- Must follow existing persona script format
- Must update CANONICAL_NUMBERS.md
- Must add to NUMBER_TO_PERSONA mapping
- Must create weather activation rules if applicable

## Output Format
```
FILES TO CREATE:
- personas/{PERSONA}.md

FILES TO UPDATE:
- CANONICAL_NUMBERS.md (add section)
- lib/routing/engine.ts (add to NUMBER_TO_PERSONA)
- lib/weather-trigger/rules.ts (if weather-triggered)

PERSONA SCRIPT:
[full markdown content]

ROUTING ENTRIES:
[TypeScript entries for NUMBER_TO_PERSONA]
```

## Validation
- All numbers must be unique
- Persona name must be uppercase
- Script must include greeting, qualification questions, and escalation paths

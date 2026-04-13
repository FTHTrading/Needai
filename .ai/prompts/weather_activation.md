# TASK: Weather Activation Analysis

## Input
- Weather signal data (event_type, severity, region)
- Current activation state
- Available phone numbers by persona

## Constraints
- Only recommend activations for numbers that exist in CANONICAL_NUMBERS.md
- Priority levels: emergency > urgent > standard
- Consider geographic relevance (state matching)
- Never activate toll-free numbers for regional events

## Output Format
```json
{
  "recommended_activations": [
    {
      "number": "string",
      "persona": "string",
      "reason": "string",
      "priority": "emergency|urgent|standard",
      "ai_mode": "string"
    }
  ],
  "deactivations": [
    {
      "number": "string",
      "reason": "string"
    }
  ],
  "no_action": {
    "reason": "string"
  }
}
```

## Decision Rules
1. Hurricane/Tornado → STORM persona, emergency priority
2. Hail warning → HAIL persona, urgent priority  
3. Extreme heat/cold → HVAC persona, standard priority
4. Flood → NEED persona, urgent priority
5. No severe weather → Deactivate weather-triggered numbers

## Validation
- All recommended numbers must exist in NUMBER_TO_PERSONA
- Geographic filtering must be applied correctly
- Output must be valid JSON

# CallRail OS Number Configuration

**Single Source of Truth** for all phone numbers in the system.

## Overview

This directory contains the canonical configuration for all 42 phone numbers across 7 AI personas and 7 marketing campaigns. All system components consume this data to ensure consistency.

## Files

### `numbers.json`
The authoritative source for all phone number data. Contains:
- **42 phone numbers** with complete metadata
- **7 campaigns** (STORM, HAIL, HVAC, CLAIMS, LAW, MONEY, NEED)
- **7 personas** with capabilities mapping
- **Validation rules** via JSON Schema

### `numbers.schema.json`
JSON Schema definition for validation and IDE autocomplete.

### Generated Files
- `lib/config/numbers.ts` - TypeScript constants and utilities (auto-generated)

## Data Structure

Each number includes:

```typescript
{
  id: "storm-ga-primary",           // Unique identifier
  vanity: "470-STORM",               // Billboard display format
  digits: "4702878676",              // 10-digit format (routing key)
  e164: "+14702878676",              // International format
  persona: "STORM",                  // AI persona to route to
  region: "Georgia",                 // Geographic coverage
  type: "local" | "toll-free",       // Number type
  campaign: "STORM",                 // Marketing campaign
  active: true,                      // Is number currently active?
  priority: "primary",               // Routing priority
  notes?: "Optional context"         // Additional metadata
}
```

## Usage

### In TypeScript/Next.js

```typescript
import { 
  NUMBER_TO_PERSONA,
  getNumberByDigits,
  getNumbersByPersona,
  getNumbersByCampaign,
  NUMBERS,
  getNumberStats
} from '@/lib/config/numbers';

// Routing engine usage
const persona = NUMBER_TO_PERSONA["4702878676"]; // "STORM"

// Find number by digits
const config = getNumberByDigits("4702878676");
console.log(config?.vanity); // "470-STORM"

// Get all HVAC numbers
const hvacNumbers = getNumbersByPersona("HVAC");

// Get all numbers for LAW campaign
const lawNumbers = getNumbersByCampaign("LAW");

// Get statistics
const stats = getNumberStats();
console.log(stats.total); // 42
console.log(stats.byPersona.STORM); // 11
```

### In Marketing/Billboard Copy

```typescript
import numbers from '@/config/numbers.json';

// Generate billboard copy
numbers.numbers
  .filter(n => n.campaign === "STORM" && n.priority === "primary")
  .forEach(n => {
    console.log(`Call ${n.vanity} - ${n.region}`);
  });
```

### In API Routes (Telnyx Webhook)

```typescript
import { NUMBER_TO_PERSONA } from '@/lib/config/numbers';

export async function POST(request: Request) {
  const { to } = await request.json();
  const digits = to.replace(/\D/g, '').slice(-10);
  
  const persona = NUMBER_TO_PERSONA[digits];
  if (!persona) {
    return new Response('Unknown number', { status: 404 });
  }
  
  // Route to AI persona...
}
```

## System Integration

This configuration is consumed by:

### 1. **Website** (`app/page.tsx`)
- Campaign showcase sections
- Phone number displays
- Stats bar (42 numbers, 7 personas)

### 2. **Routing Engine** (`lib/routing/engine.ts`)
- NUMBER_TO_PERSONA mapping
- Call routing decisions
- Weather-triggered routing

### 3. **Telnyx Webhook** (`app/api/telnyx-webhook/route.ts`)
- Inbound call routing
- SMS routing
- Real-time persona assignment

### 4. **AI System** (`lib/ai/engine.ts`)
- Persona script loading
- Context-aware responses
- Multi-turn conversations

### 5. **Analytics Dashboard** (`app/dashboard/page.tsx`)
- Call volume by persona
- Campaign performance
- Regional analytics

## Maintenance

### Adding a New Number

1. Edit `config/numbers.json`
2. Add entry to `numbers` array:
```json
{
  "id": "storm-tx-houston",
  "vanity": "713-STORM",
  "digits": "7137786761",
  "e164": "+17137786761",
  "persona": "STORM",
  "region": "Texas - Houston",
  "type": "local",
  "campaign": "STORM",
  "active": true,
  "priority": "primary"
}
```
3. Update campaign count
4. Validate with JSON Schema
5. Regenerate TypeScript constants (if needed)

### Deactivating a Number

Change `active: true` to `active: false`. Do not delete - preserve for historical data.

### Changing Routing

Update the `persona` field. All systems will automatically use the new routing.

## Validation

The JSON Schema enforces:
- ✅ Required fields present
- ✅ Valid persona values (STORM, HAIL, etc.)
- ✅ Correct digit format (10 digits)
- ✅ Valid E.164 format (+1 prefix)
- ✅ Type constraints (local/toll-free)
- ✅ Priority levels (primary/secondary/tertiary)

VS Code provides autocomplete and validation automatically.

## Statistics (as of 2026-02-03)

```
Total Numbers: 42
Active: 42

By Type:
  Local: 11
  Toll-Free: 31

By Campaign:
  STORM: 11 numbers
  LAW: 8 numbers
  NEED: 8 numbers (universal routing)
  CLAIMS: 5 numbers
  HAIL: 4 numbers
  HVAC: 3 numbers
  MONEY: 3 numbers

By Persona:
  STORM: 11 numbers
  LAW: 8 numbers
  NEED: 8 numbers
  CLAIMS: 5 numbers
  HAIL: 4 numbers
  HVAC: 3 numbers
  MONEY: 3 numbers
```

## Important Notes

### Vanity Conversion is Automatic
- **Billboards show**: "470-STORM"
- **Callers dial**: Letters on keypad (S=7, T=8, etc.)
- **Phone OS converts**: Automatically to digits
- **Telnyx receives**: Only digits (4702878676)
- **System routes**: Using NUMBER_TO_PERSONA mapping

No manual vanity conversion needed anywhere in the system.

### NEED Campaign
844-NEED and 912-NEED are **universal intake routers**:
- Caller describes their problem
- AI determines category (legal, storm, HVAC, money, claims)
- System routes to appropriate persona
- Other NEED numbers support routing infrastructure

### SIM Test Devices
Three numbers reserved for testing:
- 8722491424
- 8722548473
- 9127378263

Route to NEED for universal testing capability.

## Architecture Diagram

```
┌─────────────────────────────────────────┐
│     config/numbers.json                 │
│  (Single Source of Truth - 42 numbers)  │
└──────────────┬──────────────────────────┘
               │
               ├──────────────┬──────────────┬───────────────┐
               ▼              ▼              ▼               ▼
    ┌──────────────┐  ┌──────────────┐  ┌────────────┐  ┌──────────┐
    │   Website    │  │   Routing    │  │  Telnyx    │  │    AI    │
    │  (display)   │  │   Engine     │  │  Webhook   │  │  System  │
    └──────────────┘  └──────────────┘  └────────────┘  └──────────┘
```

## Best Practices

1. **Never hardcode numbers** - Always import from this config
2. **Use digits for routing** - 10-digit format (no dashes)
3. **Use vanity for display** - Human-readable format for UI
4. **Use E.164 for external APIs** - Telnyx, Twilio, etc.
4. **Validate before deploy** - JSON Schema catches errors early
5. **Document changes** - Update `lastUpdated` and add notes

## Questions?

See [CANONICAL_NUMBERS.md](../CANONICAL_NUMBERS.md) for the original documentation.

This configuration system ensures zero drift between:
- Marketing billboards
- Website displays
- Telnyx routing
- AI persona assignment
- Analytics reporting

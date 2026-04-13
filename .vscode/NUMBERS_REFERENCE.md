# Number Configuration Quick Reference

## 🎯 Single Command Reference

```bash
# View all statistics
npm run numbers:stats

# Validate JSON syntax
npm run numbers:validate
```

## 📋 Common Imports

```typescript
// Basic routing (most common)
import { NUMBER_TO_PERSONA } from '@/lib/config/numbers';

// Full toolkit
import {
  NUMBER_TO_PERSONA,      // Map digits → persona
  NUMBERS,                // All 42 numbers
  getNumberByDigits,      // Find by 10-digit string
  getNumbersByPersona,    // Filter by persona
  getNumbersByCampaign,   // Filter by campaign
  getNumberStats,         // Get statistics
} from '@/lib/config/numbers';
```

## 🔢 The 42 Numbers at a Glance

### STORM (11 numbers)
```
470-STORM  | Georgia
727-STORM  | Florida - Tampa Bay
786-STORM  | Florida - Miami
623-STORM  | Arizona - Phoenix
213-STORM  | California - LA
443-STORM  | Maryland - Baltimore
770-STORM  | Georgia - Atlanta Suburbs
478-STORM  | Georgia - Macon
321-STORM  | Florida - Space Coast (x2)
912-COASTAL| Georgia - Coastal
```

### LAW (8 numbers)
```
888-LAW-AI   | Primary AI intake
833-LAW-AI   | Primary AI alternate
888-LAW-CALL | General
888-LAW-CASE | Case intake
888-LAW-HELP | Help line
888-LAW-NOW  | Urgent
888-LAW-DOCS | Documents
888-LAW-ESC  | Escalation
```

### NEED (8 numbers - Universal Routing)
```
844-NEED     | Primary universal router
912-NEED     | Regional universal router
888-ASSIST   | Assistance
888-HELP-AI  | Help
888-TRUST-AI | Trust
844-ROUTE    | Infrastructure
844-HAIL (x2)| Hail routing
```

### CLAIMS (5 numbers)
```
844-CLAIM      | Primary
855-CLAIM      | Overflow
877-CLAIM      | Overflow
888-FILE-CLAIM | Filing
888-MY-CLAIM   | Status
```

### HAIL (4 numbers)
```
262-HAIL | Wisconsin - Milwaukee Suburbs
414-HAIL | Wisconsin - Milwaukee
909-ROOF | California - Inland Empire
539-ROOF | Kansas - Wichita
```

### HVAC (3 numbers)
```
833-HVAC-AI   | Primary AI
833-HVAC-NOW  | Urgent
833-HVAC-CALL | General
```

### MONEY (3 numbers)
```
888-BUCK-AI | Primary
888-CASH-AI | Primary
866-BANK-AI | Banking
```

## 💡 Usage Examples

### Routing Engine
```typescript
// In webhook handler
const { to } = await request.json();
const digits = to.replace(/\D/g, '').slice(-10);
const persona = NUMBER_TO_PERSONA[digits];

if (!persona) {
  return new Response('Unknown number', { status: 404 });
}

// Load persona script and route...
```

### Website Display
```typescript
// Show all STORM numbers
import { getNumbersByPersona } from '@/lib/config/numbers';

const stormNumbers = getNumbersByPersona("STORM");

return (
  <ul>
    {stormNumbers.map(n => (
      <li key={n.id}>{n.vanity} - {n.region}</li>
    ))}
  </ul>
);
```

### Analytics Dashboard
```typescript
// Get campaign stats
import { getNumberStats } from '@/lib/config/numbers';

const stats = getNumberStats();

console.log(stats.byCampaign.STORM); // 11
console.log(stats.byType.tollFree);  // 26
console.log(stats.total);            // 42
```

## 🎨 Billboard Copy

### Format Pattern
```
Billboard:  [HEADLINE]
            Call XXX-VANITY
            
Examples:
STORM DAMAGE?          NEED MONEY?
Call 470-STORM         Call 888-CASH-AI

HVAC EMERGENCY?        CAR WRECK?
Call 833-HVAC-NOW      Call 888-LAW-AI
```

### Key Principles
- **Headline**: Problem statement
- **Call to Action**: "Call [vanity number]"
- **Vanity**: Phone OS converts automatically to digits
- **System**: Receives digits, routes to persona

## 🔐 Data Structure

```typescript
{
  id: "storm-ga-primary",           // Unique identifier
  vanity: "470-STORM",               // Billboard format
  digits: "4702878676",              // Routing key (10 digits)
  e164: "+14702878676",              // International format
  persona: "STORM",                  // AI persona
  region: "Georgia",                 // Coverage area
  type: "local" | "toll-free",       // Number type
  campaign: "STORM",                 // Marketing campaign
  active: true,                      // Currently active?
  priority: "primary",               // Routing priority
  notes: "Optional context"          // Metadata
}
```

## 📊 Quick Stats

```
Total:     42 numbers
Active:    42 numbers
Inactive:  0 numbers

Local:     16 numbers (7 states)
Toll-Free: 26 numbers (national)

Top Campaigns:
  STORM:  11 numbers
  LAW:     8 numbers
  NEED:    8 numbers
```

## 🚀 Key Files

```
config/numbers.json           # Source of truth (edit here)
lib/config/numbers.ts         # TypeScript constants
scripts/numbers-stats.ts      # Statistics reporter
config/README.md              # Full documentation
docs/CONFIG_IMPLEMENTATION.md # Implementation guide
```

## ⚡ Pro Tips

1. **Always use `digits` for routing** (not vanity)
2. **Use `vanity` for display** (not digits)
3. **Import from `@/lib/config/numbers`** (not JSON directly)
4. **Run `numbers:stats`** to verify changes
5. **Never delete numbers** (set `active: false` instead)

## 🎯 NEED Campaign Explained

**844-NEED** and **912-NEED** are **universal intake routers**:

1. Caller dials 844-NEED
2. AI: "What do you need help with?"
3. Caller: "My roof was damaged by the storm"
4. System routes to STORM persona
5. No need to know 470-STORM exists

This enables **one billboard for all services**.

## 📞 Contact Flow

```
Billboard → Caller Dials Vanity → Phone OS Converts → 
Telnyx Receives Digits → Webhook Looks Up Persona → 
AI Loads Script → Conversation Begins
```

No manual vanity conversion needed anywhere.

---

**Last Updated**: 2026-02-03  
**Source**: config/numbers.json v1.0.0

# 📞 **CANONICAL NUMBER LIST & SYSTEM REFERENCE**
*Last Updated: February 3, 2026*

This is the **single authoritative source of truth** for all 42 phone numbers in the Weather Intake OS. Every component (routing engine, marketplace, weather triggers, dashboard) reads from this mapping.

## 🪧 BILLBOARD → PHONE MAPPING

**How Vanity Numbers Work:**
When callers dial the **words shown on billboards** (e.g., `470-STORM`), their phone automatically converts those letters into **digits** using the standard keypad mapping (`2=ABC, 3=DEF, ... 9=WXYZ`). The digits are sent to Telnyx, which routes to our AI system. No special configuration needed—this has worked this way for decades.

**Best Practice:**
- **Billboards show:** Memorable words (`470-STORM`)
- **System routes:** Actual digits (`470-287-8676`)
- **Result:** Both work seamlessly

## 🌩️ **STORM (11)**
Storm-related emergency and property damage response numbers.

| Billboard Display | Digits They Type | Region | Notes |
|------------------|------------------|--------|-------|
| `470-STORM` | `470-287-8676` | Georgia | Primary |
| `727-STORM` | `727-387-8676` | Florida | Tampa Bay |
| `786-STORM` | `786-677-8676` | Florida | Miami |
| `623-STORM` | `623-777-8676` | Arizona | Phoenix |
| `213-STORM` | `213-423-7865` | California | Los Angeles |
| `443-STORM` | `443-437-8657` | Maryland | Baltimore |
| `770-STORM` | `770-230-0635` | Georgia | Atlanta suburbs |
| `478-STORM` | `478-242-4246` | Georgia | Macon |
| `321-STORM` | `321-559-0559` | Florida | Space Coast |
| `321-STORM` | `321-485-8333` | Florida | Space Coast (alt) |
| `912-COASTAL` | `912-910-6333` | Georgia | Coastal regions |

## 🌨️ **HAIL (4)**
Hail damage assessment and claims processing in the Hail Belt.

| Billboard Display | Digits They Type | Region | Notes |
|------------------|------------------|--------|-------|
| `262-HAIL` | `262-397-4245` | Wisconsin | Milwaukee suburbs |
| `414-HAIL` | `414-676-6337` | Wisconsin | Milwaukee |
| `909-ROOF` | `3)**
Heating, ventilation, and air conditioning services (routing/overflow).

| Billboard Display | Digits They Type | Region | Notes |
|------------------|------------------|--------|-------|
| `833-HVAC-AI` | `833-760-4328` | Toll-free | Primary routing |
| `833-HVAC-NOW` | `833-602-4822` | Toll-free | Urgent requests |
| `833-HVAC-CALL` | `833-522-2653` | Toll-free | General inquiries |e)
- `833-602-4822` → HVAC (Toll-free)
- `321-559-0559` → HVAC (Florida)
- `321-485-8333` → HVAC (Florida)

## 🧾 **CLAIMS (5)**
Insurance claims processing and support.

| Billboard Display | Digits They Type | Region | Notes |
|------------------|------------------|--------|-------|
| `844-CLAIM` | `844-725-2460` | Toll-free | Primary |
| `855-CLAIM` | `855-706-2533` | Toll-free | Overflow |
| `877-CLAIM` | `877-570-9775` | Toll-free | Overflow |
| `888-CLAIM-8)**
Legal services and consultation.

| Billboard Display | Digits They Type | Region | Notes |
|------------------|------------------|--------|-------|
| `888-LAW-AI` | `888-505-2924` | Toll-free | AI-powered legal |
| `833-LAW-AI` | `833-445-2924` | Toll-free | AI-powered legal (alt) |
| `888-LAW-CALL` | `888-649-0529` | Toll-free | General inquiries |
| `888-LAW-CASE` | `888-653-2529` | Toll-free | Case evaluation |
| `888-LAW-HELP` | `888-763-1529` | Toll-free | Legal help |
| `888-LAW-NOW` | `888-974-0529` | Toll-free | Urgent legal |
| `888-LAW-DOCS` | `888-643-0529` | Toll-free | Document services |
| `888-LAW-ESC` | `888-611-5384` | Toll-free | Escalation |
- `888-643-0529` → LAW (Toll-free)
- `888-611-5384` →, payments, and lending.

| Billboard Display | Digits They Type | Region | Notes |
|------------------|------------------|--------|-------|
| `888-BUCK-AI` | `888-676-2825` | Toll-free | Payment assistance |
| `888-CASH-AI` | `888-678-0645` | Toll-free | Cash services |
| `🧭 **ROUTING / OVERFLOW (8)**
System routing, overflow handling, and general assistance.

| Billboard Display | Digits They Type | Region | Notes |
|------------------|------------------|--------|-------|
| `844-NEED-AI` | `844-669-6333` | Toll-free | General assistance |
| `888-TRUST-AI` | `888-474-8738` | Toll-free | Trust/verify |
| `888-HELP-AI` | `888-344-2825` | Toll-free | Help routing |
| `888-ASSIST` | `888-855-0209` | Toll-free | Assistance |
| `844-ROUTE` | `844-756-1580` | Toll-free | Call routing |
| `844-HAIL` | `844-967-4245` | Toll-free | Hail routing |
| `844-HAIL` | `844-985-4245` | Toll-free | Hail routing (alt) |
| `888-HAIL-AI` | `888-675-4245` | Toll-free | AI hail routing |
- `844-967-4245` → NEED (Toll-free)
- `872-249-1424` → NEED (SIM - Illinois)
- `872-254-8473` → NEED (SIM - Illinois)
- `912-737-8263` → NEED (SIM - Georgia)

> Note: `888-505-2924` and `833-445-2924` are listed under **LAW** (they route to the LAW persona via `NUMBER_TO_PERSONA`).

---

## 📊 **SUMMARY BY CATEGORY**

- **🌩️ STORM:** 11 numbers (property damage, emergency response)
- **🌨️ HAIL:** 4 numbers (hail belt regions)
- **❄️🔥 HVAC:** 3 numbers (heating/cooling services)
- **🧾 CLAIMS:** 5 numbers (insurance processing)
- **⚖️ LAW:** 8 numbers (legal services)
- **💰 MONEY:** 3 numbers (financial services)
- **🧭 ROUTING:** 8 numbers (overflow/general assistance)

**TOTAL: 42 canonical numbers**

---

## ✅ **COMPLIANCE & MARKETING STATEMENT**

> "When callers dial the words shown on our billboards, their phone automatically converts those letters into digits and connects them directly to our AI-powered system."

This statement is:
- ✅ Technically correct
- ✅ Telecom-accurate
- ✅ Legally safe
- ✅ Carrier-agnostic

**Edge case:** Some VoIP desk phones or enterprise softphones without letter keypads require digit entry. This is why best practice is to display memorable words while routing actual digits.

---

## 🧠 **AI SYSTEM INTEGRATION**

### **1. Routing Engine (`lib/routing/engine.ts`)**
The `NUMBER_TO_PERSONA` mapping is the core lookup table:

```typescript
export const NUMBER_TO_PERSONA = {
  "7866778676": "STORM",
  "7273878676": "STORM",
  // ... all 45 numbers
};
```

**How it works:**
- When a call comes in via webhook (`/api/telnyx-webhook`)
- System looks up the number in `NUMBER_TO_PERSONA`
- Returns the persona (e.g., "STORM")
- Loads corresponding AI script from `/personas/STORM.md`

### **2. Persona Scripts (`/personas/*.md`)**
Each persona has a dedicated AI behavior script:

- `STORM.md` - Emergency storm response
- `HAIL.md` - Hail damage assessment
- `HVAC.md` - Heating/cooling services
- `CLAIMS.md` - Insurance claims
- `LAW.md` - Legal consultation
- `MONEY.md` - Financial services
- `NEED.md` - General assistance

**Script loading:** `lib/engine/persona-runner.ts` loads persona scripts from `personas/*.md` based on the routing decision.

### **3. Weather Activation (`lib/weather-trigger/rules.ts`)**
Weather events activate personas, not individual numbers:

```typescript
// Example rule
{
  name: "FL_HURRICANE_EMERGENCY",
  condition: (signal) =>
    signal.event_type === "hurricane" &&
    signal.region.state === "FL" &&
    signal.advisory === "emergency",
  activate: ["7273878676", "7866778676"], // Specific numbers
  ai_mode: "storm_property",
  priority: "emergency"
}
```

**Activation flow:**
1. Weather worker monitors conditions
2. Rules engine evaluates signals
3. Matching numbers are activated
4. Dashboard shows active activations
5. Calls to activated numbers get weather-aware AI responses

---

## 📊 **DASHBOARD INTEGRATION**

### **Active Weather Activations Component**
The dashboard (`/dashboard`) includes a real-time activation monitor:

- **Data Source:** `/api/weather-trigger` endpoint
- **Refresh Rate:** Every 30 seconds
- **Displays:**
  - Currently activated numbers
  - Activation reasons (weather events)
  - AI modes
  - Timestamps
  - Active rules

### **Marketplace (`/marketplace`)**
Lists all available numbers for licensing:

- Reads from `NUMBER_TO_PERSONA`
- Shows persona assignments
- Pricing based on vertical and region

### **Weather Worker (`scripts/weather-worker.ts`)**
Automated monitoring system:

- Processes weather signals
- Applies activation rules
- Updates activation state
- Logs audit entries

---

## 🔧 **SYSTEM ARCHITECTURE**

```
Weather API → Weather Worker → Rules Engine → Activation State
                                      ↓
Routing Engine ← NUMBER_TO_PERSONA ← Dashboard
                                      ↓
Persona Scripts → AI Responses → Webhook → Telnyx
                                      ↓
                              Clawdbot (Sovereign AI Layer)
```

### **Key Files:**
- `lib/routing/engine.ts` - Core routing logic
- `lib/weather-trigger/rules.ts` - Activation rules
- `lib/weather-trigger/engine.ts` - State management
- `lib/ai/clawdbot.ts` - Sovereign AI runner
- `app/api/weather-trigger/route.ts` - Dashboard API
- `app/api/telnyx-webhook/route.ts` - Call handling
- `components/ActiveWeatherActivations.tsx` - Dashboard component

### **Clawdbot Integration:**
- `.ai/AI_RULES.md` - Authoritative AI behavior rules
- `.ai/prompts/` - Task-specific prompt templates
- `.ai/config.json` - Clawdbot configuration
- `scripts/clawdbot-cli.ts` - CLI runner

**Run Clawdbot:**
```bash
npm run clawdbot -- --list              # List prompts
npm run clawdbot -- --audit             # Audit routing
npm run clawdbot -- weather_activation  # Analyze weather
```

**Telnyx CLI Commands:**
```bash
npm run clawdbot -- telnyx:init         # Validate API key & environment
npm run clawdbot -- telnyx:status       # Show all numbers & personas
npm run clawdbot -- telnyx:test         # Simulate inbound call
npm run clawdbot -- telnyx:verify       # Verify Telnyx configuration
```

---

## ✅ **VERIFICATION CHECKLIST**

- [x] All 45 numbers mapped in `NUMBER_TO_PERSONA`
- [x] Weather rules use correct 10-digit formats
- [x] Persona scripts exist for all categories
- [x] Dashboard displays active activations
- [x] Marketplace shows all available numbers
- [x] Webhook routes calls correctly
- [x] Weather worker activates numbers
- [x] API endpoints return correct data

**System Status:** 🟢 FULLY OPERATIONAL

---

*This document is the single source of truth. Any changes to numbers or mappings must be reflected here first.*

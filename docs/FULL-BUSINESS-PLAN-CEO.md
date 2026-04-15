# NEED AI — FULL BUSINESS PLAN
## AI-Powered Phone Answering & Lead Generation Platform
### Prepared for CEO / Owners — April 14, 2026
### FTH Trading / NeedAI

---

# TABLE OF CONTENTS

| Section | Page |
|---------|------|
| 1. Executive Summary | The Opportunity |
| 2. Platform Overview | What's Built & Live Today |
| 3. The Vanity Number + AI Engine | How It Works |
| 4. Consumer Info Capture System | The "Trap" — Lead Intelligence |
| 5. Revenue Model & Financial Projections | Money Flow |
| 6. Target Audiences | Who We're Reaching |
| 7. Aging Homes Density Strategy | The $55.7M-Home Thesis |
| 8. Geographic Market Prioritization | Where to Deploy |
| 9. Media Reach & Advertising Plan | Billboards, Digital, Direct Mail |
| 10. Seasonal Activation Calendar | When to Strike |
| 11. Competitive Landscape | Why We Win |
| 12. Licensing & White-Label Model | Scaling Through Partners |
| 13. Compliance & Legal Framework | FTC/FCC/TCPA |
| 14. Technology Stack | What Powers It |
| 15. 90-Day Launch Plan | Phase-by-Phase Execution |
| 16. 12-Month Financial Forecast | Revenue Ramp |
| 17. Risk Analysis & Mitigation | What Could Go Wrong |
| 18. Key Decisions for CEO/Owners | What We Need from You |

---

# 1. EXECUTIVE SUMMARY

## The Opportunity

**NEED AI is a live, production-grade AI phone answering platform** that owns 51 vanity phone numbers across 8 industry verticals, routes every inbound call to a purpose-built AI agent, conducts natural voice conversations, and captures qualified leads — 24/7, with zero human staff.

**The business model is simple:**
1. Put vanity numbers on billboards in the right neighborhoods
2. AI answers every call and qualifies the lead
3. Sell the qualified lead to contractors, law firms, HVAC companies, and insurance adjusters
4. License the number + AI system to operators who want their own

**Why now:**
- 55.7 million US homes were built 1970–1999 — roofs past replacement, HVAC at end-of-life
- Every storm, heat wave, and cold snap sends these homeowners scrambling for the phone
- Traditional answering services cost $350–$1,700/month and can't scale — AI does this at 1/10th the cost
- The platform is **already built and live** — this is about go-to-market, not development

**Projected revenue at scale:** $38K–$250K/month depending on number of active markets and verticals.

---

# 2. PLATFORM OVERVIEW — WHAT'S BUILT & LIVE TODAY

## Production Status

| Component | Status | Detail |
|-----------|--------|--------|
| 51 AI-routed phone numbers | **LIVE** | Telnyx DID, all 8 verticals active |
| AI conversation engine | **LIVE** | GPT-4o-mini, 120-token capped, persona-driven |
| Voice synthesis | **LIVE** | Amazon Polly Joanna-Neural, zero-latency TTS |
| Speech recognition | **LIVE** | Telnyx ASR, real-time transcription |
| Persona system (8 verticals) | **LIVE** | Storm, Hail, HVAC, Claims, Law, Money, Wilkins Media, Universal |
| Weather-triggered activation | **LIVE** | Auto-activates numbers on hail/storm/heat/cold |
| Vanity number system | **LIVE** | Billboard-ready (470-STORM, 888-LAW-AI, etc.) |
| SMS ingress + AI reply path | **LIVE** | Production smoke-tested on 2026-04-15 with `received=true` and `sent=true` |
| Dashboard | **LIVE** | Real-time monitoring at needai.unykorn.org/dashboard |
| Health check / uptime | **LIVE** | needai.unykorn.org/api/health |
| Marketing materials | **READY** | Billboard specs, sales docs, compliance guide, QR codes |
| Licensing model | **READY** | Pricing tiers built, contracts drafted |
| CRM integration | **READY** | Webhook/API/Zapier-ready for lead delivery |

## Live Endpoints

| Service | URL |
|---------|-----|
| Voice Entry | `POST https://needai.unykorn.org/api/voice/` |
| Speech Gather | `POST https://needai.unykorn.org/api/voice/gather/` |
| SMS / Telnyx Webhook | `POST https://needai.unykorn.org/api/telnyx-webhook` |
| Health Check | `GET https://needai.unykorn.org/api/health` |
| Dashboard | `https://needai.unykorn.org/dashboard` |

## Operational Proof

- Production SMS webhook smoke test passed on 2026-04-15.
- Response proved the end-to-end path accepted the inbound event, routed to the NEED persona, generated a runtime response, and submitted an outbound SMS successfully.
- Evidence package is captured in `docs/PROOF-OF-OPERATION.md` and the detailed engineering report in `workspace/reports/needai-sms-smoke-test.md`.

**Bottom line:** The technology is done. The conversation is now about deploying it into the right markets.

---

# 3. THE VANITY NUMBER + AI ENGINE

## How a Call Works (End to End)

```
STEP 1: CALLER SEES BILLBOARD
         "Roof Damage? Call 470-STORM"
              │
STEP 2: CALLER DIALS 470-STORM (470-786-76)
              │
STEP 3: TELNYX ROUTES CALL → NEED AI SERVER
              │
STEP 4: AI IDENTIFIES VERTICAL (STORM persona)
         O(1) hash lookup — instant routing
              │
STEP 5: AI GREETING (Amazon Polly, Joanna-Neural voice)
         "Thanks for calling Storm Damage Response.
          I'm here to help assess your situation.
          Can you tell me what kind of damage
          you're dealing with?"
              │
STEP 6: CALLER SPEAKS → TELNYX ASR TRANSCRIBES
              │
STEP 7: GPT-4o-mini PROCESSES + RESPONDS
         (persona system prompt, 120-token max,
          natural phone speech, no formatting)
              │
STEP 8: 2-3 TURN CONVERSATION
         AI collects: name, phone, damage type,
         address, insurance status, urgency
              │
STEP 9: LEAD CAPTURED + DELIVERED
         ├── Dashboard (real-time)
         ├── Webhook (CRM push)
         ├── Email/SMS alert
         └── Quality scored (Hot/Warm/Cold)
```

## Key Design Principles

| Principle | Implementation |
|-----------|---------------|
| **Speed** | Zero-latency TTS (Polly streaming), sub-50ms edge cold starts (Vercel) |
| **Natural conversation** | 3 sentences max per AI response, no bullets/formatting, phone-speech only |
| **Cost control** | 120-token GPT cap prevents runaway AI costs |
| **Instant routing** | O(1) hash table lookup — works at any scale without slowdown |
| **24/7 operation** | No human staff needed, AI handles every call identically |
| **Compliance** | XML escaping on all input, no auth needed (Telnyx webhook design) |

## Number Inventory Summary (51 Numbers)

| Vertical | Count | Type | Examples |
|----------|-------|------|---------|
| Storm Damage | 3 | Local (321) | (321) 641-0263, (321) 641-0878 |
| Hail Damage | 4 | Local (321) | (321) 435-2335, (321) 485-8237 |
| HVAC Emergency | 5 | Mixed | (855) 712-4246, (786) 677-8676 |
| Insurance Claims | 8 | Toll-free | (855) 602-4246, (888) 611-5384 |
| Legal Services | 8 | Mixed | (414) 676-6337, (888) 653-2529 |
| Financial Services | 8 | Toll-free | (888) 678-0645, (888) 474-8738 |
| Wilkins Media | 1 | Toll-free | (844) 851-6334 |
| Universal AI (NEED) | 14 | Mixed | (844) 669-6333, (888) 855-0209 |
| **TOTAL** | **51** | | |

---

# 4. CONSUMER INFO CAPTURE SYSTEM — "THE TRAP"

## What Gets Captured on Every Call

### Automatic (No AI Needed)
| Data Point | Source | Available |
|-----------|--------|-----------|
| Caller phone number | Telnyx `From` parameter | Instant |
| Dialed number (vertical + geo) | Telnyx `To` parameter | Instant |
| Call timestamp | Server clock | Instant |
| Call duration | Telnyx CDR | Post-call |
| Caller area code → metro | Internal mapping | Instant |
| ASR confidence score | Telnyx speech engine | Per utterance |

### AI-Extracted (During Conversation)
| Data Point | How AI Gets It | Lead Value Impact |
|-----------|---------------|-------------------|
| **Full name** | "Can I get your name?" | Required for lead sale |
| **Callback number** | "Best number to reach you?" | Required for lead sale |
| **Service need** | Inferred from conversation context | Routes to correct buyer |
| **Urgency level** | "Is this an emergency?" / tone analysis | Hot leads = premium price |
| **Property address** | "What's the property address?" | Enables home age lookup |
| **Damage type** | "What kind of damage are you seeing?" | Qualifies lead specifics |
| **Insurance carrier** | "Who's your homeowner insurance?" | Routes to carrier-specific adjusters |
| **Insurance status** | "Have you filed a claim yet?" | Indicates claim stage |

### Post-Call Enrichment (Planned Enhancement)
| Data Point | Source | Purpose |
|-----------|--------|---------|
| Home year built | ATTOM API (address lookup) | Lead scoring — older = higher value |
| Home value | Zillow/ATTOM | Qualifies ability to pay for service |
| Owner vs. renter | Public records | Renters = lower value lead |
| Previous claims history | CoreLogic | Indicates claim complexity |
| Weather event correlation | NOAA/NWS | Validates storm claim timing |

## Lead Quality Scoring

| Tier | Criteria | Value Range | Delivery Speed |
|------|----------|-------------|---------------|
| **HOT** | Name + phone + address + active damage + insurance info | $150–$1,200 | Real-time (< 60 seconds) |
| **WARM** | Name + phone + general need + location | $75–$300 | Within 5 minutes |
| **COLD** | Phone only, or incomplete info, or info-seeking | $15–$50 | Batch (hourly) |

## Lead Delivery Options

```
LEAD CAPTURED BY AI
        │
        ├──► REAL-TIME DASHBOARD (needai.unykorn.org/dashboard)
        │     └── Live call feed, filters by vertical/quality/geo
        │
        ├──► WEBHOOK / API PUSH
        │     ├── Salesforce
        │     ├── HubSpot
        │     ├── Zoho CRM
        │     └── Custom endpoint
        │
        ├──► ZAPIER / MAKE AUTOMATION
        │     ├── Google Sheets
        │     ├── Slack notification
        │     ├── Email sequence trigger
        │     └── SMS alert to field team
        │
        └──► EMAIL / SMS NOTIFICATION
              └── Instant alert to assigned operator
```

## TCPA Compliance for Consumer Data

| Requirement | Our Implementation |
|------------|-------------------|
| Consent to contact | AI asks: "Is it okay if a specialist calls you back?" |
| Do Not Call compliance | Cross-reference with national DNC registry before resale |
| Call recording disclosure | "This call may be recorded for quality purposes" (greeting) |
| Data retention policy | 90-day lead data, 30-day recordings, configurable per operator |
| Opt-out mechanism | Caller can say "stop" or "remove me" at any point |

---

# 5. REVENUE MODEL & FINANCIAL PROJECTIONS

## Revenue Streams

### Stream 1: Lead Generation (Primary)

| Vertical | Lead Value | Avg Leads/Number/Month | Revenue/Number/Month |
|----------|-----------|----------------------|---------------------|
| Storm Damage | $75–$150 | 40–80 | $3,000–$12,000 |
| Hail Damage | $150–$350 | 30–60 | $4,500–$21,000 |
| HVAC Emergency | $100–$250 | 50–100 | $5,000–$25,000 |
| Insurance Claims | $200–$500 | 25–50 | $5,000–$25,000 |
| Legal Services | $300–$1,200 | 15–30 | $4,500–$36,000 |
| Financial Services | $50–$200 | 30–60 | $1,500–$12,000 |

### Stream 2: Number Licensing

| Tier | Price | What They Get |
|------|-------|--------------|
| Local Number | $199–$499/mo | 1 local vanity number + AI answering + leads |
| Toll-Free Number | $399–$849/mo | 1 toll-free number + AI answering + leads |
| State Bundle | $899–$1,699/mo | 3–5 numbers + billboards + AI + leads |
| Enterprise / White-Label | $2,500–$5,000/mo | Custom numbers + branded AI + full dashboard |

### Stream 3: AI Intake Services (Per-Call)

| Service | Fee |
|---------|-----|
| Basic triage call | $0.25 |
| Intent analysis + routing | $0.50 |
| Full claims intake | $1.00 |
| Legal escalation w/ attorney match | $25.00 |

### Stream 4: Storm Activation Fees

| Scope | Fee |
|-------|-----|
| Single state activation | $149 |
| Multi-state (2–3) | $299 |
| National activation | $499 |

## Scenario-Based Revenue Projections

### Scenario A: Conservative Launch (5 numbers, 2 markets)

| Item | Monthly |
|------|---------|
| Storm/Hail leads (3 numbers × 40 leads × $125 avg) | $15,000 |
| HVAC leads (2 numbers × 50 leads × $150 avg) | $15,000 |
| Number licensing (5 × $399 avg) | $1,995 |
| AI intake fees (250 calls × $0.50) | $125 |
| Storm activations (3 events × $149) | $447 |
| **Monthly Total** | **$32,567** |
| **Annual Total** | **$390,804** |

### Scenario B: Growth Phase (15 numbers, 4 markets)

| Item | Monthly |
|------|---------|
| Lead generation (15 numbers, mixed verticals) | $75,000 |
| Number licensing (15 × $449 avg) | $6,735 |
| AI intake fees (750 calls × $0.50) | $375 |
| Storm activations (8 events × $249 avg) | $1,992 |
| **Monthly Total** | **$84,102** |
| **Annual Total** | **$1,009,224** |

### Scenario C: Full Scale (51 numbers, 8+ markets, national legal/financial)

| Item | Monthly |
|------|---------|
| Lead generation (51 numbers, all verticals) | $185,000 |
| Number licensing (30 licensed × $499 avg) | $14,970 |
| AI intake fees (2,500 calls × $0.50) | $1,250 |
| Storm activations (15 events × $299 avg) | $4,485 |
| White-label operators (5 × $3,000 avg) | $15,000 |
| **Monthly Total** | **$220,705** |
| **Annual Total** | **$2,648,460** |

## Cost Structure

| Expense | Monthly (at Scale) |
|---------|-------------------|
| Telnyx (51 numbers + voice minutes) | $500–$2,000 |
| OpenAI API (GPT-4o-mini, 120-token cap) | $200–$800 |
| Vercel hosting (Edge, pro plan) | $20–$200 |
| Billboard media (variable by market) | $5,000–$50,000 |
| Telnyx SMS (opt-in follow-up) | $100–$500 |
| Domain / DNS (Cloudflare) | $0 |
| **Total Platform Cost** | **$820–$3,500** |
| **Billboard/Media (variable)** | **$5,000–$50,000** |

**Gross margin on platform: 90%+** (AI + telephony costs are minimal per call)  
**Net margin after media: 50–75%** (depends on billboard spend efficiency)

---

# 6. TARGET AUDIENCES

## Primary Audience: Homeowners with Aging Properties

### Profile A — Storm / Hail Customer

| Attribute | Detail |
|-----------|--------|
| **Demographics** | Homeowner, 35–70 years old, household income $40K–$120K |
| **Property** | Single-family, owner-occupied, shingle roof, built 1970–2005 |
| **Geography** | Hail belt (TX, OK, KS, CO), hurricane corridor (FL, GA, NC, LA), tornado alley |
| **Trigger** | Active weather event or within 72 hours post-storm |
| **Pain point** | Property damaged, overwhelmed, doesn't know who to call |
| **What they need** | Damage assessment, contractor referral, insurance guidance |
| **Call behavior** | Urgent — calls within hours of event, wants immediate help |

### Profile B — HVAC Emergency Customer

| Attribute | Detail |
|-----------|--------|
| **Demographics** | Homeowner, 30–75 years old, household income $35K–$100K |
| **Property** | Single-family, central air/forced air, HVAC unit 10+ years old |
| **Geography** | Summer: TX, AZ, FL, GA, LA (95°F+). Winter: WI, MN, MI, OH, IL, PA (20°F-) |
| **Trigger** | System failure during extreme temperature event |
| **Pain point** | No heat or AC, family safety, needs same-day service |
| **What they need** | Emergency repair dispatch, cost estimate, financing options |
| **Call behavior** | Emergency — calls immediately, highly motivated |

### Profile C — Legal Services Customer

| Attribute | Detail |
|-----------|--------|
| **Demographics** | Any age, any income (personal injury = no upfront cost) |
| **Property** | Mixed — renters and owners |
| **Geography** | Top 20 metro areas, courthouse corridors, accident intersections |
| **Trigger** | Car accident, arrest, divorce, workplace injury, slip-and-fall |
| **Pain point** | Needs legal help NOW, doesn't have a lawyer, scared |
| **What they need** | Attorney match, rights explanation, next-step guidance |
| **Call behavior** | Urgent but cautious — wants reassurance before sharing details |

### Profile D — Financial Services Customer

| Attribute | Detail |
|-----------|--------|
| **Demographics** | 25–60 years old, household income $20K–$60K, underbanked |
| **Property** | Renters and owners in older/affordable neighborhoods |
| **Geography** | Urban centers, near payday lenders, transit hubs, social services |
| **Trigger** | Financial emergency, tax season, post-holiday debt, disaster recovery |
| **Pain point** | Needs money now, bad credit, tired of predatory lenders |
| **What they need** | Legitimate financial options, debt consolidation, credit repair |
| **Call behavior** | Cautious — needs trust before sharing financial details |

### Profile E — Insurance Claims Customer

| Attribute | Detail |
|-----------|--------|
| **Demographics** | Homeowner, 35–70, insured, household income $40K–$150K |
| **Property** | Owner-occupied with active homeowner insurance policy |
| **Geography** | Disaster-prone areas (same as Storm/Hail + flood zones) |
| **Trigger** | Property damage, claim denial, adjuster dispute, underpayment |
| **Pain point** | Claim process is confusing, feels underpaid, needs advocacy |
| **What they need** | Claims guidance, public adjuster referral, documentation help |
| **Call behavior** | Frustrated — may be on second or third call about this issue |

## Secondary Audience: Operators / Licensees (B2B)

| Who | What They Buy | Why |
|-----|--------------|-----|
| Roofing contractors | Storm/Hail leads + number license | Guaranteed inbound leads during season |
| HVAC companies | HVAC leads + number license | Emergency leads during peak demand |
| Law firms | Legal leads + number license | Pre-qualified legal intake at scale |
| Insurance adjusters | Claims leads | Pre-documented claims with details |
| Marketing agencies | White-label platform | Offer AI phone service to their clients |
| Franchise operations | Multi-number bundles | Cover all locations with AI answering |

---

# 7. AGING HOMES DENSITY STRATEGY — THE $55.7 MILLION-HOME THESIS

## The Core Insight

> **55.7 million US homes were built between 1970 and 1999.** That's 40% of all housing stock. These homes have roofs past replacement age, HVAC systems at end-of-life, and homeowners who are established, insured, and facing expensive maintenance. **Every storm, heat wave, or cold snap turns these homeowners into callers.**

## Housing Age Distribution

| Decade Built | Units (millions) | % of Total | Roof Status | HVAC Status | NEED AI Relevance |
|-------------|-----------------|-----------|-------------|-------------|-------------------|
| Pre-1950 | 18.2 | 13% | Replaced multiple times | Fully replaced | Medium — claims/legal |
| 1950–1969 | 20.8 | 15% | Replaced | Failing or replaced | Medium — HVAC/claims |
| **1970–1979** | **18.5** | **13%** | **Past due** | **End-of-life (2nd unit)** | **HIGH** |
| **1980–1989** | **17.9** | **13%** | **Due for replacement** | **End-of-life** | **HIGH** |
| **1990–1999** | **19.3** | **14%** | **Nearing replacement** | **Aging (15–25 yrs)** | **HIGH** |
| 2000–2009 | 18.7 | 14% | Mid-life | Mid-life | Low — HVAC maintenance |
| 2010+ | 25.1 | 18% | New | New | Minimal |

## Why This Matters for Revenue

| Home Age Factor | Impact on NEED AI |
|----------------|-------------------|
| Roof age 25+ years | 3–5x more likely to need storm-damage lead |
| HVAC age 15+ years | 4x failure rate vs. units under 10 years |
| Older homes, higher claims | Insurance adjusters pay premium for pre-documented claims |
| Established homeowners | Better credit, more equity, higher likelihood to hire contractor |
| Not moving soon | Will invest in repairs rather than sell — long-term customer |

## Neighborhood Scoring Model

```
NEED AI DENSITY SCORE = (Aging Home %) × (Weather Risk) × (Home Value Factor) × (Owner-Occupied %)

Where:
  Aging Home %     = % homes built 1970-1999 in census tract (0–100)
  Weather Risk     = Hail/storm events per year in county (normalized 1–10)  
  Home Value       = 1.0 if $150K–$500K, 0.5 if outside range
  Owner-Occupied % = % owner-occupied in tract (higher = better leads)
```

| Score | Priority | Action |
|-------|----------|--------|
| 80–100 | **CRITICAL** | Billboard + geofence + direct mail + full number coverage |
| 60–79 | **HIGH** | Billboard + digital geofencing |
| 40–59 | **MEDIUM** | Digital only (geofence + Nextdoor ads) |
| <40 | **LOW** | Toll-free number overlay, no local spend |

## Data Sources (Free + Paid)

| Source | What It Gives Us | Cost |
|--------|-----------------|------|
| US Census Table B25034 | Home age by census tract | Free |
| Zillow Research | Home values + renovation activity by ZIP | Free |
| NOAA Storm Events Database | Hail/wind/tornado reports by county | Free |
| FEMA Disaster Declarations | Historical disaster zones | Free |
| ATTOM Data | Property age, owner info, tax records by parcel | Paid API |
| CoreLogic | Claims history, replacement cost by property | Enterprise |

---

# 8. GEOGRAPHIC MARKET PRIORITIZATION

## Tier 1 — Launch Markets (Deploy First)

| Rank | Metro | Aging Homes (1970–1999) | Primary Risk | Numbers | Est. Revenue/Month |
|------|-------|------------------------|-------------|---------|-------------------|
| 1 | **Atlanta, GA** | 1.2M+ | Hail + severe storms | 470-STORM, 770-STORM, 478-STORM | $20K–$35K |
| 2 | **Dallas–Fort Worth, TX** | 1.5M+ | Hail belt epicenter | 623-STORM, HAIL numbers | $25K–$45K |
| 3 | **Tampa / Orlando, FL** | 900K+ | Hurricane corridor | 321-STORM, FL HVAC | $22K–$40K |
| 4 | **Milwaukee / Madison, WI** | 400K+ | Hail + severe winter | 262-HAIL, 414-HAIL | $12K–$20K |

### Atlanta Deep Dive — Billboard Corridors

| Corridor | Daily Traffic | Target Neighborhoods | Numbers |
|----------|-------------|---------------------|---------|
| I-285 Loop | 2.1M vehicles | Stone Mountain, Kennesaw, Decatur, South Fulton | 470-STORM |
| I-75 South | 800K | Macon corridor, Clayton County | 770-STORM |
| I-85 North | 600K | Gainesville, Buford, Suwanee | 470-STORM |
| I-20 West | 500K | Douglasville, Villa Rica | 770-STORM |

| Target Neighborhood | Homes Built | Home Values | Best Number |
|--------------------|-------------|-------------|-------------|
| Stone Mountain / Lithonia | 1975–1990 | $180K–$320K | 770-STORM |
| Kennesaw / Marietta | 1985–2000 | $250K–$450K | 470-STORM |
| Douglasville / Villa Rica | 1990–2005 | $200K–$350K | 470-STORM |
| Decatur / Tucker | 1960–1985 | $220K–$400K | 770-STORM |
| South Fulton / College Park | 1975–1995 | $150K–$280K | 470-STORM |

## Tier 2 — Expansion Markets

| Metro | Why | Timeline |
|-------|-----|----------|
| Phoenix, AZ | Extreme heat HVAC demand, 800K aging homes | Month 4–6 |
| Houston, TX | Hurricane + flood, 1.3M aging homes | Month 4–6 |
| Chicago, IL | Winter HVAC + hail overlap, 1.1M aging homes | Month 6–9 |
| Charlotte, NC | Growing metro, hurricane risk | Month 6–9 |
| Oklahoma City / Tulsa, OK | Tornado alley, spring peak | Month 6–9 |

## Tier 3 — National Overlay (Toll-Free, No Local Billboards)

| Vertical | Numbers | Strategy |
|----------|---------|----------|
| Legal | 888-LAW-AI, 888-LAW-NOW, 888-LAW-CALL + 5 more | Courthouse corridor billboards, national digital |
| Financial | 888-CASH-AI, 888-BUCK-AI, 866-BANK-AI | Urban center transit ads, digital |
| Universal | 844-NEED-AI, 888-TRUST-AI, 888-HELP-AI | Catch-all for multi-vertical operators |

---

# 9. MEDIA REACH & ADVERTISING PLAN

## Channel Strategy Overview

```
                        NEED AI MEDIA FUNNEL
                        
    ┌──────────────────────────────────────────────┐
    │           BILLBOARDS (Primary)                │
    │   Static: I-285, I-75, I-85, I-20, I-4       │
    │   Digital: Blip rotations in target ZIPs      │
    │   → Vanity number prominent, QR code          │
    │   → "Roof Damage? Call 470-STORM"             │
    └──────────────────┬───────────────────────────┘
                       │
    ┌──────────────────▼───────────────────────────┐
    │         DIGITAL GEOFENCING (Secondary)        │
    │   Simpli.fi / GroundTruth mobile ads          │
    │   → Geofence aging-home neighborhoods         │
    │   → Storm-triggered push (NWS alerts)         │
    │   → Serve vanity number on mobile             │
    └──────────────────┬───────────────────────────┘
                       │
    ┌──────────────────▼───────────────────────────┐
    │           DIRECT MAIL (Supplement)            │
    │   EDDM postcards to 1970–1999 home tracts     │
    │   → "Your roof is 30 years old. Next storm,   │
    │      call 470-STORM."                         │
    │   → QR code to landing page                   │
    └──────────────────┬───────────────────────────┘
                       │
    ┌──────────────────▼───────────────────────────┐
    │         DIGITAL ADS (Always-on)               │
    │   Google LSA: "Emergency HVAC near me"        │
    │   Facebook/Meta: Homeowner ZIPs + storm       │
    │   Nextdoor: Neighborhood-level targeting      │
    │   Google Display: Weather-triggered            │
    └──────────────────────────────────────────────┘
```

## Billboard Deployment Plan

### Billboard Vendor Recommendations

| Vendor | Best For | Cost | Self-Serve? |
|--------|----------|------|------------|
| **Blip Billboards** | Testing, $0.01–$0.05/display | $50–$200/day | Yes |
| **Lamar Advertising** | Permanent static placements | $1,500–$15,000/mo | No (rep) |
| **Clear Channel Outdoor** | National digital DOOH | $2,000–$20,000/mo | No (rep) |
| **AdQuick** | Marketplace — plan, buy, measure OOH | Platform + media | Yes |

### Billboard Creative Specs (Production-Ready)

| Format | Dimensions | Safe Zone | DPI |
|--------|-----------|-----------|-----|
| Standard Bulletin | 14' × 48' (672" × 168") | 6" all edges | 10–30 |
| Junior Poster | 6' × 12' | 4" all edges | 72+ |
| Digital Display | 1920×1080 px | 10% margins | 72 |

### Billboard Message Templates

**Storm:**
```
┌────────────────────────────────────┐
│                                    │
│     ROOF DAMAGE?                   │
│     Call 470-STORM                 │
│                                    │
│     AI-Powered • 24/7 • Free      │
│            [QR CODE]               │
│                                    │
└────────────────────────────────────┘
```

**HVAC:**
```
┌────────────────────────────────────┐
│                                    │
│     NO AC? NO HEAT?                │
│     Call 833-HVAC-AI               │
│                                    │
│     Emergency AI Dispatch • 24/7   │
│            [QR CODE]               │
│                                    │
└────────────────────────────────────┘
```

**Legal:**
```
┌────────────────────────────────────┐
│                                    │
│     INJURED?                       │
│     Call 888-LAW-AI                │
│                                    │
│     Free Legal Assessment • 24/7   │
│            [QR CODE]               │
│                                    │
└────────────────────────────────────┘
```

**Universal (Most Powerful — Captures All Verticals):**
```
┌────────────────────────────────────┐
│                                    │
│     NEED HELP?                     │
│     Call 844-NEED-AI               │
│                                    │
│     Storm • Legal • HVAC • Money   │
│     AI Routes You Instantly • 24/7 │
│            [QR CODE]               │
│                                    │
└────────────────────────────────────┘
```

## Digital Geofencing Strategy

| Tactic | Tool | Targeting | Budget |
|--------|------|----------|--------|
| Neighborhood geofence | Simpli.fi | 1970–1999 home tracts within 10mi of billboard | $500–$2,000/mo per market |
| Storm-triggered mobile | GroundTruth | Push ads when NWS severe alert in ZIP | $300–$1,000/event |
| Competitor conquest | El Toro | Geofence Home Depot, Lowe's, roofing supply | $200–$500/mo |
| Nextdoor neighborhood | Nextdoor Ads | Homeowner-verified, neighborhood-level | $200–$800/mo per metro |

## Direct Mail Strategy

| Campaign | Target | Piece | Cost |
|----------|--------|------|------|
| Pre-season (Mar) | 1970–1999 homes in hail belt | Postcard: "Storm season is coming" | $0.35–$0.75/piece |
| Post-storm (reactive) | 5-mile radius of reported hail/wind | Postcard: "We see your area was hit" | $0.35–$0.75/piece |
| HVAC seasonal (Jun/Nov) | Homes with units 15+ years | Postcard: "Is your AC ready?" | $0.35–$0.75/piece |
| EDDM blanket | Every address on target postal route | Postcard: vanity number + QR | $0.20–$0.30/piece |

## Budget Allocation by Market Phase

### Phase 1 Budget: Testing (Month 1–2) — $5K–$10K/month

| Channel | Monthly Spend |
|---------|-------------|
| Blip digital billboards (2 markets) | $3,000–$6,000 |
| Simpli.fi geofencing (2 markets) | $1,000–$2,000 |
| Nextdoor ads (2 markets) | $400–$800 |
| Google LSA (HVAC vertical test) | $500–$1,000 |
| **Total** | **$4,900–$9,800** |

### Phase 2 Budget: Proven Markets (Month 3–6) — $15K–$30K/month

| Channel | Monthly Spend |
|---------|-------------|
| Lamar/Clear Channel static boards (4 markets) | $8,000–$16,000 |
| Blip digital (expansion markets) | $2,000–$4,000 |
| Geofencing + mobile (4 markets) | $2,000–$4,000 |
| Direct mail — EDDM campaigns | $1,500–$3,000 |
| Digital ads (Google, Meta, Nextdoor) | $1,500–$3,000 |
| **Total** | **$15,000–$30,000** |

### Phase 3 Budget: National Scale (Month 7–12) — $40K–$80K/month

| Channel | Monthly Spend |
|---------|-------------|
| Static + digital billboards (8+ markets) | $20,000–$40,000 |
| Geofencing + mobile (national) | $5,000–$10,000 |
| Direct mail campaigns | $5,000–$10,000 |
| Digital ads | $5,000–$10,000 |
| TV/Radio (local, if ROI proven) | $5,000–$10,000 |
| **Total** | **$40,000–$80,000** |

---

# 10. SEASONAL ACTIVATION CALENDAR

```
JAN    FEB    MAR    APR    MAY    JUN    JUL    AUG    SEP    OCT    NOV    DEC
 │      │      │      │      │      │      │      │      │      │      │      │
 ▼      ▼      ▼      ▼      ▼      ▼      ▼      ▼      ▼      ▼      ▼      ▼
┌──────────────┐
│  WINTER HVAC │ WI, IL, MI, OH, PA, MN
│  Furnace fail│ "No Heat? Call 833-HVAC-AI"
└──────────────┘
              ┌──────────────────────┐
              │  TORNADO / HAIL       │ OK, TX, KS, GA, AL, MS
              │  Spring severe season │ "Hail Damage? Call 262-HAIL"
              └──────────────────────┘
                            ┌──────────────────────┐
                            │  PEAK HAIL + STORMS   │ TX, CO, NE, FL, GA
                            │  Insurance claims surge│ "Call 855-CLAIM"
                            └──────────────────────┘
                                          ┌──────────────────────┐
                                          │  EXTREME HEAT         │ AZ, TX, FL, GA, LA
                                          │  AC failures spike    │ "No AC? 833-HVAC-NOW"
                                          └──────────────────────┘
                                                        ┌──────────────────────┐
                                                        │  HURRICANE SEASON     │ FL, TX, LA, GA, NC
                                                        │  Peak Sept-Oct        │ "Call 321-STORM"
                                                        └──────────────────────┘
                                                                      ┌──────────────────────┐
                                                                      │  EARLY WINTER + MONEY │
                                                                      │  HVAC + Financial     │
                                                                      │  Holiday stress       │
                                                                      └──────────────────────┘
LEGAL: ════════════════════════════════════════════════════════════════════════════════════
       Always on — accidents, arrests, and disputes don't have a season
       
FINANCIAL: ═══TAX SEASON═══                                    ═══HOLIDAY STRESS═══
           Jan-Apr (+50% volume)                               Nov-Dec (+75% volume)
```

## Weather-Triggered Auto-Activation (Already Built)

The system already auto-activates numbers based on real-time weather data:

| Trigger | Action | Numbers Activated |
|---------|--------|------------------|
| NWS hail report (≥1" diameter) | Activate HAIL + STORM numbers in affected county | Local + toll-free |
| Temperature ≥95°F for 3+ days | Activate HVAC numbers for that metro | HVAC + NEED |
| Temperature ≤20°F for 2+ days | Activate HVAC winter numbers | HVAC + NEED |
| Hurricane/tropical storm warning | Activate STORM + CLAIMS for coastal zones | All weather numbers |
| Severe thunderstorm warning | Activate STORM for affected area | Local STORM numbers |

---

# 11. COMPETITIVE LANDSCAPE

## Direct Competitors

| Competitor | What They Do | Monthly Cost | NEED AI Advantage |
|-----------|-------------|-------------|-------------------|
| **Ruby Receptionists** | Human answering service | $349–$1,699 | AI at 1/10th cost, 24/7, no hold times |
| **Smith.ai** | AI + human hybrid | $292–$1,170 | We own the number + the lead |
| **Posh Virtual** | Virtual receptionist | $114–$834 | We don't need humans to scale |
| **CallRail** | Call tracking + analytics | $45–$145 | We do tracking AND the conversation |
| **Marchex** | AI call analytics | Enterprise | We generate + qualify the lead |

## Lead Generation Competitors

| Competitor | Model | Lead Cost | NEED AI Advantage |
|-----------|-------|----------|-------------------|
| **Angi / HomeAdvisor** | Lead marketplace | $15–$100/lead | We own the funnel, not a marketplace |
| **Thumbtack** | Bid-based | $5–$60/lead | Our leads are pre-qualified by AI |
| **Modernize** | Home improvement leads | $20–$150/lead | We have vanity numbers + billboards |
| **hail911.com** | Storm damage leads | $50–$200/lead | We have 51 numbers + AI + weather triggers |

## Our Moat

1. **We own the numbers** — 51 vanity numbers are a finite asset. Once deployed, competitors can't use them.
2. **We own the AI** — Custom-trained personas, not generic chatbots. Industry-specific conversation flows.
3. **We own the data** — Every call captured, transcribed, scored, and stored. This data compounds.
4. **Weather-triggered activation** — Automated response to real-time weather. No manual intervention.
5. **Billboard + phone + AI = closed loop** — End-to-end attribution. Know exactly which board drove which call.

---

# 12. LICENSING & WHITE-LABEL MODEL

## How Licensing Works

```
NEED AI (FTH Trading)
    │
    ├── OWNS: 51 vanity numbers
    ├── OPERATES: AI engine + persona system
    ├── MANAGES: Telnyx, OpenAI, Vercel infrastructure
    │
    └── LICENSES TO:
         │
         ├── Roofing Contractor (Atlanta)
         │   └── Gets: 470-STORM number, AI answers in their brand
         │        20-40 qualified storm leads/month
         │        Dashboard access, CRM integration
         │        Cost: $399/mo + $0.50/call
         │
         ├── HVAC Company (Phoenix)
         │   └── Gets: HVAC number, AI handles emergency triage
         │        50-100 HVAC leads/month
         │        Weather-triggered activation
         │        Cost: $499/mo + $0.50/call
         │
         ├── Law Firm (National)
         │   └── Gets: 888-LAW-AI number, AI legal intake
         │        15-30 legal leads/month
         │        Practice area routing
         │        Cost: $849/mo + $25/escalation
         │
         └── Marketing Agency (White-Label)
              └── Gets: Custom-branded platform
                   Multiple numbers for their clients
                   Full dashboard + reporting
                   Cost: $2,500-$5,000/mo + per-seat
```

## Licensee ROI Example

### Scenario: Roofing Company in Atlanta

| Item | Amount |
|------|--------|
| Monthly license fee | $399 |
| Average qualified leads per month | 25 |
| Average close rate | 30% |
| Average job value | $8,500 |
| Monthly closed revenue | 25 × 30% × $8,500 = **$63,750** |
| Monthly cost | $399 + ($0.50 × 100 calls) = **$449** |
| **Monthly ROI** | **14,088%** |
| **Net monthly benefit** | **$63,301** |

## Pre-Packaged State Bundles

| Bundle | Numbers | Boards | Monthly Cost | Monthly Revenue Est. |
|--------|---------|--------|-------------|---------------------|
| Georgia Storm Pack | 3 | 20 | $12,600–$35,000 | $25,000–$60,000 |
| Florida Storm Pack | 3 | 25 | $21,000–$80,000 | $50,000–$150,000 |
| Wisconsin Hail Pack | 2 | 15 | $8,000–$20,000 | $15,000–$40,000 |
| National Legal Pack | 3 | 50+ | $30,000–$75,000 | $45,000–$150,000 |
| National HVAC Pack | 3 | 20 | $10,000–$25,000 | $20,000–$50,000 |

---

# 13. COMPLIANCE & LEGAL FRAMEWORK

## FTC / Billboard Compliance

| Rule | Our Implementation |
|------|-------------------|
| Billboard headlines must be questions, not claims | "Roof Damage?" not "We Fix Roofs" |
| Vanity numbers must use standard keypad mapping | 470-STORM = 470-786-76 (verified) |
| No misleading service claims | Billboard says "AI-Powered" — accurate |
| No false urgency language | "24/7" and "Free Assessment" are factual |

## FCC / Telephony Compliance

| Rule | Our Implementation |
|------|-------------------|
| Robocall rules (TCPA) | AI is answering inbound calls only — not outbound |
| Call recording disclosure | Greeting includes recording notice |
| Caller ID accuracy | All numbers show Telnyx-assigned DID |

## TCPA (Consumer Data)

| Rule | Our Implementation |
|------|-------------------|
| Express consent for follow-up | AI asks: "Is it okay if a specialist calls you back?" |
| DNC compliance | Cross-reference before lead resale |
| Data retention limits | 90-day lead data default, configurable |
| Opt-out mechanism | "Stop" or "remove me" honored immediately |

## State-Specific Considerations

| State | Special Rules | Our Approach |
|-------|--------------|-------------|
| California (CCPA) | Data deletion rights | Automated deletion endpoint |
| Texas | Weather-related advertising rules | Compliant billboard copy |
| Florida | Insurance solicitation regulations | No insurance sales claims — leads only |
| Wisconsin | Consumer protection, marketing rules | Verified compliant messaging |

---

# 14. TECHNOLOGY STACK

```
┌─────────────────────────────────────────────────┐
│                PRODUCTION STACK                   │
├──────────────┬──────────────────────────────────┤
│  DNS         │  Cloudflare (unykorn.org zone)    │
│              │  A → 76.76.21.21 (Vercel)         │
│              │  Proxy: OFF (Vercel SSL)           │
├──────────────┼──────────────────────────────────┤
│  Hosting     │  Vercel Edge Network              │
│              │  Global edge, sub-50ms cold start  │
│              │  Project: needai                   │
├──────────────┼──────────────────────────────────┤
│  Framework   │  Next.js 16.1.6 (App Router)      │
│              │  TypeScript 5.x                    │
│              │  force-dynamic (no caching)        │
├──────────────┼──────────────────────────────────┤
│  Voice       │  Telnyx TeXML                     │
│              │  51 DID numbers                    │
│              │  Amazon Polly Joanna-Neural TTS    │
│              │  ASR: speech recognition            │
├──────────────┼──────────────────────────────────┤
│  AI Engine   │  OpenAI GPT-4o-mini               │
│              │  max_tokens: 120, temp: 0.6        │
│              │  8 persona system prompts           │
├──────────────┼──────────────────────────────────┤
│  Monitoring  │  /api/health (liveness)            │
│              │  /api/ready (readiness)             │
│              │  /dashboard (real-time)             │
├──────────────┼──────────────────────────────────┤
│  Weather     │  OpenWeatherMap API               │
│              │  15-min monitoring cycle            │
│              │  Auto-activation engine             │
└──────────────┴──────────────────────────────────┘
```

---

# 15. 90-DAY LAUNCH PLAN

## Week 1–2: Foundation

| # | Task | Owner | Deliverable |
|---|------|-------|------------|
| 1 | Pull Census B25034 data for Atlanta + Dallas | FTH Data | Density maps by tract |
| 2 | Cross-reference with NOAA storm history + Zillow home values | FTH Data | Scoring spreadsheet |
| 3 | Create Blip Billboards account | FTH Marketing | Account active, first creative uploaded |
| 4 | Demo live system to CEO/Owners (call 470-STORM together) | FTH Tech | Stakeholder buy-in |
| 5 | Select 2 licensee prospects (roofing + HVAC) in Atlanta | CEO/Owners | Prospect list |
| 6 | Finalize CRM integration (Zapier or webhook) | FTH Tech | Lead delivery pipeline |

## Week 3–4: Test Launch

| # | Task | Owner | Deliverable |
|---|------|-------|------------|
| 7 | Deploy 3–5 Blip digital billboards in Atlanta | FTH Marketing | Live boards, tracking active |
| 8 | Deploy 2–3 Blip digital billboards in Dallas | FTH Marketing | Live boards, tracking active |
| 9 | Launch Simpli.fi geofencing in target neighborhoods | FTH Marketing | Mobile ads serving |
| 10 | Activate weather-trigger engine for Atlanta + Dallas | FTH Tech | Auto-activation confirmed |
| 11 | Begin tracking: calls per board per day, lead quality, cost per lead | FTH Data | Daily dashboard |

## Week 5–8: Optimize & Sell

| # | Task | Owner | Deliverable |
|---|------|-------|------------|
| 12 | Analyze first 30 days: which boards drove calls, which didn't | FTH Data | Optimization report |
| 13 | Kill underperforming boards, double down on winners | FTH Marketing | Revised board mix |
| 14 | Close first 2 licensee deals (roofing + HVAC) | CEO/Owners + Sales | Signed contracts |
| 15 | Launch direct mail campaign (EDDM) in top-performing ZIP | FTH Marketing | 5,000 postcards mailed |
| 16 | Begin outreach to 5 additional licensee prospects | Sales | Pipeline of 5 |
| 17 | Add property address capture to AI script | FTH Tech | Enhanced lead quality |

## Week 9–12: Scale

| # | Task | Owner | Deliverable |
|---|------|-------|------------|
| 18 | Transition proven Blip boards to permanent Lamar/Clear Channel contracts | FTH Marketing | 6-month board contracts |
| 19 | Expand to Tampa/Milwaukee (Tier 1 markets) | FTH Marketing | New boards + geofencing |
| 20 | Close 3–5 additional licensee deals | Sales | $2K–$4K/mo recurring |
| 21 | Launch national Legal vertical (888-LAW-AI) | FTH Marketing | Courthouse corridor boards |
| 22 | Begin white-label sales to marketing agencies | Sales | First agency partner |
| 23 | Present 90-day results + Year 1 forecast to CEO/Owners | FTH | Board presentation |

## 90-Day Success Metrics

| Metric | Target |
|--------|--------|
| Total calls received | 500+ |
| Qualified leads generated | 200+ |
| Lead-to-sale conversion (licensee-reported) | 20%+ |
| Revenue from lead sales | $15,000+ |
| Licensee contracts signed | 3–5 |
| Monthly recurring revenue | $2,000–$5,000 |
| Cost per qualified lead | <$50 |
| Billboard ROI | >2x |

---

# 16. 12-MONTH FINANCIAL FORECAST

| Month | Markets | Numbers Active | Media Spend | Lead Revenue | Licensing Revenue | Total Revenue | Net |
|-------|---------|---------------|------------|-------------|------------------|---------------|-----|
| 1 | 2 | 5 | $5,000 | $5,000 | $0 | $5,000 | $0 |
| 2 | 2 | 5 | $7,000 | $12,000 | $800 | $12,800 | $5,800 |
| 3 | 2 | 8 | $10,000 | $20,000 | $2,000 | $22,000 | $12,000 |
| 4 | 4 | 12 | $18,000 | $35,000 | $4,000 | $39,000 | $21,000 |
| 5 | 4 | 15 | $22,000 | $50,000 | $6,000 | $56,000 | $34,000 |
| 6 | 5 | 20 | $30,000 | $70,000 | $10,000 | $80,000 | $50,000 |
| 7 | 6 | 25 | $35,000 | $85,000 | $14,000 | $99,000 | $64,000 |
| 8 | 6 | 30 | $40,000 | $100,000 | $18,000 | $118,000 | $78,000 |
| 9 | 7 | 35 | $45,000 | $120,000 | $22,000 | $142,000 | $97,000 |
| 10 | 8 | 40 | $50,000 | $140,000 | $28,000 | $168,000 | $118,000 |
| 11 | 8 | 45 | $55,000 | $155,000 | $32,000 | $187,000 | $132,000 |
| 12 | 8+ | 51 | $60,000 | $175,000 | $40,000 | $215,000 | $155,000 |
| **YEAR 1 TOTAL** | | | **$377,000** | **$967,000** | **$176,800** | **$1,143,800** | **$766,800** |

### Key Assumptions
- Conservative lead volume ramp (40% of capacity in first 6 months)
- Billboard ROI of 2.5–4x (based on industry benchmarks for vanity numbers)
- Licensing revenue starts Month 2 with first signed operator
- Platform costs negligible ($1K–$3K/month) relative to revenue
- Storm season (Apr–Oct) drives 60% of annual storm/hail revenue
- Legal and financial verticals are year-round

---

# 17. RISK ANALYSIS & MITIGATION

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Low call volume from billboards | Medium | High | Test with Blip ($50/day) before committing to static boards. Kill non-performers fast. |
| Storm season is mild | Medium | Medium | Diversify into HVAC + Legal + Financial (year-round verticals). Don't over-index on weather. |
| Competitor copies vanity numbers | Low | Low | We own the numbers on Telnyx — they can't use them. Competitor would need new numbers. |
| AI quality issues (wrong persona, bad response) | Low | Medium | 120-token cap + persona constraints. Add human fallback for escalation. |
| Telnyx service outage | Low | High | Telnyx has 99.99% SLA. If needed, failover to Twilio with same numbers. |
| Regulatory changes (FTC billboard rules) | Low | Medium | Compliance guide already built. Billboard copy uses questions, not claims. |
| Slow licensee sales | Medium | Medium | Start with direct lead sales (no licensee needed). Licensing is additive revenue. |
| OpenAI API cost spike | Low | Low | GPT-4o-mini is cheapest tier. 120-token cap limits costs. Could switch to local model. |

---

# 18. KEY DECISIONS FOR CEO / OWNERS

## Decisions Needed Now

| # | Decision | Options | Recommendation |
|---|----------|---------|---------------|
| 1 | **Launch markets** | Atlanta + Dallas (Tier 1) | Start with both — different seasons, different verticals |
| 2 | **Initial media budget** | $5K–$10K/mo testing phase | $7,500/mo — enough for 5 Blip boards + geofencing per market |
| 3 | **First vertical focus** | Storm vs. HVAC vs. Legal | Storm + HVAC (seasonal urgency, highest call volume) |
| 4 | **Licensee pricing** | $199–$849/mo range | $399/mo for local, $849/mo for toll-free — competitive but profitable |
| 5 | **Sales approach** | Direct outreach vs. inbound | Direct outreach to roofing/HVAC companies in launch markets |

## Decisions Needed in 30 Days

| # | Decision | Context |
|---|----------|---------|
| 6 | Scale up or pivot based on Week 3–4 data | First billboard performance metrics |
| 7 | Which licensee verticals to prioritize | Based on lead quality + close rates |
| 8 | Direct mail test geography | Based on density scoring results |
| 9 | CRM selection for licensee dashboard | HubSpot vs. Salesforce vs. custom |
| 10 | Hire dedicated sales rep? | Based on licensee pipeline volume |

## Decisions Needed in 90 Days

| # | Decision | Context |
|---|----------|---------|
| 11 | Year 1 media budget commitment | Based on proven ROI from test phase |
| 12 | National legal vertical launch | Requires courthouse corridor billboard contracts |
| 13 | White-label partnership structure | For marketing agency channel |
| 14 | Additional number acquisition | May need market-specific numbers for Tier 2 metros |
| 15 | Hire or outsource media buying | At $40K+/mo media spend, dedicated buyer may be needed |

---

# APPENDICES

## Appendix A: Number-to-Persona Mapping (Full 51-Number Inventory)

See [CANONICAL_NUMBERS.md](../CANONICAL_NUMBERS.md) for the complete mapping of all 51 numbers to personas, billboards, and dial digits.

## Appendix B: Billboard Production Specs

See [marketing/billboard-print-specs.md](../marketing/billboard-print-specs.md) for full production specifications for print vendors.

## Appendix C: Licensee Sales Package

See [marketing/call-recipient-package.md](../marketing/call-recipient-package.md) for the complete licensee/operator onboarding guide.

## Appendix D: Compliance Guide

See [marketing/compliance-guide.md](../marketing/compliance-guide.md) for FTC/FCC compliance details and billboard copy rules.

## Appendix E: State Bundle Pricing

See [marketing/state-bundles.md](../marketing/state-bundles.md) for pre-packaged state-level deployment bundles with ROI projections.

## Appendix F: QR Code Integration

See [QR_EXECUTIVE_SUMMARY.md](../QR_EXECUTIVE_SUMMARY.md) for the QR code system specifications and analytics tracking.

## Appendix G: Proof of Operation

See [PROOF-OF-OPERATION.md](../docs/PROOF-OF-OPERATION.md) for the latest production smoke-test evidence and proof chain.

---

*Prepared by FTH Trading for CEO / Owner Strategy Planning*  
*NEED AI Platform — April 14, 2026*  
*All projections are estimates based on industry benchmarks and comparable vanity number campaigns.*  
*Confidential — Not for external distribution without authorization.*

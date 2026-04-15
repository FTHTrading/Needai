# NEED AI — BOARD ONE-PAGER
## CEO / Owner Brief
### April 14, 2026

## 1) What NEED AI Is
NEED AI is a live AI-powered phone answering and lead capture platform with 51 vanity numbers across 8 verticals (Storm, Hail, HVAC, Claims, Law, Money, Wilkins, Universal). It routes inbound calls, runs persona-based conversations, and delivers qualified leads in real time.

## 2) What Is Already Live
- 51 numbers active on Telnyx
- GPT-4o-mini conversation engine (persona prompts)
- Amazon Polly neural voice for natural responses
- Live endpoints and dashboard in production
- Production SMS ingress and AI reply path, smoke-tested on 2026-04-15
- Weather-triggered activation for storm/hail/HVAC events
- Billing-ready pricing model and licensing structure
- Compliance framework and production marketing assets

## 2A) Latest Operational Proof
- Production endpoint tested: `https://needai.unykorn.org/api/telnyx-webhook`
- Smoke test result: HTTP 200 with `{"received":true,"sent":true,"persona":"NEED","approvalRequired":false}`
- Evidence captured in Vercel logs for `message.received` event `smoke_msg_022`
- Proof artifact: `docs/PROOF-OF-OPERATION.md`

## 3) Core Business Model
- Lead sales: $75 to $1,200 per qualified lead (by vertical)
- Number licensing: $199 to $849 per number/month
- AI processing fees: $0.25 to $1.00 per call action
- Storm activation fees: $149 to $499 per event
- White-label enterprise: $2,500 to $5,000/month

## 4) Why This Works Now
- 55.7M US homes (built 1970 to 1999) are high-probability demand targets
- These homes are at roof/HVAC replacement age
- Seasonal weather and temperature events create urgent inbound intent
- Vanity numbers + AI produce measurable attribution per board/campaign

## 5) Initial Go-To-Market
Tier 1 launch markets:
- Atlanta, GA
- Dallas-Fort Worth, TX
- Tampa-Orlando, FL
- Milwaukee-Madison, WI

Channel mix:
- Digital billboards first (Blip) for low-cost testing
- Scale winners to Lamar/Clear Channel placements
- Add geofencing + direct mail in high-density aging-home tracts

## 6) 90-Day Targets
- 500+ inbound calls
- 200+ qualified leads
- 3 to 5 signed licensees
- $15K+ lead revenue
- $2K to $5K MRR
- Cost per qualified lead under $50

## 7) 12-Month Outlook (Base Case)
- Revenue: ~$1.14M
- Net: ~$766K
- Markets: 8+
- Active numbers: up to full 51 inventory

## 8) Key Board Decisions Needed
1. Approve launch budget: $7,500/month (first 60 days testing)
2. Approve Tier 1 market rollout (Atlanta + Dallas first)
3. Approve initial vertical focus (Storm + HVAC, then Legal)
4. Approve pricing floor ($399 local, $849 toll-free)
5. Approve direct sales push to first licensees (roofing + HVAC)

## 9) Immediate Next Steps (Next 7 Days)
- Pull Census aging-home tracts for Atlanta/Dallas
- Launch first 5 to 8 digital billboard placements
- Activate geofencing around target neighborhoods
- Add property address/home-age capture to AI intake
- Run weekly CEO KPI review: calls, leads, CPL, revenue, close rate

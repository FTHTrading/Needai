# Billboard Design Specifications with QR Codes

**Version**: 2.0 (QR-Enhanced)  
**Date**: February 3, 2026  
**Status**: Production Ready

---

## Overview

This document specifies the exact layout for all CallRail OS billboard campaigns with integrated QR codes. Each design provides **three entry points**:
1. **Memory**: Vanity number recall
2. **Direct**: Click-to-call (digital billboards)
3. **QR**: Scan for landing page

---

## Standard Billboard Layout (14' x 48')

### Zones

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  [HEADLINE - 36pt Impact]                       │
│  (Top 25% - High contrast)                      │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  CALL XXX-VANITY                                │
│  (Center 40% - 48pt Bold)                       │
│                                                 │
├─────────────────────────────────────────────────┤
│  OR SCAN        ┌─────────┐                     │
│  (Bottom 25%)   │   QR    │                     │
│                 │  CODE   │                     │
│                 └─────────┘                     │
└─────────────────────────────────────────────────┘
```

### Measurements
- **Headline**: Top 25%, 36pt Impact font
- **Call to Action**: Center 40%, 48pt Bold
- **QR Code**: Bottom right, 8" x 8"
- **"OR SCAN" text**: Bottom left, 24pt
- **Margins**: 6" all sides

---

## Campaign-Specific Designs

### 1. STORM Campaign

#### Layout
```
┌─────────────────────────────────────────────────┐
│                                                 │
│           STORM DAMAGE?                         │
│     (White text on dark blue #003366)           │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│      CALL 470-STORM                             │
│    (Yellow #FFCC00 on blue)                     │
│                                                 │
├─────────────────────────────────────────────────┤
│  OR SCAN        ┌─────────┐                     │
│  (White 24pt)   │  qr-    │                     │
│                 │ storm   │                     │
│                 └─────────┘                     │
└─────────────────────────────────────────────────┘
```

#### Specifications
- **Background**: Dark blue gradient (#003366 to #004080)
- **Headline**: White, 36pt Impact
- **Number**: Yellow (#FFCC00), 48pt Bold
- **QR**: `qr-storm.svg` - 8" x 8"
- **QR Destination**: `vanity.ai/storm?utm_source=billboard&utm_medium=qr&utm_campaign=storm`

#### Regional Variations
- **Georgia**: "CALL 470-STORM"
- **Florida - Tampa**: "CALL 727-STORM"
- **Florida - Miami**: "CALL 786-STORM"
- **Arizona**: "CALL 623-STORM"

---

### 2. LAW Campaign

#### Layout
```
┌─────────────────────────────────────────────────┐
│                                                 │
│        NEED A LAWYER?                           │
│    (Black text on gold #D4AF37)                 │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│    CALL 888-LAW-AI                              │
│   TEXT "LAW"                                    │
│   (Black on gold)                               │
│                                                 │
├─────────────────────────────────────────────────┤
│  OR SCAN        ┌─────────┐                     │
│  (Black 24pt)   │  qr-    │                     │
│                 │  law    │                     │
│                 └─────────┘                     │
└─────────────────────────────────────────────────┘
```

#### Specifications
- **Background**: Gold (#D4AF37)
- **Headline**: Black, 36pt Impact
- **Number**: Black, 48pt Bold
- **SMS CTA**: Black, 30pt Regular
- **QR**: `qr-law.svg` - 8" x 8"
- **QR Destination**: `vanity.ai/law?utm_source=billboard&utm_medium=qr&utm_campaign=law`

---

### 3. MONEY Campaign

#### Layout
```
┌─────────────────────────────────────────────────┐
│                                                 │
│          NEED MONEY?                            │
│    (White text on green #2E7D32)                │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│   CALL 888-CASH-AI                              │
│   TEXT "CASH"                                   │
│   (White on green)                              │
│                                                 │
├─────────────────────────────────────────────────┤
│  OR SCAN        ┌─────────┐                     │
│  (White 24pt)   │  qr-    │                     │
│                 │ money   │                     │
│                 └─────────┘                     │
└─────────────────────────────────────────────────┘
```

#### Specifications
- **Background**: Dark green (#2E7D32)
- **Headline**: White, 36pt Impact
- **Number**: White, 48pt Bold
- **SMS CTA**: White, 30pt Regular
- **QR**: `qr-money.svg` - 8" x 8"
- **QR Destination**: `vanity.ai/money?utm_source=billboard&utm_medium=qr&utm_campaign=money`

---

### 4. HVAC Campaign

#### Layout
```
┌─────────────────────────────────────────────────┐
│                                                 │
│        AC BROKEN?                               │
│    (White text on orange #FF6B35)               │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  CALL 833-HVAC-NOW                              │
│  TEXT "HVAC"                                    │
│  (White on orange)                              │
│                                                 │
├─────────────────────────────────────────────────┤
│  OR SCAN        ┌─────────┐                     │
│  (White 24pt)   │  qr-    │                     │
│                 │ hvac    │                     │
│                 └─────────┘                     │
└─────────────────────────────────────────────────┘
```

#### Specifications
- **Background**: Bright orange (#FF6B35)
- **Headline**: White, 36pt Impact
- **Number**: White, 48pt Bold
- **SMS CTA**: White, 30pt Regular
- **QR**: `qr-hvac.svg` - 8" x 8"
- **QR Destination**: `vanity.ai/hvac?utm_source=billboard&utm_medium=qr&utm_campaign=hvac`

---

### 5. HAIL Campaign

#### Layout
```
┌─────────────────────────────────────────────────┐
│                                                 │
│        ROOF DAMAGE?                             │
│    (Black text on white)                        │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│    CALL 262-HAIL                                │
│    (Black on white)                             │
│                                                 │
├─────────────────────────────────────────────────┤
│  OR SCAN        ┌─────────┐                     │
│  (Black 24pt)   │  qr-    │                     │
│                 │ hail    │                     │
│                 └─────────┘                     │
└─────────────────────────────────────────────────┘
```

#### Specifications
- **Background**: White with subtle gray gradient
- **Headline**: Black, 36pt Impact
- **Number**: Black, 48pt Bold
- **QR**: `qr-hail.svg` - 8" x 8"
- **QR Destination**: `vanity.ai/hail?utm_source=billboard&utm_medium=qr&utm_campaign=hail`

#### Regional Variations
- **Wisconsin - Milwaukee Suburbs**: "CALL 262-HAIL"
- **Wisconsin - Milwaukee**: "CALL 414-HAIL"
- **California - Inland**: "CALL 909-ROOF"
- **Kansas**: "CALL 539-ROOF"

---

### 6. CLAIMS Campaign

#### Layout
```
┌─────────────────────────────────────────────────┐
│                                                 │
│       FILE A CLAIM?                             │
│    (White text on navy #1A237E)                 │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│    CALL 844-CLAIM                               │
│    (White on navy)                              │
│                                                 │
├─────────────────────────────────────────────────┤
│  OR SCAN        ┌─────────┐                     │
│  (White 24pt)   │  qr-    │                     │
│                 │ claims  │                     │
│                 └─────────┘                     │
└─────────────────────────────────────────────────┘
```

#### Specifications
- **Background**: Navy blue (#1A237E)
- **Headline**: White, 36pt Impact
- **Number**: White, 48pt Bold
- **QR**: `qr-claims.svg` - 8" x 8"
- **QR Destination**: `vanity.ai/claims?utm_source=billboard&utm_medium=qr&utm_campaign=claims`

---

### 7. NEED Campaign (Universal)

#### Layout
```
┌─────────────────────────────────────────────────┐
│                                                 │
│          NEED HELP?                             │
│    (White text on purple #6A1B9A)               │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│    CALL 844-NEED                                │
│    TEXT "HELP"                                  │
│    (White on purple)                            │
│                                                 │
├─────────────────────────────────────────────────┤
│  OR SCAN        ┌─────────┐                     │
│  (White 24pt)   │  qr-    │                     │
│                 │  need   │                     │
│                 └─────────┘                     │
└─────────────────────────────────────────────────┘
```

#### Specifications
- **Background**: Deep purple (#6A1B9A)
- **Headline**: White, 36pt Impact
- **Number**: White, 48pt Bold
- **SMS CTA**: White, 30pt Regular
- **QR**: `qr-need.svg` - 8" x 8"
- **QR Destination**: `vanity.ai/need?utm_source=billboard&utm_medium=qr&utm_campaign=need`
- **Special Note**: Universal router - AI determines service type

---

## QR Code Technical Specifications

### Print Requirements
- **Format**: Vector SVG (scalable)
- **Size**: 8" x 8" (minimum for 15ft viewing distance)
- **Resolution**: 1000 x 1000px @ 300 DPI
- **Error Correction**: High (30% redundancy)
- **Placement**: Bottom right corner
- **Margin**: 6" from edges

### Color Requirements
- **Background**: Always white or very light
- **QR Pattern**: Solid black (#000000)
- **Contrast Ratio**: Minimum 7:1
- **Border**: 0.5" white margin around QR

### Testing Checklist
- [ ] Scan successful from 10 feet
- [ ] Scan successful from 15 feet
- [ ] Works in bright sunlight
- [ ] Works in low light
- [ ] iOS and Android compatible
- [ ] Landing page loads < 2 seconds

---

## Digital Billboard Adaptations

### Interactive Elements
- **Click-to-Call**: Direct dial from digital display
- **SMS CTA**: "Text STORM to 470-STORM"
- **QR Code**: Animated pulse effect (3 second loop)

### Rotation Schedule
- **Primary**: Vanity number (10 seconds)
- **Secondary**: QR code CTA (5 seconds)
- **Loop**: Continuous

---

## Print Specifications

### File Formats
- **Vector**: Adobe Illustrator (.ai) or PDF
- **QR Codes**: SVG from `/public/qr/`
- **Color**: CMYK for offset printing
- **Bleed**: 0.5" all sides

### Resolution
- **Minimum**: 300 DPI at final size
- **Preferred**: 600 DPI for large format

### Color Profiles
- **STORM**: CMYK (100, 75, 0, 60) for blue
- **LAW**: CMYK (0, 20, 70, 0) for gold
- **MONEY**: CMYK (90, 0, 100, 30) for green
- **HVAC**: CMYK (0, 70, 80, 0) for orange

---

## Compliance Requirements

### Must Include
✅ **Vanity number** (primary CTA)
✅ **QR code** (secondary option)
✅ **Clear headline** (describes service)
✅ **High contrast** (readability from distance)

### Must NOT Include
❌ False urgency ("ACT NOW")
❌ Guaranteed outcomes
❌ Misleading claims
❌ Hidden fees or terms

---

## Landing Page Requirements

Each QR destination MUST include:

1. **Hero Section**
   - Campaign headline
   - Large vanity number display
   - Click-to-call button (tel: link)

2. **Service Description**
   - What the service provides
   - Who it's for
   - Next steps

3. **Contact Options**
   - Voice: Click-to-call
   - SMS: "Text [keyword]"
   - Form: Optional web intake

4. **Mobile Optimization**
   - Fast load (< 2 seconds)
   - Large tap targets (44px minimum)
   - No horizontal scrolling

5. **Analytics**
   - UTM parameters captured
   - Conversion tracking
   - Session recording (optional)

---

## Analytics & Tracking

### UTM Parameters
All QR codes include:
```
?utm_source=billboard
&utm_medium=qr
&utm_campaign=[persona]
```

### Metrics to Track
- **Scans**: Total QR code scans
- **Conversions**: Scan → call rate
- **Geography**: Where scans occur
- **Time**: Peak scan times
- **Device**: iOS vs Android split
- **Performance**: QR vs memory-dial

### Goal Conversions
- Scan event
- Landing page view
- Click-to-call
- Form submission
- Actual call placed

---

## Production Workflow

### 1. Design Phase
- [ ] Select campaign
- [ ] Choose color scheme
- [ ] Draft headline and CTA
- [ ] Position QR code
- [ ] Review compliance

### 2. Asset Preparation
- [ ] Export QR code from `/public/qr/`
- [ ] Verify QR destination URL
- [ ] Test QR scan functionality
- [ ] Create print-ready files
- [ ] Generate CMYK proofs

### 3. Pre-Flight Check
- [ ] QR scans correctly
- [ ] Landing page loads
- [ ] Click-to-call works
- [ ] Analytics tracking fires
- [ ] Colors match spec
- [ ] Text readable from 50 feet

### 4. Production
- [ ] Submit to printer
- [ ] Request color proof
- [ ] Approve final proof
- [ ] Monitor first installation

### 5. Post-Installation
- [ ] Photograph installed billboard
- [ ] Test QR from ground level
- [ ] Verify analytics tracking
- [ ] Monitor conversion rates

---

## Regional Considerations

### Urban Markets
- **QR Priority**: Higher (tech-savvy audience)
- **QR Size**: Standard 8" x 8"
- **SMS CTA**: Include when possible

### Rural Markets
- **QR Priority**: Lower (older demographic)
- **Phone Number**: Larger, more prominent
- **Simplicity**: Fewer CTAs

### High-Traffic Areas
- **Readability**: Maximum contrast
- **CTA**: Single, clear action
- **QR**: Consider larger (10" x 10")

---

## Cost Analysis

### QR Code Addition
- **Design Cost**: $0 (generated programmatically)
- **Print Cost**: +$50-100 per billboard (QR zone)
- **ROI**: +15-30% conversion (estimated)

### Channel Performance
- **Memory Dial**: 100 calls
- **QR Scan**: +20-40 additional interactions
- **Total Lift**: 20-40% more engagement

---

## Future Enhancements

### Dynamic QR Codes
- Change destination without reprinting
- A/B test landing pages
- Time-based routing

### NFC Tags
- Tap-to-call for supported devices
- Works when QR won't scan
- Premium option

### Augmented Reality
- AR overlays for digital billboards
- Interactive 3D elements
- Premium campaigns only

---

## Support & Updates

### QR Regeneration
```bash
npm run generate:qr
```

### Testing QR Codes
```bash
# Start dev server
npm run dev

# Access test pages
http://localhost:3000/storm
http://localhost:3000/law
http://localhost:3000/money
```

### Updating Destinations
Edit `scripts/generate-qr.ts` and regenerate.

---

## Summary

This billboard system provides:
- ✅ **Three entry points**: Memory, QR, SMS
- ✅ **Seven campaigns**: All personas covered
- ✅ **Compliant messaging**: Legal-safe
- ✅ **Analytics-ready**: Full tracking
- ✅ **Print-ready**: Production files included

**QR codes close the gap between billboard and conversion without breaking your telephony or compliance model.**

---

**Last Updated**: February 3, 2026  
**Version**: 2.0 (QR-Enhanced)  
**Assets**: `/public/qr/` (7 SVG files + manifest)

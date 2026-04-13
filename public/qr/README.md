# QR Codes for Billboard Campaigns

**Generated**: 2026-02-03T08:07:15.287Z

## Overview

These QR codes complement the vanity number system by providing:
- **Reduced friction**: One scan vs memorizing number
- **Analytics**: Track scan location, time, and conversion
- **Multi-channel**: Can route to call, SMS, or chat
- **Accessibility**: Alternative for users who prefer digital

## Important Rules

❌ **QR codes DO NOT encode phone numbers**
✅ **QR codes point to intent landing pages**

Each page then offers:
- Vanity number display
- Click-to-call button
- SMS/chat options
- Service information
- Analytics tracking

## Files

### qr-storm.svg
- **Campaign**: STORM
- **Destination**: https://vanity.ai/storm?utm_source=billboard&utm_medium=qr&utm_campaign=storm
- **Use Case**: Scan for emergency storm damage assistance
- **Format**: Vector (print-ready)
- **Size**: 1000x1000px

### qr-hail.svg
- **Campaign**: HAIL
- **Destination**: https://vanity.ai/hail?utm_source=billboard&utm_medium=qr&utm_campaign=hail
- **Use Case**: Scan for hail damage assessment
- **Format**: Vector (print-ready)
- **Size**: 1000x1000px

### qr-law.svg
- **Campaign**: LAW
- **Destination**: https://vanity.ai/law?utm_source=billboard&utm_medium=qr&utm_campaign=law
- **Use Case**: Scan for legal assistance
- **Format**: Vector (print-ready)
- **Size**: 1000x1000px

### qr-claims.svg
- **Campaign**: CLAIMS
- **Destination**: https://vanity.ai/claims?utm_source=billboard&utm_medium=qr&utm_campaign=claims
- **Use Case**: Scan to file or check claim status
- **Format**: Vector (print-ready)
- **Size**: 1000x1000px

### qr-money.svg
- **Campaign**: MONEY
- **Destination**: https://vanity.ai/money?utm_source=billboard&utm_medium=qr&utm_campaign=money
- **Use Case**: Scan for cash and funding options
- **Format**: Vector (print-ready)
- **Size**: 1000x1000px

### qr-hvac.svg
- **Campaign**: HVAC
- **Destination**: https://vanity.ai/hvac?utm_source=billboard&utm_medium=qr&utm_campaign=hvac
- **Use Case**: Scan for emergency HVAC service
- **Format**: Vector (print-ready)
- **Size**: 1000x1000px

### qr-need.svg
- **Campaign**: NEED
- **Destination**: https://vanity.ai/need?utm_source=billboard&utm_medium=qr&utm_campaign=need
- **Use Case**: Scan for any assistance
- **Format**: Vector (print-ready)
- **Size**: 1000x1000px


## Billboard Usage

### Standard Format
```
[HEADLINE]
CALL [VANITY-NUMBER]
OR SCAN
```

### Examples

**STORM Billboard**
```
STORM DAMAGE?
CALL 470-STORM
OR SCAN
```

**LAW Billboard**
```
NEED A LAWYER?
CALL 888-LAW-AI
TEXT "LAW"
OR SCAN
```

**MONEY Billboard**
```
NEED MONEY?
CALL 888-CASH-AI
TEXT "CASH"
OR SCAN
```

## Technical Flow

1. **User scans QR code**
2. **Phone opens landing page** (e.g., vanity.ai/storm)
3. **Page displays**:
   - Headline
   - Vanity number
   - Click-to-call button
   - SMS option
   - Service details
4. **User clicks call button**
5. **Dials** `tel:+1XXXXXXXXXX`
6. **Telnyx receives call**
7. **AI persona loads**
8. **Same intake as billboard call**

## Analytics Parameters

All QR codes include UTM parameters:
- `utm_source=billboard`
- `utm_medium=qr`
- `utm_campaign=[persona]`

Track:
- Scans by location
- Scan-to-call conversion
- Time of day patterns
- QR vs memory-dial performance

## Print Specifications

### Billboard Placement
- **Size**: 8" x 8" (standard billboard QR)
- **Position**: Bottom right corner
- **Contrast**: High (black QR on white background)
- **Error Correction**: High (30% redundancy)

### Digital Usage
- **Web**: Display at 200x200px
- **Social**: Use PNG exports
- **Email**: Embed SVG or PNG

## Design Integration

QR codes should be:
- ✅ Large enough to scan from 10-15 feet
- ✅ High contrast background
- ✅ Not obstructed by design elements
- ✅ Accompanied by "OR SCAN" text

## Generating New QR Codes

```bash
npm run generate:qr
```

Regenerate if:
- Domain changes
- UTM parameters update
- New campaigns added

## Landing Page Requirements

Each intent page MUST have:
1. ✅ Large, visible vanity number
2. ✅ Click-to-call button (tel: link)
3. ✅ Clear service description
4. ✅ Mobile-optimized layout
5. ✅ Fast load time (< 2 seconds)
6. ✅ Analytics tracking enabled

## Compliance

✅ **Legal-Safe**: QR never misrepresents dialing
✅ **Accurate**: Points to real, functional pages
✅ **Accessible**: Alternative to voice-only
✅ **Trackable**: Attribution and performance data
✅ **Privacy**: No PII in QR payload

## Testing Checklist

Before deploying QR codes:
- [ ] Test scan on iOS and Android
- [ ] Verify landing page loads
- [ ] Confirm click-to-call works
- [ ] Check analytics firing
- [ ] Validate on slow connections
- [ ] Test from billboard distance (10+ feet)

## Contact

For QR code updates or issues:
- Edit: `scripts/generate-qr.ts`
- Regenerate: `npm run generate:qr`
- Deploy: Upload to `/public/qr/`

---

**Last Updated**: 2026-02-03T08:07:15.287Z
**Base URL**: https://vanity.ai
**Total Codes**: 7

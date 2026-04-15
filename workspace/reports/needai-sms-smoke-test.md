# NeedAI SMS Smoke Test

Date: 2026-04-15
Production URL: https://needai.unykorn.org
Webhook endpoint: https://needai.unykorn.org/api/telnyx-webhook
Deployed commit under test: ea87d28
Telnyx messaging profile: Need-Messaging (`40019c0f-adb4-41af-8c60-04d25f4300aa`)
Test number: +18448516334

## Objective

Prove the production SMS path handles an inbound Telnyx webhook, routes to the NEED persona, generates a runtime response, and submits an outbound SMS reply without crashing on Vercel's read-only filesystem.

## Preconditions

- Telnyx webhook URL updated to `https://needai.unykorn.org/api/telnyx-webhook`
- `store.ts` Vercel `EROFS` failures fixed, including `writeNeedaiWorkspaceReports()`
- Production deploy completed and aliased to `needai.unykorn.org`

## Test Payload

Synthetic inbound payload posted from `C:\Users\Kevan\AppData\Local\Temp\smoke-webhook.json`:

```json
{
  "data": {
    "event_type": "message.received",
    "id": "smoke021",
    "occurred_at": "2026-04-15T08:05:00Z",
    "payload": {
      "id": "smoke_msg_022",
      "from": {"phone_number": "+15005550006"},
      "to": [{"phone_number": "+18448516334"}],
      "text": "Hi I need help finding a property",
      "record_type": "message",
      "state": "received"
    }
  }
}
```

## Result

HTTP status: 200

Response body:

```json
{"received":true,"sent":true,"persona":"NEED","confidence":null,"approvalRequired":false}
```

Interpretation at test time:

- `received: true` confirms the webhook accepted and parsed the request.
- `sent: true` confirms `sendSmsReply()` successfully posted to the Telnyx messages API.
- `persona: "NEED"` confirms the destination number resolved to the NEED persona pack.
- `approvalRequired: false` confirms the runtime did not escalate for manual approval.
- `confidence: null` was traced after the smoke test to a runtime bug where `Number(undefined)` became `NaN`, then serialized to `null` in JSON. That bug is now fixed in `lib/comms/runtime.ts` by rejecting non-finite `confidenceHint` values.

## Evidence Chain

1. Received
   Proof: webhook returned HTTP 200 with `received: true`

2. Routed
   Proof: response returned `persona: "NEED"`

3. Generated
   Proof: runtime completed without falling back and returned a message that was eligible for send

4. Sent
   Proof: response returned `sent: true`, which only occurs after successful Telnyx API submission in `sendSmsReply()`

5. Logged
   Proof from Vercel function logs:

   ```text
   03:57:12.66  needai.unykorn.org  info  λ POST /api/telnyx-webhook/
   [Telnyx Webhook] Event: message.received, Ref: smoke_msg_022
   ```

## Current Proof Status

- Received: PASS
- Routed: PASS
- Generated: PASS
- Sent: PASS
- Delivered to handset: PENDING external confirmation from a real carrier delivery event or device receipt

## Notes

- The smoke test used Telnyx's synthetic number `+15005550006`, so carrier-level delivery proof is not available from this run.
- `sent: true` is still authoritative proof that the app executed the outbound API call successfully.
- A real-phone follow-up test is still the cleanest way to capture final `message.delivered` evidence for packaging.
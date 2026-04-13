# � Vanity Numbers – Technical Reference (Ops)

## 🎯 THE CORE TRUTH

**Vanity numbers require ZERO special configuration.**

When a caller dials a vanity number like `470-STORM`, **their phone converts it to digits first**:

```
470-STORM → 470-287-8676
```

By the time the call reaches Telnyx or our servers, **letters no longer exist**.

👉 **We only ever see digits. Always.**

---

## ✅ WHAT IS ALREADY CONFIGURED (DO NOT CHANGE)

### **Telnyx**

* 42 numbers purchased and active
* Voice Apps created
* Voice Apps assigned to numbers
* Webhook URL configured:

  ```
  https://yourdomain.com/api/telnyx-webhook
  ```

### **Our Codebase**

* Webhook handler:

  ```
  app/api/telnyx-webhook/route.ts
  ```
* Routing engine:

  ```
  lib/routing/engine.ts
  ```
* Number → persona mapping:

  ```
  NUMBER_TO_PERSONA (digits only)
  ```
* Persona prompt files:

  ```
  personas/*.md
  ```

Nothing in this list needs vanity-specific changes.

---

## 📞 CALL FLOW (END TO END)

```
1. Caller dials: 470-STORM
2. Phone converts: 470-287-8676
3. Carrier routes call to Telnyx
4. Telnyx sends webhook to our server
5. Webhook payload contains:
   { "to": "+14702878676" }
6. Our router strips country code → "4702878676"
7. Lookup:
   NUMBER_TO_PERSONA["4702878676"] = "STORM"
8. Load persona:
   personas/STORM.md
9. AI answers using STORM script
```

📌 **Vanity conversion happens at step 2.
Our system never performs letter-to-digit logic.**

---

## 🚫 COMMON MISTAKES (DO NOT DO THESE)

❌ Do **not** try to "enable vanity" in Telnyx
❌ Do **not** add letter-to-digit conversion in code
❌ Do **not** map `"STORM"` → persona
❌ Do **not** expect webhook logs to show letters

✅ Always map **digits → persona**

---

## 🐛 TROUBLESHOOTING

If a call fails, it is **NOT** a vanity problem.

Check these instead:

1. Webhook URL reachable?
2. Correct Voice App assigned to number?
3. Number fully activated in Telnyx?
4. API keys valid?
5. Firewall blocking inbound webhooks?
6. Errors in webhook handler or routing engine?

📌 **Vanity is never the root cause.**

---

## 📊 VERIFICATION CHECKLIST

To confirm vanity is working:

1. Call a vanity number (example: `470-STORM`)
2. Watch webhook logs
3. Inspect `to` field
4. Confirm digits only:

   ```
   "+14702878676"
   ```
5. Confirm correct persona answers

If all five pass, **vanity is working exactly as designed**.

---

## 📋 QUICK REFERENCE

### Vanity inventory

* Master list: `CANONICAL_NUMBERS.md`
* Code constants: `lib/routing/vanity-numbers.ts`
* Spreadsheet: `data/vanity-numbers.csv`

### Digit-only mapping example

```ts
NUMBER_TO_PERSONA = {
  "4702878676": "STORM",  // 470-STORM
  "2623974245": "HAIL",   // 262-HAIL
  "8885052924": "LAW",    // 888-LAW-AI
}
```

---

## ❓ FAQ

**Q: Do we configure vanity in Telnyx?**
No. Phones handle vanity conversion, not Telnyx.

**Q: Will Telnyx send "STORM" in the webhook?**
No. Only digits are ever sent.

**Q: How do we know which persona to use?**
We map the digit string to a persona in `NUMBER_TO_PERSONA`.

**Q: What if someone dials the digits manually?**
Same result. Letters and digits resolve to the same number.

**Q: How do we add a new vanity number?**

1. Buy number in Telnyx
2. Add digits to `NUMBER_TO_PERSONA`
3. Add persona markdown file

No other changes required.

---

## 🚨 ESCALATION PATH

If confusion persists:

1. Read `.github/VANITY_TECHNICAL_EXPLAINED.md`
2. Inspect real webhook payloads
3. Perform a live call test
4. Escalate to dev team for routing review

🚫 **Do not contact Telnyx about "vanity setup."
There is nothing for them to configure.**

---

## ✅ FINAL REMINDER

> Vanity is marketing.
> Phones convert letters.
> We route digits.
> The system already works.

**Stop overthinking it.** 🎯

https://github.com/unykornai/assistant-vanity-

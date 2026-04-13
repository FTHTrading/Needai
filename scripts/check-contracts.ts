import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
const Telnyx = require('telnyx');

const TELNYX_API_KEY = process.env.TELNYX_API_KEY;

type ContractRow = {
  name: string;
  email: string;
  phone: string;
  signed: boolean;
  contract_url: string;
};

async function readContracts(): Promise<ContractRow[]> {
  const p = path.join(process.cwd(), 'data', 'contracts.csv');
  const raw = await fs.readFile(p, 'utf8');
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const header = lines.shift();
  if (!header) return [];
  return lines.map((l) => {
    const [name, email, phone, signed, contract_url] = l.split(',');
    return { name, email, phone, signed: signed === 'true', contract_url } as ContractRow;
  });
}

import axios from 'axios';
import os from 'os';

const FROM_CACHE = path.join(process.cwd(), '.telnyx_from_cache.json');

async function sendSmsReminder(to: string, body: string) {
  if (!TELNYX_API_KEY) throw new Error('TELNYX_API_KEY not configured');
  // Resolve 'from' (priority: env var -> cached -> Telnyx API)
  let from = process.env.TELNYX_FROM_NUMBER || process.env.TELNYX_DEFAULT_FROM;

  // try cache
  if (!from) {
    try {
      const raw = await fs.readFile(FROM_CACHE, 'utf8');
      const o = JSON.parse(raw);
      if (o && o.from) from = o.from;
    } catch (_) {
      // ignore
    }
  }

  // query Telnyx for owned numbers if still not found
  if (!from) {
    try {
      const resp = await axios.get('https://api.telnyx.com/v2/phone_numbers', {
        headers: { Authorization: `Bearer ${TELNYX_API_KEY}` }
      });
      const rows = resp.data?.data || resp.data;
      if (Array.isArray(rows) && rows.length > 0) {
        // prefer SMS-capable numbers if available
        const pick = rows.find((r: any) => {
          const caps = r?.capabilities || r?.features || r?.capability;
          if (!caps) return false;
          if (caps.messaging === true) return true;
          if (caps.sms === true) return true;
          if (caps.includes && typeof caps.includes === 'function') return caps.includes('sms');
          return false;
        }) || rows[0];
        from = pick.phone_number || pick.phoneNumber || pick.number || pick.phone;
        // cache it for next runs
        try {
          await fs.writeFile(FROM_CACHE, JSON.stringify({ from, ts: Date.now() }));
        } catch (_) {}
      }
    } catch (err) {
      console.warn('Could not fetch Telnyx phone numbers:', err?.response?.data || err.message || err);
    }
  }

  const payload: any = { to, text: body };
  if (from) payload.from = from;

  try {
    const resp = await axios.post('https://api.telnyx.com/v2/messages', payload, {
      headers: {
        Authorization: `Bearer ${TELNYX_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return resp.data;
  } catch (err: any) {
    console.error('Failed sending SMS to', to, err?.response?.data || err.message || err);
    throw err;
  }
}

function normalizePhone(raw: string): string | null {
  if (!raw) return null;
  let s = raw.replace(/[^+\d]/g, '');
  // add +1 for 10-digit US numbers
  if (!s.startsWith('+')) {
    if (s.length === 10) s = '+1' + s;
    else if (s.length === 11 && s.startsWith('1')) s = '+' + s;
  }
  // quick checks
  if (!s.startsWith('+') || s.length < 11) return null;
  // reject 555 test ranges like +1555...
  if (s.startsWith('+1555')) return null;
  return s;
}

async function resolveCachedFrom(): Promise<string | null> {
  const envFrom = process.env.TELNYX_FROM_NUMBER || process.env.TELNYX_DEFAULT_FROM;
  if (envFrom) return envFrom;
  try {
    const raw = await fs.readFile(FROM_CACHE, 'utf8');
    const o = JSON.parse(raw);
    if (o && o.from) return o.from;
  } catch (_) {}
  return null;
}

async function writeSummaryFile(opts: { sent: any[]; invalid: any[]; failed: any[]; plan: any[] }) {
  const from = await resolveCachedFrom();
  const ts = new Date().toISOString();
  const total = (opts.sent.length + opts.invalid.length + opts.failed.length + opts.plan.length) || 0;
  const validCount = opts.sent.length;
  const invalidCount = opts.invalid.length;
  const failedCount = opts.failed.length;
  const planCount = opts.plan.length;

  const lines = [] as string[];
  lines.push(`# SMS Summary`);
  lines.push(`Run: ${ts}`);
  lines.push(`Sender: ${from || 'unknown'}`);
  lines.push(`Total contracts scanned: ${total}`);
  lines.push(`Valid numbers (sent): ${validCount}`);
  lines.push(`Invalid numbers (skipped): ${invalidCount}`);
  lines.push(`Failed sends: ${failedCount}`);
  lines.push(`Planned (dry-run): ${planCount}`);
  lines.push('');
  lines.push('Reasons breakdown:');
  if (invalidCount > 0) {
    const testNumbers = opts.invalid.filter(r => (r.phone || '').startsWith('+1555')).length;
    lines.push(`- test_number (555): ${testNumbers}`);
  }
  if (failedCount > 0) lines.push(`- provider_errors: ${failedCount}`);
  lines.push('');
  lines.push('Artifacts:');
  lines.push(`- sms_plan.csv`);
  lines.push(`- sms_invalid.csv`);
  lines.push(`- sms_sent.csv`);
  lines.push(`- sms_failed.csv`);
  lines.push('');
  lines.push('Exit code:');
  lines.push('- 0 if at least one send succeeded; 1 if no sends succeeded.');
  lines.push('');
  lines.push('Next actions: Replace placeholder phone numbers with valid E.164 numbers and re-run with `--send-sms`.');

  await fs.writeFile(path.join(process.cwd(), 'sms_summary.md'), lines.join(os.EOL), 'utf8');
  console.log('Wrote sms_summary.md');
}

async function main() {
  const contracts = await readContracts();
  const unsigned = contracts.filter((c) => !c.signed);

  console.log(`Found ${contracts.length} contracts; ${unsigned.length} unsigned.`);
  if (unsigned.length === 0) return;

  unsigned.forEach((c, i) => {
    console.log(`${i + 1}. ${c.name} — ${c.email} — ${c.phone} — ${c.contract_url}`);
  });

  // If user passed --send-sms, attempt to send reminders
  const args = process.argv.slice(2);
  const doSend = args.includes('--send-sms');
  if (!doSend) console.log('Dry-run: no SMS will be sent. Re-run with `--send-sms` to actually send.');

  const sentRecords: Array<any> = [];
  const invalidRecords: Array<any> = [];
  const failedRecords: Array<any> = [];
  const planRecords: Array<any> = [];

  if (!doSend) {
    // dry-run: build plan and invalid lists
    for (const c of unsigned) {
      const normalized = normalizePhone(c.phone);
      if (!normalized) {
        invalidRecords.push({ name: c.name, email: c.email, phone: c.phone, contract_url: c.contract_url, reason: 'invalid_phone' });
        continue;
      }
      planRecords.push({ name: c.name, email: c.email, phone: normalized, contract_url: c.contract_url });
    }
    // write outputs
    try {
      if (planRecords.length > 0) {
        const lines = ['name,email,phone,contract_url', ...planRecords.map(r => `${r.name},${r.email},${r.phone},${r.contract_url}`)];
        await fs.writeFile(path.join(process.cwd(), 'sms_plan.csv'), lines.join(os.EOL), 'utf8');
        console.log('Wrote sms_plan.csv');
      }
      if (invalidRecords.length > 0) {
        const lines = ['name,email,phone,contract_url,reason', ...invalidRecords.map(r => `${r.name},${r.email},${r.phone},${r.contract_url},${r.reason}`)];
        await fs.writeFile(path.join(process.cwd(), 'sms_invalid.csv'), lines.join(os.EOL), 'utf8');
        console.log('Wrote sms_invalid.csv');
      }
    } catch (err) {
      console.error('Error writing CSV reports:', err);
    }
    try {
      await writeSummaryFile({ sent: [], invalid: invalidRecords, failed: [], plan: planRecords });
    } catch (err) {
      console.error('Error writing summary:', err);
    }
    return;
  }

  // doSend === true: attempt sends, collect successes/failures
  if (doSend) {
    if (!TELNYX_API_KEY) {
      console.error('TELNYX_API_KEY not set — cannot send SMS reminders.');
      process.exit(2);
    }
    for (const c of unsigned) {
      const msg = `Hi ${c.name.split(' ')[0]}, please sign your contract: ${c.contract_url}`;
      const normalized = normalizePhone(c.phone);
      if (!normalized) {
        invalidRecords.push({ name: c.name, email: c.email, phone: c.phone, contract_url: c.contract_url, reason: 'invalid_phone' });
        console.warn('Skipping invalid or test phone number for', c.name, c.phone);
        continue;
      }
      try {
        const r = await sendSmsReminder(normalized, msg);
        sentRecords.push({ name: c.name, email: c.email, phone: normalized, contract_url: c.contract_url, provider_id: r?.data?.id || r?.id || null, from: (process.env.TELNYX_FROM_NUMBER || r?.data?.from || null) });
        console.log('SMS sent to', normalized, 'id:', (r && (r.data?.id || r.id)) || 'unknown');
      } catch (err: any) {
        const reason = err?.response?.data?.errors?.map((e:any)=>e.detail).join('; ') || err?.message || 'send_error';
        failedRecords.push({ name: c.name, email: c.email, phone: normalized, contract_url: c.contract_url, reason });
        console.error('SMS error for', normalized, reason);
      }
    }

    // write reports
    try {
      if (sentRecords.length > 0) {
        const lines = ['name,email,phone,contract_url,provider_id,from'];
        for (const r of sentRecords) lines.push(`${r.name},${r.email},${r.phone},${r.contract_url},${r.provider_id || ''},${r.from || ''}`);
        await fs.writeFile(path.join(process.cwd(), 'sms_sent.csv'), lines.join(os.EOL), 'utf8');
        console.log('Wrote sms_sent.csv');
      }
      const invalidLines = ['name,email,phone,contract_url,reason', ...invalidRecords.map(r=>`${r.name},${r.email},${r.phone},${r.contract_url},${r.reason}`)];
      await fs.writeFile(path.join(process.cwd(), 'sms_invalid.csv'), invalidLines.join(os.EOL), 'utf8');
      console.log('Wrote sms_invalid.csv');
      if (failedRecords.length > 0) {
        const fLines = ['name,email,phone,contract_url,reason', ...failedRecords.map(r=>`${r.name},${r.email},${r.phone},${r.contract_url},${r.reason}`)];
        await fs.writeFile(path.join(process.cwd(), 'sms_failed.csv'), fLines.join(os.EOL), 'utf8');
        console.log('Wrote sms_failed.csv');
      }
    } catch (err) {
      console.error('Error writing CSV reports:', err);
    }

    try {
      await writeSummaryFile({ sent: sentRecords, invalid: invalidRecords, failed: failedRecords, plan: [] });
    } catch (err) {
      console.error('Error writing summary:', err);
    }

    // exit code: success if at least one send succeeded
    if (sentRecords.length > 0) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  }
}

main().catch((err) => { console.error(err); process.exit(1); });

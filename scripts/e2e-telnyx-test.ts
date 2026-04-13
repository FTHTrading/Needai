import fetch from 'node-fetch';

async function postEvent(eventType: string, payload: any) {
  const url = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '') + '/api/telnyx-webhook';
  console.log('Posting', eventType, 'to', url);
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_type: eventType, payload })
  });
  const text = await resp.text();
  console.log('Response', resp.status, text);
}

async function main() {
  const callControlId = 'test-call-123';
  const to = '+19120000000';
  const from = '+15550001234';

  await postEvent('call.initiated', { to, from, call_control_id: callControlId });
  await new Promise((r) => setTimeout(r, 500));
  await postEvent('call.answered', { call_control_id: callControlId, client_state: JSON.stringify({ sessionId: 'test-session', persona: 'NEED' }) });

  // Simulate a speech/gather ending with transcript
  await new Promise((r) => setTimeout(r, 1000));
  await postEvent('gather.ended', { call_control_id: callControlId, client_state: JSON.stringify({ sessionId: 'test-session', persona: 'NEED' }), transcript: 'I need help with my roof after the storm' });
}

main().catch((err) => { console.error(err); process.exit(1); });

import { NextRequest, NextResponse } from 'next/server';
import { resolvePersonaPack } from '@/lib/comms/routing';
import { addDeliveryLog, upsertThread } from '@/lib/comms/store';

export const dynamic = 'force-dynamic';

// Persona greetings — short, snappy, faster TTS playback
const PERSONA_GREETINGS: Record<string, string> = {
  STORM:   "Storm Damage Response, this is your AI specialist. What happened and where?",
  HAIL:    "Hail Damage Assistance, how can I help you today?",
  HVAC:    "HVAC Emergency line, what's going on with your system?",
  CLAIMS:  "Insurance Claims, this is your AI specialist. What can I help you with?",
  LAW:     "Legal Services, how can I help you today?",
  MONEY:   "Financial Services, how can I help you today?",
  WILKINS: "Wilkins Media, how can I help you today?",
  NEED:    "Thank you for calling. How can I help you today?",
};

// Telnyx TeXML — best available neural voice, very human-sounding, zero TTS latency
const VOICE = 'Polly.Joanna-Neural';

function buildTexml(persona: string, to: string): string {
  const greeting = PERSONA_GREETINGS[persona] ?? PERSONA_GREETINGS['NEED'];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace('http://localhost:3000', 'https://needai.unykorn.org') || 'https://needai.unykorn.org';

  const toEncoded = encodeURIComponent(to);
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" action="${appUrl}/api/voice/gather/?To=${toEncoded}" method="POST"
    speechTimeout="2" speechModel="experimental_conversations" language="en-US"
    hints="yes,no,claim,damage,HVAC,attorney,billing,insurance,emergency,help">
    <Say voice="${VOICE}" language="en-US">${escapeXml(greeting)}</Say>
  </Gather>
  <Redirect method="POST">${appUrl}/api/voice/?To=${toEncoded}</Redirect>
</Response>`;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateConversationId(seed: string) {
  return seed || `voice_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function getTenantId(campaign: string) {
  return `tenant_${campaign.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    let to = '';
    let from = '';
    let callSessionId = '';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      to = body.To ?? body.to ?? '';
      from = body.From ?? body.from ?? '';
      callSessionId = body.CallSessionId ?? body.call_session_id ?? body.CallControlId ?? body.call_control_id ?? '';
    } else {
      // application/x-www-form-urlencoded (standard TeXML callback)
      const text = await request.text();
      const params = new URLSearchParams(text);
      to = params.get('To') ?? params.get('to') ?? '';
      from = params.get('From') ?? params.get('from') ?? '';
      callSessionId = params.get('CallSessionId') ?? params.get('call_session_id') ?? params.get('CallControlId') ?? params.get('call_control_id') ?? '';
    }

    // Also handle query param for redirects
    if (!to) {
      to = request.nextUrl.searchParams.get('To') ?? '';
    }
    if (!callSessionId) {
      callSessionId = request.nextUrl.searchParams.get('CallSessionId') ?? '';
    }

    const routing = resolvePersonaPack(to);
    const conversationId = generateConversationId(callSessionId);
    const tenantId = getTenantId(routing.campaign);
    const persona = routing.persona;

    upsertThread({
      id: conversationId,
      tenantId,
      channel: 'voice',
      status: 'active',
      persona,
      packId: routing.packId,
      numberId: routing.numberConfig?.id,
      lastInboundAt: new Date().toISOString(),
      collectedFields: {
        campaign: routing.campaign,
        toNumber: routing.digits,
        ...(from ? { fromNumber: from } : {}),
      },
      messages: [],
    });

    addDeliveryLog({
      tenantId,
      conversationId,
      channel: 'voice',
      direction: 'inbound',
      provider: 'telnyx',
      status: 'initiated',
      persona,
      packId: routing.packId,
      toNumber: to,
      fromNumber: from,
      messageSummary: 'Inbound voice call initiated',
      externalId: callSessionId || undefined,
    });

    const texml = buildTexml(persona, to);

    return new NextResponse(texml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[Voice] Error:', err);
    // Fallback TeXML so call doesn't just go silent
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${VOICE}" language="en-US">Thank you for calling. Please hold while we connect you.</Say>
  <Pause length="2"/>
  <Say voice="${VOICE}" language="en-US">We are experiencing a brief technical issue. Please call back in a moment.</Say>
  <Hangup/>
</Response>`;
    return new NextResponse(fallback, {
      status: 200,
      headers: { 'Content-Type': 'text/xml; charset=utf-8' },
    });
  }
}

// Allow GET for quick browser testing
export async function GET(request: NextRequest) {
  const to = request.nextUrl.searchParams.get('To') ?? '+18448516334';
  const persona = resolvePersonaPack(to).persona;
  const texml = buildTexml(persona, to);
  return new NextResponse(texml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml; charset=utf-8' },
  });
}

import { NextRequest, NextResponse } from 'next/server';
import { routeCall } from '@/lib/routing/engine';
import { resolvePersonaPack } from '@/lib/comms/routing';
import { executeRuntime } from '@/lib/comms/runtime';
import { addDeliveryLog, addFailure, addWebhookEvent, getThreads, upsertThread } from '@/lib/comms/store';

export const dynamic = 'force-dynamic';

/**
 * Telnyx Webhook Handler
 * 
 * Receives incoming call events from Telnyx and routes them to appropriate AI personas
 * based on the dialed number and weather conditions.
 * 
 * Webhook URL: https://yourdomain.com/api/telnyx-webhook
 */

interface TelnyxEvent {
  data: {
    event_type: string;
    id: string;
    occurred_at: string;
    payload: {
      call_control_id?: string;
      call_leg_id?: string;
      call_session_id?: string;
      client_state?: string;
      connection_id?: string;
      direction?: 'incoming' | 'outgoing';
      from?: { phone_number?: string } | string;
      to?: Array<{ phone_number?: string }> | string;
      state?: string;
      text?: string;
      id?: string;
      record_type?: string;
    };
  };
  meta?: {
    attempt: number;
    delivered_to: string;
  };
}

function getTenantId(campaign: string) {
  return `tenant_${campaign.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
}

function summarizePayload(payload: TelnyxEvent['data']['payload']) {
  const from = getPhoneNumber(payload.from) ?? (typeof payload.from === 'string' ? payload.from : 'unknown');
  const to = getPhoneNumber(payload.to) ?? (typeof payload.to === 'string' ? payload.to : 'unknown');
  const session = payload.call_session_id ?? payload.id ?? 'unknown';
  return `session=${session} from=${from} to=${to} state=${payload.state ?? payload.record_type ?? 'unknown'}`;
}

function getPhoneNumber(value: unknown): string | undefined {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    const first = value[0] as { phone_number?: string } | undefined;
    return first?.phone_number;
  }
  if (typeof value === 'object' && value !== null) {
    return (value as { phone_number?: string }).phone_number;
  }
  return undefined;
}

export async function POST(request: NextRequest) {
  try {
    const event: TelnyxEvent = await request.json();
    const eventType = event.data.event_type;
    const payload = event.data.payload;

    addWebhookEvent({
      provider: 'telnyx',
      eventType,
      payloadSummary: summarizePayload(payload),
    });

    console.log(`[Telnyx Webhook] Event: ${eventType}, Ref: ${payload.call_session_id ?? payload.id ?? event.data.id}`);

    // Handle different event types
    switch (eventType) {
      case 'call.initiated':
        return handleCallInitiated(event);
      
      case 'call.answered':
        return handleCallAnswered(event);
      
      case 'call.hangup':
        return handleCallHangup(event);
      
      case 'call.machine.detection.ended':
        return handleMachineDetection(event);

      case 'message.received':
      case 'message.received.telco':
        return handleMessageReceived(event);

      case 'message.finalized':
      case 'message.sent':
      case 'message.delivered':
        return handleMessageLifecycle(event);
      
      default:
        console.log(`[Telnyx Webhook] Unhandled event type: ${eventType}`);
        return NextResponse.json({ received: true }, { status: 200 });
    }
  } catch (error) {
    console.error('[Telnyx Webhook] Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleCallInitiated(event: TelnyxEvent) {
  const { payload } = event.data;
  const toNumber = getPhoneNumber(payload.to) ?? '';
  const fromNumber = getPhoneNumber(payload.from) ?? '';
  const callSessionId = payload.call_session_id ?? payload.id ?? `voice_${Date.now()}`;
  const callControlId = payload.call_control_id;

  if (!toNumber || !callControlId) {
    addFailure({
      tenantId: 'tenant_need',
      conversationId: callSessionId,
      channel: 'voice',
      provider: 'telnyx',
      reason: 'call_payload_invalid',
      detail: 'Missing required call routing fields for call.initiated',
    });
    return NextResponse.json({ received: true, ignored: true }, { status: 200 });
  }

  const routing = resolvePersonaPack(toNumber);
  const tenantId = getTenantId(routing.campaign);

  console.log(`[Call Initiated] From: ${fromNumber}, To: ${routing.digits}`);

  try {
    const legacyRouting = routeCall(routing.digits);

    console.log(`[Call Initiated] Routed to persona: ${routing.persona}`);

    upsertThread({
      id: callSessionId,
      tenantId,
      channel: 'voice',
      status: 'active',
      persona: routing.persona,
      packId: routing.packId,
      numberId: routing.numberConfig?.id,
      lastInboundAt: event.data.occurred_at,
      collectedFields: {
        callControlId,
        fromNumber,
        toNumber,
        campaign: routing.campaign,
      },
      messages: [],
    });

    addDeliveryLog({
      tenantId,
      conversationId: callSessionId,
      channel: 'voice',
      direction: 'inbound',
      provider: 'telnyx',
      status: 'initiated',
      persona: routing.persona,
      packId: routing.packId,
      toNumber,
      fromNumber,
      messageSummary: 'Telnyx webhook call initiated',
      externalId: callSessionId,
    });

    await answerCall(callControlId, {
      persona: routing.persona,
      number: routing.digits,
      packId: routing.packId,
      campaign: routing.campaign,
      active: legacyRouting?.active ?? true,
    });

    return NextResponse.json({
      received: true,
      persona: routing.persona,
      action: 'answered',
    });
  } catch (error) {
    console.error('[Call Initiated] Error:', error);
    return NextResponse.json({ error: 'Routing failed' }, { status: 500 });
  }
}

async function handleCallAnswered(event: TelnyxEvent) {
  const { payload } = event.data;
  const toNumber = getPhoneNumber(payload.to) ?? '';
  const fromNumber = getPhoneNumber(payload.from) ?? '';
  const callSessionId = payload.call_session_id ?? payload.id ?? `voice_${Date.now()}`;
  const routing = resolvePersonaPack(toNumber);
  const tenantId = getTenantId(routing.campaign);
  console.log(`[Call Answered] Session: ${callSessionId}`);

  upsertThread({
    id: callSessionId,
    tenantId,
    channel: 'voice',
    status: 'active',
    persona: routing.persona,
    packId: routing.packId,
    numberId: routing.numberConfig?.id,
    lastInboundAt: event.data.occurred_at,
    collectedFields: {
      callControlId: payload.call_control_id ?? '',
      fromNumber,
      toNumber,
      callState: payload.state ?? 'answered',
    },
    messages: [],
  });

  addDeliveryLog({
    tenantId,
    conversationId: callSessionId,
    channel: 'voice',
    direction: 'inbound',
    provider: 'telnyx',
    status: 'answered',
    persona: routing.persona,
    packId: routing.packId,
    toNumber,
    fromNumber,
    messageSummary: 'Call answered by NeedAI voice flow',
    externalId: callSessionId,
  });

  return NextResponse.json({ received: true });
}

async function handleCallHangup(event: TelnyxEvent) {
  const { payload } = event.data;
  const toNumber = getPhoneNumber(payload.to) ?? '';
  const fromNumber = getPhoneNumber(payload.from) ?? '';
  const callSessionId = payload.call_session_id ?? payload.id ?? `voice_${Date.now()}`;
  const routing = resolvePersonaPack(toNumber);
  const tenantId = getTenantId(routing.campaign);
  console.log(`[Call Hangup] Session: ${callSessionId}`);

  upsertThread({
    id: callSessionId,
    tenantId,
    channel: 'voice',
    status: 'closed',
    persona: routing.persona,
    packId: routing.packId,
    numberId: routing.numberConfig?.id,
    lastInboundAt: event.data.occurred_at,
    collectedFields: {
      callControlId: payload.call_control_id ?? '',
      fromNumber,
      toNumber,
      callState: payload.state ?? 'hangup',
    },
    messages: [],
  });

  addDeliveryLog({
    tenantId,
    conversationId: callSessionId,
    channel: 'voice',
    direction: 'inbound',
    provider: 'telnyx',
    status: 'completed',
    persona: routing.persona,
    packId: routing.packId,
    toNumber,
    fromNumber,
    messageSummary: 'Call ended',
    externalId: callSessionId,
  });

  return NextResponse.json({ received: true });
}

async function handleMachineDetection(event: TelnyxEvent) {
  const { payload } = event.data;
  const toNumber = getPhoneNumber(payload.to) ?? '';
  const callSessionId = payload.call_session_id ?? payload.id ?? `voice_${Date.now()}`;
  const routing = resolvePersonaPack(toNumber);
  const tenantId = getTenantId(routing.campaign);
  console.log(`[Machine Detection] Session: ${callSessionId}`);

  addFailure({
    tenantId,
    conversationId: callSessionId,
    channel: 'voice',
    provider: 'telnyx',
    reason: 'machine_detected',
    detail: `Machine detection ended for ${toNumber || 'unknown target'}`,
  });

  return NextResponse.json({ received: true });
}

async function handleMessageReceived(event: TelnyxEvent) {
  const payload = event.data.payload;
  const fromNumber = getPhoneNumber(payload.from);
  const toNumber = getPhoneNumber(payload.to);
  const inboundText = String(payload.text ?? '').trim();

  if (!fromNumber || !toNumber || !inboundText) {
    addFailure({
      tenantId: 'tenant_need',
      channel: 'sms',
      provider: 'telnyx',
      reason: 'sms_payload_invalid',
      detail: 'Missing from/to/text in Telnyx message payload',
    });
    return NextResponse.json({ received: true, ignored: true }, { status: 200 });
  }

  const routing = resolvePersonaPack(toNumber);
  const tenantId = getTenantId(routing.campaign);
  const conversationId = String(payload.id ?? event.data.id ?? `${fromNumber}_${toNumber}`);
  const existingThread = getThreads().find((thread) => thread.id === conversationId);

  addDeliveryLog({
    tenantId,
    conversationId,
    channel: 'sms',
    direction: 'inbound',
    provider: 'telnyx',
    status: 'received',
    persona: routing.persona,
    packId: routing.packId,
    toNumber,
    fromNumber,
    messageSummary: inboundText.slice(0, 160),
    externalId: String(payload.id ?? event.data.id),
  });

  const runtimeResult = await executeRuntime({
    tenantId,
    conversationId,
    channel: 'sms',
    persona: routing.persona,
    packId: routing.packId,
    callerInput: inboundText,
    conversationHistory: (existingThread?.messages ?? []).slice(-10).map((entry) => ({ role: entry.role, content: entry.content })),
    toNumber,
    fromNumber,
  });

  if (!runtimeResult.ok) {
    addFailure({
      tenantId,
      conversationId,
      channel: 'sms',
      provider: 'telnyx',
      reason: 'runtime_response_unavailable',
      detail: 'Runtime failed to generate SMS response',
    });
    return NextResponse.json({ received: true, escalated: true }, { status: 200 });
  }

  const sent = await sendSmsReply({
    toNumber: fromNumber,
    fromNumber: toNumber,
    text: runtimeResult.message,
    tenantId,
    conversationId,
    persona: routing.persona,
    packId: routing.packId,
  });

  if (!sent.ok) {
    return NextResponse.json({ received: true, sent: false, escalated: true }, { status: 200 });
  }

  upsertThread({
    id: conversationId,
    tenantId,
    channel: 'sms',
    status: runtimeResult.escalate ? 'escalated' : 'active',
    persona: routing.persona,
    packId: routing.packId,
    numberId: routing.numberConfig?.id,
    lastInboundAt: event.data.occurred_at,
    lastOutboundAt: new Date().toISOString(),
    collectedFields: {
      fromNumber,
      toNumber,
      campaign: routing.campaign,
    },
    messages: [
      ...((existingThread?.messages ?? []).slice(-10)),
      { role: 'user' as const, content: inboundText, timestamp: new Date().toISOString() },
      { role: 'assistant' as const, content: runtimeResult.message, timestamp: new Date().toISOString() },
    ].slice(-12),
  });

  return NextResponse.json({
    received: true,
    sent: true,
    persona: routing.persona,
    confidence: runtimeResult.confidence,
    approvalRequired: runtimeResult.approvalRequired,
  });
}

async function handleMessageLifecycle(event: TelnyxEvent) {
  const payload = event.data.payload;
  const fromNumber = getPhoneNumber(payload.from);
  const toNumber = getPhoneNumber(payload.to);
  const routing = resolvePersonaPack(toNumber ?? fromNumber ?? '');
  const tenantId = getTenantId(routing.campaign);

  addDeliveryLog({
    tenantId,
    conversationId: String(payload.id ?? event.data.id),
    channel: 'sms',
    direction: 'outbound',
    provider: 'telnyx',
    status: event.data.event_type,
    persona: routing.persona,
    packId: routing.packId,
    toNumber: toNumber ?? 'unknown',
    fromNumber: fromNumber,
    messageSummary: String(payload.text ?? '').slice(0, 160) || 'SMS lifecycle update',
    externalId: String(payload.id ?? event.data.id),
  });

  return NextResponse.json({ received: true });
}

async function sendSmsReply(args: {
  toNumber: string;
  fromNumber: string;
  text: string;
  tenantId: string;
  conversationId: string;
  persona: string;
  packId: string;
}) {
  const telnyxApiKey = process.env.TELNYX_API_KEY;
  if (!telnyxApiKey) {
    addFailure({
      tenantId: args.tenantId,
      conversationId: args.conversationId,
      channel: 'sms',
      provider: 'telnyx',
      reason: 'sms_send_unconfigured',
      detail: 'TELNYX_API_KEY missing',
    });
    return { ok: false as const };
  }

  const response = await fetch('https://api.telnyx.com/v2/messages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${telnyxApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: args.toNumber,
      from: args.fromNumber,
      text: args.text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    addFailure({
      tenantId: args.tenantId,
      conversationId: args.conversationId,
      channel: 'sms',
      provider: 'telnyx',
      reason: 'sms_send_failed',
      detail,
    });
    addDeliveryLog({
      tenantId: args.tenantId,
      conversationId: args.conversationId,
      channel: 'sms',
      direction: 'outbound',
      provider: 'telnyx',
      status: 'failed',
      persona: args.persona,
      packId: args.packId,
      toNumber: args.toNumber,
      fromNumber: args.fromNumber,
      messageSummary: args.text.slice(0, 160),
    });
    return { ok: false as const };
  }

  const json = await response.json().catch(() => ({} as { data?: { id?: string } }));
  addDeliveryLog({
    tenantId: args.tenantId,
    conversationId: args.conversationId,
    channel: 'sms',
    direction: 'outbound',
    provider: 'telnyx',
    status: 'sent',
    persona: args.persona,
    packId: args.packId,
    toNumber: args.toNumber,
    fromNumber: args.fromNumber,
    messageSummary: args.text.slice(0, 160),
    externalId: json?.data?.id,
  });

  return { ok: true as const };
}

async function answerCall(callControlId: string, routing: any) {
  const telnyxApiKey = process.env.TELNYX_API_KEY;

  if (!telnyxApiKey) {
    throw new Error('TELNYX_API_KEY not configured');
  }

  // Answer the call with Telnyx API
  const response = await fetch(`https://api.telnyx.com/v2/calls/${callControlId}/actions/answer`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${telnyxApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_state: Buffer.from(JSON.stringify({
        persona: routing.persona,
        number: routing.number,
        timestamp: new Date().toISOString()
      })).toString('base64')
    })
  });

  if (!response.ok) {
    const error = await response.text();
    addFailure({
      tenantId: `tenant_${String(routing.campaign ?? 'need').toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
      channel: 'voice',
      provider: 'telnyx',
      reason: 'answer_call_failed',
      detail: error,
    });
    throw new Error(`Failed to answer call: ${error}`);
  }

  // Optionally: Connect to AI assistant
  // This would use Telnyx AI capabilities or forward to your AI system
  console.log(`[Answer Call] Successfully answered call, persona: ${routing.persona}`);

  return response.json();
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'telnyx-webhook',
    timestamp: new Date().toISOString()
  });
}

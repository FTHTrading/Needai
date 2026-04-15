import { NextRequest, NextResponse } from 'next/server';
import { resolvePersonaPack } from '@/lib/comms/routing';
import { addDeliveryLog } from '@/lib/comms/store';
import { executeRuntime } from '@/lib/comms/runtime';

export const dynamic = 'force-dynamic';

const VOICE = 'Polly.Joanna-Neural';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateConversationId(seed: string, to: string): string {
  return seed || `voice_${to.replace(/\D/g, '')}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function getTenantId(campaign: string) {
  return `tenant_${campaign.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    let speechResult = '';
    let to = '';
    let from = '';
    let clientState = '';
    let callSessionId = '';

    const urlTo = request.nextUrl.searchParams.get('To') ?? '';
    const urlCallSessionId = request.nextUrl.searchParams.get('CallSessionId') ?? '';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      speechResult = body.SpeechResult ?? body.speechResult ?? '';
      to = body.To ?? body.to ?? urlTo;
      from = body.From ?? body.from ?? '';
      clientState = body.ClientState ?? body.clientState ?? '';
      callSessionId = body.CallSessionId ?? body.call_session_id ?? body.CallControlId ?? body.call_control_id ?? urlCallSessionId;
    } else {
      const text = await request.text();
      const params = new URLSearchParams(text);
      speechResult = params.get('SpeechResult') ?? '';
      to = params.get('To') ?? urlTo;
      from = params.get('From') ?? params.get('from') ?? '';
      clientState = params.get('ClientState') ?? '';
      callSessionId = params.get('CallSessionId') ?? params.get('call_session_id') ?? params.get('CallControlId') ?? params.get('call_control_id') ?? urlCallSessionId;
    }

    const routing = resolvePersonaPack(to);
    const persona = routing.persona;
    const conversationId = generateConversationId(callSessionId, to);
    const tenantId = getTenantId(routing.campaign);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace('http://localhost:3000', 'https://needai.unykorn.org') || 'https://needai.unykorn.org';

    // Parse conversation history from ClientState (base64 JSON)
    let conversationHistory: Array<{role: 'user' | 'assistant'; content: string}> = [];
    try {
      if (clientState) {
        const decoded = Buffer.from(clientState, 'base64').toString('utf8');
        conversationHistory = JSON.parse(decoded) as Array<{role: 'user' | 'assistant'; content: string}>;
      }
    } catch { /* fresh conversation */ }

    if (speechResult) {
      addDeliveryLog({
        tenantId,
        conversationId,
        channel: 'voice',
        direction: 'inbound',
        provider: 'telnyx',
        status: 'received',
        persona,
        packId: routing.packId,
        toNumber: to,
        fromNumber: from,
        messageSummary: speechResult.slice(0, 160),
        externalId: callSessionId || undefined,
      });
    }

    const runtimeResult = speechResult
      ? await executeRuntime({
          tenantId,
          conversationId,
          channel: 'voice',
          persona,
          packId: routing.packId,
          callerInput: speechResult,
          conversationHistory,
          toNumber: to,
          fromNumber: from,
        })
      : {
          ok: true,
          message: "I didn't catch anything. What can I help you with today?",
          confidence: 0.3,
          approvalRequired: false,
          escalate: false,
          structured: {
            intent: 'reprompt',
            summary: 'No speech captured',
            nextAction: 'continue_conversation',
          },
        };

    const aiResponse = runtimeResult.message;

    // Add AI response to history (keep last 6 turns to stay within limits)
    if (speechResult) {
      conversationHistory.push({ role: 'user', content: speechResult });
    }
    conversationHistory.push({ role: 'assistant', content: aiResponse });
    if (conversationHistory.length > 6) {
      conversationHistory = conversationHistory.slice(-6);
    }

    const newClientState = Buffer.from(JSON.stringify(conversationHistory)).toString('base64');
    const safeClientState = escapeXml(newClientState);
    const toEncoded = encodeURIComponent(to);

    // Detect if conversation should end (collected enough info)
    const shouldEnd = aiResponse.toLowerCase().includes('goodbye') ||
                      aiResponse.toLowerCase().includes('have a great') ||
                      aiResponse.toLowerCase().includes('take care') ||
                      runtimeResult.approvalRequired ||
                      runtimeResult.escalate ||
                      runtimeResult.structured.nextAction === 'manual_review' ||
                      runtimeResult.structured.nextAction === 'manual_follow_up' ||
                      conversationHistory.length >= 12;

    const texml = shouldEnd
      ? `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${VOICE}" language="en-US">${escapeXml(aiResponse)}</Say>
  <Hangup/>
</Response>`
      : `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${VOICE}" language="en-US">${escapeXml(aiResponse)}</Say>
  <Gather input="speech" action="${appUrl}/api/voice/gather/?To=${toEncoded}&CallSessionId=${encodeURIComponent(callSessionId)}" method="POST"
    speechTimeout="2" speechModel="experimental_conversations" language="en-US"
    clientState="${safeClientState}">
    <Say voice="${VOICE}" language="en-US">Go ahead.</Say>
  </Gather>
  <Redirect method="POST">${appUrl}/api/voice/?To=${toEncoded}</Redirect>
</Response>`;

    return new NextResponse(texml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[Gather] Error:', err);
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${VOICE}" language="en-US">I'm sorry, I'm having a brief connection issue. Please stay on the line.</Say>
  <Pause length="2"/>
  <Say voice="${VOICE}" language="en-US">Thank you for your patience. A specialist will follow up with you shortly. Goodbye.</Say>
  <Hangup/>
</Response>`;
    return new NextResponse(fallback, {
      status: 200,
      headers: { 'Content-Type': 'text/xml; charset=utf-8' },
    });
  }
}

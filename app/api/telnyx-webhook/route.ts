import { NextRequest, NextResponse } from 'next/server';
import { routeCall } from '@/lib/routing/engine';

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
      call_control_id: string;
      call_leg_id: string;
      call_session_id: string;
      client_state?: string;
      connection_id: string;
      direction: 'incoming' | 'outgoing';
      from: string;
      to: string;
      state?: string;
    };
  };
  meta?: {
    attempt: number;
    delivered_to: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const event: TelnyxEvent = await request.json();
    const eventType = event.data.event_type;
    const payload = event.data.payload;

    console.log(`[Telnyx Webhook] Event: ${eventType}, Call: ${payload.call_session_id}`);

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
  const dialedNumber = payload.to.replace(/^\+1/, ''); // Remove +1 prefix

  console.log(`[Call Initiated] From: ${payload.from}, To: ${dialedNumber}`);

  try {
    // Route the call based on the dialed number
    const routing = routeCall(dialedNumber);

    if (!routing) {
      console.error(`[Call Initiated] No routing found for number: ${dialedNumber}`);
      return NextResponse.json({
        error: 'Number not configured',
        number: dialedNumber
      }, { status: 404 });
    }

    console.log(`[Call Initiated] Routed to persona: ${routing.persona}`);

    // Answer the call and connect to AI assistant
    await answerCall(payload.call_control_id, routing);

    return NextResponse.json({ 
      received: true, 
      persona: routing.persona,
      action: 'answered'
    });
  } catch (error) {
    console.error('[Call Initiated] Error:', error);
    return NextResponse.json({ error: 'Routing failed' }, { status: 500 });
  }
}

async function handleCallAnswered(event: TelnyxEvent) {
  const { payload } = event.data;
  console.log(`[Call Answered] Session: ${payload.call_session_id}`);

  // Log call answered event (could save to database here)
  return NextResponse.json({ received: true });
}

async function handleCallHangup(event: TelnyxEvent) {
  const { payload } = event.data;
  console.log(`[Call Hangup] Session: ${payload.call_session_id}`);

  // Log call completion (could save call metrics to database here)
  return NextResponse.json({ received: true });
}

async function handleMachineDetection(event: TelnyxEvent) {
  const { payload } = event.data;
  console.log(`[Machine Detection] Session: ${payload.call_session_id}`);

  // Handle answering machine detection
  return NextResponse.json({ received: true });
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

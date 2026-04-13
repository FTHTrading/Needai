import { NextRequest, NextResponse } from 'next/server';
import { personaRunner } from '../../../lib/engine/persona-runner';
import { NUMBER_TO_PERSONA } from '../../../lib/routing/engine';
import { 
  verifyTelnyxSignature, 
  isSignatureVerificationEnabled 
} from '../../../lib/telephony/telnyx-signature';

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const ELEVEN_API_KEY = process.env.ELEVEN_API_KEY;
const TELNYX_PUBLIC_KEY = process.env.TELNYX_PUBLIC_KEY;

export async function POST(request: NextRequest) {
  try {
    // ═══════════════════════════════════════════════════════════════════
    // ED25519 SIGNATURE VERIFICATION - MUST PASS BEFORE ANY ROUTING
    // ═══════════════════════════════════════════════════════════════════
    
    // Clone request to read body as both Buffer and JSON
    const rawBody = await request.clone().arrayBuffer();
    const bodyBuffer = Buffer.from(rawBody);
    
    // Extract signature headers
    const signatureHeader = request.headers.get('telnyx-signature-ed25519') || '';
    const timestampHeader = request.headers.get('telnyx-timestamp') || '';
    
    // Verify signature if enabled (fail closed)
    if (isSignatureVerificationEnabled()) {
      const verification = verifyTelnyxSignature(
        TELNYX_PUBLIC_KEY || '',
        bodyBuffer,
        signatureHeader,
        timestampHeader
      );
      
      if (!verification.valid) {
        console.error('[SECURITY] Telnyx signature verification FAILED:', verification.reason);
        console.error('[SECURITY] Headers:', { 
          signature: signatureHeader ? `${signatureHeader.slice(0, 20)}...` : 'missing',
          timestamp: timestampHeader || 'missing',
        });
        
        // Log security event
        logSecurityEvent({
          type: 'signature_verification_failed',
          reason: verification.reason,
          timestampSkew: verification.timestampSkewSeconds,
          ip: request.headers.get('x-forwarded-for') || 'unknown',
          timestamp: new Date().toISOString(),
        });
        
        return NextResponse.json(
          { error: 'Invalid signature' }, 
          { status: 401 }
        );
      }
      
      console.log('[SECURITY] Signature verified | Skew:', verification.timestampSkewSeconds, 's');
    } else {
      // Log warning if verification is disabled in production
      if (process.env.NODE_ENV === 'production') {
        console.warn('[SECURITY] WARNING: Signature verification disabled in production!');
      }
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // SIGNATURE PASSED - PROCEED WITH NORMAL ROUTING
    // ═══════════════════════════════════════════════════════════════════
    
    const body = JSON.parse(bodyBuffer.toString('utf-8'));
    const { event_type, payload } = body.data || body;

    console.log('Telnyx Webhook received:', event_type, payload);

    switch (event_type) {
      case 'call.initiated':
        return await handleCallInitiated(payload);
      case 'call.answered':
        return await handleCallAnswered(payload);
      case 'call.hangup':
        return await handleCallHangup(payload);
      case 'message.received':
        return await handleMessageReceived(payload);
      case 'gather.ended':
        return await handleSpeechReceived(payload);
      default:
        console.log('Unhandled event type:', event_type);
        return NextResponse.json({ status: 'ok' });
    }
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Security event logging
function logSecurityEvent(event: {
  type: string;
  reason?: string;
  timestampSkew?: number;
  ip: string;
  timestamp: string;
}): void {
  // In production, this would write to a secure audit log
  // For now, log to console with clear security prefix
  console.log('[SECURITY AUDIT]', JSON.stringify(event));
}

async function handleCallInitiated(payload: any) {
  const { to, from, call_control_id } = payload;

  // Clean the phone number
  const incomingNumber = to.replace(/^\+1/, '');
  const callerNumber = from.replace(/^\+1/, '');

  console.log(`Call initiated to ${incomingNumber} from ${callerNumber}`);

  // Determine persona from incoming number
  const persona = (NUMBER_TO_PERSONA as any)[incomingNumber] || 'NEED';

  console.log(`Routing to persona: ${persona}`);

  // Get initial greeting from persona runner
  const initialResponse = await personaRunner.processMessage({
    persona,
    message: 'CALL_INITIATED', // Special message to indicate call start
    callerId: callerNumber,
    callId: call_control_id,
    source: 'call'
  });

  const greeting = getGreetingForPersona(persona, initialResponse.text);
  const commands: any[] = [
    {
      type: 'answer',
      client_state: JSON.stringify({
        sessionId: initialResponse.metadata.sessionId,
        persona,
        call_state: 'answered',
        turn_count: initialResponse.metadata.turnCount
      })
    }
  ];

  // If Eleven Labs is configured and we have a public URL, prefer sending a play command
  if (ELEVEN_API_KEY && NEXT_PUBLIC_APP_URL) {
    const audioUrl = `${NEXT_PUBLIC_APP_URL.replace(/\/$/, '')}/api/eleven-tts?text=${encodeURIComponent(greeting)}`;
    commands.push({ type: 'play', audio_url: audioUrl });
  }

  // Always include a speak fallback
  commands.push({
    type: 'speak',
    payload: greeting,
    voice: 'female',
    language: 'en-US'
  });

  // Gather for speech input
  commands.push({
    type: 'gather',
    payload: 'Please tell me how I can help you today.',
    voice: 'female',
    language: 'en-US',
    timeout: 15
  });

  return NextResponse.json({ commands });
}

async function handleCallAnswered(payload: any) {
  const { client_state } = payload;

  let sessionId, persona;
  try {
    const state = JSON.parse(client_state);
    sessionId = state.sessionId;
    persona = state.persona;
  } catch (error) {
    console.error('Error parsing client state:', error);
    persona = 'NEED';
  }

  console.log(`Call answered for ${persona} persona, session: ${sessionId}`);

  return NextResponse.json({ status: 'ok' });
}

async function handleCallHangup(payload: any) {
  const { call_control_id } = payload;

  console.log('Call hangup:', call_control_id);

  // Log call completion, update metrics, etc.

  return NextResponse.json({ status: 'ok' });
}

async function handleMessageReceived(payload: any) {
  const { to, from, text } = payload;

  const incomingNumber = to.replace(/^\+1/, '');
  const senderNumber = from.replace(/^\+1/, '');

  console.log(`SMS received to ${incomingNumber} from ${senderNumber}: ${text}`);

  // Determine persona from incoming number
  const persona = (NUMBER_TO_PERSONA as any)[incomingNumber] || 'NEED';

  // Process message through persona runner
  const response = await personaRunner.processMessage({
    persona,
    message: text,
    callerId: senderNumber,
    messageId: payload.id,
    source: 'sms'
  });

  // Send response SMS
  return NextResponse.json({
    commands: [
      {
        type: 'send_sms',
        to: senderNumber,
        from: incomingNumber,
        body: response.text
      }
    ]
  });
}

async function handleSpeechReceived(payload: any) {
  const { call_control_id, client_state, transcript } = payload;

  let sessionId, persona;
  try {
    const state = JSON.parse(client_state);
    sessionId = state.sessionId;
    persona = state.persona;
  } catch (error) {
    console.error('Error parsing client state:', error);
    persona = 'NEED';
  }

  console.log(`Speech received for ${persona} persona, session: ${sessionId}: ${transcript}`);

  if (!transcript) {
    // No speech detected, ask again
    return NextResponse.json({
      commands: [
        {
          type: 'speak',
          payload: 'I\'m sorry, I didn\'t catch that. Could you please repeat what you said?',
          voice: 'female',
          language: 'en-US'
        },
        {
          type: 'gather',
          payload: 'Please tell me how I can help you.',
          voice: 'female',
          language: 'en-US',
          timeout: 15
        }
      ]
    });
  }

  // Process speech through persona runner
  const response = await personaRunner.processMessage({
    sessionId,
    persona,
    message: transcript,
    callId: call_control_id,
    source: 'call'
  });

  // Determine next action based on response
  const commands = [];

  // Speak the response
  if (ELEVEN_API_KEY && NEXT_PUBLIC_APP_URL) {
    const audioUrl = `${NEXT_PUBLIC_APP_URL.replace(/\/$/, '')}/api/eleven-tts?text=${encodeURIComponent(response.text)}`;
    commands.push({ type: 'play', audio_url: audioUrl });
  }

  // Fallback speak
  commands.push({
    type: 'speak',
    payload: response.text,
    voice: 'female',
    language: 'en-US'
  });

  // If conversation is complete or should escalate, hang up
  if (response.metadata.isComplete || response.metadata.shouldEscalate) {
    commands.push({
      type: 'hangup'
    });
  } else {
    // Continue gathering input
    commands.push({
      type: 'gather',
      payload: 'Is there anything else I can help you with?',
      voice: 'female',
      language: 'en-US',
        timeout: 15
    });
  }

  return NextResponse.json({
    commands,
    client_state: JSON.stringify({
      sessionId: response.metadata.sessionId,
      persona,
      turn_count: response.metadata.turnCount
    })
  });
}

function getGreetingForPersona(persona: string, customMessage?: string): string {
  if (customMessage) return customMessage;

  const greetings: { [key: string]: string } = {
    'STORM': 'Hello, this is the Storm Damage Response Line. I understand you may be dealing with property damage from recent weather events. How can I help you today?',
    'HAIL': 'Hello, this is the Hail Damage Assessment Line. I specialize in helping with hail damage to roofs and vehicles. What can I assist you with?',
    'HVAC': 'Hello, this is the HVAC Service Line. Whether you need emergency repairs or scheduled maintenance, I\'m here to help. What\'s the issue?',
    'CLAIMS': 'Hello, this is the Insurance Claims Support Line. I can help you file a claim, check status, or answer any questions about your coverage.',
    'LAW': 'Hello, this is the Legal Services Intake Line. I can help assess your legal needs and connect you with the right attorney. What type of legal matter brings you here?',
    'MONEY': 'Hello, this is the Financial Services Center. How can I help you with your banking and financial needs today?',
    'NEED': 'Hello, this is the Universal Service Line. I handle everything from home repairs to insurance claims to legal services. What do you need help with?'
  };

  return greetings[persona] || greetings['NEED'];
}

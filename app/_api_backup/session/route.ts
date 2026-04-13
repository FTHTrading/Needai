import { NextRequest, NextResponse } from 'next/server';
import { personaRunner } from '@/lib/engine/persona-runner';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const session = await personaRunner.getSessionStatus(sessionId);
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const conversationState = await personaRunner.getConversationState(sessionId);

    return NextResponse.json({
      session,
      conversationState
    });
  } catch (error) {
    console.error('Session API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      persona,
      message,
      callerId,
      callId,
      messageId,
      source = 'web',
      weatherContext,
      location
    } = body;

    // Validate required fields
    if (!persona && !sessionId) {
      return NextResponse.json({ error: 'Either persona or sessionId is required' }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // If no sessionId provided, determine persona from routing logic
    let targetPersona = persona;
    if (!targetPersona && callerId) {
      // This would use your routing logic to determine persona
      targetPersona = 'NEED'; // Default fallback
    }

    if (!targetPersona) {
      return NextResponse.json({ error: 'Could not determine target persona' }, { status: 400 });
    }

    // Process the message through the persona runner
    const response = await personaRunner.processMessage({
      sessionId,
      persona: targetPersona,
      message,
      callerId,
      callId,
      messageId,
      source,
      weatherContext,
      location
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Session processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const action = searchParams.get('action'); // 'expire', 'complete', 'escalate'

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const { sessionManager } = await import('@/lib/engine/session');

    switch (action) {
      case 'expire':
        await sessionManager.expireSession(sessionId);
        break;
      case 'complete':
        await sessionManager.completeSession(sessionId);
        break;
      case 'escalate':
        await sessionManager.escalateSession(sessionId);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ success: true, action });
  } catch (error) {
    console.error('Session management error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

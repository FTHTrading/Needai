import { NextRequest, NextResponse } from 'next/server';
import { executeRuntime } from '@/lib/comms/runtime';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await executeRuntime({
    tenantId: body.tenantId ?? 'needai-core',
    conversationId: body.conversationId ?? `conv_${Date.now()}`,
    channel: body.channel ?? 'sms',
    persona: body.persona ?? 'NEED',
    packId: body.packId ?? 'need-pack',
    callerInput: body.callerInput ?? '',
    conversationHistory: body.conversationHistory ?? [],
    toNumber: body.toNumber ?? '',
    fromNumber: body.fromNumber,
  });
  return NextResponse.json(result, { status: result.ok ? 200 : 503 });
}

import { NextRequest, NextResponse } from 'next/server';
import { getPersonas, upsertPersona, writeNeedaiWorkspaceReports } from '@/lib/comms/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ personas: getPersonas() });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const record = upsertPersona({
    id: body.id ?? `persona_${String(body.persona ?? 'need').toLowerCase()}`,
    persona: body.persona ?? 'NEED',
    version: body.version ?? 'v1',
    channelSupport: body.channelSupport ?? ['voice', 'sms'],
    promptSummary: body.promptSummary ?? 'Shared communications persona',
    routingIntent: body.routingIntent ?? 'general_intake',
    active: body.active ?? true,
    updatedAt: new Date().toISOString(),
  });
  writeNeedaiWorkspaceReports();
  return NextResponse.json({ ok: true, persona: record }, { status: 201 });
}

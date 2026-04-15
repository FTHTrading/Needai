import { NextRequest, NextResponse } from 'next/server';
import { setNumberPackActive, writeNeedaiWorkspaceReports } from '@/lib/comms/store';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const record = setNumberPackActive(id, body.active !== false);
  if (!record) {
    return NextResponse.json({ error: 'Number pack not found' }, { status: 404 });
  }
  writeNeedaiWorkspaceReports();
  return NextResponse.json({ ok: true, numberPack: record });
}

import { NextRequest, NextResponse } from 'next/server';
import { approveAction, writeNeedaiWorkspaceReports } from '@/lib/comms/store';

export const dynamic = 'force-dynamic';

export async function POST(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = approveAction(id);
  if (!record) {
    return NextResponse.json({ error: 'Approval not found' }, { status: 404 });
  }
  writeNeedaiWorkspaceReports();
  return NextResponse.json({ ok: true, approval: record });
}

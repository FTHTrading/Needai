import { NextRequest, NextResponse } from 'next/server';
import { retryFailure, writeNeedaiWorkspaceReports } from '@/lib/comms/store';

export const dynamic = 'force-dynamic';

export async function POST(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = retryFailure(id);
  if (!record) {
    return NextResponse.json({ error: 'Failure not found' }, { status: 404 });
  }
  writeNeedaiWorkspaceReports();
  return NextResponse.json({ ok: true, failure: record });
}

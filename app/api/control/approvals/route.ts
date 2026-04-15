import { NextRequest, NextResponse } from 'next/server';
import { addApproval, getApprovals, writeNeedaiWorkspaceReports } from '@/lib/comms/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ approvals: getApprovals() });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const record = addApproval({
    tenantId: body.tenantId ?? 'needai-core',
    conversationId: body.conversationId,
    actionType: body.actionType ?? 'manual_request',
    reason: body.reason ?? 'Operator requested approval',
    payload: body.payload ?? {},
  });
  writeNeedaiWorkspaceReports();
  return NextResponse.json({ ok: true, approval: record }, { status: 201 });
}

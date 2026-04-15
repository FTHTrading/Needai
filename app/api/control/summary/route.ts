import { NextResponse } from 'next/server';
import { getControlCenterSummary } from '@/lib/comms/control-summary';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getControlCenterSummary());
}

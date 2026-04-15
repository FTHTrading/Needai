import { NextRequest, NextResponse } from 'next/server';
import { getDeliveryLogs } from '@/lib/comms/store';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const limit = Number(request.nextUrl.searchParams.get('limit') ?? '50');
  return NextResponse.json({ deliveryLogs: getDeliveryLogs().slice(0, limit) });
}

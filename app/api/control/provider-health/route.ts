import { NextResponse } from 'next/server';
import { getProviderHealth } from '@/lib/comms/provider-health';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ providers: await getProviderHealth() });
}

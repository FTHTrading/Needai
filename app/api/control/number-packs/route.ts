import { NextResponse } from 'next/server';
import { getNumberPacks } from '@/lib/comms/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ numberPacks: getNumberPacks() });
}

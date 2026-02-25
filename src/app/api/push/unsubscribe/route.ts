import { unsubscribeUser } from '@/app/actions/pwa';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { userId } = body as { userId?: string };
    const result = await unsubscribeUser(userId);
    return NextResponse.json(result);
  } catch (e) {
    console.error('Unsubscribe API failed:', e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

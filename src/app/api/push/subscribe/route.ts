import { subscribeUser } from '@/app/actions/pwa';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subscription, userId } = body as { subscription: unknown; userId?: string };
    if (!subscription || typeof subscription !== 'object') {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    const result = await subscribeUser(subscription, userId);
    return NextResponse.json(result);
  } catch (e) {
    console.error('Subscribe API failed:', e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

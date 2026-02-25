import { sendNotification } from '@/app/actions/pwa';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, notification } = body as {
      userId: string;
      notification: { title: string; body: string; icon?: string; url?: string };
    };
    if (!userId || !notification?.title || !notification?.body) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    const result = await sendNotification(userId, notification);
    return NextResponse.json(result);
  } catch (e) {
    console.error('Send notification API failed:', e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

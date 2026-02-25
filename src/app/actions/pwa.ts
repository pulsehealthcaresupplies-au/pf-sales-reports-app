import webpush from 'web-push';

const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;

if (publicKey && privateKey) {
  webpush.setVapidDetails('mailto:support@pulsehealthcare.com', publicKey, privateKey);
}

const subscriptions = new Map<string, any>();

export async function subscribeUser(
  subscription: any,
  userId?: string
): Promise<{ success: boolean }> {
  try {
    subscriptions.set(userId ?? 'anonymous', subscription);
    return { success: true };
  } catch (e) {
    console.error('Subscribe failed:', e);
    return { success: false };
  }
}

export async function unsubscribeUser(userId?: string): Promise<{ success: boolean }> {
  try {
    subscriptions.delete(userId ?? 'anonymous');
    return { success: true };
  } catch (e) {
    console.error('Unsubscribe failed:', e);
    return { success: false };
  }
}

export async function sendNotification(
  userId: string,
  notification: { title: string; body: string; icon?: string; url?: string }
): Promise<{ success: boolean }> {
  try {
    const sub = subscriptions.get(userId);
    if (!sub || !publicKey || !privateKey) return { success: false };
    await webpush.sendNotification(
      sub,
      JSON.stringify({
        title: notification.title,
        body: notification.body,
        icon: notification.icon || '/favicon.ico',
        url: notification.url || '/',
      })
    );
    return { success: true };
  } catch (e) {
    console.error('Send notification failed:', e);
    return { success: false };
  }
}

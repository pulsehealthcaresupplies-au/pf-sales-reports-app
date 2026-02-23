'use client';

import { useState, useEffect } from 'react';
import { subscribeUser, unsubscribeUser, sendNotification } from '@/app/actions/pwa';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const out = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) out[i] = rawData.charCodeAt(i);
  return out;
}

export function PushNotificationManager({ userId }: { userId?: string }) {
  const [supported, setSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setSupported(true);
      navigator.serviceWorker.ready.then((reg) => reg.pushManager.getSubscription().then(setSubscription));
    }
  }, []);

  async function subscribe() {
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!key) return;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(key) as BufferSource,
      });
      setSubscription(sub);
      await subscribeUser(JSON.parse(JSON.stringify(sub)), userId);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function unsubscribe() {
    setLoading(true);
    try {
      if (subscription) {
        await subscription.unsubscribe();
        setSubscription(null);
        await unsubscribeUser(userId);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function sendTest() {
    if (!subscription || !message.trim()) return;
    setLoading(true);
    try {
      await sendNotification(userId ?? 'anonymous', {
        title: 'Test',
        body: message,
        icon: '/favicon.ico',
        url: '/',
      });
      setMessage('');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (!supported) return <p className="text-sm text-muted-foreground">Push not supported.</p>;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Push Notifications</h3>
      {subscription ? (
        <>
          <p className="text-sm text-green-600">Subscribed.</p>
          <button
            type="button"
            onClick={unsubscribe}
            disabled={loading}
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 hover:bg-red-100"
          >
            Unsubscribe
          </button>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Test message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={sendTest}
              disabled={loading || !message.trim()}
              className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              Send test
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">Subscribe for push notifications.</p>
          <button
            type="button"
            onClick={subscribe}
            disabled={loading}
            className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            Subscribe
          </button>
        </>
      )}
    </div>
  );
}

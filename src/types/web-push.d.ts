declare module 'web-push' {
  interface RequestOptions {
    vapidDetails?: { subject: string; publicKey: string; privateKey: string };
    TTL?: number;
    urgency?: 'very-low' | 'low' | 'normal' | 'high';
    topic?: string;
  }
  function setVapidDetails(
    subject: string,
    publicKey: string,
    privateKey: string
  ): void;
  function sendNotification(
    subscription: PushSubscription | object,
    payload: string | Buffer,
    options?: RequestOptions
  ): Promise<{ statusCode: number }>;
}

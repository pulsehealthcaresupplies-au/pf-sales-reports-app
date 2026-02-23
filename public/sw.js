/**
 * Service Worker for PWA - push notifications.
 */
self.addEventListener('push', function (event) {
  if (!event.data) return;
  const data = event.data.json();
  const baseUrl = self.registration.scope.replace(/\/$/, '');
  const url = data.url ? (data.url.startsWith('/') ? baseUrl + data.url : data.url) : baseUrl + '/';
  const options = {
    body: data.body || 'New notification',
    icon: data.icon || '/favicon.ico',
    badge: data.icon || '/favicon.ico',
    vibrate: [100, 50, 100],
    data: { dateOfArrival: Date.now(), primaryKey: data.id || '1', url },
    tag: data.tag || 'default',
    requireInteraction: !!data.requireInteraction,
  };
  event.waitUntil(self.registration.showNotification(data.title || 'Pulse Sales', options));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || self.registration.scope || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      for (let i = 0; i < clientList.length; i++) {
        if (clientList[i].url === urlToOpen && 'focus' in clientList[i]) {
          return clientList[i].focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(urlToOpen);
    })
  );
});

'use client';

import { useEffect } from 'react';

export function PwaSwRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' }).catch(console.error);
    }
  }, []);
  return null;
}

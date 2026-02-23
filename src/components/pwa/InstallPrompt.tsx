'use client';

import { useState, useEffect } from 'react';

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [deferred, setDeferred] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);
      setStandalone(window.matchMedia('(display-mode: standalone)').matches);
    });
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  const onInstall = async () => {
    if (!deferred) return;
    deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === 'accepted') setShow(false);
    setDeferred(null);
  };

  if (standalone) return null;
  if (!show && !isIOS) return null;

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
      <h3 className="mb-2 text-lg font-semibold">Install app</h3>
      {isIOS ? (
        <p className="text-sm text-muted-foreground">Tap Share → &quot;Add to Home Screen&quot;</p>
      ) : (
        <>
          <p className="mb-2 text-sm text-muted-foreground">Install for a better experience.</p>
          <button
            type="button"
            onClick={onInstall}
            className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Install
          </button>
        </>
      )}
    </div>
  );
}

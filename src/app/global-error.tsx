'use client';

import { useEffect } from 'react';

/**
 * Global error boundary. Has its own <html>/<body>; does not use root layout.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.error('Global application error:', error);
    }
  }, [error]);

  if (typeof window === 'undefined') {
    return (
      <html lang="en">
        <body>
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md text-center">
              <h1 className="mb-2 text-2xl font-bold">Something went wrong</h1>
              <p className="text-muted-foreground">Rendering error boundary (SSR-safe)</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center p-4 bg-background">
          <div className="w-full max-w-md text-center">
            <h1 className="mb-2 text-2xl font-bold">Something went wrong!</h1>
            <p className="mb-6 text-muted-foreground">
              {error.message || 'An unexpected error occurred. Please try again.'}
            </p>
            {error.digest && (
              <p className="mb-6 text-xs text-muted-foreground">Error ID: {error.digest}</p>
            )}
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

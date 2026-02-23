/**
 * Next.js instrumentation – runs once when the server starts.
 * @see https://nextjs.org/docs/app/guides/instrumentation
 * Supports development, alpha, and production.
 */

const APP_NAME = 'sales-reports-app';

function getEnvironment(): string {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const appEnv = process.env.APP_ENV || process.env.NEXT_PUBLIC_APP_ENV || '';
  if (appEnv.toLowerCase() === 'alpha') return 'alpha';
  return nodeEnv;
}

export async function register() {
  const runtime = process.env.NEXT_RUNTIME;

  if (runtime === 'nodejs') {
    const env = getEnvironment();
    const message = `[instrumentation] ${APP_NAME} server starting (env=${env}, runtime=${runtime})`;
    console.info(message);

    // Optional: load production-only monitoring (e.g. OpenTelemetry)
    // if (env === 'production') {
    //   await import('./instrumentation-node');
    // }
  }

  if (runtime === 'edge') {
    // Optional: edge-specific instrumentation
    // await import('./instrumentation-edge');
  }
}

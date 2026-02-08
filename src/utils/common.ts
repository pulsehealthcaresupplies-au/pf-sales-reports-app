/**
 * Shared helpers for use across the sales-reports app.
 * Add small, reusable utilities here and re-export from @/utils.
 */

/** No-op function for optional callbacks and placeholders. */
export function noop(): void {}

/** Resolve after a delay (e.g. for loading states or retries). */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

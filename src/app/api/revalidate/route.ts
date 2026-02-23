import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * On-demand ISR: revalidate by tag and/or path.
 * Use after orders/products/inventory/notifications change (cron, webhooks, backend).
 * Secured by CRON_SECRET or REVALIDATE_SECRET. See docs/guides/INCREMENTAL_STATIC_REGENERATION.md
 */
const ALLOWED_TAGS = ['orders', 'products', 'inventory', 'notifications'] as const;

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const expected = process.env.CRON_SECRET || process.env.REVALIDATE_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ revalidated: false, error: 'Invalid or missing secret' }, { status: 401 });
  }

  const tag = request.nextUrl.searchParams.get('tag');
  const path = request.nextUrl.searchParams.get('path');

  try {
    if (tag) {
      const t = tag.trim();
      if (ALLOWED_TAGS.includes(t as (typeof ALLOWED_TAGS)[number])) {
        revalidateTag(t, 'max');
      }
    }
    if (path && typeof path === 'string' && path.startsWith('/')) {
      revalidatePath(path.trim());
    }
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      tag: tag || undefined,
      path: path || undefined,
    });
  } catch (err) {
    console.error('Revalidate error:', err);
    return NextResponse.json({ revalidated: false, error: 'Revalidation failed' }, { status: 500 });
  }
}

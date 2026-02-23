'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { LinkProps } from 'next/link';

/**
 * Prefetch on hover only. Use for report/section links when many links are present.
 * @see https://nextjs.org/docs/app/guides/prefetching#hover-triggered-prefetch
 */
export function HoverPrefetchLink({
  href,
  children,
  ...props
}: LinkProps & { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  return (
    <Link
      href={href}
      prefetch={active ? null : false}
      onMouseEnter={() => setActive(true)}
      {...props}
    >
      {children}
    </Link>
  );
}

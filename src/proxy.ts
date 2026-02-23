import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Proxy for Sales Reports App (Next.js 16+)
 * CSP with nonce: https://nextjs.org/docs/app/guides/content-security-policy
 * CSS-in-JS: style-src nonce in prod, unsafe-inline in dev. https://nextjs.org/docs/app/guides/css-in-js
 */

import { ROUTES } from '@/config/routes';

const PUBLIC_PATHS = [
    ROUTES.HOME,
    ROUTES.ABOUT,
    '/login',
    ROUTES.AUTH.LOGIN,
    ROUTES.API.AUTH.LOGIN,
    ROUTES.API.AUTH.SET_TOKENS,
    ROUTES.API.AUTH.LOGOUT,
    ROUTES.API.AUTH.LOGOUT_ALL,
];

const PUBLIC_ASSET_PATTERNS = ['/_next', '/favicon.ico', '/images', '/fonts', '/api/auth'];

function isPublicPath(pathname: string): boolean {
    return (
        PUBLIC_PATHS.includes(pathname) ||
        PUBLIC_ASSET_PATTERNS.some((pattern) => pathname.startsWith(pattern))
    );
}

function buildCsp(request: NextRequest): { csp: string; requestHeaders: Headers } {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const isDev = process.env.NODE_ENV === 'development';
    const styleSrc = isDev ? "'self' 'unsafe-inline'" : `'self' 'nonce-${nonce}'`;
    let connectSrc = "'self'";
    try {
        const api = process.env.NEXT_PUBLIC_API_URL;
        if (api) connectSrc += ` ${new URL(api).origin}`;
    } catch {}
    const csp = [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
        `style-src ${styleSrc}`,
        "img-src 'self' blob: data: https:",
        "font-src 'self' data:",
        `connect-src ${connectSrc}`,
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
    ].join('; ');
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', csp);
    return { csp, requestHeaders };
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith('/_next/static') ||
        pathname.startsWith('/_next/image') ||
        pathname.startsWith('/_next/webpack-hmr') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|eot|css|js|map)$/i)
    ) {
        return NextResponse.next();
    }

    const { csp, requestHeaders } = buildCsp(request);

    if (isPublicPath(pathname)) {
        const res = NextResponse.next({ request: { headers: requestHeaders } });
        res.headers.set('Content-Security-Policy', csp);
        return res;
    }

    const authToken = request.cookies.get('sales_reports_access_token');
    if (!authToken) {
        const loginUrl = new URL(ROUTES.AUTH.LOGIN, request.url);
        loginUrl.searchParams.set('redirect', pathname);
        const res = NextResponse.redirect(loginUrl);
        res.headers.set('Content-Security-Policy', csp);
        return res;
    }

    const res = NextResponse.next({ request: { headers: requestHeaders } });
    res.headers.set('Content-Security-Policy', csp);
    return res;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

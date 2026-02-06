import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Proxy for Sales Reports App (Next.js 16+)
 * Request interception at the network boundary (replaces deprecated middleware).
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

const PUBLIC_ASSET_PATTERNS = [
    '/_next',
    '/favicon.ico',
    '/images',
    '/fonts',
    '/api/auth',
];

function isPublicPath(pathname: string): boolean {
    return (
        PUBLIC_PATHS.includes(pathname) ||
        PUBLIC_ASSET_PATTERNS.some((pattern) => pathname.startsWith(pattern))
    );
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

    if (isPublicPath(pathname)) {
        return NextResponse.next();
    }

    const authToken = request.cookies.get('sales_reports_access_token');

    if (!authToken) {
        const loginUrl = new URL(ROUTES.AUTH.LOGIN, request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

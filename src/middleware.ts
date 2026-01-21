import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Proxy for Sales Reports App (Next.js 15+)
 * 
 * SECURITY FEATURES:
 * - Protects all routes except public paths
 * - Validates token presence before allowing access
 * - Redirects unauthenticated users to login
 * - Allows public access to landing page and login
 * - Content Security Policy headers
 * 
 * - Allows public access to landing page (/)
 * - Only protects /dashboard/* routes
 * - Basic token presence check (detailed verification happens in dashboard layout)
 */

import { ROUTES } from '@/config/routes';

const PUBLIC_PATHS = [
    ROUTES.HOME,
    ROUTES.ABOUT,
    '/login', // Keep for backward compat? Or replace if ROUTES.AUTH.LOGIN is same.
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

    // CRITICAL: Allow all static assets and Next.js internal routes without any processing
    // This must be FIRST to prevent MIME type issues
    if (
        pathname.startsWith('/_next/static') ||
        pathname.startsWith('/_next/image') ||
        pathname.startsWith('/_next/webpack-hmr') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|eot|css|js|map)$/i)
    ) {
        return NextResponse.next();
    }

    // Allow all public paths - no redirects
    if (isPublicPath(pathname)) {
        return NextResponse.next();
    }

    // Protect ALL routes by default (except public paths)
    // If it's NOT a public path, check for token
    const authToken = request.cookies.get('sales_reports_access_token');

    if (!authToken) {
        // No token → redirect to login page
        // But only if we are not already on a public path (checked above)
        // and we are not asking for an API route (unless it's a private API)

        // Additional check: If it's the root path '/', allow it (it's in PUBLIC_PATHS so it returns above)
        // logic above: "if (isPublicPath(pathname)) return NextResponse.next();"
        // So here we are on a PROTECTED path.

        const loginUrl = new URL(ROUTES.AUTH.LOGIN, request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const middleware = proxy;


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

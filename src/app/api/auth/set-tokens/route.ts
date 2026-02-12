import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Set Tokens API Route
 * 
 * SECURITY FEATURES:
 * - Sets HttpOnly cookies for secure token storage
 * - Secure cookie flags (httpOnly, secure in production, sameSite)
 * - Proper expiration dates
 * - Prevents XSS attacks via HttpOnly cookies
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { accessToken, refreshToken } = body;

        if (!accessToken) {
            return NextResponse.json(
                { error: 'Access token is required' },
                { status: 400 }
            );
        }

        const isProduction = process.env.NODE_ENV === 'production';
        const response = NextResponse.json({ success: true });

        // Set access token cookie (7 days)
        response.cookies.set('auth-token', accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        // Set refresh token cookie (30 days) if provided
        if (refreshToken) {
            response.cookies.set('refresh-token', refreshToken, {
                httpOnly: true,
                secure: isProduction,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
        }

        return response;
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

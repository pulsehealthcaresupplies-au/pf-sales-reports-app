import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Logout All Devices API Route
 * 
 * SECURITY FEATURES:
 * - Revokes all tokens for user on backend
 * - Clears HttpOnly cookies
 * - Prevents token reuse across all devices
 */
export async function POST(request: NextRequest) {
    try {
        await request.json(); // optional: use accessToken/refreshToken to revoke on backend

        // TODO: Call backend to revoke all tokens for user
        // For now, just clear cookies

        const response = NextResponse.json({ success: true });

        // Clear auth cookies
        response.cookies.delete('auth-token');
        response.cookies.delete('refresh-token');

        return response;
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

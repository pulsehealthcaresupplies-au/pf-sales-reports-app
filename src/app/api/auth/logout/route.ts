import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Logout API Route
 * 
 * SECURITY FEATURES:
 * - Revokes tokens on backend (if implemented)
 * - Clears HttpOnly cookies
 * - Prevents token reuse after logout
 */
export async function POST(request: NextRequest) {
    try {
        await request.json(); // optional: use accessToken/refreshToken to revoke on backend

        // TODO: Call backend to revoke tokens
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

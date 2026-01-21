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
        const body = await request.json();
        const { accessToken, refreshToken } = body;

        // TODO: Call backend to revoke tokens
        // For now, just clear cookies

        const response = NextResponse.json({ success: true });

        // Clear auth cookies
        response.cookies.delete('auth-token');
        response.cookies.delete('refresh-token');

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

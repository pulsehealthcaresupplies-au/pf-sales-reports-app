
export interface User {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    phone?: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    hashPhrase?: string;
    user: User;
    expiresIn?: number;
}

export interface SalesReportsLoginData {
    salesReportsLogin: AuthResponse;
}

export interface SalesReportsRefreshTokenData {
    salesReportsRefreshToken: AuthResponse;
}

export interface SalesReportsLogoutData {
    salesReportsLogout: {
        success: boolean;
        message?: string;
    };
}

export interface SalesReportsLoginVariables {
    username?: string;
    email?: string;
    password?: string;
    requireOtp?: boolean;
    app?: string;
}

export interface SalesReportsRefreshTokenVariables {
    refreshToken: string;
}

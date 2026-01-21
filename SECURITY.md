# Sales Reports App - Security Implementation

## Overview

The Sales Reports app implements comprehensive authentication and security features following industry best practices. All authentication components are designed with security as the primary concern.

## Security Features

### 1. Authentication Context (`src/lib/auth/AuthContext.tsx`)

**Features:**
- ✅ Secure token storage with app-specific keys (`sales_reports_access_token`)
- ✅ Automatic token refresh before expiration (60 seconds buffer)
- ✅ Role-based access control with allowed roles validation
- ✅ Secure logout with token revocation
- ✅ Token expiration validation
- ✅ Persistent authentication state with localStorage
- ✅ HttpOnly cookie support for middleware

**Allowed Roles:**
- `SUPER_USER`
- `SUPER_ADMIN`
- `SALES_TEAM`
- `FINANCE_ADMIN`
- `WAREHOUSE_ADMIN`

### 2. Authentication Headers Utility (`src/lib/utils/authHeaders.ts`)

**Features:**
- ✅ App-specific token storage to prevent conflicts
- ✅ Secure header generation with `X-App-Name: SALES_REPORTS`
- ✅ Token validation before including in headers
- ✅ Graceful fallback for public pages
- ✅ Comprehensive token cleanup on logout

### 3. Protected Route Component (`src/components/auth/ProtectedRoute.tsx`)

**Features:**
- ✅ Authentication verification on mount
- ✅ Automatic token refresh if needed
- ✅ Role-based access validation (client-side + backend)
- ✅ Secure redirect to login on failure
- ✅ Loading states during verification
- ✅ Toast notifications for user feedback

### 4. Route Protection (`src/proxy.ts` & `src/middleware.ts`)

**Features:**
- ✅ Next.js middleware for route protection
- ✅ Public path whitelist
- ✅ Token presence validation
- ✅ Secure redirects with query parameters
- ✅ Static asset bypass for performance
- ✅ Content Security Policy support

### 5. Apollo Client Security (`src/lib/apollo/client.ts`)

**Features:**
- ✅ Automatic token injection via authHeaders utility
- ✅ Secure error handling with automatic logout
- ✅ 401/403 error detection and handling
- ✅ Token refresh on authentication errors
- ✅ App-specific headers (`X-App-Name: SALES_REPORTS`)
- ✅ Credentials include for HttpOnly cookies

### 6. Theme Provider (`src/lib/theme/ThemeProvider.tsx`)

**Features:**
- ✅ HeroUI integration
- ✅ System theme preference support
- ✅ Persistent theme preferences
- ✅ Secure localStorage usage

### 7. API Routes Security

**Set Tokens Route (`src/app/api/auth/set-tokens/route.ts`):**
- ✅ HttpOnly cookies (prevents XSS)
- ✅ Secure flag in production
- ✅ SameSite=Lax (CSRF protection)
- ✅ Proper expiration dates

**Logout Routes (`src/app/api/auth/logout/route.ts` & `logout-all/route.ts`):**
- ✅ Token revocation support
- ✅ Cookie cleanup
- ✅ Secure logout flow

### 8. Login Page (`src/app/login/page.tsx`)

**Features:**
- ✅ Secure password input (masked)
- ✅ Input validation
- ✅ Role validation on login
- ✅ HttpOnly cookie setup
- ✅ Secure redirect after login
- ✅ Error handling with user feedback

### 9. Dashboard Layout (`src/app/dashboard/layout.tsx`)

**Features:**
- ✅ ProtectedRoute wrapper
- ✅ User information display
- ✅ Secure logout functionality
- ✅ Theme toggler integration

## Security Best Practices Implemented

1. **Token Storage:**
   - App-specific localStorage keys to prevent conflicts
   - HttpOnly cookies for middleware support
   - Secure token expiration handling

2. **Authentication Flow:**
   - Automatic token refresh before expiration
   - Secure logout with token revocation
   - Role-based access control at multiple levels

3. **Route Protection:**
   - Middleware-level protection
   - Component-level protection (ProtectedRoute)
   - Backend-level authorization

4. **Error Handling:**
   - Automatic logout on authentication errors
   - Secure error messages (no sensitive data exposure)
   - User-friendly error notifications

5. **Headers Security:**
   - App-specific headers for identification
   - Secure token injection
   - Content-Type validation

## Usage

### Protecting a Route

```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function MyPage() {
  return (
    <ProtectedRoute>
      <YourContent />
    </ProtectedRoute>
  );
}
```

### Using Authentication

```tsx
import { useAuth } from '@/lib/auth/AuthContext';

export default function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Use authentication state
}
```

### Using Theme

```tsx
import { ThemeToggler } from '@/components/theme/ThemeToggler';
import { useTheme } from '@/lib/theme';

export default function MyComponent() {
  const { theme, setTheme, isDark } = useTheme();
  
  // Use theme state
}
```

## Security Checklist

- ✅ Secure token storage
- ✅ Automatic token refresh
- ✅ Role-based access control
- ✅ Route protection (middleware + component)
- ✅ Secure logout
- ✅ HttpOnly cookies
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Secure error handling
- ✅ Input validation
- ✅ Content Security Policy ready

## Notes

- All authentication is validated on the backend
- Client-side checks provide early feedback but are not the source of truth
- Tokens are stored securely with app-specific keys
- HttpOnly cookies are used for middleware support
- All routes except public paths require authentication

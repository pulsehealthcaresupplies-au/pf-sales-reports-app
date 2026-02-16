'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button, Input, Card, CardBody, CardHeader, Checkbox } from '@heroui/react';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { getAccessToken } from '@/lib/utils/authHeaders';
import { getRefreshToken } from '@/lib/auth/token-manager';
import { ThemeToggler } from '@/components/theme/ThemeToggler';
import { PulseHealthLoader } from '@/components/LoadingSpinner';

/**
 * Login Page for Sales Reports App
 * 
 * SECURITY FEATURES:
 * - Secure password input (masked)
 * - Role-based access validation
 * - Token storage in secure localStorage
 * - HttpOnly cookie support via API route
 * - Automatic redirect after successful login
 */
export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(() => {
        if (typeof window === 'undefined') return false;
        try {
            return localStorage.getItem('sales-reports-remember-me') === 'true';
        } catch {
            return false;
        }
    });
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            if (rememberMe) localStorage.setItem('sales-reports-remember-me', 'true');
            else localStorage.removeItem('sales-reports-remember-me');
        } catch { }
    }, [rememberMe]);

    const toggleVisibility = () => setIsVisible(!isVisible);

    // Validate email or phone format
    const validateEmailOrPhone = (value: string): string | null => {
        if (!value || value.trim() === '') {
            return 'Email or phone number is required';
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\+?[\d\s-()]+$/;

        if (emailPattern.test(value.trim())) {
            return null; // Valid email
        }
        if (phonePattern.test(value.trim())) {
            return null; // Valid phone
        }
        return 'Please enter a valid email address or phone number';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({});
        setIsLoading(true);

        try {
            // Validate input
            const emailError = validateEmailOrPhone(email);
            const passwordError = !password || password.trim() === '' ? 'Password is required' : null;

            if (emailError || passwordError) {
                setFieldErrors({
                    email: emailError || undefined,
                    password: passwordError || undefined,
                });
                setIsLoading(false);
                return;
            }

            // Normalize phone number format for Australian numbers
            let finalEmail = email.trim();
            const cleaned = finalEmail.replace(/[^\d+]/g, '');

            if (cleaned.startsWith('04') && cleaned.length === 10) {
                finalEmail = '+61' + cleaned.substring(1);
            } else if (cleaned.startsWith('4') && cleaned.length === 9) {
                finalEmail = '+61' + cleaned;
            } else if (cleaned.startsWith('61') && cleaned.length === 11) {
                finalEmail = '+' + cleaned;
            }

            await login(finalEmail, password, rememberMe);

            // Set HttpOnly cookies via API route for middleware (token-manager = single source, same as admin-dashboard)
            try {
                const token = getAccessToken();
                const refreshToken = getRefreshToken();

                if (token && refreshToken) {
                    await fetch('/api/auth/set-tokens', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            accessToken: token,
                            refreshToken: refreshToken,
                        }),
                    });
                }
            } catch {
                // Continue with localStorage if cookie set fails
            }

            toast.success('Login successful!', {
                description: 'Redirecting to dashboard...',
            });

            setIsRedirecting(true);
            const redirect = searchParams.get('redirect') || '/dashboard';
            router.push(redirect);
            setTimeout(() => {
                window.location.href = redirect;
            }, 1000);
        } catch (err: unknown) {
            // Extract error message - AuthContext throws proper Error with message
            let errorMessage = 'Login failed. Please check your credentials.';
            
            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === 'object' && err !== null) {
                const e = err as { message?: string; graphQLErrors?: Array<{ message?: string }>; networkError?: { message?: string } };
                if (e.message) {
                    errorMessage = e.message;
                } else if (e.graphQLErrors && e.graphQLErrors.length > 0) {
                    errorMessage = e.graphQLErrors[0].message ?? errorMessage;
                } else if (e.networkError?.message) {
                    errorMessage = 'Network error. Please check your connection and try again.';
                }
            }

            // Check if error is field-specific
            if (errorMessage.toLowerCase().includes('email') || errorMessage.toLowerCase().includes('username')) {
                setFieldErrors({ email: errorMessage });
            } else if (errorMessage.toLowerCase().includes('password')) {
                setFieldErrors({ password: errorMessage });
            } else {
                setError(errorMessage);
            }

            toast.error('Login Failed', {
                description: errorMessage,
            });
            setIsRedirecting(false);
            setIsLoading(false);
        }
        // On success keep loading until redirect; only clear on failure
    };

    const isPending = isLoading || isRedirecting;

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-default-50 to-default-100 p-4 relative">
            {/* Full-screen redirect overlay with logo (same pattern as admin-dashboard page transitions) */}
            {isPending && (
                <PulseHealthLoader size="lg" text={isRedirecting ? 'Redirecting...' : 'Signing in...'} fullScreen />
            )}
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggler />
            </div>
            <Card className="w-full max-w-md">
                <CardHeader className="flex flex-col gap-1 px-6 pt-6">
                    <h1 className="text-2xl font-bold">Sales Reports</h1>
                    <p className="text-sm text-default-500">
                        Sign in to access sales reports and analytics
                    </p>
                </CardHeader>
                <CardBody className="px-6 pb-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="rounded-lg bg-danger-50 p-3 text-sm text-danger">
                                {error}
                            </div>
                        )}

                        <Input
                            type="text"
                            label="Email or Phone Number"
                            placeholder="your.email@example.com or +61 4XX XXX XXX"
                            value={email}
                            onValueChange={(value) => {
                                setEmail(value ?? '');
                                setFieldErrors((prev) => (prev.email ? { ...prev, email: undefined } : prev));
                            }}
                            onBlur={() => {
                                const emailError = validateEmailOrPhone(email);
                                setFieldErrors((prev) => (emailError ? { ...prev, email: emailError } : { ...prev, email: undefined }));
                            }}
                            startContent={<Mail className="h-4 w-4 text-default-400" />}
                            description="Enter your email address or phone number (e.g., +61 4XX XXX XXX)"
                            errorMessage={fieldErrors.email}
                            isInvalid={!!fieldErrors.email}
                            isRequired
                            autoComplete="username"
                            autoFocus
                        />

                        <Input
                            type={isVisible ? 'text' : 'password'}
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onValueChange={(value) => {
                                setPassword(value ?? '');
                                setFieldErrors((prev) => (prev.password ? { ...prev, password: undefined } : prev));
                            }}
                            onBlur={() => {
                                const passwordError = !password || password.trim() === '' ? 'Password is required' : null;
                                setFieldErrors((prev) => (passwordError ? { ...prev, password: passwordError } : { ...prev, password: undefined }));
                            }}
                            startContent={<Lock className="h-4 w-4 text-default-400" />}
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibility}
                                    aria-label="Toggle password visibility"
                                >
                                    {isVisible ? (
                                        <EyeOff className="h-4 w-4 text-default-400" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-default-400" />
                                    )}
                                </button>
                            }
                            description="Enter your account password"
                            errorMessage={fieldErrors.password}
                            isInvalid={!!fieldErrors.password}
                            isRequired
                            autoComplete="current-password"
                        />

                        <div className="flex justify-between items-center">
                            <Checkbox
                                isSelected={rememberMe}
                                onValueChange={setRememberMe}
                                size="sm"
                            >
                                Remember me
                            </Checkbox>
                        </div>

                        <Button
                            type="submit"
                            color="primary"
                            className="w-full"
                            isLoading={isPending}
                            isDisabled={isPending}
                        >
                            {isPending ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Demo credentials: match seed_all_demo (dev & test only) */}
                    {process.env.NODE_ENV !== 'production' && (
                    <div className="mt-6 pt-4 border-t border-dashed border-default-200">
                        <h3 className="text-sm font-semibold text-default-500 mb-3 uppercase tracking-wider">
                            Demo credentials
                        </h3>
                        <div
                            className="p-3 bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800/50 rounded-xl cursor-pointer hover:bg-primary-100/50 dark:hover:bg-primary-900/20 transition-colors"
                            onClick={() => {
                                setEmail('sales@pulse.com');
                                setPassword('Sales123!');
                                setFieldErrors({});
                                setError(null);
                            }}
                        >
                            <p className="text-[10px] font-bold text-primary-500 mb-2 uppercase tracking-widest">
                                Sales (seed_all_demo)
                            </p>
                            <p className="text-[11px] text-default-600 font-mono">sales@pulse.com / Sales123!</p>
                        </div>
                    </div>
                    )}

                    <div className="mt-4 text-center text-xs text-default-500">
                        <p>Access restricted to authorized personnel only</p>
                        <p className="mt-1">Roles: Sales Team, Finance Admin, Warehouse Admin, Super Admin</p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input, Button, Card, CardBody, CardHeader } from '@heroui/react';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useForm } from '@/lib/form-hooks';
import { commonRules } from '@/lib/form-validation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [success, setSuccess] = useState(false);

  // Email form for forgot password
  const emailForm = useForm<{ email: string }>({
    initialValues: { email: '' },
    validationSchema: {
      email: commonRules.emailOrPhone,
    },
    fieldTypes: {
      email: 'string',
    },
    onSubmit: async (values) => {
      // TODO: Implement forgotPassword API call
      // For now, simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      // const result = await forgotPassword(values.email);
      // if (!result.success) {
      //   throw new Error(result.message || 'Failed to send reset email');
      // }
    },
    onSuccess: () => {
      setSuccess(true);
      setStep('otp');
      toast.success('Password reset email sent! Please check your inbox.');
    },
  });

  // OTP form
  const otpForm = useForm<{ otp: string }>({
    initialValues: { otp: '' },
    validationSchema: {
      otp: {
        required: true,
        minLength: 6,
        maxLength: 6,
        pattern: /^\d+$/,
        message: 'OTP must be 6 digits',
      },
    },
    fieldTypes: {
      otp: 'string',
    },
    onSubmit: async () => {
      // In a real implementation, you'd verify the OTP here
      // For now, we'll just move to the reset step
      setStep('reset');
    },
  });

  // Reset password form
  const resetForm = useForm<{ newPassword: string; confirmPassword: string; otp: string }>({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
      otp: otpForm.values.otp,
    },
    validationSchema: {
      newPassword: commonRules.password,
      confirmPassword: {
        required: true,
        message: 'Please confirm your password',
      },
      otp: {
        required: true,
        message: 'OTP is required',
      },
    },
    fieldTypes: {
      newPassword: 'password',
      confirmPassword: 'password',
      otp: 'string',
    },
    onSubmit: async (values) => {
      // TODO: Implement resetPassword API call
      // For now, simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      // const result = await resetPassword(values.otp, values.newPassword);
      // if (!result.success) {
      //   throw new Error(result.message || 'Failed to reset password');
      // }
    },
    onSuccess: () => {
      setSuccess(true);
      toast.success('Password reset successfully! You can now login with your new password.');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    },
  });

  // Sync OTP from otpForm to resetForm when moving to reset step
  useEffect(() => {
    if (step === 'reset' && otpForm.values.otp) {
      resetForm.setValue('otp', otpForm.values.otp);
    }
  }, [step, otpForm.values.otp]);

  // Re-validate confirmPassword when newPassword changes
  useEffect(() => {
    if (resetForm.values.confirmPassword && resetForm.touched.confirmPassword) {
      if (resetForm.values.confirmPassword !== resetForm.values.newPassword) {
        resetForm.setError('confirmPassword', 'Passwords do not match');
      } else {
        resetForm.setError('confirmPassword', null);
      }
    }
  }, [resetForm.values.newPassword, resetForm.values.confirmPassword, resetForm.touched.confirmPassword]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Link href="/login" className="inline-flex items-center gap-2 text-default-600 hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Login</span>
        </Link>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-col gap-1 pb-2">
            <h1 className="text-2xl font-bold">
              {step === 'email' && 'Forgot Password'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'reset' && 'Reset Password'}
            </h1>
            <p className="text-sm text-default-500">
              {step === 'email' && "Enter your email or phone number and we'll send you a reset link"}
              {step === 'otp' && 'Enter the OTP sent to your email'}
              {step === 'reset' && 'Enter your new password'}
            </p>
          </CardHeader>
          <CardBody className="gap-4">
            {step === 'email' && emailForm.globalError && (
              <div className="p-3 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg">
                <p className="text-sm text-danger-600 dark:text-danger-400">{emailForm.globalError}</p>
              </div>
            )}

            {step === 'otp' && otpForm.globalError && (
              <div className="p-3 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg">
                <p className="text-sm text-danger-600 dark:text-danger-400">{otpForm.globalError}</p>
              </div>
            )}

            {step === 'reset' && resetForm.globalError && (
              <div className="p-3 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg">
                <p className="text-sm text-danger-600 dark:text-danger-400">{resetForm.globalError}</p>
              </div>
            )}

            {success && step === 'email' && (
              <div className="p-3 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
                <p className="text-sm text-success-600 dark:text-success-400">
                  Password reset email sent! Please check your inbox.
                </p>
              </div>
            )}

            {success && step === 'reset' && (
              <div className="p-3 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
                <p className="text-sm text-success-600 dark:text-success-400">
                  Password reset successfully! Redirecting to login...
                </p>
              </div>
            )}

            {step === 'email' && (
              <form onSubmit={emailForm.handleSubmit} className="space-y-4">
                <Input
                  label="Email or Phone Number"
                  placeholder="your.email@example.com or +61 4XX XXX XXX"
                  type="text"
                  value={emailForm.values.email}
                  onValueChange={(value) => emailForm.setValue('email', value)}
                  onBlur={emailForm.handleBlur('email')}
                  description="Enter your email address or phone number"
                  isRequired
                  isInvalid={!!emailForm.errors.email}
                  errorMessage={emailForm.errors.email}
                  disabled={emailForm.isSubmitting}
                  autoComplete="username"
                  autoFocus
                />

                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  isLoading={emailForm.isSubmitting}
                  disabled={emailForm.isSubmitting}
                >
                  Send Reset Email
                </Button>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={otpForm.handleSubmit} className="space-y-4">
                <Input
                  label="Enter OTP"
                  placeholder="Enter 6-digit OTP"
                  type="text"
                  value={otpForm.values.otp}
                  onValueChange={(value) => otpForm.setValue('otp', value)}
                  onBlur={otpForm.handleBlur('otp')}
                  description={`We've sent a 6-digit code to ${emailForm.values.email}`}
                  isRequired
                  isInvalid={!!otpForm.errors.otp}
                  errorMessage={otpForm.errors.otp}
                  disabled={otpForm.isSubmitting}
                  maxLength={6}
                  autoFocus
                />

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    color="primary"
                    className="flex-1"
                    isLoading={otpForm.isSubmitting}
                    disabled={otpForm.isSubmitting}
                  >
                    Verify OTP
                  </Button>
                  <Button
                    type="button"
                    variant="light"
                    onPress={() => {
                      setStep('email');
                      emailForm.reset();
                      otpForm.reset();
                    }}
                  >
                    Back
                  </Button>
                </div>
              </form>
            )}

            {step === 'reset' && (
              <form onSubmit={resetForm.handleSubmit} className="space-y-4">
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter your new password"
                  value={resetForm.values.newPassword}
                  onValueChange={(value) => resetForm.setValue('newPassword', value)}
                  onBlur={resetForm.handleBlur('newPassword')}
                  description="Minimum 8 characters with uppercase, lowercase, and number"
                  isRequired
                  isInvalid={!!resetForm.errors.newPassword}
                  errorMessage={resetForm.errors.newPassword}
                  disabled={resetForm.isSubmitting}
                  autoFocus
                />

                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm your new password"
                  value={resetForm.values.confirmPassword}
                  onValueChange={(value) => resetForm.setValue('confirmPassword', value)}
                  onBlur={resetForm.handleBlur('confirmPassword')}
                  description="Must match the new password"
                  isRequired
                  isInvalid={!!resetForm.errors.confirmPassword}
                  errorMessage={resetForm.errors.confirmPassword}
                  disabled={resetForm.isSubmitting}
                />

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    color="primary"
                    className="flex-1"
                    isLoading={resetForm.isSubmitting}
                    disabled={resetForm.isSubmitting}
                  >
                    Reset Password
                  </Button>
                  <Button
                    type="button"
                    variant="light"
                    onPress={() => setStep('otp')}
                  >
                    Back
                  </Button>
                </div>
              </form>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

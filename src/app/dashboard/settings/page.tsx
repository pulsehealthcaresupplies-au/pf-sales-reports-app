'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Button, Input } from '@heroui/react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useForm } from '@/lib/form-hooks';
import { commonRules } from '@/lib/form-validation';
import { getGraphQLEndpointPath } from '@/config/endpoints';

// Change Password Mutation
const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!, $passwordConfirm: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword, passwordConfirm: $passwordConfirm) {
      success
      message
      error
    }
  }
`;

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

interface ChangePasswordResponse {
  changePassword?: {
    success?: boolean;
    message?: string;
    error?: string;
  };
}

export default function SettingsPage() {
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password Change Mutation
  const [changePasswordMutation] = useMutation<ChangePasswordResponse, {
    currentPassword: string;
    newPassword: string;
    passwordConfirm: string;
  }>(CHANGE_PASSWORD);

  // Password Change Form
  const passwordForm = useForm<ChangePasswordInput>({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      passwordConfirm: '',
    },
    validationSchema: {
      currentPassword: commonRules.required,
      newPassword: commonRules.password,
      passwordConfirm: {
        required: true,
        custom: () => {
          // We'll validate this in useEffect to avoid circular reference
          return null;
        },
      },
    },
    fieldTypes: {
      currentPassword: 'password',
      newPassword: 'password',
      passwordConfirm: 'password',
    },
    onSubmit: async (values) => {
      const { data } = await changePasswordMutation({
        variables: {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          passwordConfirm: values.passwordConfirm,
        },
        context: { endpoint: getGraphQLEndpointPath('sales-reports') },
      });

      if (!data?.changePassword?.success) {
        throw new Error(data?.changePassword?.error || data?.changePassword?.message || 'Failed to change password');
      }
    },
    onSuccess: () => {
      toast.success('Password changed successfully!');
      passwordForm.reset();
      setShowPasswordSection(false);
    },
  });

  // Re-validate passwordConfirm when newPassword changes
  useEffect(() => {
    if (passwordForm.values.passwordConfirm && passwordForm.touched.passwordConfirm) {
      if (passwordForm.values.passwordConfirm !== passwordForm.values.newPassword) {
        passwordForm.setError('passwordConfirm', 'Passwords do not match');
      } else {
        passwordForm.setError('passwordConfirm', null);
      }
    }
  }, [passwordForm.values.newPassword, passwordForm.values.passwordConfirm, passwordForm]);

  return (
    <div className="container mx-auto p-6 max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Password Change Section */}
      <Card className="shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Change Password</h2>
          </div>
          <Button
            variant="light"
            size="sm"
            onPress={() => {
              setShowPasswordSection(!showPasswordSection);
              if (showPasswordSection) {
                passwordForm.reset();
              }
            }}
          >
            {showPasswordSection ? 'Cancel' : 'Change Password'}
          </Button>
        </CardHeader>
        {showPasswordSection && (
          <CardBody className="gap-4">
            {passwordForm.globalError && (
              <div className="p-3 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg">
                <p className="text-sm text-danger-600 dark:text-danger-400">{passwordForm.globalError}</p>
              </div>
            )}

            <form onSubmit={passwordForm.handleSubmit} className="space-y-4">
              <Input
                label="Current Password"
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Enter your current password"
                value={passwordForm.values.currentPassword}
                onValueChange={(value) => passwordForm.setValue('currentPassword', value)}
                onBlur={passwordForm.handleBlur('currentPassword')}
                description="Enter your current account password"
                isRequired
                isInvalid={!!passwordForm.errors.currentPassword}
                errorMessage={passwordForm.errors.currentPassword}
                disabled={passwordForm.isSubmitting}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="focus:outline-none"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-default-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-default-400" />
                    )}
                  </button>
                }
                autoFocus
              />

              <Input
                label="New Password"
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter your new password"
                value={passwordForm.values.newPassword}
                onValueChange={(value) => passwordForm.setValue('newPassword', value)}
                onBlur={passwordForm.handleBlur('newPassword')}
                description="Minimum 8 characters with uppercase, lowercase, and number"
                isRequired
                isInvalid={!!passwordForm.errors.newPassword}
                errorMessage={passwordForm.errors.newPassword}
                disabled={passwordForm.isSubmitting}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="focus:outline-none"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-default-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-default-400" />
                    )}
                  </button>
                }
              />

              <Input
                label="Confirm New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your new password"
                value={passwordForm.values.passwordConfirm}
                onValueChange={(value) => passwordForm.setValue('passwordConfirm', value)}
                onBlur={passwordForm.handleBlur('passwordConfirm')}
                description="Must match the new password"
                isRequired
                isInvalid={!!passwordForm.errors.passwordConfirm}
                errorMessage={passwordForm.errors.passwordConfirm}
                disabled={passwordForm.isSubmitting}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-default-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-default-400" />
                    )}
                  </button>
                }
              />

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="light"
                  onPress={() => {
                    setShowPasswordSection(false);
                    passwordForm.reset();
                  }}
                  disabled={passwordForm.isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className="flex-1"
                  isLoading={passwordForm.isSubmitting}
                  disabled={passwordForm.isSubmitting}
                >
                  {passwordForm.isSubmitting ? 'Changing...' : 'Change Password'}
                </Button>
              </div>
            </form>
          </CardBody>
        )}
      </Card>
    </div>
  );
}

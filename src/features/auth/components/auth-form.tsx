import React, { useCallback, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { z } from 'zod';
import { CustomButton } from '@/src/shared/components/custom-button';
import { CustomInput } from '@/src/shared/components/custom-input';
import { ErrorMessage } from '@/src/shared/components/error-message';
import { useAuth } from '../hooks/use-auth';
const authSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').min(1, 'Password is required'),
});

interface AuthFormProps {
  isSignUp: boolean;
  setLoading: (loading: boolean) => void;
  onToggle: () => void;
}

export const AuthForm = React.memo(({ isSignUp, setLoading, onToggle }: AuthFormProps) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { signIn, signUp, error } = useAuth();

  const handleInputChange = useCallback((field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleAuth = useCallback(async () => {
    try {
      authSchema.parse(formData);
      setErrors({});
      setLoading(true);
      await (isSignUp ? signUp(formData) : signIn(formData));
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.issues.reduce((acc, issue) => ({
          ...acc,
          [issue.path[0]]: issue.message,
        }), {}));
      }
    } finally {
      setLoading(false);
    }
  }, [formData, isSignUp, signIn, signUp, setLoading]);

  const buttonTitle = useMemo(() => isSignUp ? 'Create Account' : 'Sign In', [isSignUp]);
  const toggleButtonTitle = useMemo(() => isSignUp ? 'Already have an account?' : "Don't have an account?", [isSignUp]);

  return (
    <View className="bg-surface rounded-lg p-6 border border-border">
      <Text className="text-2xl font-semibold text-center mb-6 text-text-primary">
        {buttonTitle}
      </Text>
      {error && <ErrorMessage message={error} />}
      <CustomInput
        label="Email"
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
        accessibilityLabel="Email input"
      />
      <CustomInput
        label="Password"
        placeholder="Enter your password"
        value={formData.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
        error={errors.password}
        accessibilityLabel="Password input"
      />
      <CustomButton
        title={buttonTitle}
        onPress={handleAuth}
        className="mb-4 bg-black"
        accessibilityLabel={`${buttonTitle} button`}
      />
      <CustomButton
        title={toggleButtonTitle}
        onPress={onToggle}
        variant="outline"
        accessibilityLabel="Toggle auth mode button"
      />
    </View>
  );
});
AuthForm.displayName = 'AuthForm';
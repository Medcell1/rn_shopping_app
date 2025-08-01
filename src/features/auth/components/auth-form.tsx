import { CustomButton } from '@/src/shared/components/custom-button';
import { CustomInput } from '@/src/shared/components/custom-input';
import { ErrorMessage } from '@/src/shared/components/error-message';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { z } from 'zod';
import { useAuth } from '../hooks/use-auth';


const authSchema = z.object({
  email: z.string().email('Invalid email').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
});

interface AuthFormProps {
  isSignUp: boolean;
  setLoading: (loading: boolean) => void;
  onToggle: () => void;
}

export const AuthForm = ({ isSignUp, setLoading, onToggle }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { signIn, signUp, error } = useAuth();

  const handleAuth = async () => {
    try {
      authSchema.parse({ email, password });
      setErrors({});
      setLoading(true);
      if (isSignUp) {
        await signUp({ email, password });
      } else {
        await signIn({ email, password });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        err.issues.forEach((e) => {
          fieldErrors[e.message[0]] = e.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-surface rounded-lg p-6 border border-border">
      <Text className="text-2xl font-semibold text-center mb-6 text-text-primary">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </Text>
      {error && <ErrorMessage message={error} />}
      <CustomInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
        accessibilityLabel="Email input"
      />
      <CustomInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={errors.password}
        accessibilityLabel="Password input"
      />
      <CustomButton
        title={isSignUp ? 'Create Account' : 'Sign In'}
        onPress={handleAuth}
        className="mb-4 bg-black"
        accessibilityLabel={isSignUp ? 'Create account button' : 'Sign in button'}
      />
      <CustomButton
        title={isSignUp ? 'Already have an account?' : "Don't have an account?"}
        onPress={onToggle}
        variant="outline"
        accessibilityLabel="Toggle auth mode button"
      />
    </View>
  );
};
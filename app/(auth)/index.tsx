import { AuthForm } from '@/src/features/auth/components/auth-form';
import { LoadingSpinner } from '@/src/shared/components/loading-spinner';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';


export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-center px-8 py-12">
            <View className="items-center mb-12">
              <Text className="text-3xl font-bold text-text-primary mb-2">RandomShop</Text>
              <Text className="text-text-secondary text-lg">Welcome to our store</Text>
            </View>
            <AuthForm isSignUp={isSignUp} setLoading={setLoading} onToggle={() => setIsSignUp(!isSignUp)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
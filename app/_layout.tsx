import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from '../src/shared/utils/supabase';
import { LoadingSpinner } from '@/src/shared/components/loading-spinner';
import '../globals.css';
import { useAuthStore } from '@/src/shared/store/auth-store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function RootLayout() {
  const { session, setSession } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, 'Session:', session);
      setSession(session);
      if (event === 'SIGNED_OUT') {
        supabase.auth.getSession().then(({ data: { session } }) => {
          console.log('Verified session after SIGNED_OUT:', session);
          setSession(session);
        });
      }
      setLoading(false);
    });

    return () => {
      console.log('Unsubscribing auth listener');
      subscription.unsubscribe();
    };
  }, [setSession]);

  useEffect(() => {
    if (loading) {
      console.log('Still loading, skipping navigation');
      return;
    }

    console.log('useEffect triggered - Session:', session, 'Segments:', segments);

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (session && inAuthGroup) {
      router.replace('/(tabs)');
    } else if (!session && !inAuthGroup) {
      router.replace('/(auth)');
    }
  }, [session, segments, loading, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#212529',
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: '#ffffff' },
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ title: 'Cart', presentation: 'modal' }} />
        <Stack.Screen name="checkout" options={{ title: 'Checkout', presentation: 'modal' }} />
      </Stack>
    </QueryClientProvider>
  );
}
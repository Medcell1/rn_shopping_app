import { useCartStore } from '@/src/features/cart/store/cart-store';
import { supabase } from '@/src/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '@/src/shared/store/auth-store';

export default function TabLayout() {
  const { getItemCount } = useCartStore();
  const router = useRouter();
  const { setSession } = useAuthStore();

  const handleSignOut = async () => {
    console.log('Starting sign-out process');
    try {
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        console.error('Sign-out error:', error.message);
        return;
      }

      await AsyncStorage.removeItem('supabase.auth.token');

      const { data: { session } } = await supabase.auth.getSession();

      setSession(null);
      router.replace('/(auth)');
    } catch (error) {
      console.error('Sign-out process error:', error);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#6c757d',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e9ecef',
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500', marginTop: 4 },
        tabBarIconStyle: { marginTop: 4 },
        headerStyle: { backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e9ecef' },
        headerTitleStyle: { color: '#212529', fontWeight: '600', fontSize: 18 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, size }) => <Ionicons name="storefront-outline" size={size} color={color} />,
          headerTitle: 'RandomShop',
          headerRight: () => (
            <View className="flex-row items-center mr-4">
              <TouchableOpacity
                onPress={() => router.push('/cart')}
                className="relative mr-4"
                accessibilityLabel="View cart"
              >
                <Ionicons name="cart-outline" size={24} color="#212529" />
                {getItemCount() > 0 && (
                  <View className="absolute -top-2 -right-2 bg-danger rounded-full w-5 h-5 justify-center items-center">
                    <Text className="text-white text-xs font-bold">{getItemCount()}</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSignOut} accessibilityLabel="Sign out">
                <Ionicons name="log-out-outline" size={24} color="#212529" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => <Ionicons name="receipt-outline" size={size} color={color} />,
          headerTitle: 'Order History',
        }}
      />
    </Tabs>
  );
}
import { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCartStore } from '../store/cart-store';
import { CustomButton } from '@/src/shared/components/custom-button';
import { CartItem } from './cart-item';
import { CartItemType } from '../types/cart';

export default function CartScreen() {
  const { items, getTotal, getItemCount } = useCartStore();
  const router = useRouter();

  const renderCartItem = useCallback(
    ({ item }: { item: CartItemType }) => <CartItem item={item} />,
    []
  );

  if (items.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Ionicons name="cart-outline" size={64} color="#adb5bd" />
        <Text className="text-xl text-text-secondary mt-4 mb-2">Your cart is empty</Text>
        <Text className="text-text-muted mb-6">Add some products to get started</Text>
        <CustomButton
          title="Start Shopping"
          onPress={() => router.back()}
          accessibilityLabel="Start shopping button"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={{ padding: 8, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        maxToRenderPerBatch={10}
      />
      <View className="absolute bottom-0 left-0 right-0 bg-surface p-4 border-t border-border">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-text-primary">Total:</Text>
          <Text className="text-xl font-bold text-primary">${getTotal().toFixed(2)}</Text>
        </View>
        <CustomButton
          title="Proceed to Checkout"
          onPress={() => router.push('/checkout')}
          variant="success"
          accessibilityLabel="Proceed to checkout button"
        />
      </View>
    </View>
  );
}
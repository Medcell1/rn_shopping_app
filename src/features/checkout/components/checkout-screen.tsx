import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { useCartStore } from '../../cart/store/cart-store';
import { CustomButton } from '@/src/shared/components/custom-button';
import { ErrorMessage } from '@/src/shared/components/error-message';
import { LoadingSpinner } from '@/src/shared/components/loading-spinner';
import { useCheckout } from '../hooks/use-checkout';

export default function CheckoutScreen() {
  const { items, getTotal } = useCartStore();
  const router = useRouter();
  const { checkout, isLoading, error } = useCheckout();

  const handleCheckout = async () => {
    await checkout();
    router.dismissAll();
    router.replace('/(tabs)');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        <View className="items-center mb-6">
          <Text className="text-2xl font-bold text-text-primary mb-2">Order Summary</Text>
          <Text className="text-text-secondary">Review your items before placing the order</Text>
        </View>
        {error && <ErrorMessage message={error} />}
        <View className="bg-surface rounded-lg border border-border p-4 mb-4">
          <Text className="text-lg font-semibold text-text-primary mb-4">Items</Text>
          {items.map((item) => (
            <View
              key={item.product.id}
              className="flex-row justify-between items-center py-2 border-b border-border last:border-b-0"
            >
              <View className="flex-1">
                <Text className="font-medium text-text-primary">{item.product.name}</Text>
                <Text className="text-text-secondary text-sm">
                  ${item.product.price.toFixed(2)} × {item.quantity}
                </Text>
              </View>
              <Text className="font-bold text-text-primary">
                ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
        <View className="bg-surface rounded-lg border border-border p-4 mb-6">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold text-text-primary">Total:</Text>
            <Text className="text-xl font-bold text-success">${getTotal().toFixed(2)}</Text>
          </View>
        </View>
        <CustomButton
          title="Place Order"
          onPress={handleCheckout}
          variant="success"
          loading={isLoading}
          className="mb-4"
          accessibilityLabel="Place order button"
        />
        <CustomButton
          title="Back to Cart"
          onPress={() => router.back()}
          variant="outline"
          accessibilityLabel="Back to cart button"
        />
      </ScrollView>
    </View>
  );
}
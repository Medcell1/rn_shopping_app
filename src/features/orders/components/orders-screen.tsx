import { ErrorMessage } from '@/src/shared/components/error-message';
import { SkeletonLoader } from '@/src/shared/components/skeleton-loader';
import { FlatList, Text, View } from 'react-native';
import { OrderItem } from './order-item';
import { useOrders } from '../hooks/use-order';


export default function OrdersScreen() {
  const { data: orders = [], isLoading, error, refetch } = useOrders();

  if (isLoading) return <SkeletonLoader />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;

  if (orders.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-xl text-text-secondary mb-2">No orders yet</Text>
        <Text className="text-text-muted">Your order history will appear here</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 8 }}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        maxToRenderPerBatch={10}
      />
    </View>
  );
}
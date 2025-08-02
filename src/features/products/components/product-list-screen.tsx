import { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../../cart/store/cart-store';
import { LAYOUT } from '../../../constants/layout';
import { CustomButton } from '@/src/shared/components/custom-button';
import { ErrorMessage } from '@/src/shared/components/error-message';
import { SkeletonLoader } from '@/src/shared/components/skeleton-loader';
import { useProducts } from '../hooks/use-product';
import { AddProductForm } from './add-product-form';
import { ProductCard } from './product-card';
import type { Product } from '@/src/shared/types';

export default function ProductListScreen() {
  const { addItem } = useCartStore((state) => ({ addItem: state.addItem }));
  const [showAddModal, setShowAddModal] = useState(false);
  const { data: products = [], isLoading, error, refetch } = useProducts();

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => <ProductCard item={item} addItem={addItem} />,
    [addItem]
  );

  if (isLoading) return <SkeletonLoader />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row justify-between items-center px-4 py-3 bg-surface border-b border-border">
        <Text className="text-lg font-semibold text-text-primary">All Products</Text>
        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          className="bg-success rounded-full p-3"
          accessibilityLabel="Add new product"
        >
          <Ionicons name="add" size={22} color="white" />
        </TouchableOpacity>
      </View>
      {products.length === 0 ? (
        <View className="flex-1 justify-center items-center px-4">
          <Ionicons name="cube" size={64} color="#999" />
          <Text className="text-center text-base text-text-secondary mt-2">No products available yet.</Text>
          <CustomButton
            title="Add your first product"
            onPress={() => setShowAddModal(true)}
            variant="primary"
            size="md"
            className="mt-4"
            accessibilityLabel="Add first product"
          />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={LAYOUT.NUM_COLUMNS}
          contentContainerStyle={{ padding: LAYOUT.CARD_MARGIN + 4, paddingBottom: 16 }}
          removeClippedSubviews
          maxToRenderPerBatch={10}
          initialNumToRender={8}
          windowSize={5}
        />
      )}
      <AddProductForm visible={showAddModal} onClose={() => setShowAddModal(false)} />
    </SafeAreaView>
  );
}
import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../store/cart-store';
import { CartItemType } from '../types/cart';

interface CartItemProps {
  item: CartItemType;
}

const CartItemComponent = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = useCallback(
    (change: number) => {
      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        removeItem(item.product.id);
      } else {
        updateQuantity(item.product.id, newQuantity);
      }
    },
    [item.product.id, item.quantity, updateQuantity, removeItem]
  );

  return (
    <View className="bg-surface rounded-lg border border-border m-2 p-4">
      <View className="flex-row">
        {item.product.image_url ? (
          <Image
            source={{uri: item.product.image_url}}
            className="w-16 h-16 rounded mr-3"
            resizeMode="cover"
            style={{ borderRadius: 8 }}
          />
        ) : (
          <View className="w-16 h-16 rounded mr-3 bg-gray-100 items-center justify-center">
            <Ionicons name="image-outline" size={24} color="#c4c4c8" />
          </View>
        )}
        <View className="flex-1">
          <Text className="text-lg font-semibold text-text-primary mb-1">
            {item.product.name}
          </Text>
          <Text className="text-primary font-bold mb-2">
            ${item.product.price.toFixed(2)}
          </Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity
                className="bg-border rounded w-8 h-8 justify-center items-center"
                onPress={() => handleQuantityChange(-1)}
                accessibilityLabel={`Decrease quantity of ${item.product.name}`}
              >
                <Ionicons name="remove" size={16} color="#6c757d" />
              </TouchableOpacity>
              <Text className="mx-3 text-base font-semibold text-text-primary">
                {item.quantity}
              </Text>
              <TouchableOpacity
                className="bg-border rounded w-8 h-8 justify-center items-center"
                onPress={() => handleQuantityChange(1)}
                accessibilityLabel={`Increase quantity of ${item.product.name}`}
              >
                <Ionicons name="add" size={16} color="#6c757d" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => removeItem(item.product.id)}
              accessibilityLabel={`Remove ${item.product.name} from cart`}
            >
              <Ionicons name="trash-outline" size={20} color="#dc3545" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="border-t border-border mt-3 pt-3">
        <Text className="text-right font-semibold text-text-primary">
          Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export const CartItem = React.memo(CartItemComponent);
CartItem.displayName = 'CartItem';

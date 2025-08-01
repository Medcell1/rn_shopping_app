import React from 'react';
import { View, Text } from 'react-native';
import type { Order } from '../types/order';

interface OrderItemProps {
  item: Order;
}

const OrderItemComponent = ({ item }: OrderItemProps) => (
  <View className="bg-surface rounded-lg border border-border m-2 p-4">
    <View className="flex-row justify-between items-center mb-3">
      <Text className="text-lg font-semibold text-text-primary">
        Order #{item.id.slice(0, 8)}
      </Text>
      <Text className="text-lg font-bold text-success">
        ${item.total.toFixed(2)}
      </Text>
    </View>
    <Text className="text-text-secondary mb-3">
      {new Date(item.created_at).toLocaleDateString()} at{' '}
      {new Date(item.created_at).toLocaleTimeString()}
    </Text>
    <View className="border-t border-border pt-3">
      <Text className="font-medium text-text-primary mb-2">Items:</Text>
      {item.items.map((cartItem, index) => (
        <Text key={index} className="text-text-secondary text-sm">
          • {cartItem.product.name} x{cartItem.quantity} - $
          {(cartItem.product.price * cartItem.quantity).toFixed(2)}
        </Text>
      ))}
    </View>
  </View>
);

export const OrderItem = React.memo(OrderItemComponent);
OrderItem.displayName = 'OrderItem';

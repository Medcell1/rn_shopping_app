import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { LAYOUT } from '../../../constants/layout';
import { CustomButton } from '@/src/shared/components/custom-button';
import { Product } from '../types/product';

interface ProductCardProps {
    item: Product;
    addItem: (item: Product) => void;
}

const ProductCardComponent = ({ item, addItem }: ProductCardProps) => (
    <View
        className="bg-surface rounded-lg border border-border m-1 overflow-hidden"
        style={{
            width: LAYOUT.CARD_WIDTH,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 3,
        }}
    >
        <View style={{ width: '100%', aspectRatio: 1.2, backgroundColor: '#f5f5f7' }}>
            {item.image_url?.trim() ? (
                <Image
                    source={{ uri: item.image_url }}
                    className="w-full h-full"
                    resizeMode="cover"

                />
            ) : (
                <View className="flex-1 items-center justify-center">
                    <Ionicons name="image" size={48} color="#c4c4c8" />
                    <Text className="text-sm text-text-secondary mt-1">No image</Text>
                </View>
            )}
        </View>

        <View className="p-3">
            <Text
                className="text-base font-semibold text-text-primary"
                numberOfLines={1}
            >
                {item.name}
            </Text>
            <Text className="text-lg font-bold text-primary mb-2">
                ${item.price.toFixed(2)}
            </Text>
            <CustomButton
                title="Add to Cart"
                onPress={() => addItem(item)}
                size="sm"
                className="w-full bg-black"
                accessibilityLabel={`Add ${item.name} to cart`}
                accessibilityRole="button"
            />
        </View>
    </View>
);

export const ProductCard = React.memo(ProductCardComponent);
ProductCard.displayName = 'ProductCard';

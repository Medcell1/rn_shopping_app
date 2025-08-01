import React from 'react';
import { View } from 'react-native';

const SkeletonLoaderComponent = () => (
  <View className="flex-1 p-4">
    {[...Array(4)].map((_, index) => (
      <View key={index} className="bg-gray-200 rounded-lg m-2 h-40 animate-pulse" />
    ))}
  </View>
);

export const SkeletonLoader = React.memo(SkeletonLoaderComponent);
SkeletonLoader.displayName = 'SkeletonLoader';

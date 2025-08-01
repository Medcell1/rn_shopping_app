import React from 'react';
import { View, ActivityIndicator } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

const LoadingSpinnerComponent = ({ size = 'large', color = '#007bff' }: LoadingSpinnerProps) => (
  <View className="flex-1 justify-center items-center bg-background">
    <ActivityIndicator size={size} color={color} />
  </View>
);

export const LoadingSpinner = React.memo(LoadingSpinnerComponent);
LoadingSpinner.displayName = 'LoadingSpinner';

import React from 'react';
import { View, Text } from 'react-native';
import { CustomButton } from './custom-button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessageComponent = ({ message, onRetry }: ErrorMessageProps) => (
  <View className="flex-1 justify-center items-center p-6 bg-background">
    <View className="bg-surface rounded-lg p-6 border border-border">
      <Text className="text-danger text-center text-lg">{message}</Text>
      {onRetry && (
        <CustomButton
          title="Retry"
          onPress={onRetry}
          variant="primary"
          className="mt-4"
          accessibilityLabel="Retry button"
        />
      )}
    </View>
  </View>
);

export const ErrorMessage = React.memo(ErrorMessageComponent);
ErrorMessage.displayName = 'ErrorMessage';

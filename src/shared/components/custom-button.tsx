import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const CustomButtonComponent = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...rest
}: CustomButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return 'bg-surface border border-border';
      case 'success':
        return 'bg-success';
      case 'danger':
        return 'bg-danger';
      case 'outline':
        return 'bg-transparent border border-border';
      default:
        return 'bg-primary';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'success':
      case 'danger':
        return 'text-white';
      case 'secondary':
      case 'outline':
        return 'text-text-primary';
      default:
        return 'text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2';
      case 'md':
        return 'px-4 py-3';
      case 'lg':
        return 'px-6 py-4';
      default:
        return 'px-4 py-3';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${getVariantClasses()} ${getSizeClasses()} rounded ${
        disabled || loading ? 'opacity-50' : ''
      } items-center justify-center rounded-lg ${className}`}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getTextColor().includes('white') ? 'white' : '#212529'}
        />
      ) : (
        <Text className={`${getTextColor()} font-medium text-base`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export const CustomButton = React.memo(CustomButtonComponent);
CustomButton.displayName = 'CustomButton';

import React from 'react';
import { View, Text, TextInput, Platform, type TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
}

const CustomInputComponent = ({
  label,
  error,
  className = '',
  multiline,
  style,
  ...props
}: CustomInputProps) => {
  const isSingleLine = !multiline;

  return (
    <View className={`mb-4 ${className}`}>
      {label && <Text className="text-text-primary font-medium mb-2">{label}</Text>}
     <TextInput
  {...props}
  placeholderTextColor="#6c757d"
  multiline={multiline}
  {...(Platform.OS === 'android'
    ? { textAlignVertical: multiline ? 'top' : 'center' as const }
    : {})}
  className={`bg-surface border rounded px-4 py-3 ${
    error ? 'border-danger' : 'border-border'
  } text-base text-text-primary`}
  style={[
    multiline
      ? {
          minHeight: 100,
          paddingTop: 12,
          textAlignVertical: 'top',
        }
      : {
          height: 48,
          lineHeight: 20,
          textAlignVertical: 'center',
        },
    style as any,
  ]}
/>

      {error && <Text className="text-danger text-sm mt-1">{error}</Text>}
    </View>
  );
};

export const CustomInput = React.memo(CustomInputComponent);
CustomInput.displayName = 'CustomInput';

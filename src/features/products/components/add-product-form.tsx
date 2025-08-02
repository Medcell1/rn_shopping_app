import { useCallback, useState } from 'react';
import { Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { CustomButton } from '@/src/shared/components/custom-button';
import { CustomInput } from '@/src/shared/components/custom-input';
import { ErrorMessage } from '@/src/shared/components/error-message';
import { useAddProduct } from '../hooks/use-product';
import React from 'react';

interface AddProductFormProps {
  visible: boolean;
  onClose: () => void;
}

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
  image_url: z.string().url('Invalid URL').optional(),
});

export const AddProductForm = React.memo(({ visible, onClose }: AddProductFormProps) => {
  const [formData, setFormData] = useState({ name: '', price: '', image_url: '' });
  const [errors, setErrors] = useState<{ name?: string; price?: string; image_url?: string; general?: string }>({});
  const { mutate: addProduct, isPending: adding } = useAddProduct();

  const handleInputChange = useCallback((field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleAddProduct = useCallback(() => {
    setErrors({});
    try {
      productSchema.parse(formData);
      addProduct(formData, {
        onSuccess: () => {
          setFormData({ name: '', price: '', image_url: '' });
          onClose();
        },
        onError: (error) => {
          if (error instanceof z.ZodError) {
            setErrors(error.issues.reduce((acc, issue) => ({
              ...acc,
              [issue.path[0]]: issue.message,
            }), {}));
          } else {
            setErrors({ general: error.message });
          }
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.issues.reduce((acc, issue) => ({
          ...acc,
          [issue.path[0]]: issue.message,
        }), {}));
      }
    }
  }, [formData, addProduct, onClose]);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-row justify-between items-center px-4 py-3 bg-surface border-b border-border">
          <TouchableOpacity onPress={onClose} accessibilityLabel="Cancel adding product">
            <Text className="text-text-secondary">Cancel</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-text-primary">Add Product</Text>
          <TouchableOpacity onPress={handleAddProduct} disabled={adding} accessibilityLabel="Save product">
            <Text className={`text-primary font-medium ${adding ? 'opacity-50' : ''}`}>
              {adding ? 'Adding...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="p-4 flex-1">
          {errors.general && <ErrorMessage message={errors.general} />}
          <CustomInput
            label="Product Name"
            placeholder="Enter product name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            error={errors.name}
            accessibilityLabel="Product name input"
            editable={!adding}
          />
          <CustomInput
            label="Price"
            placeholder="0.00"
            value={formData.price}
            onChangeText={(text) => handleInputChange('price', text)}
            keyboardType="decimal-pad"
            error={errors.price}
            accessibilityLabel="Price input"
            editable={!adding}
          />
          <CustomInput
            label="Image URL (Optional)"
            placeholder="https://example.com/image.jpg"
            value={formData.image_url}
            onChangeText={(text) => handleInputChange('image_url', text)}
            autoCapitalize="none"
            error={errors.image_url}
            accessibilityLabel="Image URL input"
            editable={!adding}
          />
          <View className="mt-6">
            <CustomButton
              title={adding ? 'Adding Product...' : 'Add Product'}
              onPress={handleAddProduct}
              disabled={adding}
              accessibilityLabel="Add product button"
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
});
AddProductForm.displayName = 'AddProductForm'; 
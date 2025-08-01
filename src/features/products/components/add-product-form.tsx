import { useState } from 'react';
import { Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { supabase } from '../../../shared/utils/supabase';
import { CustomButton } from '@/src/shared/components/custom-button';
import { CustomInput } from '@/src/shared/components/custom-input';
import { ErrorMessage } from '@/src/shared/components/error-message';

const productSchema = z.object({
  name: z.string().nonempty('Product name is required'),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
  image_url: z.string().url('Invalid URL').optional(),
});

interface AddProductFormProps {
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export const AddProductForm = ({ visible, onClose, onAdd }: AddProductFormProps) => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image_url: '' });
  const [errors, setErrors] = useState<{ name?: string; price?: string; image_url?: string }>({});
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

const handleAddProduct = async () => {
  try {
    productSchema.parse(newProduct);
    setErrors({});
    setError(null);
    setAdding(true);

    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: newProduct.name.trim(),
        price: parseFloat(newProduct.price),
        image_url: newProduct.image_url ? newProduct.image_url.trim() : null,
      }])
      .select()
      .single();

    if (error) throw error;

    setNewProduct({ name: '', price: '', image_url: '' });
    onAdd();
    onClose();
  } catch (err) {
if (err instanceof z.ZodError) {
  const fieldErrors: { [key: string]: string } = {};
  err.issues.forEach((issue) => {
    const fieldName = issue.path[0];
    if (typeof fieldName === 'string') {
      fieldErrors[fieldName] = issue.message;
    }
  });
  setErrors(fieldErrors);
} else {
  setError((err as any).message || 'Failed to add product');
}

  } finally {
    setAdding(false);
  }
};


  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-row justify-between items-center px-4 py-3 bg-surface border-b border-border">
          <TouchableOpacity onPress={onClose} accessibilityLabel="Cancel adding product">
            <Text className="text-text-secondary">Cancel</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-text-primary">Add Product</Text>
          <TouchableOpacity onPress={handleAddProduct} disabled={adding} accessibilityLabel="Save product">
            <Text className="text-primary font-medium">{adding ? 'Adding...' : 'Save'}</Text>
          </TouchableOpacity>
        </View>
        <View className="p-4 flex-1">
          {error && <ErrorMessage message={error} />}
          <CustomInput
            label="Product Name"
            placeholder="Enter product name"
            value={newProduct.name}
            onChangeText={(text) => setNewProduct((prev) => ({ ...prev, name: text }))}
            error={errors.name}
            accessibilityLabel="Product name input"
          />
          <CustomInput
            label="Price"
            placeholder="0.00"
            value={newProduct.price}
            onChangeText={(text) => setNewProduct((prev) => ({ ...prev, price: text }))}
            keyboardType="decimal-pad"
            error={errors.price}
            accessibilityLabel="Price input"
          />
          <CustomInput
            label="Image URL (Optional)"
            placeholder="https://example.com/image.jpg"
            value={newProduct.image_url}
            onChangeText={(text) => setNewProduct((prev) => ({ ...prev, image_url: text }))}
            autoCapitalize="none"
            error={errors.image_url}
            accessibilityLabel="Image URL input"
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
};
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../shared/utils/supabase';
import { Product } from '../types/product';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().nonempty('Product name is required'),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
  image_url: z.string().url('Invalid URL').optional(),
});

export const useProducts = (page = 1, pageSize = 10) => {
  return useQuery<Product[]>({
    queryKey: ['products', page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Product,
    Error,
    { name: string; price: string; image_url: string }
  >({
    mutationFn: async (newProduct) => {
      const validatedData = productSchema.parse(newProduct);
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: validatedData.name.trim(),
          price: parseFloat(validatedData.price),
          image_url: validatedData.image_url ? validatedData.image_url.trim() : null,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
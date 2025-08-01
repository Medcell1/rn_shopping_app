import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../../shared/utils/supabase';
import { Product } from '../types/product';
import { useState, useEffect } from 'react';

export const useProducts = (page = 1, pageSize = 10) => {
  const [cachedProducts, setCachedProducts] = useState<Product[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('products').then((cached) => {
      if (cached) setCachedProducts(JSON.parse(cached));
    });
  }, [page]);

  return useQuery<Product[]>({
    queryKey: ['products', page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;

      await AsyncStorage.setItem('products', JSON.stringify(data));
      return data;
    },
    placeholderData: cachedProducts,
  });
};

import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../../shared/utils/supabase';
import type { Order } from '../types/order';
import { useState, useEffect } from 'react';

export const useOrders = (page = 1, pageSize = 10) => {
  const [initialData, setInitialData] = useState<Order[] | undefined>(undefined);

  useEffect(() => {
    AsyncStorage.getItem('orders').then((cached) => {
      if (cached) {
        setInitialData(JSON.parse(cached));
      }
    });
  }, []);

  return useQuery<Order[]>({
    queryKey: ['orders', page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);
      if (error) throw error;
      await AsyncStorage.setItem('orders', JSON.stringify(data));
      return data;
    },
    initialData,  // <-- sync value or undefined
  });
};

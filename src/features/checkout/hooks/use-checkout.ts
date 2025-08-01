import { useState } from 'react';
import { supabase } from '../../../shared/utils/supabase';
import { useCartStore } from '../../cart/store/cart-store';

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { items, getTotal, clearCart } = useCartStore();

  const checkout = async () => {
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in to checkout');
        return;
      }

      const { error: dbError } = await supabase.from('orders').insert([
        {
          user_id: user.id,
          total: getTotal(),
          items,
        },
      ]);

      if (dbError) throw dbError;

      clearCart();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { checkout, isLoading, error };
};
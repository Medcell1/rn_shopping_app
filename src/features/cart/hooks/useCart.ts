import { useCartStore } from '../store/cart-store';

export const useCart = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart, getTotal, getItemCount } = useCartStore();
  return { items, addItem, removeItem, updateQuantity, clearCart, getTotal, getItemCount };
};
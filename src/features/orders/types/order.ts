import { CartItemType } from "@/src/shared/types";

export interface Order {
  id: string;
  user_id: string;
  total: number;
  items: CartItemType[];
  created_at: string;
}
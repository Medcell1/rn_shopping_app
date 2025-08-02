import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../shared/utils/supabase";
import type { Order } from "../types/order";

export const useOrders = (page = 1, pageSize = 10) => {
  return useQuery<Order[]>({
    queryKey: ["orders", page, pageSize],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);
      if (error) throw error;
      return data ?? [];
    },
  });
};

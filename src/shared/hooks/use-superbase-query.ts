import { useState } from 'react';
import { supabase } from '../utils/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

export const useSupabaseQuery = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (
    query: () => Promise<{ data: T | null; error: PostgrestError | null }>
  ) => {
    setLoading(true);
    try {
      const { data, error } = await query();
      if (error) throw new Error(error.message);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};
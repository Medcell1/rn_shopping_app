import { useState } from 'react';
import { supabase } from '../../../shared/utils/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err: any) {
      setError((err as PostgrestError).message);
    }
  };

  const signUp = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } catch (err: any) {
      setError((err as PostgrestError).message);
    }
  };

  return { signIn, signUp, error };
};
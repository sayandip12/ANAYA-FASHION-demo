import { supabase } from '../config/supabaseClient';

export const authService = {
  login: async (email, password) => {
    if (!supabase) return { user: null, error: new Error('Supabase client not initialized') };
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    return { user: data?.user, error };
  },
  
  logout: async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  },
  
  checkAuth: async () => {
    if (!supabase) return false;
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  },

  onAuthStateChange: (callback) => {
    if (!supabase) return { data: { subscription: { unsubscribe: () => {} } } };
    return supabase.auth.onAuthStateChange(callback);
  }
};

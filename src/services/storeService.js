import { supabase } from '../config/supabaseClient';
import { BUSINESS_CONFIG as INITIAL_CONFIG } from '../config/businessConfig';

let localConfig = { ...INITIAL_CONFIG };

export const storeService = {
  async getStoreConfig() {
    if (supabase) {
      const { data, error } = await supabase.from('store_settings').select('*').single();
      if (error) {
        console.warn("Supabase not fully setup, returning local config", error);
        return { ...localConfig };
      }
      if (data) return data;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    return { ...localConfig };
  },

  async updateStoreConfig(updates) {
    if (supabase) {
      const { data, error } = await supabase.from('store_settings').update(updates).eq('id', 1).select();
      if (error) throw error;
      return data[0];
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    localConfig = { ...localConfig, ...updates };
    return { ...localConfig };
  }
};

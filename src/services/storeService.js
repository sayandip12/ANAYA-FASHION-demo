import { supabase } from '../config/supabaseClient';

export const storeService = {
  async getStoreConfig() {
    if (!supabase) throw new Error('Supabase client not initialized.');
    const { data, error } = await supabase.from('store_settings').select('*').single();
    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      throw error;
    }
    
    return {
      name: data.name,
      tagline: data.tagline,
      phone: data.phone,
      whatsappNumber: data.whatsapp_number,
      address: data.address,
      mapEmbedUrl: data.map_embed_url,
      storeHours: data.store_hours
    };
  },

  async updateStoreConfig(id, updates) {
    if (!supabase) throw new Error('Supabase client not initialized.');
    
    const dbUpdates = {
      name: updates.name,
      tagline: updates.tagline,
      phone: updates.phone,
      whatsapp_number: updates.whatsappNumber,
      address: updates.address,
      map_embed_url: updates.mapEmbedUrl,
      store_hours: updates.storeHours,
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('store_settings')
      .update(dbUpdates)
      .eq('id', id)
      .select();
      
    if (error) throw error;
    
    return {
      name: data[0].name,
      tagline: data[0].tagline,
      phone: data[0].phone,
      whatsappNumber: data[0].whatsapp_number,
      address: data[0].address,
      mapEmbedUrl: data[0].map_embed_url,
      storeHours: data[0].store_hours
    };
  }
};

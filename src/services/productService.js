import { supabase } from '../config/supabaseClient';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';

// Mock in-memory store for prototype
let localProducts = [...INITIAL_PRODUCTS];

const generateId = (name) => {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.random().toString(36).substr(2, 5);
};

export const productService = {
  async getProducts() {
    if (supabase) {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      return data;
    }
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...localProducts];
  },

  async getProductById(id) {
    if (supabase) {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    }
    await new Promise(resolve => setTimeout(resolve, 200));
    return localProducts.find(p => p.id === id);
  },

  async addProduct(product) {
    const newProduct = { ...product, id: generateId(product.name) };
    if (supabase) {
      const { data, error } = await supabase.from('products').insert([newProduct]).select();
      if (error) throw error;
      return data[0];
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    localProducts.unshift(newProduct);
    return newProduct;
  },

  async updateProduct(id, updates) {
    if (supabase) {
      const { data, error } = await supabase.from('products').update(updates).eq('id', id).select();
      if (error) throw error;
      return data[0];
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = localProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      localProducts[index] = { ...localProducts[index], ...updates };
      return localProducts[index];
    }
    throw new Error('Product not found');
  },

  async deleteProduct(id) {
    if (supabase) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    localProducts = localProducts.filter(p => p.id !== id);
    return true;
  },

  async uploadImage(file) {
    if (supabase) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    }
    
    // For local prototype, we use a fake URL or create an object URL
    await new Promise(resolve => setTimeout(resolve, 500));
    return URL.createObjectURL(file);
  }
};

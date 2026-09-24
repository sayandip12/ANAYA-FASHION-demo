import { useState, useEffect } from 'react';
import { storeService } from '../services/storeService';
import { BUSINESS_CONFIG as fallbackConfig } from '../config/businessConfig';

let cachedConfig = null;

export const useStoreConfig = () => {
  const [config, setConfig] = useState(cachedConfig || fallbackConfig);
  const [loading, setLoading] = useState(!cachedConfig);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await storeService.getStoreConfig();
        if (data) {
          const merged = { ...fallbackConfig, ...data };
          cachedConfig = merged;
          setConfig(merged);
        }
      } catch (e) {
        console.error('Error loading store config', e);
      } finally {
        setLoading(false);
      }
    };
    
    if (!cachedConfig) {
      loadConfig();
    }
  }, []);

  return { config, loading };
};

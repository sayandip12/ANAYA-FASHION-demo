import { BUSINESS_CONFIG } from '../config/businessConfig';

export const generateWhatsAppLink = (product) => {
  const number = BUSINESS_CONFIG.whatsappNumber;
  let message = BUSINESS_CONFIG.defaultMessage;
  
  if (product) {
    message = `${BUSINESS_CONFIG.defaultMessage} the ${product.name} priced at ₹${product.price.toLocaleString('en-IN')}. I would like to know about availability and viewing.`;
  }
  
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

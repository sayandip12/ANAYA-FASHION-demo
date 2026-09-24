export const generateWhatsAppLink = (product = null, config = null) => {
  const activeConfig = config || {};
  const number = activeConfig.whatsappNumber || '918240718208';
  let message = activeConfig.defaultMessage || 'Hello ANAYA, I am interested in';
  
  if (product) {
    message = `${activeConfig.defaultMessage || 'Hello ANAYA, I am interested in'} the ${product.name} priced at ₹${product.price.toLocaleString('en-IN')}. I would like to know about availability and viewing.`;
  }
  
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

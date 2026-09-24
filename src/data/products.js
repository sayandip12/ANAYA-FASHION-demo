import { IMAGES } from '../config/imageConfig';

export const PRODUCTS = [
  // WOMEN - SAREES
  {
    id: 'saree-emerald-heritage',
    name: 'Emerald Heritage Silk Saree',
    category: 'Saree',
    gender: 'Women',
    price: 8900,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop', // green saree
    description: 'A timeless emerald green silk saree featuring intricate zari work. Perfect for weddings and grand evening celebrations.',
    fabric: 'Pure Kanchipuram Silk',
    sizes: ['Free Size'],
    availability: 'In Stock',
    occasions: ['Wedding', 'Reception', 'Festive']
  },
  {
    id: 'saree-crimson-zari',
    name: 'Crimson Zari Banarasi Saree',
    category: 'Saree',
    gender: 'Women',
    price: 9800,
    image: 'https://images.unsplash.com/photo-1583391733958-d15ce69c8789?q=80&w=800&auto=format&fit=crop', // red saree
    description: 'Rich crimson Banarasi silk woven with traditional golden motifs, reflecting centuries of heritage.',
    fabric: 'Banarasi Silk',
    sizes: ['Free Size'],
    availability: 'In Stock',
    occasions: ['Wedding', 'Bridal', 'Traditional']
  },
  {
    id: 'saree-ivory-pearl',
    name: 'Ivory Pearl Organza Saree',
    category: 'Saree',
    gender: 'Women',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1617260742131-a08ceba88f34?q=80&w=800&auto=format&fit=crop', // light saree
    description: 'Delicate ivory organza adorned with pearl hand-embroidery. A lightweight yet highly sophisticated choice.',
    fabric: 'Organza',
    sizes: ['Free Size'],
    availability: 'Made to Order (2 Weeks)',
    occasions: ['Reception', 'Party', 'Engagement']
  },
  {
    id: 'saree-rose-gold',
    name: 'Rose Gold Silk Saree',
    category: 'Saree',
    gender: 'Women',
    price: 8400,
    image: 'https://images.unsplash.com/photo-1572804013309-82a89b47afc2?q=80&w=800&auto=format&fit=crop', // gold saree
    description: 'Modern metallic rose gold tones blended with classic silk drapery for contemporary elegance.',
    fabric: 'Silk Blend',
    sizes: ['Free Size'],
    availability: 'In Stock',
    occasions: ['Party', 'Festive', 'Reception']
  },

  // WOMEN - LEHENGAS
  {
    id: 'lehenga-royal-emerald',
    name: 'Royal Emerald Bridal Lehenga',
    category: 'Lehenga',
    gender: 'Women',
    price: 18900,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop', // dress
    description: 'A masterpiece of bridal wear. Heavy zardosi work on deep emerald velvet, creating a truly regal silhouette.',
    fabric: 'Premium Velvet & Net',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom'],
    availability: 'Made to Order (4-6 Weeks)',
    occasions: ['Wedding', 'Bridal']
  },
  {
    id: 'lehenga-crimson-heritage',
    name: 'Crimson Heritage Lehenga',
    category: 'Lehenga',
    gender: 'Women',
    price: 16500,
    image: 'https://images.unsplash.com/photo-1621786030484-4c8eaebfacdd?q=80&w=800&auto=format&fit=crop', // dress red
    description: 'Classic crimson red bridal lehenga with traditional gota patti and threadwork detailing.',
    fabric: 'Raw Silk',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom'],
    availability: 'In Stock',
    occasions: ['Wedding', 'Bridal', 'Traditional']
  },
  {
    id: 'lehenga-champagne-embroidered',
    name: 'Champagne Embroidered Lehenga',
    category: 'Lehenga',
    gender: 'Women',
    price: 14900,
    image: 'https://images.unsplash.com/photo-1585468274952-66591eb14165?q=80&w=800&auto=format&fit=crop', // dress light
    description: 'Subtle champagne tones with intricate mirror and thread embroidery, perfect for receptions.',
    fabric: 'Georgette',
    sizes: ['S', 'M', 'L', 'Custom'],
    availability: 'Made to Order (3 Weeks)',
    occasions: ['Reception', 'Engagement', 'Party']
  },

  // WOMEN - ETHNIC WEAR
  {
    id: 'ethnic-emerald-anarkali',
    name: 'Emerald Anarkali',
    category: 'Ethnic Wear',
    gender: 'Women',
    price: 7900,
    image: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=800&auto=format&fit=crop', 
    description: 'Floor-length emerald Anarkali suit with golden block prints and a contrasting dupatta.',
    fabric: 'Chanderi Silk',
    sizes: ['S', 'M', 'L', 'XL'],
    availability: 'In Stock',
    occasions: ['Festive', 'Traditional']
  },
  {
    id: 'ethnic-ivory-embroidered',
    name: 'Ivory Embroidered Anarkali',
    category: 'Ethnic Wear',
    gender: 'Women',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1550614000-4b998d36eb8b?q=80&w=800&auto=format&fit=crop', 
    description: 'Pristine ivory Anarkali featuring delicate lucknowi chikankari embroidery.',
    fabric: 'Georgette',
    sizes: ['S', 'M', 'L', 'XL'],
    availability: 'In Stock',
    occasions: ['Festive', 'Party', 'Formal']
  },

  // MEN - BLAZERS & SUITS
  {
    id: 'suit-midnight-blazer',
    name: 'Midnight Tailored Blazer',
    category: 'Blazer',
    gender: 'Men',
    price: 9900,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
    description: 'A sharp, midnight blue tailored blazer that easily transitions from formal events to evening parties.',
    fabric: 'Premium Wool Blend',
    sizes: ['38', '40', '42', '44', '46'],
    availability: 'In Stock',
    occasions: ['Party', 'Formal', 'Reception']
  },
  {
    id: 'suit-classic-black',
    name: 'Classic Black Suit',
    category: 'Suit',
    gender: 'Men',
    price: 14500,
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop',
    description: 'The quintessential black two-piece suit. Expertly tailored for a flawless fit.',
    fabric: 'Italian Wool',
    sizes: ['38', '40', '42', '44', '46'],
    availability: 'In Stock',
    occasions: ['Formal', 'Reception', 'Wedding']
  },

  // MEN - PANJABI & KURTA
  {
    id: 'panjabi-ivory-heritage',
    name: 'Ivory Heritage Panjabi',
    category: 'Panjabi',
    gender: 'Men',
    price: 6900,
    image: 'https://images.unsplash.com/photo-1598522325791-389fcc430638?q=80&w=800&auto=format&fit=crop',
    description: 'A classic ivory Panjabi featuring subtle tone-on-tone embroidery on the collar and placket.',
    fabric: 'Premium Silk Cotton',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availability: 'In Stock',
    occasions: ['Wedding', 'Festive', 'Traditional']
  },
  {
    id: 'panjabi-emerald-embroidered',
    name: 'Emerald Embroidered Panjabi',
    category: 'Panjabi',
    gender: 'Men',
    price: 7900,
    image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=800&auto=format&fit=crop',
    description: 'Deep emerald Panjabi designed for festive wear, featuring rich golden zari motifs.',
    fabric: 'Art Silk',
    sizes: ['S', 'M', 'L', 'XL'],
    availability: 'In Stock',
    occasions: ['Festive', 'Traditional', 'Party']
  }
];

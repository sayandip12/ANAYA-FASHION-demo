-- ==============================================================================
-- ANAYA FASHION - SUPABASE SCHEMA & SEED (MIGRATION SAFE)
-- Instructions: Run this entire file in your Supabase SQL Editor.
-- ==============================================================================

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL,
    gender TEXT NOT NULL,
    description TEXT,
    fabric TEXT,
    sizes TEXT[] DEFAULT '{}',
    availability TEXT DEFAULT 'In Stock',
    featured BOOLEAN DEFAULT false,
    image TEXT,
    occasions TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.store_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    tagline TEXT,
    phone TEXT,
    whatsapp_number TEXT,
    address TEXT,
    map_embed_url TEXT,
    store_hours TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Handle potential column renames from older schema iterations safely
DO $$
BEGIN
    IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name='store_settings' AND column_name='whatsappNumber') THEN
        ALTER TABLE public.store_settings RENAME COLUMN "whatsappNumber" TO whatsapp_number;
    END IF;
    IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name='store_settings' AND column_name='mapEmbedUrl') THEN
        ALTER TABLE public.store_settings RENAME COLUMN "mapEmbedUrl" TO map_embed_url;
    END IF;
    IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name='store_settings' AND column_name='storeHours') THEN
        ALTER TABLE public.store_settings RENAME COLUMN "storeHours" TO store_hours;
    END IF;
END $$;

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- 3. Safely Recreate RLS Policies for Products
DROP POLICY IF EXISTS "Allow public read access on products" ON public.products;
DROP POLICY IF EXISTS "Allow anon insert on products" ON public.products;
DROP POLICY IF EXISTS "Allow anon update on products" ON public.products;
DROP POLICY IF EXISTS "Allow anon delete on products" ON public.products;
DROP POLICY IF EXISTS "Allow authenticated insert on products" ON public.products;
DROP POLICY IF EXISTS "Allow authenticated update on products" ON public.products;
DROP POLICY IF EXISTS "Allow authenticated delete on products" ON public.products;

CREATE POLICY "Allow public read access on products"
    ON public.products FOR SELECT
    USING (true);

-- Note: 'authenticated' means ANY logged-in Supabase user. 
-- In a larger team, you would check admin flags here.
CREATE POLICY "Allow authenticated insert on products"
    ON public.products FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on products"
    ON public.products FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on products"
    ON public.products FOR DELETE
    USING (auth.role() = 'authenticated');

-- 4. Safely Recreate RLS Policies for Store Settings
DROP POLICY IF EXISTS "Allow public read access on store_settings" ON public.store_settings;
DROP POLICY IF EXISTS "Allow anon update on store_settings" ON public.store_settings;
DROP POLICY IF EXISTS "Allow authenticated update on store_settings" ON public.store_settings;

CREATE POLICY "Allow public read access on store_settings"
    ON public.store_settings FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated update on store_settings"
    ON public.store_settings FOR UPDATE
    USING (auth.role() = 'authenticated');

-- 5. Setup Storage for Images
-- Create a new bucket called 'images' if it doesn't exist
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Safely Recreate Storage RLS Policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Anon Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Anon Update Access" ON storage.objects;
DROP POLICY IF EXISTS "Anon Delete Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete Access" ON storage.objects;

CREATE POLICY "Public Access"
    ON storage.objects FOR SELECT
    USING ( bucket_id = 'images' );

CREATE POLICY "Authenticated Upload Access"
    ON storage.objects FOR INSERT
    WITH CHECK ( bucket_id = 'images' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated Update Access"
    ON storage.objects FOR UPDATE
    USING ( bucket_id = 'images' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated Delete Access"
    ON storage.objects FOR DELETE
    USING ( bucket_id = 'images' AND auth.role() = 'authenticated' );

-- ==============================================================================
-- 6. SEED DATA (UPSERT)
-- ==============================================================================

-- Seed Products
INSERT INTO public.products (id, name, price, category, gender, description, fabric, sizes, availability, featured, image, occasions)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Midnight Silk Saree', 12500, 'Saree', 'Women', 'A breathtaking midnight blue silk saree with intricate silver zari work.', 'Pure Silk', '{"Free Size"}', 'In Stock', true, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop', '{"Wedding","Festive","Party"}'),
  ('22222222-2222-2222-2222-222222222222', 'Ivory Organza Lehenga', 35000, 'Lehenga', 'Women', 'Ethereal ivory lehenga crafted in lightweight organza, featuring delicate floral embroidery.', 'Organza', '{"S","M","L","Custom"}', 'Made to Order', true, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop', '{"Bridal","Wedding"}'),
  ('33333333-3333-3333-3333-333333333333', 'Classic Black Tuxedo', 22000, 'Suit', 'Men', 'A sharply tailored classic black tuxedo, essential for any formal evening affair.', 'Italian Wool Blend', '{"38","40","42","44"}', 'In Stock', true, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop', '{"Wedding","Party"}'),
  ('44444444-4444-4444-4444-444444444444', 'Royal Blue Sherwani', 28000, 'Sherwani', 'Men', 'Regal royal blue sherwani with subtle tonal embroidery, perfect for the modern groom.', 'Raw Silk', '{"38","40","42"}', 'Low Stock', true, 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop', '{"Bridal","Wedding","Festive"}'),
  ('55555555-5555-5555-5555-555555555555', 'Emerald Green Kurti Set', 6500, 'Kurti Set', 'Women', 'A vibrant emerald green kurti set with palazzo pants and a matching dupatta.', 'Cotton Silk', '{"XS","S","M","L","XL"}', 'In Stock', false, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop', '{"Festive","Traditional"}'),
  ('66666666-6666-6666-6666-666666666666', 'Crimson Red Bridal Saree', 45000, 'Saree', 'Women', 'A traditional crimson red bridal saree featuring heavy gold zari borders and intricate motifs.', 'Kanjeevaram Silk', '{"Free Size"}', 'In Stock', true, 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=800&auto=format&fit=crop', '{"Bridal","Wedding"}'),
  ('77777777-7777-7777-7777-777777777777', 'Charcoal Grey Bandhgala', 18500, 'Suit', 'Men', 'A sophisticated charcoal grey bandhgala suit, tailored to perfection for a sharp silhouette.', 'Premium Wool', '{"38","40","42","44"}', 'In Stock', false, 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=800&auto=format&fit=crop', '{"Wedding","Party","Festive"}'),
  ('88888888-8888-8888-8888-888888888888', 'Pastel Pink Anarkali', 14000, 'Anarkali', 'Women', 'A flowing pastel pink anarkali suit featuring delicate silver threadwork and a sheer dupatta.', 'Georgette', '{"S","M","L"}', 'Low Stock', false, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop', '{"Festive","Party"}'),
  ('99999999-9999-9999-9999-999999999999', 'Maroon Velvet Lehenga', 42000, 'Lehenga', 'Women', 'A luxurious maroon velvet lehenga adorned with rich zardozi embroidery, ideal for winter weddings.', 'Velvet', '{"M","L","Custom"}', 'Made to Order', true, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop', '{"Bridal","Wedding"}'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Ivory & Gold Panjabi', 4500, 'Panjabi', 'Men', 'A classic ivory panjabi with subtle gold detailing around the collar and cuffs.', 'Cotton Silk', '{"38","40","42","44"}', 'In Stock', false, 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=800&auto=format&fit=crop', '{"Traditional","Festive"}'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Navy Blue Party Blazer', 12000, 'Blazer', 'Men', 'A stylish navy blue textured blazer, versatile enough for cocktail parties and evening events.', 'Cotton Blend', '{"38","40","42"}', 'In Stock', false, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=800&auto=format&fit=crop', '{"Party"}'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Mustard Yellow Kurti', 3200, 'Kurti', 'Women', 'A bright mustard yellow daily wear kurti with subtle print details.', 'Cotton', '{"S","M","L","XL"}', 'In Stock', false, 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=800&auto=format&fit=crop', '{"Traditional"}')
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    price = EXCLUDED.price, 
    category = EXCLUDED.category, 
    gender = EXCLUDED.gender, 
    description = EXCLUDED.description, 
    fabric = EXCLUDED.fabric, 
    sizes = EXCLUDED.sizes, 
    availability = EXCLUDED.availability, 
    featured = EXCLUDED.featured, 
    image = EXCLUDED.image, 
    occasions = EXCLUDED.occasions;

-- Seed Store Settings
INSERT INTO public.store_settings (id, name, tagline, phone, whatsapp_number, address, map_embed_url, store_hours)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    'ANAYA',
    'Discover timeless elegance.',
    '08240718208',
    '918240718208',
    'Narkeltala More, near ULUBERIA COLLEGE, Sizberia, Kalibari, Uluberia, Sijberia, Howrah, West Bengal 711315',
    'https://maps.app.goo.gl/kFV7zJarwHzxyFHF7',
    'Mon - Sun: 10:00 AM - 8:00 PM'
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    phone = EXCLUDED.phone,
    whatsapp_number = EXCLUDED.whatsapp_number,
    address = EXCLUDED.address,
    map_embed_url = EXCLUDED.map_embed_url,
    store_hours = EXCLUDED.store_hours;

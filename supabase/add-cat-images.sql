-- Add images to adoption cats
-- Run this in Supabase SQL Editor

-- First, add img_url column if it doesn't exist
ALTER TABLE adoption_cats ADD COLUMN IF NOT EXISTS img_url TEXT;

-- Update cats with their images
-- Images should be uploaded to Supabase Storage or use public URLs

-- Option 1: Using local images (after uploading to Supabase Storage)
-- UPDATE adoption_cats SET img_url = 'YOUR_SUPABASE_STORAGE_URL/cats/Mochi.JPG' WHERE name = 'Mochi';
-- UPDATE adoption_cats SET img_url = 'YOUR_SUPABASE_STORAGE_URL/cats/Oyen.JPG' WHERE name = 'Oyen';
-- UPDATE adoption_cats SET img_url = 'YOUR_SUPABASE_STORAGE_URL/cats/Luna.JPG' WHERE name = 'Luna';
-- UPDATE adoption_cats SET img_url = 'YOUR_SUPABASE_STORAGE_URL/cats/Comot.JPG' WHERE name = 'Comot';
-- UPDATE adoption_cats SET img_url = 'YOUR_SUPABASE_STORAGE_URL/cats/Bella.JPG' WHERE name = 'Bella';

-- Option 2: Using placeholder images for now
UPDATE adoption_cats SET img_url = '/cats/Mochi.JPG' WHERE LOWER(name) = 'mochi';
UPDATE adoption_cats SET img_url = '/cats/Oyen.JPG' WHERE LOWER(name) = 'oyen';
UPDATE adoption_cats SET img_url = '/cats/Luna.JPG' WHERE LOWER(name) = 'luna';
UPDATE adoption_cats SET img_url = '/cats/Comot.JPG' WHERE LOWER(name) = 'comot';
UPDATE adoption_cats SET img_url = '/cats/Bella.JPG' WHERE LOWER(name) = 'bella';

-- Verify updates
SELECT name, img_url FROM adoption_cats;

-- Add address column to adoption_cats table
ALTER TABLE public.adoption_cats ADD COLUMN IF NOT EXISTS address TEXT;

-- =============================================
-- PAWTRACK COMPLETE SCHEMA
-- Run this ENTIRE script in Supabase SQL Editor
-- =============================================

-- Drop all existing tables (clean start)
DROP TABLE IF EXISTS public.schedules CASCADE;
DROP TABLE IF EXISTS public.medical_records CASCADE;
DROP TABLE IF EXISTS public.adoption_cats CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.cats CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. PROFILES (User account info)
-- =============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Pet Owner',
  email TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 2. CATS (User's personal cats)
-- =============================================
CREATE TABLE public.cats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  breed TEXT DEFAULT 'Kampung Cat',
  birthdate DATE,
  weight DECIMAL(5,2),
  gender TEXT,
  color TEXT,
  img_url TEXT,
  vaccinated BOOLEAN DEFAULT FALSE,
  neutered BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 3. MEDICAL RECORDS (Cat health records)
-- =============================================
CREATE TABLE public.medical_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cat_id UUID REFERENCES public.cats(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  record_date DATE NOT NULL,
  record_type TEXT NOT NULL,
  clinic TEXT,
  notes TEXT,
  has_files BOOLEAN DEFAULT FALSE,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 4. SCHEDULES (Cat care tasks)
-- =============================================
CREATE TABLE public.schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cat_id UUID REFERENCES public.cats(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  task_date DATE NOT NULL,
  task_time TEXT,
  task_type TEXT DEFAULT 'task',
  recurrence TEXT DEFAULT 'none',
  status TEXT DEFAULT 'upcoming',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 5. EVENTS (Admin managed - public events)
-- =============================================
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  organizer TEXT,
  event_date DATE,
  event_time TEXT,
  location TEXT,
  event_type TEXT,
  description TEXT,
  img_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 6. ADOPTION CATS (Admin managed)
-- =============================================
CREATE TABLE public.adoption_cats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  breed TEXT DEFAULT 'Kampung Cat',
  age TEXT,
  gender TEXT,
  color TEXT,
  img_url TEXT,
  description TEXT,
  vaccinated BOOLEAN DEFAULT FALSE,
  neutered BOOLEAN DEFAULT FALSE,
  location TEXT,
  contact TEXT,
  status TEXT DEFAULT 'available',
  inquiries INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- DISABLE RLS (for demo/development)
-- =============================================
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cats DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.adoption_cats DISABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Enable all for authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON public.cats;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON public.medical_records;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON public.schedules;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON public.events;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON public.adoption_cats;

-- =============================================
-- GRANT ACCESS TO ALL
-- =============================================
GRANT ALL ON public.profiles TO anon, authenticated, service_role;
GRANT ALL ON public.cats TO anon, authenticated, service_role;
GRANT ALL ON public.medical_records TO anon, authenticated, service_role;
GRANT ALL ON public.schedules TO anon, authenticated, service_role;
GRANT ALL ON public.events TO anon, authenticated, service_role;
GRANT ALL ON public.adoption_cats TO anon, authenticated, service_role;

-- =============================================
-- SAMPLE DATA - EVENTS
-- =============================================
INSERT INTO public.events (title, organizer, event_date, event_time, location, event_type, description) VALUES
  ('SPCA Adoption Drive', 'SPCA Selangor', '2026-03-22', '10AM - 4PM', 'Paradigm Mall PJ', 'adoption', 'Find your new furry friend at our adoption drive'),
  ('Cat Club Show 2026', 'Malaysia Cat Club', '2026-04-05', '9AM - 6PM', 'KLCC Convention Centre', 'show', 'Annual cat show featuring various breeds'),
  ('Pet Vaccination Day', 'DVS Malaysia', '2026-03-30', '8AM - 2PM', 'Multiple locations in KL', 'health', 'Free vaccination for cats and dogs'),
  ('PAWS Charity Bazaar', 'PAWS Animal Welfare', '2026-04-12', '10AM - 5PM', 'The Curve', 'charity', 'Support animal welfare through our charity bazaar');

-- =============================================
-- SAMPLE DATA - ADOPTION CATS
-- =============================================
INSERT INTO public.adoption_cats (name, breed, age, gender, color, status, location, description) VALUES
  ('Mochi', 'British Shorthair', '8 months', 'Female', 'Grey', 'available', 'SPCA Selangor', 'Sweet and playful, loves cuddles'),
  ('Oyen', 'Kampung Cat', '1 year', 'Male', 'Orange', 'available', 'PAWS Subang', 'Friendly orange tabby, good with kids'),
  ('Luna', 'Persian', '2 years', 'Female', 'White', 'pending', 'Second Chance', 'Calm and gentle, perfect lap cat'),
  ('Comot', 'Kampung Cat', '6 months', 'Male', 'Tabby', 'available', 'Furry Friends', 'Energetic kitten, loves to play'),
  ('Bella', 'Siamese', '3 years', 'Female', 'Cream', 'available', 'SPCA Selangor', 'Vocal and affectionate');

-- =============================================
-- VERIFY SETUP
-- =============================================
-- Check if tables exist
SELECT 'Tables created successfully' AS status;

-- =============================================
-- FIX DATABASE TRIGGER ISSUE
-- This fixes the "Database error saving new user" error
-- =============================================

-- 1. Check for existing triggers on auth.users
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE event_object_schema = 'auth'
  AND event_object_table = 'users';

-- 2. Drop any problematic triggers (if they exist)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 3. Drop the function if it exists
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- 4. Make sure profiles table has no strict constraints
ALTER TABLE public.profiles 
  ALTER COLUMN user_id DROP NOT NULL;

-- 5. Verify the profiles table structure
\d public.profiles;

-- =============================================
-- ALTERNATIVE: Create user directly in Supabase Dashboard
-- =============================================
-- Instead of using the signup form, you can create the user manually:
-- 1. Go to Supabase Dashboard
-- 2. Authentication → Users
-- 3. Click "Add User" button
-- 4. Select "Create new user"
-- 5. Enter:
--    Email: noraini394@gmail.com
--    Password: Jimmy09@
--    Auto Confirm User: YES (check this box!)
-- 6. Click "Create User"
-- 7. Then manually add profile:

-- After creating user in dashboard, get their ID and run:
-- INSERT INTO public.profiles (user_id, name, email, phone)
-- VALUES (
--   'USER_ID_FROM_DASHBOARD',
--   'Najmi',
--   'noraini394@gmail.com',
--   '01111458752'
-- );

-- =============================================
-- CLEAN SOLUTION: Recreate profiles table without constraints
-- =============================================

-- Backup existing data (if any)
CREATE TABLE IF NOT EXISTS public.profiles_backup AS 
SELECT * FROM public.profiles;

-- Drop and recreate profiles table
DROP TABLE IF EXISTS public.profiles CASCADE;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT,
  name TEXT DEFAULT 'Pet Owner',
  email TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.profiles TO anon, authenticated, service_role;

-- Restore backup data (if any existed)
INSERT INTO public.profiles (id, user_id, name, email, phone, address, created_at, updated_at)
SELECT id, user_id, name, email, phone, address, created_at, updated_at
FROM public.profiles_backup
WHERE EXISTS (SELECT 1 FROM public.profiles_backup);

-- Drop backup table
DROP TABLE IF EXISTS public.profiles_backup;

-- =============================================
-- NOW TRY SIGNUP AGAIN
-- =============================================
-- After running the above queries, try signing up in your app again

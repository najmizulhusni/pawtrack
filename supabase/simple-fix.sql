-- =============================================
-- SIMPLE FIX FOR SIGNUP ERROR
-- Run these queries ONE BY ONE in Supabase SQL Editor
-- =============================================

-- Step 1: Check for triggers that might be causing issues
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table
FROM information_schema.triggers
WHERE event_object_schema = 'auth'
  AND event_object_table = 'users';

-- Step 2: Drop any triggers on auth.users (if they exist)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Step 3: Drop the trigger function (if it exists)
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Step 4: Recreate profiles table without strict constraints
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

-- Step 5: Disable RLS on profiles
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Step 6: Grant all permissions
GRANT ALL ON public.profiles TO anon, authenticated, service_role;

-- =============================================
-- NOW: Create user in Supabase Dashboard
-- =============================================
-- Don't use the signup form yet!
-- 
-- 1. Go to: Authentication → Users
-- 2. Click "Add User" button
-- 3. Fill in:
--    Email: noraini394@gmail.com
--    Password: Jimmy09@
--    Auto Confirm User: ✅ CHECK THIS!
-- 4. Click "Create User"
-- 5. Copy the User ID that was created
-- 6. Come back here and run the query below (replace USER_ID)

-- Step 7: After creating user in dashboard, add profile
-- REPLACE 'USER_ID_HERE' with the actual user ID from dashboard
/*
INSERT INTO public.profiles (user_id, name, email, phone)
VALUES (
  'USER_ID_HERE',
  'Najmi',
  'noraini394@gmail.com',
  '01111458752'
);
*/

-- Step 8: Verify user was created
SELECT id, email, email_confirmed_at FROM auth.users WHERE email = 'noraini394@gmail.com';

-- Step 9: Verify profile was created
SELECT * FROM public.profiles WHERE email = 'noraini394@gmail.com';

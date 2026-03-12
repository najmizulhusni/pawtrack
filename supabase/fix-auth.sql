-- =============================================
-- FIX AUTHENTICATION FOR EXISTING USER
-- Run these queries in Supabase SQL Editor
-- =============================================

-- 1. First, check if user exists
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  raw_user_meta_data
FROM auth.users
WHERE email = 'noraini394@gmail.com';

-- =============================================
-- IF USER EXISTS: Manually confirm their email
-- =============================================

UPDATE auth.users
SET 
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email = 'noraini394@gmail.com'
  AND email_confirmed_at IS NULL;

-- =============================================
-- IF USER DOES NOT EXIST: Delete old data and create fresh
-- =============================================

-- Delete any existing profile data
DELETE FROM public.profiles WHERE email = 'noraini394@gmail.com';
DELETE FROM public.cats WHERE user_id IN (
  SELECT user_id FROM public.profiles WHERE email = 'noraini394@gmail.com'
);

-- Delete the user from auth if exists (to start fresh)
DELETE FROM auth.users WHERE email = 'noraini394@gmail.com';

-- =============================================
-- NOW: Create user properly using Supabase function
-- Note: You CANNOT insert directly into auth.users
-- You must use the signup form in your app OR
-- Use Supabase Dashboard: Authentication → Users → Add User
-- =============================================

-- After running the DELETE queries above, go to your app and:
-- 1. Click "Sign Up"
-- 2. Enter:
--    Name: Najmi
--    Phone: 01111458752
--    Email: noraini394@gmail.com
--    Password: Jimmy09@
-- 3. Click "Create Account"

-- =============================================
-- THEN: Run this to confirm the email immediately
-- =============================================

UPDATE auth.users
SET 
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email = 'noraini394@gmail.com';

-- Verify it worked
SELECT 
  id,
  email,
  email_confirmed_at,
  raw_user_meta_data
FROM auth.users
WHERE email = 'noraini394@gmail.com';

-- =============================================
-- IMPORTANT: Disable email confirmation in Dashboard
-- Go to: Authentication → Settings → Email Auth
-- Toggle OFF: "Enable email confirmations"
-- Click Save
-- =============================================

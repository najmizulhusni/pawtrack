-- Add Admin User Profile to PawTrack
-- This script creates an admin user profile in the profiles table
-- Email: admin@pawtrack.my
-- Password: Admin12345@

-- =============================================
-- SETUP INSTRUCTIONS
-- =============================================
-- 1. First, run add-admin-column.sql to add is_admin column to profiles table
-- 2. Create the admin user in Supabase Auth:
--    - Go to Supabase Dashboard → Authentication → Users
--    - Click "Add user"
--    - Email: admin@pawtrack.my
--    - Password: Admin12345@
--    - Click "Create user"
-- 3. Copy the user_id from the created user
-- 4. Replace 'YOUR_ADMIN_USER_ID' below with the actual user_id
-- 5. Run this script

-- =============================================
-- INSERT ADMIN PROFILE
-- =============================================
-- Replace 'YOUR_ADMIN_USER_ID' with the actual UUID from Supabase Auth
INSERT INTO public.profiles (
  user_id,
  name,
  email,
  phone,
  address,
  is_admin,
  created_at,
  updated_at
) VALUES (
  'YOUR_ADMIN_USER_ID',
  'PawTrack Admin',
  'admin@pawtrack.my',
  '+60123456789',
  'PawTrack Headquarters',
  true,
  NOW(),
  NOW()
) ON CONFLICT (user_id) DO UPDATE SET
  is_admin = true,
  updated_at = NOW();

-- =============================================
-- VERIFY ADMIN USER WAS CREATED
-- =============================================
SELECT user_id, name, email, is_admin, created_at 
FROM public.profiles 
WHERE is_admin = true;

-- =============================================
-- OPTIONAL: Create multiple admin users
-- =============================================
-- Uncomment and modify as needed:
-- INSERT INTO public.profiles (user_id, name, email, phone, is_admin, created_at, updated_at)
-- VALUES 
--   ('admin_user_id_1', 'Admin One', 'admin1@pawtrack.my', '+60123456789', true, NOW(), NOW()),
--   ('admin_user_id_2', 'Admin Two', 'admin2@pawtrack.my', '+60187654321', true, NOW(), NOW());


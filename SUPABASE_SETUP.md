# Supabase Setup Guide for PawTrack

## Your Credentials
- **Project URL:** https://qsretmjselsawfmtcbzf.supabase.co
- **Anon Key:** sb_publishable_cgRmxJBdcMztSUzn7rDzXw_JL_ChERw
- **Database Password:** LYDQMZu2iHAyTMom

## Step 1: Run the Database Schema

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: **pawtrack**
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy entire content from `supabase/schema.sql`
6. Paste into the SQL editor
7. Click **Run** button

This will create all tables with RLS policies and automatic RLS trigger.

## Step 2: Enable Authentication

1. Go to **Authentication** (left sidebar)
2. Click **Providers**
3. Enable **Email** (should be enabled by default)
4. Go to **URL Configuration**
5. Add your app URL:
   - Development: `http://localhost:5173`
   - Production: `https://your-domain.com`

## Step 3: Test Connection

Run your app:
```bash
npm run dev
```

Try logging in with any email/password in demo mode first.

## Step 4: Verify Tables

1. Go to **Table Editor** (left sidebar)
2. You should see these tables:
   - profiles
   - cats
   - tasks
   - medical_records
   - notifications
   - adoption_cats
   - shelters
   - events
   - rate_limits

## Troubleshooting

**"Connection refused"**
- Check `.env.local` has correct URL and key
- Restart dev server: `npm run dev`

**"RLS policy violation"**
- Make sure you're logged in
- Check RLS policies in Table Editor → Policies

**"Table doesn't exist"**
- Run the schema.sql again
- Check for SQL errors in the output

## Security Notes

✅ `.env.local` is in `.gitignore` - credentials won't be pushed
✅ RLS is enabled on all tables
✅ Automatic RLS trigger protects new tables
✅ Rate limiting is configured

Never commit `.env.local` or share your anon key publicly!

# Deployment Guide
## Env Vars
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## Supabase Setup
1. Run SQL files in order (or `000_full_schema.sql`).
2. Create first admin user in Auth.
3. Insert matching `admin_profiles` row.
4. Create storage bucket `myshillong-media`.

## Vercel
- Import repository
- Set env vars
- Deploy

## Post-Deployment Checklist
- Admin login works
- CRUD works for taxonomy/vendor/deals/ads
- Dashboard + analytics views load
- RLS checks pass

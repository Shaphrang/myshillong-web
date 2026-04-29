# Fresh schema CRUD implementation

## Active tables
- `admin_profiles`
- `districts`
- `locations`
- `categories`
- `subcategories`
- `food_vendors`
- `clothing_vendors`
- `deals`

## Removed legacy tables/views (do not use)
- `vendors`
- `vendor_categories`
- `food_profiles`
- `fashion_profiles`
- `media_assets`
- `sponsored_placements`
- `marketplace_events`
- `vendor_plans`
- `vendor_subscriptions`
- `v_public_vendors`
- `v_public_deals`
- `v_active_sponsored_placements`

## Admin routes
- `/admin/districts`
- `/admin/locations`
- `/admin/categories`
- `/admin/subcategories`
- `/admin/food-vendors`
- `/admin/clothing-vendors`
- `/admin/deals`

## Dropdown dependencies
- district -> locations
- vendor_type -> categories
- category -> subcategories
- deal vendor_type -> food/clothing vendors

## Storage
Bucket: `myshillong-media`

Folders:
- `food-vendors/{vendor_id}/cover/`
- `food-vendors/{vendor_id}/gallery/`
- `clothing-vendors/{vendor_id}/cover/`
- `clothing-vendors/{vendor_id}/gallery/`
- `deals/{deal_id}/cover/`
- `deals/{deal_id}/gallery/`
- `categories/`
- `branding/`

## Environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## SQL application order
1. `docs/sql/full_schema.sql`
2. `docs/sql/full_schema_grants.sql`
3. `docs/sql/full_schema_cnstraint_indexes.sql`

## Manual Supabase steps
1. Create public storage bucket `myshillong-media`.
2. Add bucket policies for public read and admin-authenticated write.
3. Regenerate DB types after SQL apply.

## Type generation
```bash
supabase gen types typescript --project-id <project-id> --schema public > src/types/database.ts
```

## Migration note
This project has moved away from the old generic `vendors` model to split vendor tables (`food_vendors` and `clothing_vendors`) and direct-table public queries.

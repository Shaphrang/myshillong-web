# Admin CRUD on Fresh Schema

## Source-of-truth SQL
- `docs/sql/full_schema.sql`
- `docs/sql/full_schema_grants.sql`
- `docs/sql/full_schema_cnstraint_indexes.sql`

## Fresh schema tables used
- `admin_profiles`
- `districts`
- `locations`
- `categories`
- `subcategories`
- `food_vendors`
- `clothing_vendors`
- `deals`

## Old tables/views removed from active implementation
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
- `/admin/dashboard`
- `/admin/districts`
- `/admin/locations`
- `/admin/categories`
- `/admin/subcategories`
- `/admin/food-vendors`
- `/admin/clothing-vendors`
- `/admin/deals`

## Dropdown dependency logic
- District -> Locations (`locations.district_id`)
- Vendor type -> Categories (`categories.vendor_type`)
- Category -> Subcategories (`subcategories.category_id`)
- Deal vendor type -> Food vendors / Clothing vendors

## Storage
- Bucket: `myshillong-media`
- Recommended folders:
  - `food-vendors/{vendor_id}/cover/`
  - `food-vendors/{vendor_id}/gallery/`
  - `clothing-vendors/{vendor_id}/cover/`
  - `clothing-vendors/{vendor_id}/gallery/`
  - `deals/{deal_id}/cover/`
  - `deals/{deal_id}/gallery/`
  - `categories/`
  - `branding/`

## Env vars
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## Manual setup checklist
1. Create `myshillong-media` bucket.
2. Configure storage policies for admin write and public read as needed.
3. Confirm admin users exist in `admin_profiles` with `is_active = true`.

## Testing checklist
- Run lint, typecheck, and build.
- Verify dashboard stats pull from fresh tables.
- Verify public vendors/deals pages read from `food_vendors`, `clothing_vendors`, and `deals`.

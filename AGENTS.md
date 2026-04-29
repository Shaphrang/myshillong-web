# AGENTS.md

## Project
MyShillong web/admin project using Next.js, Supabase, TypeScript, and Tailwind.

## Database source of truth
Before making schema-related changes, always read:

- docs/sql/full_schema.sql
- docs/sql/full_schema_grants.sql
- docs/sql/full_schema_cnstraint_indexes.sql

## Current active tables
Use only these current tables:

- admin_profiles
- districts
- locations
- categories
- subcategories
- food_vendors
- clothing_vendors
- deals

## Removed old tables/views
Do not use these old removed tables or views:

- vendors
- vendor_categories
- food_profiles
- fashion_profiles
- media_assets
- sponsored_placements
- marketplace_events
- vendor_plans
- vendor_subscriptions
- v_public_vendors
- v_public_deals
- v_active_sponsored_placements

## Environment variables
Use:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

Never expose a service role key in frontend code.

## Supabase rules
- Public reads should use the publishable key.
- Admin CRUD should use authenticated Supabase session and RLS.
- Admin authorization is controlled by admin_profiles.
- A user is admin only when admin_profiles.id = auth.uid() and is_active = true.

## Admin modules
Implement and maintain CRUD for:

- Districts
- Locations
- Categories
- Subcategories
- Food Vendors
- Clothing Vendors
- Deals

## Dropdown rules
- District selected -> show only locations under that district.
- Vendor type selected -> show categories for that vendor type.
- Category selected -> show subcategories under that category.
- Deal vendor type selected -> show food vendors or clothing vendors accordingly.

## Image rules
Use Supabase Storage bucket:

myshillong-media

Recommended folders:

- food-vendors/{vendor_id}/cover/
- food-vendors/{vendor_id}/gallery/
- clothing-vendors/{vendor_id}/cover/
- clothing-vendors/{vendor_id}/gallery/
- deals/{deal_id}/cover/
- deals/{deal_id}/gallery/
- categories/
- branding/

Store only storage paths in the database. Generate public URLs in the app. Always show fallback placeholder if image is missing.

## Design direction
Admin UI should follow the attached dashboard image style:
- light theme
- white cards
- soft shadows
- rounded corners
- red/orange/coral/pink gradients
- modern sidebar
- clean tables
- status badges
- responsive layout

## Commands
Run these when available:

- npm run lint
- npm run typecheck
- npm run build

If one command does not exist, say so and continue with available checks.

## Coding rules
- Make actual file changes.
- Do not only explain.
- Do not invent new tables.
- Do not recreate old complicated schema.
- Keep CRUD simple and production-ready.
- Keep dropdown joins correct.
- Use fallback image placeholders.
- Remove stale imports and old schema references.
- Run build/typecheck before final response when possible.

## Final response required
Always summarize:
- files changed
- admin routes updated
- CRUD modules completed
- old schema references removed
- tests/checks run
- remaining manual steps
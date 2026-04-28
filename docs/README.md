# MyShillong Admin-First MVP

MyShillong is a Shillong-focused local marketplace and business visibility platform.

## MVP Scope
- Food & Cafes
- Fashion & Shopping
- Deals & Offers
- Vendor onboarding
- Sponsored placements / ads
- Plans & subscriptions
- Dashboard & analytics

## Intentionally Not Built Yet
- Public homepage UX
- Vendor self-service login
- Payments (Razorpay)
- Tourism/travel modules

## Stack
- Next.js App Router + TypeScript + Tailwind
- Supabase Postgres/Auth/Storage paths

## Development Flow
1. Apply `/docs/sql/000_full_schema.sql`.
2. Configure env vars.
3. Create admin auth user and `admin_profiles` record.
4. Start app and login at `/admin/login`.

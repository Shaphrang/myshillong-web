# MyShillong Web

Next.js + Supabase marketplace/admin platform for local Shillong businesses.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   ```
3. Start development:
   ```bash
   npm run dev
   ```

## Build

```bash
npm run build
```

## Admin setup

See `docs/admin-setup.md`.

## Key routes

- `/`
- `/vendors`
- `/vendors/[slug]`
- `/deals`
- `/deals/[slug]`
- `/admin/login`
- `/admin/dashboard`
- `/admin/vendors`
- `/admin/categories`
- `/admin/subcategories`
- `/admin/localities`
- `/admin/deals`
- `/admin/placements`
- `/admin/plans`
- `/admin/subscriptions`
- `/admin/media`

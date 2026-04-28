# Implementation Plan
1. Apply SQL schema in Supabase SQL editor.
2. Create admin user in Supabase Auth.
3. Insert admin profile row:
```sql
INSERT INTO public.admin_profiles (id, full_name, role, is_active)
VALUES ('PASTE_AUTH_USER_UUID_HERE', 'Main Admin', 'owner', true);
```
4. Configure `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
5. Run app: `npm run dev`.
6. Login via `/admin/login`.
7. Add localities/categories/subcategories.
8. Add vendors.
9. Add deals.
10. Add sponsored placements.
11. Review dashboard + analytics.

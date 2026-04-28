# Supabase Integration Notes

- This app uses `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `NEXT_PUBLIC_SUPABASE_URL`.
- SSR auth/session handling currently uses cookie + Supabase REST auth endpoints (publishable key flow).
- Admin access requires an active row in `public.admin_profiles`.
- Public storage bucket used for media URLs: `myshillong-media`.
- Keep RLS enabled and verify admin policies depend on `public.is_admin_user()`.

# MyShillong Admin Setup

1. Create a user in Supabase Authentication.
2. Copy the user's `auth.users.id`.
3. Insert into `public.admin_profiles`:

```sql
insert into public.admin_profiles (id, full_name, role, is_active)
values ('PASTE_AUTH_USER_ID_HERE', 'MyShillong Admin', 'admin', true)
on conflict (id) do update
set role = 'admin', is_active = true, updated_at = now();
```

4. Login at `/admin/login`.

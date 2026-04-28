# MyShillong Admin Setup

A Supabase Auth user is not automatically an admin user. The same user ID must exist in `public.admin_profiles` with `is_active = true`.

## 1) Check existing Auth users vs admin profiles

```sql
select
  au.id,
  au.email,
  ap.full_name,
  ap.role,
  ap.is_active
from auth.users au
left join public.admin_profiles ap on ap.id = au.id
order by au.created_at desc;
```

## 2) Upsert admin profile for your login email (if missing)

```sql
insert into public.admin_profiles (
  id,
  full_name,
  role,
  is_active
)
select
  id,
  coalesce(email, 'MyShillong Admin'),
  'admin',
  true
from auth.users
where email = 'YOUR_EMAIL_HERE'
on conflict (id) do update
set
  full_name = excluded.full_name,
  role = 'admin',
  is_active = true,
  updated_at = now();
```

Replace `YOUR_EMAIL_HERE` with your actual admin login email.

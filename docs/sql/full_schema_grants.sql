begin;

-- =====================================================
-- RLS + GRANTS PATCH FOR MYSHILLONG SIMPLE SCHEMA
-- Public/publishable key can read active public data.
-- Only active admins can insert/update/delete.
-- =====================================================

-- Make sure helper exists
create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles ap
    where ap.id = auth.uid()
      and ap.is_active = true
  );
$$;

-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================

alter table public.admin_profiles enable row level security;
alter table public.districts enable row level security;
alter table public.locations enable row level security;
alter table public.categories enable row level security;
alter table public.subcategories enable row level security;
alter table public.food_vendors enable row level security;
alter table public.clothing_vendors enable row level security;
alter table public.deals enable row level security;

-- =====================================================
-- DROP OLD POLICIES SAFELY
-- =====================================================

drop policy if exists admin_profiles_self_read on public.admin_profiles;
drop policy if exists admin_profiles_admin_manage on public.admin_profiles;

drop policy if exists districts_admin_all on public.districts;
drop policy if exists locations_admin_all on public.locations;
drop policy if exists categories_admin_all on public.categories;
drop policy if exists subcategories_admin_all on public.subcategories;
drop policy if exists food_vendors_admin_all on public.food_vendors;
drop policy if exists clothing_vendors_admin_all on public.clothing_vendors;
drop policy if exists deals_admin_all on public.deals;

drop policy if exists districts_public_read on public.districts;
drop policy if exists locations_public_read on public.locations;
drop policy if exists categories_public_read on public.categories;
drop policy if exists subcategories_public_read on public.subcategories;
drop policy if exists food_vendors_public_read on public.food_vendors;
drop policy if exists clothing_vendors_public_read on public.clothing_vendors;
drop policy if exists deals_public_read on public.deals;

-- =====================================================
-- ADMIN PROFILE POLICIES
-- =====================================================

create policy admin_profiles_self_read
on public.admin_profiles
for select
to authenticated
using (
  id = auth.uid()
  or public.is_admin_user()
);

create policy admin_profiles_admin_manage
on public.admin_profiles
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

-- =====================================================
-- ADMIN FULL CRUD POLICIES
-- Only users present in admin_profiles with is_active=true can manage data.
-- =====================================================

create policy districts_admin_all
on public.districts
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy locations_admin_all
on public.locations
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy categories_admin_all
on public.categories
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy subcategories_admin_all
on public.subcategories
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy food_vendors_admin_all
on public.food_vendors
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy clothing_vendors_admin_all
on public.clothing_vendors
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy deals_admin_all
on public.deals
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

-- =====================================================
-- PUBLIC READ POLICIES
-- Works with Supabase publishable key.
-- Public can read active master data, active vendors, active deals.
-- =====================================================

create policy districts_public_read
on public.districts
for select
to anon, authenticated
using (is_active = true);

create policy locations_public_read
on public.locations
for select
to anon, authenticated
using (is_active = true);

create policy categories_public_read
on public.categories
for select
to anon, authenticated
using (is_active = true);

create policy subcategories_public_read
on public.subcategories
for select
to anon, authenticated
using (is_active = true);

create policy food_vendors_public_read
on public.food_vendors
for select
to anon, authenticated
using (
  is_active = true
  and status = 'active'
);

create policy clothing_vendors_public_read
on public.clothing_vendors
for select
to anon, authenticated
using (
  is_active = true
  and status = 'active'
);

create policy deals_public_read
on public.deals
for select
to anon, authenticated
using (
  is_active = true
  and status = 'active'
  and (starts_at is null or starts_at <= now())
  and (ends_at is null or ends_at >= now())
);

-- =====================================================
-- GRANTS
-- RLS policies above still decide which rows are visible.
-- =====================================================

grant usage on schema public to anon, authenticated;

grant execute on function public.is_admin_user() to authenticated;

-- Public read access through publishable key
grant select on
  public.districts,
  public.locations,
  public.categories,
  public.subcategories,
  public.food_vendors,
  public.clothing_vendors,
  public.deals
to anon, authenticated;

-- Admin write access.
-- Only authenticated users passing public.is_admin_user() can actually write.
grant insert, update, delete on
  public.districts,
  public.locations,
  public.categories,
  public.subcategories,
  public.food_vendors,
  public.clothing_vendors,
  public.deals
to authenticated;

grant select, insert, update, delete on public.admin_profiles to authenticated;

commit;
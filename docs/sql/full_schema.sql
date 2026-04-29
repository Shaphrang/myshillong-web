begin;

-- =====================================================
-- EXTENSIONS
-- =====================================================

create extension if not exists pgcrypto;
create extension if not exists citext;

-- =====================================================
-- COMMON UPDATED_AT FUNCTION
-- =====================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =====================================================
-- ADMIN PROFILE TABLE
-- This is kept for simple admin authorization.
-- =====================================================

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'admin',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_admin_profiles_updated on public.admin_profiles;

create trigger trg_admin_profiles_updated
before update on public.admin_profiles
for each row
execute function public.set_updated_at();

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
-- MASTER TABLE: DISTRICTS
-- =====================================================

create table if not exists public.districts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug citext not null unique,
  state text not null default 'Meghalaya',
  country text not null default 'India',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_districts_updated on public.districts;

create trigger trg_districts_updated
before update on public.districts
for each row
execute function public.set_updated_at();

-- =====================================================
-- MASTER TABLE: LOCATIONS
-- Locations belong to districts.
-- Example: Police Bazar belongs to East Khasi Hills.
-- =====================================================

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  district_id uuid not null references public.districts(id) on delete cascade,
  name text not null,
  slug citext not null,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (district_id, slug),
  unique (id, district_id)
);

drop trigger if exists trg_locations_updated on public.locations;

create trigger trg_locations_updated
before update on public.locations
for each row
execute function public.set_updated_at();

create index if not exists idx_locations_district_id
on public.locations(district_id);

-- =====================================================
-- MASTER TABLE: CATEGORIES
-- vendor_type keeps food and clothing categories separate.
-- =====================================================

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  vendor_type text not null,
  name text not null,
  slug citext not null,
  icon_name text,
  cover_image_path text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint categories_vendor_type_check
    check (vendor_type in ('food', 'clothing')),

  unique (vendor_type, slug),
  unique (id, vendor_type)
);

drop trigger if exists trg_categories_updated on public.categories;

create trigger trg_categories_updated
before update on public.categories
for each row
execute function public.set_updated_at();

create index if not exists idx_categories_vendor_type
on public.categories(vendor_type);

-- =====================================================
-- MASTER TABLE: SUBCATEGORIES
-- Subcategories belong to categories.
-- =====================================================

create table if not exists public.subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  name text not null,
  slug citext not null,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (category_id, slug),
  unique (id, category_id)
);

drop trigger if exists trg_subcategories_updated on public.subcategories;

create trigger trg_subcategories_updated
before update on public.subcategories
for each row
execute function public.set_updated_at();

create index if not exists idx_subcategories_category_id
on public.subcategories(category_id);

-- =====================================================
-- FOOD VENDORS
-- Simple food business table.
-- =====================================================

create table if not exists public.food_vendors (
  id uuid primary key default gen_random_uuid(),

  -- Basic details
  name text not null,
  slug citext not null unique,
  short_description text,
  full_description text,

  -- Dropdown/master fields
  district_id uuid not null references public.districts(id),
  location_id uuid references public.locations(id),
  category_id uuid not null references public.categories(id),
  subcategory_id uuid references public.subcategories(id),

  -- Contact
  owner_name text,
  phone text,
  whatsapp text,
  email text,

  -- Address/location
  address text,
  landmark text,
  google_map_url text,

  -- Food-specific simple fields
  cuisine_types text[] not null default '{}',
  food_types text[] not null default '{}',
  services text[] not null default '{}',
  price_range text,

  -- Images
  cover_image_path text,
  gallery_image_paths text[] not null default '{}',

  -- Page/display control
  selected_pages text[] not null default array['listing_page'],
  page_placement text not null default 'list',
  priority integer not null default 5,
  sponsored_type text not null default 'none',

  -- Status
  status text not null default 'draft',
  is_active boolean not null default true,

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint food_vendors_location_district_fk
    foreign key (location_id, district_id)
    references public.locations(id, district_id),

  constraint food_vendors_subcategory_category_fk
    foreign key (subcategory_id, category_id)
    references public.subcategories(id, category_id),

  constraint food_vendors_priority_check
    check (priority between 1 and 10),

  constraint food_vendors_selected_pages_check
    check (
      selected_pages <@ array[
        'homepage',
        'listing_page',
        'detail_page',
        'food_page',
        'clothing_page',
        'deals_page'
      ]::text[]
    ),

  constraint food_vendors_page_placement_check
    check (page_placement in ('hero_banner', 'banner', 'horizontal', 'vertical', 'card', 'list')),

  constraint food_vendors_sponsored_type_check
    check (sponsored_type in ('none', 'featured', 'sponsored', 'ads')),

  constraint food_vendors_status_check
    check (status in ('draft', 'active', 'inactive'))
);

drop trigger if exists trg_food_vendors_updated on public.food_vendors;

create trigger trg_food_vendors_updated
before update on public.food_vendors
for each row
execute function public.set_updated_at();

create index if not exists idx_food_vendors_district_id
on public.food_vendors(district_id);

create index if not exists idx_food_vendors_location_id
on public.food_vendors(location_id);

create index if not exists idx_food_vendors_category_id
on public.food_vendors(category_id);

create index if not exists idx_food_vendors_subcategory_id
on public.food_vendors(subcategory_id);

create index if not exists idx_food_vendors_status_active_priority
on public.food_vendors(status, is_active, priority desc);

create index if not exists idx_food_vendors_sponsored_type
on public.food_vendors(sponsored_type);

create index if not exists idx_food_vendors_selected_pages
on public.food_vendors using gin(selected_pages);

-- =====================================================
-- CLOTHING VENDORS
-- Simple clothing/fashion business table.
-- =====================================================

create table if not exists public.clothing_vendors (
  id uuid primary key default gen_random_uuid(),

  -- Basic details
  name text not null,
  slug citext not null unique,
  short_description text,
  full_description text,

  -- Dropdown/master fields
  district_id uuid not null references public.districts(id),
  location_id uuid references public.locations(id),
  category_id uuid not null references public.categories(id),
  subcategory_id uuid references public.subcategories(id),

  -- Contact
  owner_name text,
  phone text,
  whatsapp text,
  email text,

  -- Address/location
  address text,
  landmark text,
  google_map_url text,

  -- Clothing-specific simple fields
  product_types text[] not null default '{}',
  gender_focus text[] not null default '{}',
  services text[] not null default '{}',
  price_range text,

  -- Images
  cover_image_path text,
  gallery_image_paths text[] not null default '{}',

  -- Page/display control
  selected_pages text[] not null default array['listing_page'],
  page_placement text not null default 'list',
  priority integer not null default 5,
  sponsored_type text not null default 'none',

  -- Status
  status text not null default 'draft',
  is_active boolean not null default true,

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint clothing_vendors_location_district_fk
    foreign key (location_id, district_id)
    references public.locations(id, district_id),

  constraint clothing_vendors_subcategory_category_fk
    foreign key (subcategory_id, category_id)
    references public.subcategories(id, category_id),

  constraint clothing_vendors_priority_check
    check (priority between 1 and 10),

  constraint clothing_vendors_selected_pages_check
    check (
      selected_pages <@ array[
        'homepage',
        'listing_page',
        'detail_page',
        'food_page',
        'clothing_page',
        'deals_page'
      ]::text[]
    ),

  constraint clothing_vendors_page_placement_check
    check (page_placement in ('hero_banner', 'banner', 'horizontal', 'vertical', 'card', 'list')),

  constraint clothing_vendors_sponsored_type_check
    check (sponsored_type in ('none', 'featured', 'sponsored', 'ads')),

  constraint clothing_vendors_status_check
    check (status in ('draft', 'active', 'inactive'))
);

drop trigger if exists trg_clothing_vendors_updated on public.clothing_vendors;

create trigger trg_clothing_vendors_updated
before update on public.clothing_vendors
for each row
execute function public.set_updated_at();

create index if not exists idx_clothing_vendors_district_id
on public.clothing_vendors(district_id);

create index if not exists idx_clothing_vendors_location_id
on public.clothing_vendors(location_id);

create index if not exists idx_clothing_vendors_category_id
on public.clothing_vendors(category_id);

create index if not exists idx_clothing_vendors_subcategory_id
on public.clothing_vendors(subcategory_id);

create index if not exists idx_clothing_vendors_status_active_priority
on public.clothing_vendors(status, is_active, priority desc);

create index if not exists idx_clothing_vendors_sponsored_type
on public.clothing_vendors(sponsored_type);

create index if not exists idx_clothing_vendors_selected_pages
on public.clothing_vendors using gin(selected_pages);

-- =====================================================
-- DEALS
-- One shared deals table.
-- Deal can belong to either a food vendor or clothing vendor.
-- =====================================================

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),

  -- Vendor relation
  vendor_type text not null,
  food_vendor_id uuid references public.food_vendors(id) on delete cascade,
  clothing_vendor_id uuid references public.clothing_vendors(id) on delete cascade,

  -- Deal details
  title text not null,
  slug citext not null unique,
  short_description text,
  full_description text,
  terms_conditions text,

  -- Offer details
  discount_label text,
  original_price numeric(10,2),
  offer_price numeric(10,2),

  -- Images
  cover_image_path text,
  gallery_image_paths text[] not null default '{}',

  -- Date control
  starts_at timestamptz,
  ends_at timestamptz,

  -- Page/display control
  selected_pages text[] not null default array['deals_page'],
  page_placement text not null default 'list',
  priority integer not null default 5,
  sponsored_type text not null default 'none',

  -- Status
  status text not null default 'draft',
  is_active boolean not null default true,

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint deals_vendor_type_check
    check (vendor_type in ('food', 'clothing')),

  constraint deals_vendor_relation_check
    check (
      (
        vendor_type = 'food'
        and food_vendor_id is not null
        and clothing_vendor_id is null
      )
      or
      (
        vendor_type = 'clothing'
        and clothing_vendor_id is not null
        and food_vendor_id is null
      )
    ),

  constraint deals_priority_check
    check (priority between 1 and 10),

  constraint deals_selected_pages_check
    check (
      selected_pages <@ array[
        'homepage',
        'listing_page',
        'detail_page',
        'food_page',
        'clothing_page',
        'deals_page'
      ]::text[]
    ),

  constraint deals_page_placement_check
    check (page_placement in ('hero_banner', 'banner', 'horizontal', 'vertical', 'card', 'list')),

  constraint deals_sponsored_type_check
    check (sponsored_type in ('none', 'featured', 'sponsored', 'ads')),

  constraint deals_status_check
    check (status in ('draft', 'active', 'inactive', 'expired')),

  constraint deals_date_check
    check (ends_at is null or starts_at is null or ends_at > starts_at)
);

drop trigger if exists trg_deals_updated on public.deals;

create trigger trg_deals_updated
before update on public.deals
for each row
execute function public.set_updated_at();

create index if not exists idx_deals_vendor_type
on public.deals(vendor_type);

create index if not exists idx_deals_food_vendor_id
on public.deals(food_vendor_id);

create index if not exists idx_deals_clothing_vendor_id
on public.deals(clothing_vendor_id);

create index if not exists idx_deals_status_active_priority
on public.deals(status, is_active, priority desc);

create index if not exists idx_deals_sponsored_type
on public.deals(sponsored_type);

create index if not exists idx_deals_selected_pages
on public.deals using gin(selected_pages);

-- =====================================================
-- SEED DISTRICTS
-- =====================================================

insert into public.districts (name, slug, state, country, is_active, sort_order)
values
('East Khasi Hills', 'east-khasi-hills', 'Meghalaya', 'India', true, 1),
('West Khasi Hills', 'west-khasi-hills', 'Meghalaya', 'India', true, 2),
('South West Khasi Hills', 'south-west-khasi-hills', 'Meghalaya', 'India', true, 3),
('Eastern West Khasi Hills', 'eastern-west-khasi-hills', 'Meghalaya', 'India', true, 4),
('Ri Bhoi', 'ri-bhoi', 'Meghalaya', 'India', true, 5),
('West Jaintia Hills', 'west-jaintia-hills', 'Meghalaya', 'India', true, 6),
('East Jaintia Hills', 'east-jaintia-hills', 'Meghalaya', 'India', true, 7),
('West Garo Hills', 'west-garo-hills', 'Meghalaya', 'India', true, 8),
('East Garo Hills', 'east-garo-hills', 'Meghalaya', 'India', true, 9),
('South Garo Hills', 'south-garo-hills', 'Meghalaya', 'India', true, 10),
('North Garo Hills', 'north-garo-hills', 'Meghalaya', 'India', true, 11),
('South West Garo Hills', 'south-west-garo-hills', 'Meghalaya', 'India', true, 12)
on conflict (slug) do nothing;

-- =====================================================
-- SEED LOCATIONS
-- Add more later from admin panel.
-- =====================================================

with d as (
  select id from public.districts where slug = 'east-khasi-hills'
)
insert into public.locations (district_id, name, slug, is_active, sort_order)
select d.id, x.name, x.slug, true, x.sort_order
from d
cross join (
  values
  ('Police Bazar', 'police-bazar', 1),
  ('Laitumkhrah', 'laitumkhrah', 2),
  ('Nongthymmai', 'nongthymmai', 3),
  ('Mawlai', 'mawlai', 4),
  ('Shillong Peak Road', 'shillong-peak-road', 5),
  ('Laban', 'laban', 6),
  ('Malki', 'malki', 7),
  ('Rynjah', 'rynjah', 8),
  ('Jaiaw', 'jaiaw', 9),
  ('Garikhana', 'garikhana', 10),
  ('Polo', 'polo', 11),
  ('Mawprem', 'mawprem', 12),
  ('Nongmynsong', 'nongmynsong', 13),
  ('Upper Shillong', 'upper-shillong', 14)
) as x(name, slug, sort_order)
on conflict (district_id, slug) do nothing;

-- =====================================================
-- SEED FOOD CATEGORIES
-- =====================================================

insert into public.categories (
  vendor_type,
  name,
  slug,
  icon_name,
  is_active,
  sort_order
)
values
('food', 'Restaurant', 'restaurant', 'utensils', true, 1),
('food', 'Cafe', 'cafe', 'coffee', true, 2),
('food', 'Bakery', 'bakery', 'cake', true, 3),
('food', 'Fast Food', 'fast-food', 'burger', true, 4),
('food', 'Cloud Kitchen', 'cloud-kitchen', 'chef-hat', true, 5),
('food', 'Beverages & Desserts', 'beverages-desserts', 'ice-cream', true, 6)
on conflict (vendor_type, slug) do nothing;

-- =====================================================
-- SEED CLOTHING CATEGORIES
-- =====================================================

insert into public.categories (
  vendor_type,
  name,
  slug,
  icon_name,
  is_active,
  sort_order
)
values
('clothing', 'Clothing Store', 'clothing-store', 'shirt', true, 1),
('clothing', 'Boutique', 'boutique', 'scissors', true, 2),
('clothing', 'Footwear', 'footwear', 'footprints', true, 3),
('clothing', 'Accessories', 'accessories', 'gem', true, 4),
('clothing', 'Traditional Wear', 'traditional-wear', 'sparkles', true, 5)
on conflict (vendor_type, slug) do nothing;

-- =====================================================
-- SEED FOOD SUBCATEGORIES
-- =====================================================

with c as (
  select id from public.categories where vendor_type = 'food' and slug = 'restaurant'
)
insert into public.subcategories (category_id, name, slug, is_active, sort_order)
select c.id, x.name, x.slug, true, x.sort_order
from c
cross join (
  values
  ('Fine Dining', 'fine-dining', 1),
  ('Casual Dining', 'casual-dining', 2),
  ('Family Restaurant', 'family-restaurant', 3),
  ('Local Khasi Food', 'local-khasi-food', 4),
  ('Indian Restaurant', 'indian-restaurant', 5),
  ('Chinese Restaurant', 'chinese-restaurant', 6)
) as x(name, slug, sort_order)
on conflict (category_id, slug) do nothing;

with c as (
  select id from public.categories where vendor_type = 'food' and slug = 'cafe'
)
insert into public.subcategories (category_id, name, slug, is_active, sort_order)
select c.id, x.name, x.slug, true, x.sort_order
from c
cross join (
  values
  ('Coffee Shop', 'coffee-shop', 1),
  ('Bakery Cafe', 'bakery-cafe', 2),
  ('Dessert Cafe', 'dessert-cafe', 3),
  ('Tea & Snacks', 'tea-snacks', 4)
) as x(name, slug, sort_order)
on conflict (category_id, slug) do nothing;

with c as (
  select id from public.categories where vendor_type = 'food' and slug = 'bakery'
)
insert into public.subcategories (category_id, name, slug, is_active, sort_order)
select c.id, x.name, x.slug, true, x.sort_order
from c
cross join (
  values
  ('Cakes', 'cakes', 1),
  ('Pastries', 'pastries', 2),
  ('Bread', 'bread', 3),
  ('Custom Cakes', 'custom-cakes', 4)
) as x(name, slug, sort_order)
on conflict (category_id, slug) do nothing;

with c as (
  select id from public.categories where vendor_type = 'food' and slug = 'fast-food'
)
insert into public.subcategories (category_id, name, slug, is_active, sort_order)
select c.id, x.name, x.slug, true, x.sort_order
from c
cross join (
  values
  ('Burger', 'burger', 1),
  ('Pizza', 'pizza', 2),
  ('Rolls', 'rolls', 3),
  ('Snacks', 'snacks', 4)
) as x(name, slug, sort_order)
on conflict (category_id, slug) do nothing;

with c as (
  select id from public.categories where vendor_type = 'food' and slug = 'cloud-kitchen'
)
insert into public.subcategories (category_id, name, slug, is_active, sort_order)
select c.id, x.name, x.slug, true, x.sort_order
from c
cross join (
  values
  ('Home Kitchen', 'home-kitchen', 1),
  ('Tiffin Service', 'tiffin-service', 2),
  ('Delivery Only', 'delivery-only', 3)
) as x(name, slug, sort_order)
on conflict (category_id, slug) do nothing;

with c as (
  select id from public.categories where vendor_type = 'food' and slug = 'beverages-desserts'
)
insert into public.subcategories (category_id, name, slug, is_active, sort_order)
select c.id, x.name, x.slug, true, x.sort_order
from c
cross join (
  values
  ('Juice', 'juice', 1),
  ('Tea', 'tea', 2),
  ('Ice Cream', 'ice-cream', 3),
  ('Desserts', 'desserts', 4)
) as x(name, slug, sort_order)
on conflict (category_id, slug) do nothing;

-- =====================================================
-- SEED CLOTHING SUBCATEGORIES
-- =====================================================

with c as (
  select id from public.categories where vendor_type = 'clothing' and slug = 'clothing-store'
)
insert into public.subcategories (category_id, name, slug, is_active, sort_order)
select c.id, x.name, x.slug, true, x.sort_order
from c
cross join (
  values
  ('Men Wear', 'men-wear', 1),
  ('Women Wear', 'women-wear', 2),
  ('Kids Wear', 'kids-wear', 3),
  ('Winter Wear', 'winter-wear', 4)
) as x(name, slug, sort_order)
on conflict (category_id, slug) do nothing;

with c as (
  select id from public.categories where vendor_type = 'clothing' and slug = 'boutique'
)
insert into public.subcategories (category_id, name, slug, is_active, sort_order)
select c.id, x.name, x.slug, true, x.sort_order
from c
cross join (
  values
  ('Designer Wear', 'designer-wear', 1),
  ('Custom Stitching', 'custom-stitching', 2),
  ('Party Wear', 'party-wear', 3),
  ('Ethnic Wear', 'ethnic-wear', 4)
) as x(name, slug, sort_order)
on conflict (category_id, slug) do nothing;

with c as (
  select id from public.categories where vendor_type = 'clothing' and slug = 'footwear'
)
insert into public.subcategories (category_id, name, slug, is_active, sort_order)
select c.id, x.name, x.slug, true, x.sort_order
from c
cross join (
  values
  ('Men Footwear', 'men-footwear', 1),
  ('Women Footwear', 'women-footwear', 2),
  ('Sports Shoes', 'sports-shoes', 3),
  ('Sandals', 'sandals', 4)
) as x(name, slug, sort_order)
on conflict (category_id, slug) do nothing;

with c as (
  select id from public.categories where vendor_type = 'clothing' and slug = 'accessories'
)
insert into public.subcategories (category_id, name, slug, is_active, sort_order)
select c.id, x.name, x.slug, true, x.sort_order
from c
cross join (
  values
  ('Bags', 'bags', 1),
  ('Jewellery', 'jewellery', 2),
  ('Watches', 'watches', 3),
  ('Gift Items', 'gift-items', 4)
) as x(name, slug, sort_order)
on conflict (category_id, slug) do nothing;

with c as (
  select id from public.categories where vendor_type = 'clothing' and slug = 'traditional-wear'
)
insert into public.subcategories (category_id, name, slug, is_active, sort_order)
select c.id, x.name, x.slug, true, x.sort_order
from c
cross join (
  values
  ('Jainsem', 'jainsem', 1),
  ('Khasi Traditional Wear', 'khasi-traditional-wear', 2),
  ('Ethnic Wear', 'ethnic-wear', 3)
) as x(name, slug, sort_order)
on conflict (category_id, slug) do nothing;

-- =====================================================
-- ROW LEVEL SECURITY
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
-- ADMIN PROFILE POLICIES
-- =====================================================

drop policy if exists admin_profiles_self_read on public.admin_profiles;
drop policy if exists admin_profiles_admin_manage on public.admin_profiles;

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
-- ADMIN FULL ACCESS POLICIES
-- =====================================================

drop policy if exists districts_admin_all on public.districts;
drop policy if exists locations_admin_all on public.locations;
drop policy if exists categories_admin_all on public.categories;
drop policy if exists subcategories_admin_all on public.subcategories;
drop policy if exists food_vendors_admin_all on public.food_vendors;
drop policy if exists clothing_vendors_admin_all on public.clothing_vendors;
drop policy if exists deals_admin_all on public.deals;

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
-- Public users can only read active data.
-- =====================================================

drop policy if exists districts_public_read on public.districts;
drop policy if exists locations_public_read on public.locations;
drop policy if exists categories_public_read on public.categories;
drop policy if exists subcategories_public_read on public.subcategories;
drop policy if exists food_vendors_public_read on public.food_vendors;
drop policy if exists clothing_vendors_public_read on public.clothing_vendors;
drop policy if exists deals_public_read on public.deals;

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
-- RLS still controls actual access.
-- =====================================================

grant usage on schema public to anon, authenticated;

grant execute on function public.is_admin_user() to authenticated;

grant select on
  public.districts,
  public.locations,
  public.categories,
  public.subcategories,
  public.food_vendors,
  public.clothing_vendors,
  public.deals
to anon, authenticated;

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

-- =====================================================
-- STORAGE NOTE
-- Create one Supabase Storage bucket manually:
--
-- Bucket name:
-- myshillong-media
--
-- Suggested folders:
-- food-vendors/{vendor_id}/cover/
-- food-vendors/{vendor_id}/gallery/
-- clothing-vendors/{vendor_id}/cover/
-- clothing-vendors/{vendor_id}/gallery/
-- deals/{deal_id}/cover/
-- deals/{deal_id}/gallery/
-- categories/
-- branding/
-- =====================================================

commit;
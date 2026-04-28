create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'admin',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin_user()
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.admin_profiles ap where ap.id = auth.uid() and ap.is_active = true);
$$;

create table if not exists public.localities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug citext unique not null,
  district text not null default 'East Khasi Hills',
  state text not null default 'Meghalaya',
  country text not null default 'India',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug citext unique not null,
  icon_name text,
  cover_image_path text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  name text not null,
  slug citext unique not null,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug citext unique not null,
  short_description text,
  full_description text,
  owner_name text,
  owner_phone text,
  owner_email text,
  public_phone text,
  whatsapp text,
  public_email text,
  website_url text,
  instagram_url text,
  facebook_url text,
  locality_id uuid references public.localities(id),
  address text,
  landmark text,
  latitude numeric(10,7),
  longitude numeric(10,7),
  price_range text,
  tags text[] not null default '{}',
  search_keywords text[] not null default '{}',
  cover_image_path text,
  gallery_image_paths text[] not null default '{}',
  status vendor_status not null default 'pending',
  is_verified boolean not null default false,
  is_featured boolean not null default false,
  priority integer not null default 0,
  view_count bigint not null default 0,
  phone_click_count bigint not null default 0,
  whatsapp_click_count bigint not null default 0,
  website_click_count bigint not null default 0,
  direction_click_count bigint not null default 0,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vendor_categories (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  subcategory_id uuid references public.subcategories(id) on delete set null,
  created_at timestamptz not null default now(),
  unique(vendor_id, category_id, subcategory_id)
);

create index if not exists idx_vendors_status on public.vendors(status);
create index if not exists idx_vendors_locality on public.vendors(locality_id);
create index if not exists idx_vendor_categories_vendor on public.vendor_categories(vendor_id);

create trigger trg_admin_profiles_updated before update on public.admin_profiles for each row execute function public.set_updated_at();
create trigger trg_localities_updated before update on public.localities for each row execute function public.set_updated_at();
create trigger trg_categories_updated before update on public.categories for each row execute function public.set_updated_at();
create trigger trg_subcategories_updated before update on public.subcategories for each row execute function public.set_updated_at();
create trigger trg_vendors_updated before update on public.vendors for each row execute function public.set_updated_at();

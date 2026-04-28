create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  title text not null,
  slug citext unique not null,
  short_description text,
  full_description text,
  terms_conditions text,
  discount_label text,
  original_price numeric(10,2),
  offer_price numeric(10,2),
  cover_image_path text,
  gallery_image_paths text[] not null default '{}',
  starts_at timestamptz,
  ends_at timestamptz,
  status deal_status not null default 'draft',
  is_featured boolean not null default false,
  priority integer not null default 0,
  view_count bigint not null default 0,
  save_count bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid references public.vendors(id) on delete cascade,
  deal_id uuid references public.deals(id) on delete cascade,
  media_type media_type not null default 'image',
  path text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.sponsored_placements (
  id uuid primary key default gen_random_uuid(),
  placement_key text not null,
  placement_name text,
  target_type ad_target_type not null,
  vendor_id uuid references public.vendors(id) on delete cascade,
  deal_id uuid references public.deals(id) on delete cascade,
  category_id uuid references public.categories(id) on delete cascade,
  external_url text,
  title text,
  subtitle text,
  image_path text,
  cta_label text,
  starts_at timestamptz,
  ends_at timestamptz,
  status placement_status not null default 'draft',
  priority integer not null default 0,
  weight integer not null default 1,
  max_impressions integer,
  max_clicks integer,
  amount numeric(12,2) not null default 0,
  billing_status billing_status not null default 'unpaid',
  payment_reference text,
  paid_at timestamptz,
  impression_count bigint not null default 0,
  click_count bigint not null default 0,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.marketplace_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  vendor_id uuid references public.vendors(id) on delete set null,
  deal_id uuid references public.deals(id) on delete set null,
  placement_id uuid references public.sponsored_placements(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.vendor_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug citext unique not null,
  price_monthly numeric(10,2) not null default 0,
  description text,
  features text[] not null default '{}',
  max_deals integer not null default 0,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vendor_subscriptions (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  plan_id uuid not null references public.vendor_plans(id),
  starts_at timestamptz not null,
  ends_at timestamptz,
  billing_status billing_status not null default 'pending',
  amount numeric(12,2) not null default 0,
  payment_reference text,
  paid_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_deals_vendor on public.deals(vendor_id);
create index if not exists idx_ads_placement on public.sponsored_placements(placement_key,status,starts_at,ends_at);
create index if not exists idx_events_type_created on public.marketplace_events(event_type,created_at desc);

create trigger trg_deals_updated before update on public.deals for each row execute function public.set_updated_at();
create trigger trg_placements_updated before update on public.sponsored_placements for each row execute function public.set_updated_at();
create trigger trg_vendor_plans_updated before update on public.vendor_plans for each row execute function public.set_updated_at();
create trigger trg_vendor_subscriptions_updated before update on public.vendor_subscriptions for each row execute function public.set_updated_at();

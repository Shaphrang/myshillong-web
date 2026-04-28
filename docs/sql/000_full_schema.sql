create extension if not exists pgcrypto;
create extension if not exists citext;

do $$ begin
  create type vendor_status as enum ('pending','active','inactive','rejected');
exception when duplicate_object then null; end $$;
do $$ begin
  create type deal_status as enum ('draft','active','paused','expired');
exception when duplicate_object then null; end $$;
do $$ begin
  create type media_type as enum ('image','video','document');
exception when duplicate_object then null; end $$;
do $$ begin
  create type placement_status as enum ('draft','active','paused','completed','cancelled');
exception when duplicate_object then null; end $$;
do $$ begin
  create type ad_target_type as enum ('vendor','deal','category','external_url');
exception when duplicate_object then null; end $$;
do $$ begin
  create type billing_status as enum ('unpaid','pending','paid','cancelled','refunded');
exception when duplicate_object then null; end $$;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
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
create table if not exists public.food_profiles (
  vendor_id uuid primary key references public.vendors(id) on delete cascade,
  cuisine_types text[] not null default '{}',
  food_types text[] not null default '{}',
  services text[] not null default '{}',
  average_cost_for_two numeric(10,2),
  opening_time time,
  closing_time time,
  is_open_now_override boolean,
  menu_image_paths text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.fashion_profiles (
  vendor_id uuid primary key references public.vendors(id) on delete cascade,
  product_types text[] not null default '{}',
  gender_focus text[] not null default '{}',
  services text[] not null default '{}',
  starting_price numeric(10,2),
  opening_time time,
  closing_time time,
  collection_image_paths text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_food_profiles_updated before update on public.food_profiles for each row execute function public.set_updated_at();
create trigger trg_fashion_profiles_updated before update on public.fashion_profiles for each row execute function public.set_updated_at();
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
create or replace view public.v_public_vendors as
select v.id,v.name,v.slug,v.short_description,v.cover_image_path,v.gallery_image_paths,v.public_phone,v.whatsapp,v.public_email,
       v.website_url,v.instagram_url,v.facebook_url,v.address,v.landmark,v.latitude,v.longitude,v.price_range,v.tags,
       l.name as locality_name,v.is_verified,v.is_featured,v.priority,v.view_count,v.phone_click_count,v.whatsapp_click_count,
       v.website_click_count,v.direction_click_count
from public.vendors v
left join public.localities l on l.id=v.locality_id
where v.status='active' and l.is_active is not false;

create or replace view public.v_public_deals as
select d.id,d.vendor_id,v.name as vendor_name,d.title,d.slug,d.short_description,d.discount_label,d.original_price,d.offer_price,
       d.cover_image_path,d.gallery_image_paths,d.starts_at,d.ends_at,d.is_featured,d.priority,d.view_count,d.save_count
from public.deals d
join public.vendors v on v.id=d.vendor_id
where d.status='active' and v.status='active' and (d.starts_at is null or d.starts_at <= now()) and (d.ends_at is null or d.ends_at >= now());

create or replace view public.v_active_sponsored_placements as
select sp.id,sp.placement_key,sp.placement_name,sp.target_type,sp.vendor_id,sp.deal_id,sp.category_id,sp.external_url,sp.title,sp.subtitle,sp.image_path,sp.cta_label,sp.priority,sp.weight,sp.impression_count,sp.click_count
from public.sponsored_placements sp
where sp.status='active' and (sp.starts_at is null or sp.starts_at <= now()) and (sp.ends_at is null or sp.ends_at >= now())
and (sp.max_impressions is null or sp.impression_count < sp.max_impressions) and (sp.max_clicks is null or sp.click_count < sp.max_clicks);

create or replace view public.v_admin_dashboard_stats as
select
  (select count(*) from public.vendors) as total_vendors,
  (select count(*) from public.vendors where status='active') as active_vendors,
  (select count(*) from public.vendors where status='pending') as pending_vendors,
  (select count(*) from public.deals where status='active') as active_deals,
  (select count(*) from public.sponsored_placements where status='active') as active_ads,
  (select coalesce(sum(view_count),0) from public.vendors) as vendor_views,
  (select coalesce(sum(whatsapp_click_count),0) from public.vendors) as whatsapp_clicks,
  (select coalesce(sum(phone_click_count),0) from public.vendors) as phone_clicks,
  (select coalesce(sum(impression_count),0) from public.sponsored_placements) as ad_impressions,
  (select coalesce(sum(click_count),0) from public.sponsored_placements) as ad_clicks,
  (select coalesce(sum(amount),0) from public.sponsored_placements where billing_status='paid') +
  (select coalesce(sum(amount),0) from public.vendor_subscriptions where billing_status='paid') as estimated_revenue;

create or replace view public.v_admin_vendor_performance as
select v.id as vendor_id,v.name as vendor_name,v.view_count as vendor_views,v.whatsapp_click_count as whatsapp_clicks,
       v.phone_click_count as phone_clicks,v.website_click_count as website_clicks,v.direction_click_count as direction_clicks
from public.vendors v order by v.view_count desc;

create or replace view public.v_admin_deal_performance as
select d.id as deal_id,d.title as deal_title,d.vendor_id,d.view_count as deal_views,d.save_count
from public.deals d order by d.view_count desc;

create or replace view public.v_admin_ad_performance as
select sp.id as placement_id,sp.placement_key,sp.title,sp.impression_count,sp.click_count,
       case when sp.impression_count > 0 then round((sp.click_count::numeric/sp.impression_count::numeric)*100,2) else 0 end as ctr_percent
from public.sponsored_placements sp order by sp.click_count desc;
create or replace function public.track_marketplace_event(
  p_event_type text,
  p_vendor_id uuid default null,
  p_deal_id uuid default null,
  p_placement_id uuid default null,
  p_metadata jsonb default '{}'::jsonb
) returns void language plpgsql security definer set search_path=public as $$
begin
  insert into public.marketplace_events(event_type,vendor_id,deal_id,placement_id,metadata)
  values (p_event_type,p_vendor_id,p_deal_id,p_placement_id,coalesce(p_metadata,'{}'::jsonb));

  if p_event_type='vendor_view' and p_vendor_id is not null then update public.vendors set view_count=view_count+1 where id=p_vendor_id; end if;
  if p_event_type='phone_click' and p_vendor_id is not null then update public.vendors set phone_click_count=phone_click_count+1 where id=p_vendor_id; end if;
  if p_event_type='whatsapp_click' and p_vendor_id is not null then update public.vendors set whatsapp_click_count=whatsapp_click_count+1 where id=p_vendor_id; end if;
  if p_event_type='website_click' and p_vendor_id is not null then update public.vendors set website_click_count=website_click_count+1 where id=p_vendor_id; end if;
  if p_event_type='direction_click' and p_vendor_id is not null then update public.vendors set direction_click_count=direction_click_count+1 where id=p_vendor_id; end if;
  if p_event_type='deal_view' and p_deal_id is not null then update public.deals set view_count=view_count+1 where id=p_deal_id; end if;
  if p_event_type='deal_save' and p_deal_id is not null then update public.deals set save_count=save_count+1 where id=p_deal_id; end if;
  if p_event_type='ad_impression' and p_placement_id is not null then update public.sponsored_placements set impression_count=impression_count+1 where id=p_placement_id; end if;
  if p_event_type='ad_click' and p_placement_id is not null then update public.sponsored_placements set click_count=click_count+1 where id=p_placement_id; end if;
end $$;

create or replace function public.get_active_placements(p_placement_key text, p_limit integer default 10)
returns setof public.v_active_sponsored_placements language sql stable as $$
  select * from public.v_active_sponsored_placements
  where placement_key = p_placement_key
  order by priority desc, weight desc, created_at desc nulls last
  limit greatest(1, p_limit);
$$;
alter table public.admin_profiles enable row level security;
alter table public.localities enable row level security;
alter table public.categories enable row level security;
alter table public.subcategories enable row level security;
alter table public.vendors enable row level security;
alter table public.vendor_categories enable row level security;
alter table public.food_profiles enable row level security;
alter table public.fashion_profiles enable row level security;
alter table public.deals enable row level security;
alter table public.media_assets enable row level security;
alter table public.sponsored_placements enable row level security;
alter table public.marketplace_events enable row level security;
alter table public.vendor_plans enable row level security;
alter table public.vendor_subscriptions enable row level security;

create policy "admin_profiles_self_read" on public.admin_profiles for select to authenticated using (id=auth.uid() or public.is_admin_user());
create policy "admin_profiles_admin_manage" on public.admin_profiles for all to authenticated using (public.is_admin_user()) with check (public.is_admin_user());

do $$ declare t text; begin
for t in select unnest(array['localities','categories','subcategories','vendors','vendor_categories','food_profiles','fashion_profiles','deals','media_assets','sponsored_placements','vendor_plans','vendor_subscriptions']) loop
  execute format('create policy "%s_admin_all" on public.%I for all to authenticated using (public.is_admin_user()) with check (public.is_admin_user())', t, t);
end loop;
end $$;

create policy "events_insert_public" on public.marketplace_events for insert to anon,authenticated with check (true);
create policy "events_admin_read" on public.marketplace_events for select to authenticated using (public.is_admin_user());

grant select on public.v_public_vendors, public.v_public_deals, public.v_active_sponsored_placements to anon, authenticated;
grant select on public.v_admin_dashboard_stats, public.v_admin_vendor_performance, public.v_admin_deal_performance, public.v_admin_ad_performance to authenticated;
grant execute on function public.track_marketplace_event(text,uuid,uuid,uuid,jsonb) to anon, authenticated;
grant execute on function public.get_active_placements(text,integer) to anon, authenticated;
insert into public.localities(name,slug,district,state,country,is_active,sort_order) values
('Police Bazar','police-bazar','East Khasi Hills','Meghalaya','India',true,1),
('Laitumkhrah','laitumkhrah','East Khasi Hills','Meghalaya','India',true,2),
('Shillong Peak Road','shillong-peak-road','East Khasi Hills','Meghalaya','India',true,3),
('Nongthymmai','nongthymmai','East Khasi Hills','Meghalaya','India',true,4),
('Mawlai','mawlai','East Khasi Hills','Meghalaya','India',true,5)
on conflict (slug) do nothing;

insert into public.categories(name,slug,is_active,sort_order) values
('Food & Cafes','food-cafes',true,1),
('Fashion & Shopping','fashion-shopping',true,2),
('Deals & Offers','deals-offers',true,3)
on conflict (slug) do nothing;

with food as (select id from public.categories where slug='food-cafes'), fashion as (select id from public.categories where slug='fashion-shopping')
insert into public.subcategories(category_id,name,slug,is_active,sort_order)
select food.id, x.name, x.slug, true, x.sort_order from food, (values
('Restaurant','restaurant',1),('Cafe','cafe',2),('Bakery','bakery',3),('Cloud Kitchen','cloud-kitchen',4),('Fast Food','fast-food',5),('Local Khasi Food','local-khasi-food',6),('Desserts & Beverages','desserts-beverages',7)
) as x(name,slug,sort_order)
on conflict (slug) do nothing;

with fashion as (select id from public.categories where slug='fashion-shopping')
insert into public.subcategories(category_id,name,slug,is_active,sort_order)
select fashion.id, x.name, x.slug, true, x.sort_order from fashion, (values
('Clothing Store','clothing-store',1),('Boutique','boutique',2),('Footwear','footwear',3),('Accessories','accessories',4),('Traditional Wear','traditional-wear',5),('Kids Fashion','kids-fashion',6),('Gift Store','gift-store',7)
) as x(name,slug,sort_order)
on conflict (slug) do nothing;

insert into public.vendor_plans(name,slug,price_monthly,description,features,max_deals,is_active,sort_order) values
('Free Listing','free-listing',0,'Basic profile listing','{"basic profile"}',1,true,1),
('Premium Listing','premium-listing',1999,'Better visibility and analytics','{"priority listing","analytics","more images"}',10,true,2),
('Featured Listing','featured-listing',4999,'Top exposure and featured placements','{"featured badge","priority placement","advanced analytics"}',50,true,3)
on conflict (slug) do nothing;
-- Supabase Storage Setup Notes
-- Bucket name: myshillong-media
-- Recommended folders:
-- vendors/{vendor_id}/cover/
-- vendors/{vendor_id}/gallery/
-- vendors/{vendor_id}/menu/
-- deals/{deal_id}/
-- categories/
-- ads/
-- branding/
--
-- Suggested bucket policy:
-- 1) Admin-authenticated uploads via dashboard.
-- 2) Public read only for approved objects used in public views.

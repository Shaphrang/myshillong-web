begin;

-- =====================================================
-- OPTIONAL BUT USEFUL FOR FAST SEARCH
-- Supports fast ILIKE/search on names.
-- =====================================================

create extension if not exists pg_trgm;

-- =====================================================
-- HELPER: ADD CHECK CONSTRAINT SAFELY
-- PostgreSQL does not support ADD CONSTRAINT IF NOT EXISTS,
-- so we use DO blocks.
-- =====================================================

-- =====================================================
-- BASIC CLEAN DATA CONSTRAINTS
-- =====================================================

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'districts_name_not_blank') then
    alter table public.districts
    add constraint districts_name_not_blank
    check (length(trim(name)) > 0);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'districts_slug_format_check') then
    alter table public.districts
    add constraint districts_slug_format_check
    check (slug::text ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
  end if;

  if not exists (select 1 from pg_constraint where conname = 'locations_name_not_blank') then
    alter table public.locations
    add constraint locations_name_not_blank
    check (length(trim(name)) > 0);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'locations_slug_format_check') then
    alter table public.locations
    add constraint locations_slug_format_check
    check (slug::text ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
  end if;

  if not exists (select 1 from pg_constraint where conname = 'categories_name_not_blank') then
    alter table public.categories
    add constraint categories_name_not_blank
    check (length(trim(name)) > 0);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'categories_slug_format_check') then
    alter table public.categories
    add constraint categories_slug_format_check
    check (slug::text ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
  end if;

  if not exists (select 1 from pg_constraint where conname = 'subcategories_name_not_blank') then
    alter table public.subcategories
    add constraint subcategories_name_not_blank
    check (length(trim(name)) > 0);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'subcategories_slug_format_check') then
    alter table public.subcategories
    add constraint subcategories_slug_format_check
    check (slug::text ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
  end if;
end $$;

-- =====================================================
-- FOOD VENDOR CONSTRAINTS
-- =====================================================

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'food_vendors_name_not_blank') then
    alter table public.food_vendors
    add constraint food_vendors_name_not_blank
    check (length(trim(name)) > 0);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'food_vendors_slug_format_check') then
    alter table public.food_vendors
    add constraint food_vendors_slug_format_check
    check (slug::text ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
  end if;

  if not exists (select 1 from pg_constraint where conname = 'food_vendors_phone_format_check') then
    alter table public.food_vendors
    add constraint food_vendors_phone_format_check
    check (
      phone is null
      or phone ~ '^[0-9+() -]{6,20}$'
    );
  end if;

  if not exists (select 1 from pg_constraint where conname = 'food_vendors_whatsapp_format_check') then
    alter table public.food_vendors
    add constraint food_vendors_whatsapp_format_check
    check (
      whatsapp is null
      or whatsapp ~ '^[0-9+() -]{6,20}$'
    );
  end if;

  if not exists (select 1 from pg_constraint where conname = 'food_vendors_email_format_check') then
    alter table public.food_vendors
    add constraint food_vendors_email_format_check
    check (
      email is null
      or email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    );
  end if;

  if not exists (select 1 from pg_constraint where conname = 'food_vendors_gallery_limit_check') then
    alter table public.food_vendors
    add constraint food_vendors_gallery_limit_check
    check (cardinality(gallery_image_paths) <= 20);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'food_vendors_arrays_no_nulls_check') then
    alter table public.food_vendors
    add constraint food_vendors_arrays_no_nulls_check
    check (
      array_position(selected_pages, null) is null
      and array_position(cuisine_types, null) is null
      and array_position(food_types, null) is null
      and array_position(services, null) is null
      and array_position(gallery_image_paths, null) is null
    );
  end if;
end $$;

-- =====================================================
-- CLOTHING VENDOR CONSTRAINTS
-- =====================================================

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'clothing_vendors_name_not_blank') then
    alter table public.clothing_vendors
    add constraint clothing_vendors_name_not_blank
    check (length(trim(name)) > 0);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'clothing_vendors_slug_format_check') then
    alter table public.clothing_vendors
    add constraint clothing_vendors_slug_format_check
    check (slug::text ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
  end if;

  if not exists (select 1 from pg_constraint where conname = 'clothing_vendors_phone_format_check') then
    alter table public.clothing_vendors
    add constraint clothing_vendors_phone_format_check
    check (
      phone is null
      or phone ~ '^[0-9+() -]{6,20}$'
    );
  end if;

  if not exists (select 1 from pg_constraint where conname = 'clothing_vendors_whatsapp_format_check') then
    alter table public.clothing_vendors
    add constraint clothing_vendors_whatsapp_format_check
    check (
      whatsapp is null
      or whatsapp ~ '^[0-9+() -]{6,20}$'
    );
  end if;

  if not exists (select 1 from pg_constraint where conname = 'clothing_vendors_email_format_check') then
    alter table public.clothing_vendors
    add constraint clothing_vendors_email_format_check
    check (
      email is null
      or email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    );
  end if;

  if not exists (select 1 from pg_constraint where conname = 'clothing_vendors_gallery_limit_check') then
    alter table public.clothing_vendors
    add constraint clothing_vendors_gallery_limit_check
    check (cardinality(gallery_image_paths) <= 20);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'clothing_vendors_arrays_no_nulls_check') then
    alter table public.clothing_vendors
    add constraint clothing_vendors_arrays_no_nulls_check
    check (
      array_position(selected_pages, null) is null
      and array_position(product_types, null) is null
      and array_position(gender_focus, null) is null
      and array_position(services, null) is null
      and array_position(gallery_image_paths, null) is null
    );
  end if;
end $$;

-- =====================================================
-- DEAL CONSTRAINTS
-- =====================================================

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'deals_title_not_blank') then
    alter table public.deals
    add constraint deals_title_not_blank
    check (length(trim(title)) > 0);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'deals_slug_format_check') then
    alter table public.deals
    add constraint deals_slug_format_check
    check (slug::text ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
  end if;

  if not exists (select 1 from pg_constraint where conname = 'deals_price_non_negative_check') then
    alter table public.deals
    add constraint deals_price_non_negative_check
    check (
      (original_price is null or original_price >= 0)
      and
      (offer_price is null or offer_price >= 0)
    );
  end if;

  if not exists (select 1 from pg_constraint where conname = 'deals_offer_not_more_than_original_check') then
    alter table public.deals
    add constraint deals_offer_not_more_than_original_check
    check (
      original_price is null
      or offer_price is null
      or offer_price <= original_price
    );
  end if;

  if not exists (select 1 from pg_constraint where conname = 'deals_gallery_limit_check') then
    alter table public.deals
    add constraint deals_gallery_limit_check
    check (cardinality(gallery_image_paths) <= 20);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'deals_arrays_no_nulls_check') then
    alter table public.deals
    add constraint deals_arrays_no_nulls_check
    check (
      array_position(selected_pages, null) is null
      and array_position(gallery_image_paths, null) is null
    );
  end if;
end $$;

-- =====================================================
-- IMPORTANT VALIDATION TRIGGER
-- This prevents accidentally selecting clothing category for food vendor,
-- or food category for clothing vendor.
-- =====================================================

create or replace function public.validate_vendor_category_type()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_category_type text;
begin
  select vendor_type
  into v_category_type
  from public.categories
  where id = new.category_id;

  if v_category_type is null then
    raise exception 'Invalid category_id: %', new.category_id;
  end if;

  if tg_table_name = 'food_vendors' and v_category_type <> 'food' then
    raise exception 'Food vendor must use a food category. Selected category type: %', v_category_type;
  end if;

  if tg_table_name = 'clothing_vendors' and v_category_type <> 'clothing' then
    raise exception 'Clothing vendor must use a clothing category. Selected category type: %', v_category_type;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_food_vendors_validate_category_type on public.food_vendors;

create trigger trg_food_vendors_validate_category_type
before insert or update of category_id
on public.food_vendors
for each row
execute function public.validate_vendor_category_type();

drop trigger if exists trg_clothing_vendors_validate_category_type on public.clothing_vendors;

create trigger trg_clothing_vendors_validate_category_type
before insert or update of category_id
on public.clothing_vendors
for each row
execute function public.validate_vendor_category_type();

-- =====================================================
-- MASTER DATA INDEXES
-- Fast dropdowns and filters.
-- =====================================================

create index if not exists idx_districts_active_sort
on public.districts (is_active, sort_order, name);

create index if not exists idx_locations_district_active_sort
on public.locations (district_id, is_active, sort_order, name);

create index if not exists idx_categories_type_active_sort
on public.categories (vendor_type, is_active, sort_order, name);

create index if not exists idx_subcategories_category_active_sort
on public.subcategories (category_id, is_active, sort_order, name);

-- =====================================================
-- FOOD VENDOR INDEXES
-- Fast public listing, filtering, featured sections and admin search.
-- =====================================================

create index if not exists idx_food_vendors_public_sort
on public.food_vendors (priority desc, created_at desc)
where is_active = true and status = 'active';

create index if not exists idx_food_vendors_public_filters
on public.food_vendors (
  district_id,
  location_id,
  category_id,
  subcategory_id,
  priority desc,
  created_at desc
)
where is_active = true and status = 'active';

create index if not exists idx_food_vendors_public_sponsored
on public.food_vendors (sponsored_type, priority desc, created_at desc)
where is_active = true and status = 'active';

create index if not exists idx_food_vendors_selected_pages_gin
on public.food_vendors
using gin (selected_pages);

create index if not exists idx_food_vendors_cuisine_types_gin
on public.food_vendors
using gin (cuisine_types);

create index if not exists idx_food_vendors_food_types_gin
on public.food_vendors
using gin (food_types);

create index if not exists idx_food_vendors_services_gin
on public.food_vendors
using gin (services);

create index if not exists idx_food_vendors_name_trgm
on public.food_vendors
using gin (name gin_trgm_ops);

create index if not exists idx_food_vendors_slug
on public.food_vendors (slug);

-- =====================================================
-- CLOTHING VENDOR INDEXES
-- Fast public listing, filtering, featured sections and admin search.
-- =====================================================

create index if not exists idx_clothing_vendors_public_sort
on public.clothing_vendors (priority desc, created_at desc)
where is_active = true and status = 'active';

create index if not exists idx_clothing_vendors_public_filters
on public.clothing_vendors (
  district_id,
  location_id,
  category_id,
  subcategory_id,
  priority desc,
  created_at desc
)
where is_active = true and status = 'active';

create index if not exists idx_clothing_vendors_public_sponsored
on public.clothing_vendors (sponsored_type, priority desc, created_at desc)
where is_active = true and status = 'active';

create index if not exists idx_clothing_vendors_selected_pages_gin
on public.clothing_vendors
using gin (selected_pages);

create index if not exists idx_clothing_vendors_product_types_gin
on public.clothing_vendors
using gin (product_types);

create index if not exists idx_clothing_vendors_gender_focus_gin
on public.clothing_vendors
using gin (gender_focus);

create index if not exists idx_clothing_vendors_services_gin
on public.clothing_vendors
using gin (services);

create index if not exists idx_clothing_vendors_name_trgm
on public.clothing_vendors
using gin (name gin_trgm_ops);

create index if not exists idx_clothing_vendors_slug
on public.clothing_vendors (slug);

-- =====================================================
-- DEAL INDEXES
-- Fast active deals, homepage deals, vendor detail deals.
-- =====================================================

create index if not exists idx_deals_public_sort
on public.deals (priority desc, created_at desc)
where is_active = true and status = 'active';

create index if not exists idx_deals_active_dates
on public.deals (starts_at, ends_at)
where is_active = true and status = 'active';

create index if not exists idx_deals_public_sponsored
on public.deals (sponsored_type, priority desc, created_at desc)
where is_active = true and status = 'active';

create index if not exists idx_deals_selected_pages_gin
on public.deals
using gin (selected_pages);

create index if not exists idx_deals_food_vendor_active
on public.deals (food_vendor_id, priority desc, created_at desc)
where vendor_type = 'food' and is_active = true and status = 'active';

create index if not exists idx_deals_clothing_vendor_active
on public.deals (clothing_vendor_id, priority desc, created_at desc)
where vendor_type = 'clothing' and is_active = true and status = 'active';

create index if not exists idx_deals_title_trgm
on public.deals
using gin (title gin_trgm_ops);

create index if not exists idx_deals_slug
on public.deals (slug);

-- =====================================================
-- ADMIN INDEXES
-- Fast admin filtering by status and created date.
-- =====================================================

create index if not exists idx_food_vendors_admin_status_created
on public.food_vendors (status, created_at desc);

create index if not exists idx_clothing_vendors_admin_status_created
on public.clothing_vendors (status, created_at desc);

create index if not exists idx_deals_admin_status_created
on public.deals (status, created_at desc);

-- =====================================================
-- ANALYZE TABLES
-- Refresh planner statistics after indexes.
-- =====================================================

analyze public.districts;
analyze public.locations;
analyze public.categories;
analyze public.subcategories;
analyze public.food_vendors;
analyze public.clothing_vendors;
analyze public.deals;

commit;
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

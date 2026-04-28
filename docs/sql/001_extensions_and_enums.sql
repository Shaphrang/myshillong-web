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

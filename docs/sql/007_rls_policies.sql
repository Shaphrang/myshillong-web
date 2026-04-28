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

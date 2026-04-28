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

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

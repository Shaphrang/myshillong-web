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

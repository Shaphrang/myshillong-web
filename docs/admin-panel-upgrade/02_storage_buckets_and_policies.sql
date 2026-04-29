-- Supabase storage guidance for admin media uploads.
-- Existing bucket used by app: myshillong-media

-- 1) Create bucket manually in Supabase dashboard (Storage > New Bucket)
-- Name: myshillong-media
-- Public bucket: true (for marketplace/public images)

-- 2) Example policies (adjust role checks to match your admin claims model)
-- Public read access:
-- create policy "Public read media"
-- on storage.objects for select
-- to public
-- using (bucket_id = 'myshillong-media');

-- Authenticated admin upload/update/delete (example using JWT app_metadata role='admin'):
-- create policy "Admin can upload media"
-- on storage.objects for insert
-- to authenticated
-- with check (
--   bucket_id = 'myshillong-media'
--   and coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), '') = 'admin'
-- );

-- create policy "Admin can update media"
-- on storage.objects for update
-- to authenticated
-- using (
--   bucket_id = 'myshillong-media'
--   and coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), '') = 'admin'
-- )
-- with check (
--   bucket_id = 'myshillong-media'
--   and coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), '') = 'admin'
-- );

-- create policy "Admin can delete media"
-- on storage.objects for delete
-- to authenticated
-- using (
--   bucket_id = 'myshillong-media'
--   and coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), '') = 'admin'
-- );

# Image Upload Guide

1. Bucket: `myshillong-media` (public).
2. Folder convention:
   - `vendors/{vendorId}/cover.webp`
   - `vendors/{vendorId}/gallery/{timestamp}-{slug}.webp`
   - `deals/{dealId}/cover.webp`
3. Supported formats: JPG, PNG, WEBP.
4. Images are resized to max ~1400x1400 and compressed to WebP with target ~0.28MB where possible.
5. Recommended source file max: 10MB.
6. DB storage: keep saving storage path fields (not service-role URLs).
7. Replacing images:
   - upload new file to same cover path OR new gallery path
   - update DB row with new path
   - optionally delete old object from storage
8. Testing:
   - open admin create/edit form
   - choose large JPG/PNG image
   - verify optimization message and preview
   - verify saved path/url and frontend rendering
9. Troubleshooting:
   - invalid type -> only JPG/PNG/WEBP allowed
   - huge file -> reduce below 10MB before upload
   - permission errors -> verify storage policies and admin role claims

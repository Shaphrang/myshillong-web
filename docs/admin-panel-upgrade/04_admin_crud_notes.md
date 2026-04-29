# Admin CRUD Notes

## Updated UI pages/components
- `src/components/admin/AdminShell.tsx`
- `src/components/admin/AdminSidebar.tsx`
- `src/components/admin/AdminTopbar.tsx`
- `src/app/admin/(protected)/dashboard/page.tsx`

## Added image utilities/components
- `src/lib/utils/image-upload.ts`
- `src/components/admin/ImageUploadField.tsx`

## Existing CRUD coverage (already present)
- categories, subcategories, vendors, deals, localities, media, plans, placements, subscriptions.

## Known limitations
- New `ImageUploadField` currently provides optimization + preview and hidden value handling; wire-up to final storage upload endpoint/action per module if not already present.
- Module-by-module relational dropdown enhancement is still an incremental follow-up for modules beyond deals/vendors.

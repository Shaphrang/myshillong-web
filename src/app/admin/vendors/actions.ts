'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { sbMutate } from '@/lib/supabase/server';
import { toSlug } from '@/lib/utils/slug';
import { parseCsv } from '@/lib/utils/format';

function vendorPayload(formData: FormData) {
  const name = String(formData.get('name') ?? '');
  return {
    name,
    slug: toSlug(String(formData.get('slug') || name)),
    short_description: formData.get('short_description'),
    full_description: formData.get('full_description'),
    owner_name: formData.get('owner_name'), owner_phone: formData.get('owner_phone'), owner_email: formData.get('owner_email'),
    public_phone: formData.get('public_phone'), whatsapp: formData.get('whatsapp'), public_email: formData.get('public_email'),
    website_url: formData.get('website_url'), instagram_url: formData.get('instagram_url'), facebook_url: formData.get('facebook_url'),
    locality_id: formData.get('locality_id') || null, address: formData.get('address'), landmark: formData.get('landmark'), latitude: formData.get('latitude') || null, longitude: formData.get('longitude') || null,
    price_range: formData.get('price_range'), tags: parseCsv(formData.get('tags')), search_keywords: parseCsv(formData.get('search_keywords')),
    cover_image_path: formData.get('cover_image_path'), gallery_image_paths: parseCsv(formData.get('gallery_image_paths')),
    status: formData.get('status') || 'pending', is_verified: formData.get('is_verified') === 'on', is_featured: formData.get('is_featured') === 'on', priority: Number(formData.get('priority') || 0), internal_notes: formData.get('internal_notes'),
  };
}

export async function createVendor(formData: FormData) { await requireAdmin(); await sbMutate('vendors','POST', vendorPayload(formData)); revalidatePath('/admin/vendors'); }
export async function updateVendor(formData: FormData) { await requireAdmin(); const id = formData.get('id'); await sbMutate('vendors','PATCH', vendorPayload(formData), `id=eq.${id}`); revalidatePath('/admin/vendors'); revalidatePath(`/admin/vendors/${id}`); }
export async function deleteVendor(formData: FormData) { await requireAdmin(); await sbMutate('vendors','DELETE', undefined, `id=eq.${formData.get('id')}`); revalidatePath('/admin/vendors'); }

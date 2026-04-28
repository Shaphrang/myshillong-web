'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { sbMutate } from '@/lib/supabase/server';
import { parseCsv } from '@/lib/utils/format';
import { toSlug } from '@/lib/utils/slug';

function dealPayload(formData: FormData) {
  const title = String(formData.get('title') ?? '');
  return {
    vendor_id: formData.get('vendor_id'), title, slug: toSlug(String(formData.get('slug') || title)), short_description: formData.get('short_description'),
    full_description: formData.get('full_description'), terms_conditions: formData.get('terms_conditions'), discount_label: formData.get('discount_label'),
    original_price: Number(formData.get('original_price') || 0), offer_price: Number(formData.get('offer_price') || 0),
    cover_image_path: formData.get('cover_image_path'), gallery_image_paths: parseCsv(formData.get('gallery_image_paths')),
    starts_at: formData.get('starts_at'), ends_at: formData.get('ends_at'), status: formData.get('status') || 'draft',
    is_featured: formData.get('is_featured') === 'on', priority: Number(formData.get('priority') || 0),
  };
}

export async function createDeal(formData: FormData) { await requireAdmin(); await sbMutate('deals','POST', dealPayload(formData)); revalidatePath('/admin/deals'); }
export async function updateDeal(formData: FormData) { await requireAdmin(); const id=formData.get('id'); await sbMutate('deals','PATCH', dealPayload(formData), `id=eq.${id}`); revalidatePath('/admin/deals'); }
export async function deleteDeal(formData: FormData) { await requireAdmin(); await sbMutate('deals','DELETE', undefined, `id=eq.${formData.get('id')}`); revalidatePath('/admin/deals'); }

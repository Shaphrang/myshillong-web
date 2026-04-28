'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin/auth';
import { sbMutate } from '@/lib/supabase/server';

export async function createMedia(formData: FormData) {
  await requireAdmin();
  await sbMutate('media_assets', 'POST', {
    vendor_id: formData.get('vendor_id') || null,
    deal_id: formData.get('deal_id') || null,
    media_type: formData.get('media_type') || 'image',
    path: formData.get('path'),
    alt_text: formData.get('alt_text') || null,
    sort_order: Number(formData.get('sort_order') || 0),
  });
  revalidatePath('/admin/media');
}

export async function deleteMedia(formData: FormData) {
  await requireAdmin();
  await sbMutate('media_assets', 'DELETE', undefined, `id=eq.${formData.get('id')}`);
  revalidatePath('/admin/media');
}

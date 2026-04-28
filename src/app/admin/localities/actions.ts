'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { sbMutate } from '@/lib/supabase/server';
import { toSlug } from '@/lib/utils/slug';

export async function createLocality(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get('name') ?? '');
  await sbMutate('localities', 'POST', { name, slug: toSlug(String(formData.get('slug') || name)), district: formData.get('district'), state: formData.get('state') || 'Meghalaya', country: formData.get('country') || 'India', is_active: formData.get('is_active') === 'on', sort_order: Number(formData.get('sort_order') || 0) });
  revalidatePath('/admin/localities');
}
export async function deleteLocality(formData: FormData) { await requireAdmin(); await sbMutate('localities','DELETE',undefined,`id=eq.${formData.get('id')}`); revalidatePath('/admin/localities'); }

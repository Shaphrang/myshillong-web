'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { sbMutate } from '@/lib/supabase/server';
import { toSlug } from '@/lib/utils/slug';

export async function createSubcategory(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get('name') ?? '');
  await sbMutate('subcategories', 'POST', { name, slug: toSlug(String(formData.get('slug') || name)), category_id: formData.get('category_id'), is_active: formData.get('is_active') === 'on', sort_order: Number(formData.get('sort_order') || 0) });
  revalidatePath('/admin/subcategories');
}
export async function deleteSubcategory(formData: FormData) { await requireAdmin(); await sbMutate('subcategories','DELETE',undefined,`id=eq.${formData.get('id')}`); revalidatePath('/admin/subcategories'); }

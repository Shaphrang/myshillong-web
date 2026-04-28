'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { sbMutate } from '@/lib/supabase/server';
import { toSlug } from '@/lib/utils/slug';

export async function createCategory(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get('name') ?? '');
  await sbMutate('categories', 'POST', { name, slug: toSlug(String(formData.get('slug') || name)), icon_name: formData.get('icon_name'), cover_image_path: formData.get('cover_image_path'), is_active: formData.get('is_active') === 'on', sort_order: Number(formData.get('sort_order') || 0) });
  revalidatePath('/admin/categories');
}
export async function deleteCategory(formData: FormData) { await requireAdmin(); await sbMutate('categories','DELETE',undefined,`id=eq.${formData.get('id')}`); revalidatePath('/admin/categories'); }

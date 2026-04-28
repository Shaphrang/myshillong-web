'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { sbMutate } from '@/lib/supabase/server';
import { toSlug } from '@/lib/utils/slug';
import { parseCsv } from '@/lib/utils/format';

export async function createPlan(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get('name') ?? '');
  await sbMutate('vendor_plans', 'POST', { name, slug: toSlug(String(formData.get('slug') || name)), price_monthly: Number(formData.get('price_monthly') || 0), description: formData.get('description'), features: parseCsv(formData.get('features')), max_deals: Number(formData.get('max_deals') || 0), is_active: formData.get('is_active') === 'on', sort_order: Number(formData.get('sort_order') || 0) });
  revalidatePath('/admin/plans');
}

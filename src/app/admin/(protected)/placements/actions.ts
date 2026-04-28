'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { sbMutate } from '@/lib/supabase/server';

function adPayload(formData: FormData) {
  return {
    placement_key: formData.get('placement_key'), placement_name: formData.get('placement_name'), target_type: formData.get('target_type'),
    vendor_id: formData.get('vendor_id') || null, deal_id: formData.get('deal_id') || null, category_id: formData.get('category_id') || null,
    external_url: formData.get('external_url') || null, title: formData.get('title'), subtitle: formData.get('subtitle'), image_path: formData.get('image_path'), cta_label: formData.get('cta_label'),
    starts_at: formData.get('starts_at'), ends_at: formData.get('ends_at'), status: formData.get('status') || 'draft', priority: Number(formData.get('priority') || 0), weight: Number(formData.get('weight') || 1),
    max_impressions: Number(formData.get('max_impressions') || 0), max_clicks: Number(formData.get('max_clicks') || 0),
    billing_status: formData.get('billing_status') || 'unpaid', amount: Number(formData.get('amount') || 0), payment_reference: formData.get('payment_reference'), paid_at: formData.get('paid_at') || null, internal_notes: formData.get('internal_notes'),
  };
}

export async function createAd(formData: FormData) { await requireAdmin(); await sbMutate('sponsored_placements','POST', adPayload(formData)); revalidatePath('/admin/placements'); }
export async function updateAd(formData: FormData) { await requireAdmin(); const id=formData.get('id'); await sbMutate('sponsored_placements','PATCH', adPayload(formData), `id=eq.${id}`); revalidatePath('/admin/placements'); }
export async function deleteAd(formData: FormData) { await requireAdmin(); await sbMutate('sponsored_placements','DELETE',undefined,`id=eq.${formData.get('id')}`); revalidatePath('/admin/placements'); }

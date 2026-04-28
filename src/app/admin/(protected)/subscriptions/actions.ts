'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { sbMutate } from '@/lib/supabase/server';

export async function createSubscription(formData: FormData) {
  await requireAdmin();
  await sbMutate('vendor_subscriptions', 'POST', { vendor_id: formData.get('vendor_id'), plan_id: formData.get('plan_id'), starts_at: formData.get('starts_at'), ends_at: formData.get('ends_at'), billing_status: formData.get('billing_status') || 'pending', amount: Number(formData.get('amount') || 0), payment_reference: formData.get('payment_reference'), paid_at: formData.get('paid_at') || null, notes: formData.get('notes') });
  revalidatePath('/admin/subscriptions');
}

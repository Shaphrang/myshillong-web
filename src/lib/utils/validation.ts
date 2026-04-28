import type { ActionState } from '@/types/admin';

export function requireFields(formData: FormData, fields: string[]): ActionState['fieldErrors'] {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    const value = formData.get(field);
    if (!value || (typeof value === 'string' && !value.trim())) errors[field] = 'Required';
  }
  return Object.keys(errors).length ? errors : undefined;
}

export function validateAdTarget(formData: FormData): ActionState['fieldErrors'] {
  const targetType = String(formData.get('target_type') ?? '');
  const errors: Record<string, string> = {};
  if (targetType === 'vendor' && !formData.get('vendor_id')) errors.vendor_id = 'Vendor is required';
  if (targetType === 'deal' && !formData.get('deal_id')) errors.deal_id = 'Deal is required';
  if (targetType === 'category' && !formData.get('category_id')) errors.category_id = 'Category is required';
  if (targetType === 'external_url' && !formData.get('external_url')) errors.external_url = 'URL is required';
  return Object.keys(errors).length ? errors : undefined;
}

export function parseCsv(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== 'string') return [];
  return value.split(',').map((v) => v.trim()).filter(Boolean);
}

export function formatCurrency(value: number | null | undefined, currency = 'INR') {
  if (value == null) return '-';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
}

export function formatDate(value?: string | null) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('en-IN');
}

export function formatDateTime(value?: string | null) {
  if (!value) return '-';
  return new Date(value).toLocaleString('en-IN');
}

export function normalizePhone(value: string) {
  return value.replace(/[^0-9+]/g, '').trim();
}

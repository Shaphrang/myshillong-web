export function formDataToString(formData: FormData, key: string) { return String(formData.get(key) ?? '').trim(); }
export function formDataToNumber(formData: FormData, key: string) { const v = Number(formData.get(key)); return Number.isFinite(v) ? v : null; }
export function formDataToBoolean(formData: FormData, key: string) { return formData.get(key) === 'on' || formData.get(key) === 'true'; }
export function formDataToStringArray(formData: FormData, key: string) { return formDataToString(formData, key).split(/[\n,]/).map((v) => v.trim()).filter(Boolean); }
export function emptyToNull<T extends string | number | null | undefined>(value: T) { return value === '' || value === undefined ? null : value; }
export function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'); }

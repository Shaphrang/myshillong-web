const MEDIA_BUCKET = 'myshillong-media';

export function normalizeStoragePath(path: string): string {
  return path.replace(/^\/+/, '').replace(`${MEDIA_BUCKET}/`, '');
}

export function getPublicMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;

  const normalized = normalizeStoragePath(path);
  return `${base}/storage/v1/object/public/${MEDIA_BUCKET}/${normalized}`;
}

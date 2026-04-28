const DEFAULT_MEDIA_BUCKET = 'myshillong-media';

export function getPublicStorageUrl(path: string | null | undefined, bucket = DEFAULT_MEDIA_BUCKET): string | null {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl) return null;

  try {
    const normalizedPath = path.replace(/^\/+/, '').replace(`${bucket}/`, '');
    return `${baseUrl}/storage/v1/object/public/${bucket}/${normalizedPath}`;
  } catch {
    return null;
  }
}

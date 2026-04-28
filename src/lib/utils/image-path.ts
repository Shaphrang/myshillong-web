import { getPublicMediaUrl } from '@/lib/supabase/storage';

export function resolveImagePath(path?: string | null): string | null {
  if (!path) return null;

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const publicUrl = getPublicMediaUrl(path);
  return publicUrl || null;
}

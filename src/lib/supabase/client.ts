import { createBrowserClient } from '@supabase/ssr';

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return null;
  }

  return { url, key };
}

export function createClient() {
  const env = getSupabaseEnv();

  if (!env) {
    throw new Error('Supabase environment variables are not configured.');
  }

  return createBrowserClient(env.url, env.key);
}

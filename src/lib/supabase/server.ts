/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabaseEnv } from './client';

export async function createClient() {
  const env = getSupabaseEnv();

  if (!env) {
    throw new Error('Supabase environment variables are not configured.');
  }

  const cookieStore = await cookies();

  return createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Safe to ignore in Server Components.
          // Server Actions can set cookies correctly.
        }
      },
    },
  });
}

async function getRestHeaders() {
  const env = getSupabaseEnv();
  if (!env) return null;

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    apikey: env.key,
    Authorization: `Bearer ${session?.access_token ?? env.key}`,
  };
}

function buildRestUrl(baseUrl: string, tableOrView: string, select = '*', filters?: Record<string, string>) {
  const params = new URLSearchParams();
  params.set('select', select);

  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, value);
      }
    }
  }

  return `${baseUrl}/rest/v1/${tableOrView}?${params.toString()}`;
}

export async function getAuthUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function sbSelect(tableOrView: string, select = '*', filters?: Record<string, string>): Promise<any[]> {
  const env = getSupabaseEnv();
  if (!env) return [];

  const headers = await getRestHeaders();
  if (!headers) return [];

  const res = await fetch(buildRestUrl(env.url, tableOrView, select, filters), {
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return await res.json();
}

export async function sbRpc<T = unknown>(fn: string, body: Record<string, unknown>) {
  const env = getSupabaseEnv();
  if (!env) throw new Error('Supabase env vars are missing.');

  const headers = await getRestHeaders();
  if (!headers) throw new Error('Supabase auth headers are unavailable.');

  const res = await fetch(`${env.url}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return (await res.json()) as T;
}

export async function sbMutate(
  table: string,
  method: 'POST' | 'PATCH' | 'DELETE',
  body?: Record<string, unknown>,
  filter?: string
) {
  const env = getSupabaseEnv();
  if (!env) throw new Error('Supabase env vars are missing.');

  const headers = await getRestHeaders();
  if (!headers) throw new Error('Supabase auth headers are unavailable.');

  const res = await fetch(`${env.url}/rest/v1/${table}${filter ? `?${filter}` : ''}`, {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.status === 204 ? null : res.json();
}

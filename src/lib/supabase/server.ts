//src\lib\supabase\server.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';
import { getSupabaseEnv } from './client';

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get('sb-access-token')?.value;
}

async function authHeaders() {
  const env = getSupabaseEnv();
  if (!env) return null;

  const { key } = env;
  const token = await getAccessToken();

  return {
    apikey: key,
    Authorization: token ? `Bearer ${token}` : `Bearer ${key}`,
  };
}

function buildRestUrl(
  baseUrl: string,
  tableOrView: string,
  select = '*',
  filters?: Record<string, string>
) {
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
  const env = getSupabaseEnv();
  if (!env) return null;

  const { url } = env;
  const headers = await authHeaders();
  if (!headers) return null;

  const res = await fetch(`${url}/auth/v1/user`, {
    headers,
    cache: 'no-store',
  });

  if (!res.ok) return null;

  return res.json();
}

export async function sbSelect(
  tableOrView: string,
  select = '*',
  filters?: Record<string, string>
): Promise<any[]> {
  const env = getSupabaseEnv();
  if (!env) return [];

  const { url } = env;
  const headers = await authHeaders();
  if (!headers) return [];

  const res = await fetch(buildRestUrl(url, tableOrView, select, filters), {
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return await res.json();
}

export async function sbRpc<T = unknown>(
  fn: string,
  body: Record<string, unknown>
) {
  const env = getSupabaseEnv();
  if (!env) throw new Error('Supabase env vars are missing.');

  const { url } = env;
  const headers = await authHeaders();
  if (!headers) throw new Error('Supabase auth headers are unavailable.');

  const res = await fetch(`${url}/rest/v1/rpc/${fn}`, {
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

  const { url } = env;
  const headers = await authHeaders();
  if (!headers) throw new Error('Supabase auth headers are unavailable.');

  const res = await fetch(`${url}/rest/v1/${table}${filter ? `?${filter}` : ''}`, {
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
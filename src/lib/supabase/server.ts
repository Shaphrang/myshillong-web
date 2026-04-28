/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './client';

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get('sb-access-token')?.value;
}

export async function sbSelect(tableOrView: string, query = '*'): Promise<any[]> {
  const token = await getAccessToken();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${tableOrView}?select=${encodeURIComponent(query)}`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: token ? `Bearer ${token}` : `Bearer ${SUPABASE_ANON_KEY}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function sbRpc<T = unknown>(fn: string, body: Record<string, unknown>) {
  const token = await getAccessToken();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY, Authorization: token ? `Bearer ${token}` : `Bearer ${SUPABASE_ANON_KEY}` },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}

export async function sbMutate(table: string, method: 'POST'|'PATCH'|'DELETE', body?: Record<string, unknown>, filter?: string) {
  const token = await getAccessToken();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${filter ? `?${filter}` : ''}`, {
    method,
    headers: { 'Content-Type': 'application/json', Prefer: 'return=representation', apikey: SUPABASE_ANON_KEY, Authorization: token ? `Bearer ${token}` : `Bearer ${SUPABASE_ANON_KEY}` },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.status === 204 ? null : res.json();
}

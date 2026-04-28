import { sbRpc } from '@/lib/supabase/server';

export async function trackMarketplaceEvent(payload: Record<string, unknown>) {
  try {
    await sbRpc('track_marketplace_event', payload);
  } catch {
    // Do not block rendering
  }
}

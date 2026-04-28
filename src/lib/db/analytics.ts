import { sbRpc } from '@/lib/supabase/server';

async function track(eventType: string, payload: Record<string, unknown> = {}) {
  return sbRpc('track_marketplace_event', { p_event_type: eventType, ...payload }).catch(() => null);
}

export const trackVendorView = (vendorId: string) => track('vendor_view', { p_vendor_id: vendorId });
export const trackDealView = (dealId: string) => track('deal_view', { p_deal_id: dealId });
export const trackPhoneClick = (vendorId: string) => track('phone_click', { p_vendor_id: vendorId });
export const trackWhatsappClick = (vendorId: string, dealId?: string) => track('whatsapp_click', { p_vendor_id: vendorId, p_deal_id: dealId });
export const trackWebsiteClick = (vendorId: string) => track('website_click', { p_vendor_id: vendorId });
export const trackDirectionClick = (vendorId: string) => track('direction_click', { p_vendor_id: vendorId });
export const trackAdImpression = (placementId: string) => track('ad_impression', { p_placement_id: placementId });
export const trackAdClick = (placementId: string) => track('ad_click', { p_placement_id: placementId });

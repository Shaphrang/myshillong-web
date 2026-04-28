import { sbSelect } from '@/lib/supabase/server';

export const getLocalities = () => sbSelect('localities').catch(() => []);
export const getCategories = () => sbSelect('categories').catch(() => []);
export const getSubcategories = () => sbSelect('subcategories').catch(() => []);
export const getVendors = () => sbSelect('vendors').catch(() => []);
export const getVendorById = async (id: string) => (await sbSelect('vendors', `*&id=eq.${id}`).catch(() => []))[0] ?? null;
export const getDeals = () => sbSelect('deals').catch(() => []);
export const getPlacements = () => sbSelect('sponsored_placements').catch(() => []);
export const getVendorPlans = () => sbSelect('vendor_plans').catch(() => []);

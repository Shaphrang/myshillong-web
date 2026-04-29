import { sbSelect } from '@/lib/supabase/server';

export const getDistricts = () => sbSelect('districts').catch(() => []);
export const getLocations = () => sbSelect('locations').catch(() => []);
export const getCategories = () => sbSelect('categories').catch(() => []);
export const getSubcategories = () => sbSelect('subcategories').catch(() => []);
export const getFoodVendors = () => sbSelect('food_vendors').catch(() => []);
export const getClothingVendors = () => sbSelect('clothing_vendors').catch(() => []);
export const getFoodVendorById = async (id: string) => (await sbSelect('food_vendors', '*', { id: `eq.${id}` }).catch(() => []))[0] ?? null;
export const getClothingVendorById = async (id: string) => (await sbSelect('clothing_vendors', '*', { id: `eq.${id}` }).catch(() => []))[0] ?? null;
export const getDeals = () => sbSelect('deals').catch(() => []);

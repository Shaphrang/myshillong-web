/* eslint-disable @typescript-eslint/no-explicit-any */
import { createVendor } from '../actions';
import { VendorForm } from '@/components/admin/VendorForm';
import { sbSelect } from '@/lib/supabase/server';

export default async function NewVendorPage() {
  const [localities, categories, subcategories] = await Promise.all([sbSelect('localities','id,name').catch(()=>[]), sbSelect('categories','id,name').catch(()=>[]), sbSelect('subcategories','id,name,category_id').catch(()=>[])]);
  return <VendorForm action={createVendor} localities={localities as any[]} categories={categories as any[]} subcategories={subcategories as any[]} />;
}

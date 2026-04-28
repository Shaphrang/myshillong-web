/* eslint-disable @typescript-eslint/no-explicit-any */
import { sbSelect } from '@/lib/supabase/server';
import { updateVendor } from '../../actions';
import { VendorForm } from '@/components/admin/VendorForm';

export default async function EditVendorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [vendor, localities, categories, subcategories] = await Promise.all([sbSelect('vendors','*&id=eq.' + id).then((r)=>r[0]).catch(()=>null), sbSelect('localities','id,name').catch(()=>[]), sbSelect('categories','id,name').catch(()=>[]), sbSelect('subcategories','id,name,category_id').catch(()=>[])]);
  return <VendorForm action={updateVendor} vendor={vendor as any} localities={localities as any[]} categories={categories as any[]} subcategories={subcategories as any[]} />;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdForm } from '@/components/admin/AdForm';
import { sbSelect } from '@/lib/supabase/server';
import { updateAd } from '../../actions';

export default async function EditAdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [ad, vendors, deals, categories] = await Promise.all([sbSelect('sponsored_placements','*&id=eq.'+id).then((r)=>r[0]).catch(()=>null), sbSelect('vendors','id,name').catch(()=>[]), sbSelect('deals','id,title').catch(()=>[]), sbSelect('categories','id,name').catch(()=>[])]);
  return <AdForm action={updateAd} ad={ad as any} vendors={vendors as any[]} deals={deals as any[]} categories={categories as any[]} />;
}

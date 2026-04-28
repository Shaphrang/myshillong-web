/* eslint-disable @typescript-eslint/no-explicit-any */
import { DealForm } from '@/components/admin/DealForm';
import { sbSelect } from '@/lib/supabase/server';
import { updateDeal } from '../../actions';

export default async function EditDealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [deal, vendors] = await Promise.all([sbSelect('deals','*&id=eq.'+id).then((r)=>r[0]).catch(()=>null), sbSelect('vendors','id,name').catch(()=>[])]);
  return <DealForm action={updateDeal} deal={deal as any} vendors={vendors as any[]} />;
}

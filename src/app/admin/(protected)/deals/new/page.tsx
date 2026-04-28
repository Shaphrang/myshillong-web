/* eslint-disable @typescript-eslint/no-explicit-any */
import { DealForm } from '@/components/admin/DealForm';
import { sbSelect } from '@/lib/supabase/server';
import { createDeal } from '../actions';

export default async function NewDealPage() {
  const vendors = await sbSelect('vendors','id,name').catch(()=>[]);
  return <DealForm action={createDeal} vendors={vendors as any[]} />;
}

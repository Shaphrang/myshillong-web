/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdForm } from '@/components/admin/AdForm';
import { sbSelect } from '@/lib/supabase/server';
import { createAd } from '../actions';

export default async function NewAdPage() {
  const [vendors, deals, categories] = await Promise.all([sbSelect('vendors','id,name').catch(()=>[]), sbSelect('deals','id,title').catch(()=>[]), sbSelect('categories','id,name').catch(()=>[])]);
  return <AdForm action={createAd} vendors={vendors as any[]} deals={deals as any[]} categories={categories as any[]} />;
}

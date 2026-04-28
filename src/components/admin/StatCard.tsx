import { Card } from '@/components/ui/card';

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return <Card><p className="text-xs text-slate-500">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p></Card>;
}

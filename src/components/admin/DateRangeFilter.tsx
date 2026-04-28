import { Input } from '@/components/ui/input';

export function DateRangeFilter() {
  return <div className="grid gap-2 md:grid-cols-2"><Input type="date" name="from" /><Input type="date" name="to" /></div>;
}

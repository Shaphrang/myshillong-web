import { Input } from '@/components/ui/input';

export function SearchInput({ name = 'q', defaultValue }: { name?: string; defaultValue?: string }) {
  return <Input name={name} defaultValue={defaultValue} placeholder="Search..." />;
}

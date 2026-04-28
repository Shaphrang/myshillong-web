export function StatusBadge({ value }: { value: string | null | undefined }) {
  return <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{value ?? '-'}</span>;
}

import type { ReactNode } from 'react';

export function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="space-y-3 rounded-lg border bg-white p-4"><h3 className="font-semibold">{title}</h3>{children}</section>;
}

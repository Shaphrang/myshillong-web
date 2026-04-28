import type { ReactNode } from 'react';

export function Table({ children }: { children: ReactNode }) {
  return <div className="overflow-x-auto"><table className="min-w-full text-sm">{children}</table></div>;
}

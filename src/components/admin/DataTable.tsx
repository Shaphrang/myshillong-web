import type { ReactNode } from 'react';
import { Table } from '@/components/ui/table';

export function DataTable({ header, children }: { header: ReactNode; children: ReactNode }) {
  return <Table><thead className="border-b bg-slate-50">{header}</thead><tbody>{children}</tbody></Table>;
}

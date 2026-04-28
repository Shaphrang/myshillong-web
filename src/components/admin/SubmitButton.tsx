'use client';
import { useFormStatus } from 'react-dom';

export function SubmitButton({ label = 'Save' }: { label?: string }) {
  const { pending } = useFormStatus();
  return <button className="rounded-md bg-sky-600 px-4 py-2 text-white" disabled={pending}>{pending ? 'Saving...' : label}</button>;
}

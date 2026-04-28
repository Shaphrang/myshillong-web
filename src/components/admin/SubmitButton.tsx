'use client';

import type { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  children?: ReactNode;
  label?: string;
  pendingText?: string;
  className?: string;
};

export function SubmitButton({ children, label = 'Save', pendingText = 'Saving...', className }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={
        className ??
        'inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60'
      }
    >
      {pending ? pendingText : children ?? label}
    </button>
  );
}

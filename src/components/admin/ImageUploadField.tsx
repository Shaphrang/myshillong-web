'use client';

import { useState } from 'react';
import { FieldError } from './FieldError';
import { optimizeImageFile } from '@/lib/utils/image-upload';

type Props = {
  name: string;
  label: string;
  defaultValue?: string | null;
  required?: boolean;
};

export function ImageUploadField({ name, label, defaultValue, required }: Props) {
  const [value, setValue] = useState(defaultValue ?? '');
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  async function onFileChange(file: File | null) {
    if (!file) return;
    setError(null);
    setProcessing(true);
    try {
      const optimized = await optimizeImageFile(file);
      const dataUrl = await fileToDataUrl(optimized);
      setValue(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to optimize this image.');
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}{required ? ' *' : ''}</label>
      <input type="hidden" name={name} value={value} />
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        onChange={(event) => void onFileChange(event.target.files?.[0] ?? null)}
      />
      {processing ? <p className="text-xs text-slate-500">Optimizing image before upload...</p> : null}
      {value ? <img src={value} alt={`${label} preview`} className="h-24 w-24 rounded-md border border-slate-200 object-cover" /> : <p className="text-xs text-slate-500">No image uploaded yet.</p>}
      <FieldError error={error ?? undefined} />
    </div>
  );
}

async function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read optimized image.'));
    reader.readAsDataURL(file);
  });
}

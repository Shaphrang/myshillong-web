'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

type SafeImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  type?: 'food' | 'fashion' | 'deal' | 'business' | 'hero' | 'generic';
  fill?: boolean;
  width?: number;
  height?: number;
};

const gradients: Record<NonNullable<SafeImageProps['type']>, string> = {
  food: 'from-[#fff7ed] via-[#ffe7d6] to-[#ffd4bf]',
  fashion: 'from-[#fff1f2] via-[#ffe4e6] to-[#ffd7dc]',
  deal: 'from-[#fff7ed] via-[#ffeccc] to-[#ffe1ad]',
  business: 'from-[#fdf4ff] via-[#f8f1ff] to-[#f3ecff]',
  hero: 'from-[#fff7ed] via-[#ffe5e6] to-[#ffe2cf]',
  generic: 'from-[#fff7ed] via-[#fff1f2] to-[#fef3c7]',
};

export function SafeImage({ src, alt, className = '', fallbackLabel, type = 'generic', fill, width, height }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  const resolvedSrc = useMemo(() => {
    if (!src || typeof src !== 'string' || src.trim().length === 0) return null;
    return src;
  }, [src]);

  if (!resolvedSrc || failed) {
    return (
      <div
        aria-label={alt}
        className={`grid place-items-center bg-gradient-to-br ${gradients[type]} ${className}`}
      >
        <div className="rounded-2xl border border-white/70 bg-white/55 px-3 py-2 text-center shadow-sm backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8d4f3d]">{fallbackLabel || 'MyShillong Local Marketplace'}</p>
        </div>
      </div>
    );
  }

  if (fill) {
    return <Image src={resolvedSrc} alt={alt} fill className={className} onError={() => setFailed(true)} />;
  }

  return <Image src={resolvedSrc} alt={alt} width={width ?? 1200} height={height ?? 800} className={className} onError={() => setFailed(true)} />;
}

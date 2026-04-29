const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
const MAX_SOURCE_FILE_SIZE = 10 * 1024 * 1024;

export type OptimizeImageOptions = {
  maxWidth?: number;
  maxHeight?: number;
  targetSizeMB?: number;
  quality?: number;
};

export function validateImageFile(file: File) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    throw new Error('Only JPG, PNG, and WEBP files are supported.');
  }

  if (file.size > MAX_SOURCE_FILE_SIZE) {
    throw new Error('File is too large. Please upload an image under 10MB.');
  }
}

export async function optimizeImageFile(
  file: File,
  options: OptimizeImageOptions = {},
): Promise<File> {
  validateImageFile(file);

  const { maxWidth = 1400, maxHeight = 1400, targetSizeMB = 0.28, quality = 0.82 } = options;

  const image = await loadImage(file);
  const { width, height } = fitDimensions(image.width, image.height, maxWidth, maxHeight);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not optimize image: canvas context unavailable.');

  context.drawImage(image, 0, 0, width, height);

  let outputQuality = quality;
  let blob = await toBlob(canvas, outputQuality);

  const targetBytes = targetSizeMB * 1024 * 1024;
  while (blob.size > targetBytes && outputQuality > 0.45) {
    outputQuality -= 0.07;
    blob = await toBlob(canvas, outputQuality);
  }

  const outputName = file.name.replace(/\.[^/.]+$/, '.webp').toLowerCase().replace(/\s+/g, '-');
  return new File([blob], outputName, { type: 'image/webp', lastModified: Date.now() });
}

function fitDimensions(width: number, height: number, maxWidth: number, maxHeight: number) {
  const scale = Math.min(maxWidth / width, maxHeight / height, 1);
  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
}

async function toBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Image compression failed.'));
        return;
      }
      resolve(blob);
    }, 'image/webp', quality);
  });
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('Could not read the selected image.'));
    });
    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function getStorageFilePath(moduleName: string, entityId: string, variant: 'cover' | 'gallery', sourceName: string) {
  const safeModule = moduleName.trim().toLowerCase();
  const safeEntity = entityId.trim().toLowerCase();
  const cleanBase = sourceName
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  if (variant === 'cover') {
    return `${safeModule}/${safeEntity}/cover.webp`;
  }

  const stamp = Date.now();
  return `${safeModule}/${safeEntity}/gallery/${stamp}-${cleanBase || 'image'}.webp`;
}

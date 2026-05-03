/**
 * Cloudinary configuration and helpers.
 * Isolated so all Cloudinary logic lives here, not scattered across components.
 */

import type { CarImage, CloudinaryImage } from '@/types';

/* ── Config ────────────────────────────────────── */

export const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
} as const;

/* ── Folder Structure ──────────────────────────── */

export const CLOUDINARY_FOLDERS = {
  cars: {
    featured: 'cars/featured',
    gallery: 'cars/gallery',
    owners: 'cars/owners',
    temp: 'cars/temp',
  },
  brands: 'brands',
  avatars: 'avatars',
} as const;

/* ── Public ID Generators ──────────────────────── */

/** Generate a Cloudinary public ID for a car cover image. */
export function carCoverPublicId(carSlug: string): string {
  return `cars/${carSlug}/cover`;
}

/** Generate a Cloudinary public ID for a car gallery image. */
export function carGalleryPublicId(carSlug: string, index: number): string {
  return `cars/${carSlug}/gallery-${index}`;
}

/** Generate a Cloudinary public ID for an owner's car submission. */
export function ownerCarPublicId(userSlug: string, carSlug: string, timestamp?: number): string {
  const ts = timestamp || Date.now();
  return `cars/owners/${userSlug}/car-${carSlug}-${ts}`;
}

/** Generate a Cloudinary public ID for a brand logo. */
export function brandLogoPublicId(brandSlug: string): string {
  return `brands/${brandSlug}`;
}

/* ── URL Builders ──────────────────────────────── */

type TransformationPreset = 'card' | 'hero' | 'gallery' | 'thumbnail' | 'og';

const TRANSFORMATIONS: Record<TransformationPreset, string> = {
  card: 'w_600,h_375,c_fill,q_auto,f_auto',
  hero: 'w_1200,h_600,c_fill,q_auto,f_auto',
  gallery: 'w_900,h_600,c_fill,q_auto,f_auto',
  thumbnail: 'w_200,h_200,c_fill,q_auto,f_auto',
  og: 'w_1200,h_630,c_fill,q_auto,f_auto',
};

/**
 * Build a Cloudinary delivery URL with transformations.
 * Returns the raw URL if the image isn't a Cloudinary public ID.
 */
export function cloudinaryUrl(
  publicIdOrUrl: string,
  preset: TransformationPreset = 'card'
): string {
  // If it's already a full URL, return as-is
  if (publicIdOrUrl.startsWith('http')) return publicIdOrUrl;

  const { cloudName } = CLOUDINARY_CONFIG;
  const transform = TRANSFORMATIONS[preset];
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${publicIdOrUrl}`;
}

/**
 * Build an optimized URL for Next.js Image component.
 * Returns the URL and dimensions suitable for the Image component.
 */
export function cloudinaryImageProps(
  image: CloudinaryImage | CarImage,
  preset: TransformationPreset = 'card'
) {
  return {
    src: image.url.startsWith('http') ? image.url : cloudinaryUrl(image.publicId, preset),
    alt: image.alt,
    width: image.width,
    height: image.height,
  };
}

/* ── Placeholder Image Builder ─────────────────── */

/**
 * Create a CarImage placeholder for mock data.
 * Uses a gradient placeholder URL that will be replaced with Cloudinary URLs later.
 */
export function createMockCarImage(
  carSlug: string,
  type: 'cover' | 'gallery',
  index: number = 0,
  color: string = '#888'
): CarImage {
  const publicId = type === 'cover'
    ? carCoverPublicId(carSlug)
    : carGalleryPublicId(carSlug, index);

  return {
    publicId,
    // Placeholder URL; will be replaced with Cloudinary URL in production
    url: `/api/placeholder/${carSlug}/${type}${type === 'gallery' ? `-${index}` : ''}`,
    alt: `${carSlug} ${type}${type === 'gallery' ? ` ${index + 1}` : ''}`,
    width: type === 'cover' ? 800 : 600,
    height: type === 'cover' ? 500 : 400,
    format: 'webp',
    assetFolder: `cars/${carSlug}`,
  };
}

/* ── Mock Upload Abstraction ───────────────────── */

interface UploadResult {
  success: boolean;
  image?: CloudinaryImage;
  error?: string;
}

/**
 * Mock upload function that simulates Cloudinary upload.
 * Replace this with real Cloudinary upload SDK call in production.
 */
export async function mockUploadToCloudinary(
  file: File,
  folder: string,
  publicId?: string
): Promise<UploadResult> {
  // Simulate upload delay
  await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));

  // Simulate 5% failure rate
  if (Math.random() < 0.05) {
    return { success: false, error: 'Upload failed. Please try again.' };
  }

  const generatedPublicId = publicId || `${folder}/${file.name.replace(/\.[^.]+$/, '').replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;

  return {
    success: true,
    image: {
      publicId: generatedPublicId,
      url: URL.createObjectURL(file), // Local preview; real URL comes from Cloudinary
      alt: file.name.replace(/\.[^.]+$/, ''),
      width: 800,
      height: 500,
      format: file.type.split('/')[1] || 'jpeg',
    },
  };
}

import type { Locale, Car, Driver } from '@/types';
import { cloudinaryUrl } from '@/lib/cloudinary';

/**
 * Maps a Convex car document to the frontend Car type.
 */
export function mapConvexCar(c: any): Car {
  return {
    id: c._id,
    slug: c.slug,
    name: { en: c.name_en, ar: c.name_ar },
    brand: c.brand,
    year: c.year,
    type: c.type as any,
    pricePerKm: c.pricePerKm,
    seats: c.seats,
    fuelType: c.fuelType as any,
    coverImage: {
      publicId: c.images[0] || '',
      url: cloudinaryUrl(c.images[0] || '', 'hero'),
      alt: c.name_en,
      width: 800,
      height: 500,
      assetFolder: 'cars'
    },
    gallery: c.images.slice(1).map((publicId: string, i: number) => ({
      publicId: publicId,
      url: cloudinaryUrl(publicId, 'gallery'),
      alt: `${c.name_en} gallery ${i}`,
      width: 800,
      height: 500,
      assetFolder: 'cars'
    })),
    description: { en: c.description_en, ar: c.description_ar },
    features: c.features,
    inStock: c.available,
    rating: c.rating,
    reviewCount: c.reviewCount,
    color: c.color,
  };
}

/**
 * Maps a Convex driver document to the frontend Driver type.
 */
export function mapConvexDriver(d: any): Driver {
  return {
    id: d._id,
    name: { en: d.name_en, ar: d.name_ar },
    avatarImage: {
      publicId: d.image,
      url: cloudinaryUrl(d.image, 'thumbnail'),
      alt: d.name_en,
      width: 200,
      height: 200,
    },
    rating: d.rating,
    tripsCompleted: d.tripsCompleted,
    yearsOfExperience: d.yearsOfExperience,
    description: { en: d.description_en, ar: d.description_ar },
    assignedCarId: d.assignedCarId,
  };
}

/**
 * Format price in SAR with locale-appropriate formatting.
 */
export function formatPrice(price: number, locale: Locale): string {
  const formatted = new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-SA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  const currency = locale === 'ar' ? 'ر.س' : 'SAR';
  return locale === 'ar' ? `${formatted} ${currency}` : `${currency} ${formatted}`;
}

/**
 * Format distance in km.
 */
export function formatDistance(km: number, locale: Locale): string {
  const formatted = new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-SA', {
    maximumFractionDigits: 1,
  }).format(km);

  const unit = locale === 'ar' ? 'كم' : 'km';
  return `${formatted} ${unit}`;
}

/**
 * Merge class names, filtering out falsy values.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Generate a placeholder gradient style for car images based on car color.
 */
export function getCarPlaceholderStyle(color: string): React.CSSProperties {
  return {
    background: `linear-gradient(135deg, ${color}33 0%, ${color}66 50%, ${color}99 100%)`,
  };
}

/**
 * Simulate async delay for mock services.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

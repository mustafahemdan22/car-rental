import type { Locale } from '@/types';

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

import type { Locale, Direction, Messages } from '@/types';

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'ar'];

import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

const messages: Record<Locale, Messages> = { en, ar };

export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages[defaultLocale];
}

export function getDirection(locale: Locale): Direction {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Resolve a nested translation key like "nav.home" from the messages object.
 */
export function t(msgs: Messages, key: string): string {
  const parts = key.split('.');
  let current: unknown = msgs;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }

  return typeof current === 'string' ? current : key;
}

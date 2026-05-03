import { getMessages, isValidLocale, defaultLocale } from '@/lib/i18n';
import type { Locale } from '@/types';
import { BookingClient } from './BookingClient';

export default async function BookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const messages = getMessages(locale);
  return <BookingClient locale={locale} messages={messages} />;
}

import { getMessages, isValidLocale, defaultLocale } from '@/lib/i18n';
import type { Locale } from '@/types';
import { CheckoutClient } from './CheckoutClient';

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const messages = getMessages(locale);
  return <CheckoutClient locale={locale} messages={messages} />;
}

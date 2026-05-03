import { getMessages, isValidLocale, defaultLocale } from '@/lib/i18n';
import type { Locale } from '@/types';
import { ContactClient } from './ContactClient';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const messages = getMessages(locale);
  return <ContactClient locale={locale} messages={messages} />;
}

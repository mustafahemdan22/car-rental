import { getMessages, isValidLocale, defaultLocale } from '@/lib/i18n';
import type { Locale } from '@/types';
import { AboutClient } from './AboutClient';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const messages = getMessages(locale);
  return <AboutClient locale={locale} messages={messages} />;
}

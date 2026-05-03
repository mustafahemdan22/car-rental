import { getMessages } from '@/lib/i18n';
import type { Locale } from '@/types';
import { DriversClient } from './DriversClient';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

interface DriversPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function DriversPage({ params }: DriversPageProps) {
  const { locale } = await params;
  const messages = getMessages(locale);

  return <DriversClient locale={locale} messages={messages} />;
}

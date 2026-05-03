import { notFound } from 'next/navigation';
import type { Locale, Messages } from '@/types';
import { getCarBySlug } from '@/data/cars';
import { getMessages } from '@/lib/i18n';
import { CarDetailClient } from './CarDetailClient';

interface PageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export default async function CarSlugPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const messages = await getMessages(locale);
  const car = getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return (
    <CarDetailClient
      car={car}
      locale={locale}
      messages={messages}
    />
  );
}

import { notFound } from 'next/navigation';
import type { Locale } from '@/types';
import { getMessages } from '@/lib/i18n';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { mapConvexCar } from '@/lib/utils';
import { CarDetailClient } from './CarDetailClient';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface PageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export default async function CarSlugPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const messages = await getMessages(locale);
  
  const rawCar = await convex.query(api.cars.getCarBySlug, { slug });
  
  if (!rawCar) {
    notFound();
  }

  const car = mapConvexCar(rawCar);

  return (
    <CarDetailClient
      car={car}
      locale={locale}
      messages={messages}
    />
  );
}

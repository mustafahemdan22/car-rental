import { getMessages, isValidLocale, defaultLocale } from '@/lib/i18n';
import type { Locale } from '@/types';
import { AddCarForm } from '@/components/forms/AddCarForm';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { t } from '@/lib/i18n';

export default async function AddCarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const messages = getMessages(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <SectionHeader title={t(messages, 'addCar.title')} subtitle={t(messages, 'addCar.subtitle')} />
      <div className="rounded-xl border border-warm-200 bg-white p-5 sm:p-8 dark:border-warm-800 dark:bg-warm-900">
        <AddCarForm messages={messages} />
      </div>
    </div>
  );
}

'use client';

import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import type { Locale, Messages } from '@/types';
import { t } from '@/lib/i18n';
import { ContactForm } from '@/components/forms/ContactForm';
import { DynamicMap } from '@/components/map/DynamicMap';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface ContactClientProps {
  locale: Locale;
  messages: Messages;
}

// Olaya District, Riyadh
const OFFICE_COORDINATES = { lat: 24.6908, lng: 46.6854 };

export function ContactClient({ locale, messages }: ContactClientProps) {
  const infoCards = [
    { icon: FiPhone, label: t(messages, 'nav.contact'), value: t(messages, 'contact.phone1'), secondary: t(messages, 'contact.phone2') },
    { icon: FiMail, label: t(messages, 'contact.email'), value: t(messages, 'contact.emailAddress') },
    { icon: FiMapPin, label: t(messages, 'contact.findUs'), value: t(messages, 'contact.address') },
    { icon: FiClock, label: t(messages, 'contact.workingHours'), value: t(messages, 'contact.workingHoursValue') },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <SectionHeader title={t(messages, 'contact.title')} subtitle={t(messages, 'contact.subtitle')} />

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-warm-200 bg-white p-5 sm:p-6 dark:border-warm-800 dark:bg-warm-900">
            <ContactForm messages={messages} />
          </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-4 lg:col-span-2">
          {infoCards.map((card, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-warm-200 bg-white p-4 dark:border-warm-800 dark:bg-warm-900"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                <card.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-warm-500 dark:text-warm-400">{card.label}</p>
                <p className="text-sm font-medium text-warm-900 dark:text-warm-100">{card.value}</p>
                {card.secondary && (
                  <p className="text-sm text-warm-500 dark:text-warm-400">{card.secondary}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="mt-10">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-warm-500 dark:text-warm-400">
          {t(messages, 'contact.findUs')}
        </h3>
        <DynamicMap pickup={OFFICE_COORDINATES} />
      </div>
    </div>
  );
}

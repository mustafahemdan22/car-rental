'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import type { Locale, Messages } from '@/types';
import { t } from '@/lib/i18n';
import { useBookingStore } from '@/store/bookingStore';
import { BookingSummary } from '@/components/booking/PriceSummary';
import { CheckoutForm } from '@/components/forms/CheckoutForm';
import { ErrorState } from '@/components/ui/ErrorState';

interface CheckoutClientProps {
  locale: Locale;
  messages: Messages;
}

export function CheckoutClient({ locale, messages }: CheckoutClientProps) {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);
  const { selectedCar, selectedDriver, pickupLocation, destinationLocation, distanceInKm, totalPrice, reset } = useBookingStore();
  const ArrowIcon = locale === 'ar' ? FiArrowRight : FiArrowLeft;

  if (!selectedCar || !pickupLocation || !destinationLocation || distanceInKm <= 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ErrorState
          title={t(messages, 'booking.noRoute')}
          message={t(messages, 'booking.noRoute')}
          onRetry={() => router.push(`/${locale}/cars`)}
          retryLabel={t(messages, 'cars.title')}
        />
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <FiCheck className="h-10 w-10 text-success" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-warm-900 dark:text-warm-50">
            {t(messages, 'checkout.bookingConfirmed')}
          </h2>
          <p className="mb-8 text-warm-500 dark:text-warm-400">
            {t(messages, 'checkout.confirmationMessage')}
          </p>
          <Link
            href={`/${locale}`}
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600"
          >
            {t(messages, 'checkout.backToHome')}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href={`/${locale}/booking`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-warm-500 transition-colors hover:text-warm-700 dark:text-warm-400"
      >
        <ArrowIcon className="h-4 w-4" />
        {t(messages, 'booking.back')}
      </Link>

      <h1 className="mb-8 text-2xl font-bold text-warm-900 sm:text-3xl dark:text-warm-50">
        {t(messages, 'checkout.title')}
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-warm-200 bg-white p-5 sm:p-6 dark:border-warm-800 dark:bg-warm-900">
            <CheckoutForm messages={messages} onSuccess={() => setConfirmed(true)} />
          </div>
        </div>

        <div>
          <div className="sticky top-24">
            <BookingSummary
              car={selectedCar}
              driver={selectedDriver}
              pickup={pickupLocation}
              destination={destinationLocation}
              distanceInKm={distanceInKm}
              totalPrice={totalPrice}
              locale={locale}
              messages={messages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

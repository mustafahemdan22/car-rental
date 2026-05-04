'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import type { Locale, Messages } from '@/types';
import { t } from '@/lib/i18n';
import { useBookingStore } from '@/store/bookingStore';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { PriceSummary } from '@/components/booking/PriceSummary';
import { DynamicMap } from '@/components/map/DynamicMap';
import { ErrorState } from '@/components/ui/ErrorState';

interface BookingClientProps {
  locale: Locale;
  messages: Messages;
}

export function BookingClient({ locale, messages }: BookingClientProps) {
  const router = useRouter();
  const {
    selectedCar,
    selectedDriver,
    pickupLocation,
    destinationLocation,
    pickupCoordinates,
    destinationCoordinates,
    distanceInKm,
    totalPrice,
    isCalculating,
    calculationError,
  } = useBookingStore();

  const canProceed = selectedCar && pickupLocation && destinationLocation && distanceInKm > 0 && !isCalculating;
  const ArrowIcon = locale === 'ar' ? FiArrowRight : FiArrowLeft;

  if (!selectedCar) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ErrorState
          title={t(messages, 'booking.noCarSelected')}
          message={t(messages, 'booking.noCarSelected')}
          onRetry={() => router.push(`/${locale}/cars`)}
          retryLabel={t(messages, 'cars.title')}
        />
      </div>
    );
  }

  const driverName = selectedDriver
    ? (typeof selectedDriver.name === 'object' ? selectedDriver.name[locale] : selectedDriver.name)
    : (locale === 'ar' ? 'بدون سائق' : 'Without Driver (Self-Drive)');

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Back link */}
      <Link
        href={`/${locale}/drivers`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-warm-500 transition-colors hover:text-warm-700 dark:text-warm-400 dark:hover:text-warm-200"
      >
        <ArrowIcon className="h-4 w-4" />
        {t(messages, 'booking.back')}
      </Link>

      <h1 className="mb-8 text-2xl font-bold text-warm-900 sm:text-3xl dark:text-warm-50">
        {t(messages, 'booking.bookingSummary')}
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Selected Car + Driver package Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Selected Car */}
            <div className="rounded-xl border border-warm-200 bg-white p-5 dark:border-warm-800 dark:bg-warm-900">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-warm-500 dark:text-warm-400">
                {t(messages, 'booking.carDetails')}
              </h3>
              <div className="flex items-center gap-4">
                <div
                  className="h-14 w-20 shrink-0 rounded-lg"
                  style={{ background: `linear-gradient(135deg, ${selectedCar.color}44, ${selectedCar.color}88)` }}
                />
                <div>
                  <h4 className="font-semibold text-warm-900 dark:text-warm-50">{selectedCar.name[locale]}</h4>
                  <p className="text-xs text-warm-500">{selectedCar.year} · {selectedCar.brand}</p>
                </div>
              </div>
            </div>

            {/* Selected Driver */}
            <div className="rounded-xl border border-warm-200 bg-white p-5 dark:border-warm-800 dark:bg-warm-900">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-warm-500 dark:text-warm-400">
                {t(messages, 'booking.driverDetails')}
              </h3>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 flex shrink-0 items-center justify-center rounded-full border border-warm-200 bg-white text-xl font-bold text-warm-600 dark:border-warm-700 dark:bg-warm-700 dark:text-warm-300">
                  {selectedDriver ? (driverName ? driverName[0] : 'D') : '🚗'}
                </div>
                <div>
                  <h4 className="font-semibold text-warm-900 dark:text-warm-50">{driverName}</h4>
                  <p className="text-xs text-warm-500">
                    {selectedDriver ? `${selectedDriver.rating} ★ · ${selectedDriver.yearsOfExperience} ${t(messages, 'drivers.experience')}` : (locale === 'ar' ? 'استئجار وقيادة ذاتية' : 'Self-Drive Rental')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Route Selection */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-warm-500 dark:text-warm-400">
              {t(messages, 'booking.routeDetails')}
            </h3>
            <BookingWidget locale={locale} messages={messages} />
          </div>

          {/* Map */}
          <DynamicMap pickup={pickupCoordinates} destination={destinationCoordinates} />

          {/* Error */}
          {calculationError && (
            <ErrorState message={t(messages, 'booking.invalidLocations')} />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {distanceInKm > 0 && (
            <PriceSummary
              car={selectedCar}
              distanceInKm={distanceInKm}
              totalPrice={totalPrice}
              locale={locale}
              messages={messages}
            />
          )}

          <button
            onClick={() => router.push(`/${locale}/checkout`)}
            disabled={!canProceed}
            className="w-full rounded-lg bg-primary-500 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-warm-300 disabled:text-warm-500 active:scale-[0.99] dark:disabled:bg-warm-700"
          >
            {isCalculating
              ? t(messages, 'booking.calculating')
              : t(messages, 'booking.proceedToCheckout')
            }
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { FiArrowRight, FiMapPin, FiNavigation } from 'react-icons/fi';
import type { Car, Driver, Location, Locale, Messages } from '@/types';
import { t } from '@/lib/i18n';

interface PriceSummaryProps {
  car: Car;
  distanceInKm: number;
  totalPrice: number;
  locale: Locale;
  messages: Messages;
}

export function PriceSummary({ car, distanceInKm, totalPrice, locale, messages }: PriceSummaryProps) {
  return (
    <div className="rounded-xl border border-warm-200 bg-white p-5 dark:border-warm-800 dark:bg-warm-900">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-warm-500 dark:text-warm-400">
        {t(messages, 'booking.totalPrice')}
      </h3>

      {/* Calculation breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-warm-600 dark:text-warm-400">{t(messages, 'booking.estimatedDistance')}</span>
          <span className="font-medium text-warm-900 dark:text-warm-100">
            {distanceInKm.toFixed(1)} {t(messages, 'booking.km')}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-warm-600 dark:text-warm-400">{t(messages, 'booking.pricePerKm')}</span>
          <span className="font-medium text-warm-900 dark:text-warm-100">
            {car.pricePerKm} {t(messages, 'booking.sar')}{t(messages, 'booking.perKm')}
          </span>
        </div>

        <div className="border-t border-warm-200 pt-3 dark:border-warm-700">
          <div className="flex items-center justify-between">
            <span className="font-medium text-warm-900 dark:text-warm-100">{t(messages, 'booking.totalPrice')}</span>
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              {totalPrice.toFixed(2)} {t(messages, 'booking.sar')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Booking Summary ───────────────────────────── */

interface BookingSummaryProps {
  car: Car;
  driver: Driver | null;
  pickup: Location;
  destination: Location;
  distanceInKm: number;
  totalPrice: number;
  locale: Locale;
  messages: Messages;
}

export function BookingSummary({ car, driver, pickup, destination, distanceInKm, totalPrice, locale, messages }: BookingSummaryProps) {
  const carName = car.name[locale];
  const driverName = driver ? (typeof driver.name === 'object' ? driver.name[locale] : driver.name) : null;

  return (
    <div className="rounded-xl border border-warm-200 bg-white p-5 dark:border-warm-800 dark:bg-warm-900">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-warm-500 dark:text-warm-400">
        {t(messages, 'booking.bookingSummary')}
      </h3>

      {/* Driver (Optional/New Requirement) */}
      {driver && (
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-warm-50 p-3 dark:bg-warm-800">
          <div className="h-10 w-10 rounded-full border border-warm-200 bg-white flex items-center justify-center font-bold text-warm-600 dark:border-warm-700 dark:bg-warm-700 dark:text-warm-400">
            {driverName ? driverName[0] : 'D'}
          </div>
          <div>
            <p className="text-xs text-warm-500">{t(messages, 'booking.driverDetails')}</p>
            <p className="font-semibold text-warm-900 dark:text-warm-100">{driverName}</p>
          </div>
        </div>
      )}

      {/* Car */}
      <div className="mb-4 flex items-center gap-3 rounded-lg bg-warm-50 p-3 dark:bg-warm-800">
        <div
          className="h-12 w-16 rounded-lg"
          style={{ background: `linear-gradient(135deg, ${car.color}44, ${car.color}88)` }}
        />
        <div>
          <p className="text-xs text-warm-500">{t(messages, 'booking.carDetails')}</p>
          <p className="font-semibold text-warm-900 dark:text-warm-100">{carName}</p>
          <p className="text-xs text-warm-500">{car.year} · {car.brand}</p>
        </div>
      </div>

      {/* Route */}
      <div className="mb-4 space-y-2">
        <div className="flex items-start gap-2">
          <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
          <div>
            <p className="text-xs text-warm-500 dark:text-warm-400">{t(messages, 'booking.pickup')}</p>
            <p className="text-sm font-medium text-warm-900 dark:text-warm-100">{pickup.name[locale]}</p>
          </div>
        </div>
        <div className="ms-2 border-s-2 border-dashed border-warm-200 py-1 ps-4 dark:border-warm-700">
          <span className="text-xs text-warm-400">{distanceInKm.toFixed(1)} {t(messages, 'booking.km')}</span>
        </div>
        <div className="flex items-start gap-2">
          <FiNavigation className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
          <div>
            <p className="text-xs text-warm-500 dark:text-warm-400">{t(messages, 'booking.destination')}</p>
            <p className="text-sm font-medium text-warm-900 dark:text-warm-100">{destination.name[locale]}</p>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="rounded-lg bg-primary-50 p-3 dark:bg-primary-950/30">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-warm-700 dark:text-warm-300">{t(messages, 'booking.totalPrice')}</span>
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
            {totalPrice.toFixed(2)} {t(messages, 'booking.sar')}
          </span>
        </div>
      </div>
    </div>
  );
}

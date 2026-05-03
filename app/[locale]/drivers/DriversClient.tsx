'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiStar, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import type { Locale, Messages, Driver } from '@/types';
import { t } from '@/lib/i18n';
import { useBookingStore } from '@/store/bookingStore';
import { drivers } from '@/data/drivers';
import { cars } from '@/data/cars';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

interface DriversClientProps {
  locale: Locale;
  messages: Messages;
}

export function DriversClient({ locale, messages }: DriversClientProps) {
  const router = useRouter();
  const selectDriver = useBookingStore((s) => s.selectDriver);
  const selectedDriverId = useBookingStore((s) => s.selectedDriver?.id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (driver: Driver) => {
    selectDriver(driver);
    router.push(`/${locale}/booking`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <SectionHeader
        title={t(messages, 'drivers.title')}
        subtitle={t(messages, 'drivers.subtitle')}
      />

      {loading ? (
        <LoadingSkeleton variant="card" count={6} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {drivers.map((driver, i) => {
            const isSelected = selectedDriverId === driver.id;
            const assignedCar = driver.assignedCarId ? cars.find((c) => c.id === driver.assignedCarId) : null;
            const driverName = typeof driver.name === 'object' ? driver.name[locale] : driver.name;

            return (
              <motion.article
                key={driver.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
                whileHover={{ y: -4 }}
                className={`group flex flex-col justify-between overflow-hidden rounded-xl border transition-all duration-300 ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50/10 ring-2 ring-primary-500/20 dark:bg-primary-950/10'
                    : 'border-warm-200 bg-white hover:shadow-card-hover dark:border-warm-800 dark:bg-warm-900'
                }`}
              >
                <div>
                  {/* Large Profile Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-tr from-warm-100 to-warm-200 dark:from-warm-800 dark:to-warm-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-28 w-28 rounded-full border-4 border-white bg-warm-300 dark:border-warm-900 dark:bg-warm-700 flex items-center justify-center text-warm-600 dark:text-warm-400 font-bold text-3xl shadow-md">
                        {driverName[0]}
                      </div>
                    </div>
                    {/* Rating Badge */}
                    <div className="absolute top-4 end-4 flex items-center gap-1 rounded-full bg-warm-900/80 px-3 py-1 backdrop-blur-md shadow">
                      <FiStar className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-white">{driver.rating}</span>
                    </div>
                  </div>

                  {/* Driver Profile Details */}
                  <div className="p-5">
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-warm-900 dark:text-warm-50 flex items-center gap-2">
                        {driverName}
                        {isSelected && (
                          <FiCheckCircle className="h-5 w-5 text-primary-500 shrink-0" />
                        )}
                      </h3>
                      <p className="mt-1 text-xs text-warm-500 dark:text-warm-400 line-clamp-2 min-h-[32px]">
                        {driver.description[locale]}
                      </p>
                    </div>

                    {/* Quick Highlights */}
                    <div className="mb-4 grid grid-cols-2 gap-2 border-y border-warm-100 py-3 dark:border-warm-800 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-xs text-warm-500 dark:text-warm-400">{t(messages, 'drivers.trips')}</span>
                        <strong className="text-sm font-bold text-warm-900 dark:text-warm-50 mt-0.5">
                          {driver.tripsCompleted}
                        </strong>
                      </div>
                      <div className="flex flex-col items-center justify-center border-s border-warm-100 dark:border-warm-800">
                        <span className="text-xs text-warm-500 dark:text-warm-400">{t(messages, 'drivers.experience')}</span>
                        <strong className="text-sm font-bold text-warm-900 dark:text-warm-50 mt-0.5">
                          {driver.yearsOfExperience}
                        </strong>
                      </div>
                    </div>

                    {/* Optional assigned car display */}
                    {assignedCar && (
                      <div className="mb-3 flex items-center justify-between rounded-lg bg-warm-50 px-3 py-2 text-xs text-warm-600 dark:bg-warm-800/60 dark:text-warm-300">
                        <span className="font-medium">{t(messages, 'drivers.assignedCar')}:</span>
                        <span className="font-semibold text-warm-800 dark:text-warm-100">{assignedCar.name[locale]}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selection Action Button */}
                <div className="px-5 pb-5">
                  <button
                    onClick={() => handleSelect(driver)}
                    className={`w-full rounded-lg py-3 text-sm font-bold transition-all duration-300 ${
                      isSelected
                        ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md ring-2 ring-primary-500/20'
                        : 'bg-primary-500 text-white hover:bg-primary-600'
                    }`}
                  >
                    {t(messages, 'drivers.selectDriver')}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
}

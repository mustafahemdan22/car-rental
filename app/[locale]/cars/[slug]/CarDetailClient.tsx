'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight, FiX, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import type { Locale, Messages, Car, Driver } from '@/types';
import { t } from '@/lib/i18n';
import { useBookingStore } from '@/store/bookingStore';
import { drivers } from '@/data/drivers';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface CarDetailClientProps {
  car: Car;
  locale: Locale;
  messages: Messages;
}

const INTERIOR_IMAGES = [
  '/cars/interiors/interior-1.jpg',
  '/cars/interiors/interior-2.jpg',
  '/cars/interiors/interior-3.jpg',
  '/cars/interiors/interior-4.jpg',
];

export function CarDetailClient({ car, locale, messages }: CarDetailClientProps) {
  const router = useRouter();
  const selectDriver = useBookingStore((s) => s.selectDriver);

  // Lightbox carousel state
  const [carouselIndex, setCarouselIndex] = useState<number | null>(null);

  const handleDriverSelect = (driver: Driver | null) => {
    selectDriver(driver);
    router.push(`/${locale}/booking`);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (carouselIndex !== null) {
      setCarouselIndex((carouselIndex + 1) % INTERIOR_IMAGES.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (carouselIndex !== null) {
      setCarouselIndex((carouselIndex - 1 + INTERIOR_IMAGES.length) % INTERIOR_IMAGES.length);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Page Title / Section Header */}
      <SectionHeader
        title={car.name[locale]}
        subtitle={locale === 'ar' ? 'استعرض تفاصيل ومقصورة السيارة الفاخرة' : 'Review premium luxury car details and interior'}
      />

      {/* Car Overview & Interior Gallery */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Car Specs */}
        <div className="flex flex-col justify-between rounded-2xl border border-warm-200 bg-white p-6 dark:border-warm-800 dark:bg-warm-900 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-warm-900 dark:text-warm-50">
              {car.name[locale]} ({car.year})
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-950/40 dark:text-primary-300">
                {t(messages, `cars.${car.type}`)}
              </span>
              <span className="rounded bg-accent-50 px-2 py-1 text-xs font-semibold text-accent-700 dark:bg-accent-950/40 dark:text-accent-300">
                {t(messages, `cars.${car.fuelType}`)}
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-warm-600 dark:text-warm-400">
              {car.description[locale]}
            </p>

            {/* Extra detail points */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-y border-warm-100 py-4 dark:border-warm-800">
              <div>
                <span className="text-xs text-warm-500 dark:text-warm-400">{t(messages, 'addCar.seats')}</span>
                <p className="text-sm font-bold text-warm-900 dark:text-warm-50 mt-0.5">
                  {car.seats} {t(messages, 'addCar.seats')}
                </p>
              </div>
              <div>
                <span className="text-xs text-warm-500 dark:text-warm-400">{t(messages, 'booking.perKm')}</span>
                <p className="text-sm font-bold text-warm-900 dark:text-warm-50 mt-0.5">
                  {car.pricePerKm} {t(messages, 'booking.sar')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-warm-50 p-4 text-xs font-medium text-warm-700 dark:bg-warm-800/50 dark:text-warm-300">
            ℹ️ {locale === 'ar' ? 'الخطوة التالية: اختر سائقاً أو تابع مباشرة بدون سائق.' : 'Next step: Select a driver or continue directly without a driver.'}
          </div>
        </div>

        {/* 4 Images of the car from inside (Interior Gallery) */}
        <div>
          <h3 className="mb-3 text-lg font-bold text-warm-900 dark:text-warm-50">
            📸 {locale === 'ar' ? 'مقصورة السيارة' : 'Inside Car Gallery'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {INTERIOR_IMAGES.map((src, i) => (
              <div
                key={i}
                onClick={() => setCarouselIndex(i)}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-warm-100 dark:bg-warm-800 shadow-sm transition-transform duration-300 hover:scale-[1.02] cursor-pointer group"
              >
                <Image
                  src={src}
                  alt={`Interior view ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition duration-300 group-hover:brightness-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Carousel Modal */}
      <AnimatePresence>
        {carouselIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCarouselIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 select-none"
          >
            <button
              onClick={() => setCarouselIndex(null)}
              className="absolute top-5 end-5 z-50 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition duration-200"
              aria-label="Close image lightbox"
            >
              <FiX className="h-6 w-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition duration-200"
              aria-label="Previous image"
            >
              <FiChevronLeft className="h-6 w-6" />
            </button>

            <div className="relative h-[80vh] w-full max-w-4xl rounded-2xl overflow-hidden flex items-center justify-center">
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full aspect-[4/3]"
              >
                <Image
                  src={INTERIOR_IMAGES[carouselIndex]}
                  alt={`Inside image ${carouselIndex + 1}`}
                  fill
                  priority
                  className="object-contain"
                />
              </motion.div>
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition duration-200"
              aria-label="Next image"
            >
              <FiChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional Driver Selection / Skip Option */}
      <div className="mt-16 rounded-xl border border-primary-200 bg-primary-50/20 p-6 dark:border-primary-900/40 dark:bg-primary-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-warm-900 dark:text-warm-50">
              🚀 {locale === 'ar' ? 'متابعة بدون سائق' : 'Book Without Driver'}
            </h3>
            <p className="text-xs text-warm-600 dark:text-warm-400 mt-0.5">
              {locale === 'ar' ? 'هل تفضل استئجار السيارة فقط؟ اضغط للمتابعة مباشرة.' : 'Do you prefer just renting the car? Click to continue without driver.'}
            </p>
          </div>
          <button
            onClick={() => handleDriverSelect(null)}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-600 shadow-md whitespace-nowrap shrink-0"
          >
            <span>{locale === 'ar' ? 'المتابعة بدون سائق' : 'Continue Without Driver'}</span>
            {locale === 'ar' ? <FiArrowLeft className="h-4 w-4" /> : <FiArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Driver Selection Grid */}
      <div className="mt-12">
        <div className="mb-6 border-b border-warm-200 pb-3 dark:border-warm-800">
          <h3 className="text-2xl font-bold text-warm-900 dark:text-warm-50">
            👨‍✈️ {locale === 'ar' ? 'أو اختر سائقاً (اختياري)' : 'Or Choose Driver (Optional)'}
          </h3>
          <p className="mt-1 text-sm text-warm-500 dark:text-warm-400">
            {locale === 'ar' ? 'يمكنك اختيار سائق محترف من القائمة أدناه.' : 'You can optionally pick a professional chauffeur from the list below.'}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {drivers.map((driver, i) => {
            const driverName = typeof driver.name === 'object' ? driver.name[locale] : driver.name;

            return (
              <motion.article
                key={driver.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="flex flex-col justify-between overflow-hidden rounded-xl border border-warm-200 bg-white p-5 hover:shadow-card-hover dark:border-warm-800 dark:bg-warm-900 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-4 border-b border-warm-100 pb-4 dark:border-warm-800">
                    <div className="h-16 w-16 rounded-full border-2 border-white bg-warm-300 dark:border-warm-900 dark:bg-warm-700 flex items-center justify-center text-warm-600 dark:text-warm-400 font-bold text-xl shadow shrink-0">
                      {driverName[0]}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-warm-900 dark:text-warm-50 flex items-center gap-2">
                        {driverName}
                      </h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <FiStar className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold text-warm-700 dark:text-warm-300">
                          {driver.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-warm-500 dark:text-warm-400 line-clamp-2 min-h-[32px]">
                    {driver.description[locale]}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-warm-100 pt-3 dark:border-warm-800 text-center text-xs">
                    <div>
                      <span className="text-warm-500">{t(messages, 'drivers.trips')}</span>
                      <p className="font-bold text-warm-900 dark:text-warm-100 mt-0.5">{driver.tripsCompleted}</p>
                    </div>
                    <div className="border-s border-warm-100 dark:border-warm-800">
                      <span className="text-warm-500">{t(messages, 'drivers.experience')}</span>
                      <p className="font-bold text-warm-900 dark:text-warm-100 mt-0.5">{driver.yearsOfExperience} Yrs</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => handleDriverSelect(driver)}
                    className="w-full rounded-lg bg-primary-500 py-2.5 text-xs font-bold text-white transition hover:bg-primary-600 shadow-sm"
                  >
                    {t(messages, 'drivers.selectDriver')}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

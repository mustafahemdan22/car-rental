'use client';

import { motion } from 'framer-motion';
import { FiUsers, FiDroplet, FiStar } from 'react-icons/fi';
import type { Car, Locale, Messages } from '@/types';
import { t } from '@/lib/i18n';
import { getCarPlaceholderStyle } from '@/lib/utils';

interface CarCardProps {
  car: Car;
  locale: Locale;
  messages: Messages;
  onSelect: (car: Car) => void;
  featured?: boolean;
}

export function CarCard({ car, locale, messages, onSelect, featured }: CarCardProps) {
  const carName = car.name[locale];
  const typeLabel = t(messages, `cars.${car.type}`);
  const fuelLabel = t(messages, `cars.${car.fuelType}`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
      whileHover={{ y: -4 }}
      className={`group overflow-hidden rounded-xl border border-warm-200 bg-white transition-shadow hover:shadow-card-hover dark:border-warm-800 dark:bg-warm-900 ${
        featured ? 'ring-2 ring-primary-500/20' : ''
      }`}
    >
      {/* Image Placeholder */}
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={getCarPlaceholderStyle(car.color)}
      >
        {/* Car silhouette overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold opacity-20">{car.brand}</span>
        </div>

        {/* Type badge */}
        <span className="absolute start-3 top-3 rounded-md bg-warm-900/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {typeLabel}
        </span>

        {/* Rating */}
        <div className="absolute end-3 top-3 flex items-center gap-1 rounded-md bg-warm-900/70 px-2 py-0.5 backdrop-blur-sm">
          <FiStar className="h-3 w-3 fill-primary-400 text-primary-400" />
          <span className="text-xs font-medium text-white">{car.rating}</span>
        </div>

        {/* Out of stock overlay */}
        {!car.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-warm-900/50 backdrop-blur-sm">
            <span className="rounded-lg bg-warm-900/80 px-4 py-2 text-sm font-semibold text-white">
              {t(messages, 'cars.outOfStock')}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name and Year */}
        <div className="mb-3">
          <h3 className="text-base font-semibold text-warm-900 dark:text-warm-50">
            {carName}
          </h3>
          <p className="text-xs text-warm-500 dark:text-warm-400">{car.year}</p>
        </div>

        {/* Specs */}
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-warm-500 dark:text-warm-400">
          <span className="flex items-center gap-1">
            <FiUsers className="h-3.5 w-3.5" />
            {car.seats} {t(messages, 'cars.seats')}
          </span>
          <span className="flex items-center gap-1">
            <FiDroplet className="h-3.5 w-3.5" />
            {fuelLabel}
          </span>
        </div>

        {/* Price + Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
              {car.pricePerKm}
            </span>
            <span className="ms-1 text-xs text-warm-500 dark:text-warm-400">
              {t(messages, 'booking.sar')}{t(messages, 'booking.perKm')}
            </span>
          </div>

          <button
            onClick={() => onSelect(car)}
            disabled={!car.inStock}
            className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-warm-300 disabled:text-warm-500 active:scale-[0.97] dark:disabled:bg-warm-700 dark:disabled:text-warm-500"
          >
            {t(messages, 'cars.selectCar')}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

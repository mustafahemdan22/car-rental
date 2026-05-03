'use client';

import { useState, useEffect, useCallback } from 'react';
import { FiMapPin, FiNavigation, FiStar } from 'react-icons/fi';
import { useBookingStore } from '@/store/bookingStore';
import { searchLocations } from '@/lib/mockLocations';
import type { Locale, Location, Messages } from '@/types';
import { t } from '@/lib/i18n';

interface BookingWidgetProps {
  locale: Locale;
  messages: Messages;
}

export function BookingWidget({ locale, messages }: BookingWidgetProps) {
  const { selectedCar, pickupLocation, destinationLocation, totalPrice, distanceInKm, isCalculating, setPickup, setDestination, calculatePrice } = useBookingStore();

  const [pickupQuery, setPickupQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');
  const [pickupResults, setPickupResults] = useState<Location[]>([]);
  const [destResults, setDestResults] = useState<Location[]>([]);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const handlePickupSearch = useCallback(async (query: string) => {
    setPickupQuery(query);
    if (query.length >= 2) {
      const results = await searchLocations(query, locale);
      setPickupResults(results);
      setShowPickupDropdown(true);
    } else {
      setPickupResults([]);
      setShowPickupDropdown(false);
    }
  }, [locale]);

  const handleDestSearch = useCallback(async (query: string) => {
    setDestQuery(query);
    if (query.length >= 2) {
      const results = await searchLocations(query, locale);
      setDestResults(results);
      setShowDestDropdown(true);
    } else {
      setDestResults([]);
      setShowDestDropdown(false);
    }
  }, [locale]);

  const selectPickupLocation = (loc: Location) => {
    setPickup(loc);
    setPickupQuery(loc.name[locale]);
    setShowPickupDropdown(false);
  };

  const selectDestLocation = (loc: Location) => {
    setDestination(loc);
    setDestQuery(loc.name[locale]);
    setShowDestDropdown(false);
  };

  // Auto-calculate when both locations are set and a car is selected
  useEffect(() => {
    if (pickupLocation && destinationLocation && selectedCar) {
      calculatePrice();
    }
  }, [pickupLocation, destinationLocation, selectedCar, calculatePrice]);

  return (
    <div className="rounded-2xl border border-warm-200 bg-white p-5 shadow-elevated dark:border-warm-800 dark:bg-warm-900">
      {/* Banner / Theme Header */}
      <div className="mb-4 rounded-xl bg-gradient-to-r from-primary-50 to-warm-50 p-3 text-xs text-warm-600 dark:from-primary-950/20 dark:to-warm-900/20 dark:text-warm-400">
        ✨ <strong>Egypt Tourism Experience:</strong> Choose real Egyptian tourist attractions and travel routes below.
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Pickup Location */}
        <div className="relative">
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-warm-700 dark:text-warm-300">
            <FiMapPin className="h-4 w-4 text-primary-500" />
            {t(messages, 'booking.pickup')}
          </label>
          <input
            type="text"
            value={pickupQuery}
            onChange={(e) => handlePickupSearch(e.target.value)}
            onFocus={() => pickupResults.length > 0 && setShowPickupDropdown(true)}
            placeholder={locale === 'ar' ? 'ابحث عن مزار سياحي بمصر...' : 'Search Egyptian tourist places...'}
            className="w-full rounded-lg border border-warm-200 bg-warm-50 px-3 py-2.5 text-sm placeholder:text-warm-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-warm-700 dark:bg-warm-800 dark:text-warm-100 dark:placeholder:text-warm-500"
          />
          {showPickupDropdown && pickupResults.length > 0 && (
            <LocationDropdown
              results={pickupResults}
              locale={locale}
              onSelect={selectPickupLocation}
              onClose={() => setShowPickupDropdown(false)}
            />
          )}
        </div>

        {/* Destination */}
        <div className="relative">
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-warm-700 dark:text-warm-300">
            <FiNavigation className="h-4 w-4 text-accent-500" />
            {t(messages, 'booking.destination')}
          </label>
          <input
            type="text"
            value={destQuery}
            onChange={(e) => handleDestSearch(e.target.value)}
            onFocus={() => destResults.length > 0 && setShowDestDropdown(true)}
            placeholder={locale === 'ar' ? 'ابحث عن مزار سياحي بمصر...' : 'Search Egyptian tourist places...'}
            className="w-full rounded-lg border border-warm-200 bg-warm-50 px-3 py-2.5 text-sm placeholder:text-warm-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-warm-700 dark:bg-warm-800 dark:text-warm-100 dark:placeholder:text-warm-500"
          />
          {showDestDropdown && destResults.length > 0 && (
            <LocationDropdown
              results={destResults}
              locale={locale}
              onSelect={selectDestLocation}
              onClose={() => setShowDestDropdown(false)}
            />
          )}
        </div>
      </div>

      {/* Price Display */}
      {(isCalculating || totalPrice > 0) && (
        <div className="mt-4 rounded-lg bg-primary-50 p-3 dark:bg-primary-950/30">
          {isCalculating ? (
            <div className="flex items-center gap-2 text-sm text-warm-500">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
              {t(messages, 'booking.calculating')}
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="text-sm text-warm-600 dark:text-warm-400">
                {distanceInKm.toFixed(1)} {t(messages, 'booking.km')}
                {selectedCar && (
                  <span className="ms-2 text-warm-400 dark:text-warm-500">
                    × {selectedCar.pricePerKm} {t(messages, 'booking.sar')}{t(messages, 'booking.perKm')}
                  </span>
                )}
              </div>
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                {totalPrice.toFixed(2)} {t(messages, 'booking.sar')}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Location Dropdown with Groups and Tags ──────── */

function LocationDropdown({
  results,
  locale,
  onSelect,
  onClose,
}: {
  results: Location[];
  locale: Locale;
  onSelect: (loc: Location) => void;
  onClose: () => void;
}) {
  // Group by region
  const grouped = results.reduce((acc, loc) => {
    const regionName = loc.region ? loc.region[locale] : (locale === 'ar' ? 'أماكن أخرى' : 'Other Places');
    if (!acc[regionName]) acc[regionName] = [];
    acc[regionName].push(loc);
    return acc;
  }, {} as Record<string, Location[]>);

  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-warm-200 bg-white shadow-elevated dark:border-warm-700 dark:bg-warm-800">
        {Object.entries(grouped).map(([regionName, locs]) => (
          <li key={regionName} className="border-b border-warm-100 last:border-0 dark:border-warm-700">
            <div className="bg-warm-50 px-3 py-1.5 text-xs font-bold text-warm-600 dark:bg-warm-800/80 dark:text-warm-400">
              {regionName}
            </div>
            <ul>
              {locs.map((loc) => (
                <li key={loc.id}>
                  <button
                    onClick={() => onSelect(loc)}
                    className="flex w-full items-start gap-2 px-3 py-2 text-start text-sm transition-colors hover:bg-warm-50 dark:hover:bg-warm-700"
                  >
                    <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-warm-900 dark:text-warm-100">{loc.name[locale]}</span>
                        {loc.category && (
                          <span className="rounded bg-primary-100 px-1.5 py-0.5 text-[10px] font-semibold text-primary-800 dark:bg-primary-900/40 dark:text-primary-300">
                            {loc.category[locale]}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-warm-500 dark:text-warm-400 mt-0.5">{loc.address[locale]}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

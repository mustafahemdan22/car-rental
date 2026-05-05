'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import type { Locale, Messages, FilterState, SortOption, Car } from '@/types';
import { t } from '@/lib/i18n';
import { mapConvexCar } from '@/lib/utils';
import { useBookingStore } from '@/store/bookingStore';
import { CarCard } from '@/components/cars/CarCard';
import { FilterBar } from '@/components/cars/FilterBar';
import { SortDropdown } from '@/components/cars/SortDropdown';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface CarsClientProps {
  locale: Locale;
  messages: Messages;
}

const defaultFilters: FilterState = {
  types: [],
  fuelType: null,
  minPrice: 0,
  maxPrice: 100,
  minSeats: 0,
  year: null,
};

const ITEMS_PER_PAGE = 6;

export function CarsClient({ locale, messages }: CarsClientProps) {
  const router = useRouter();
  const selectCar = useBookingStore((s) => s.selectCar);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [filtersEnabled, setFiltersEnabled] = useState(true);
  const [sort, setSort] = useState<SortOption>('rating-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const rawCars = useQuery(api.cars.getAllCars);
  
  // Map Convex data to Car type
  const allCars: Car[] = useMemo(() => {
    if (!rawCars) return [];
    return rawCars.map(mapConvexCar);
  }, [rawCars]);

  // Handle loading state
  useEffect(() => {
    if (rawCars !== undefined) {
      const timer = setTimeout(() => setLoadingInitial(false), 300);
      return () => clearTimeout(timer);
    }
  }, [rawCars]);

  const loading = loadingInitial || rawCars === undefined;

  const filtered = useMemo(() => {
    let result = [...allCars];

    if (filtersEnabled) {
      if (filters.types.length > 0) {
        result = result.filter((c) => filters.types.includes(c.type));
      }
      if (filters.fuelType) {
        result = result.filter((c) => c.fuelType === filters.fuelType);
      }
      if (filters.year) {
        result = result.filter((c) => c.year === filters.year);
      }
    }

    // Sort
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.pricePerKm - b.pricePerKm); break;
      case 'price-desc': result.sort((a, b) => b.pricePerKm - a.pricePerKm); break;
      case 'name-asc': result.sort((a, b) => a.name[locale].localeCompare(b.name[locale])); break;
      case 'name-desc': result.sort((a, b) => b.name[locale].localeCompare(a.name[locale])); break;
      case 'seats-desc': result.sort((a, b) => b.seats - a.seats); break;
      case 'rating-desc': result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  }, [filters, filtersEnabled, sort, locale]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedCars = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const handleSelect = (car: Car) => {
    selectCar(car);
    router.push(`/${locale}/cars/${car.slug}`);
  };

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const handlePrevPage = () => {
    if (hasPrevPage) setCurrentPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (hasNextPage) setCurrentPage((p) => p + 1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <SectionHeader title={t(messages, 'cars.title')} subtitle={t(messages, 'cars.subtitle')} />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <FilterBar
            filters={filters}
            onChange={setFilters}
            messages={messages}
            filtersEnabled={filtersEnabled}
            onToggleFilters={setFiltersEnabled}
          />
        </div>
        <div className="flex items-center justify-end">
          <SortDropdown value={sort} onChange={setSort} messages={messages} />
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton variant="card" count={6} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={t(messages, 'cars.noResults')}
          message={t(messages, 'cars.noResultsHint')}
          actionLabel={t(messages, 'cars.clearFilters')}
          onAction={() => {
            setFilters(defaultFilters);
            setFiltersEnabled(true);
          }}
        />
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                locale={locale}
                messages={messages}
                onSelect={handleSelect}
              />
            ))}
          </div>

          {/* Premium Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={!hasPrevPage}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-warm-200 bg-white text-warm-600 transition hover:bg-warm-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-400 dark:hover:bg-warm-800"
                aria-label="Previous page"
              >
                {locale === 'ar' ? <FiChevronRight className="h-5 w-5" /> : <FiChevronLeft className="h-5 w-5" />}
              </button>

              <div className="flex gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'border border-warm-200 bg-white text-warm-600 hover:bg-warm-50 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-400 dark:hover:bg-warm-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNextPage}
                disabled={!hasNextPage}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-warm-200 bg-white text-warm-600 transition hover:bg-warm-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-400 dark:hover:bg-warm-800"
                aria-label="Next page"
              >
                {locale === 'ar' ? <FiChevronLeft className="h-5 w-5" /> : <FiChevronRight className="h-5 w-5" />}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

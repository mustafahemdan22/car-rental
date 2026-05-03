'use client';

import type { CarType, FuelType, FilterState, Messages } from '@/types';
import { t } from '@/lib/i18n';

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  messages: Messages;
  filtersEnabled: boolean;
  onToggleFilters: (enabled: boolean) => void;
}

const CAR_TYPES: CarType[] = ['sedan', 'suv', 'sports', 'luxury', 'economy', 'van'];
const FUEL_TYPES: FuelType[] = ['petrol', 'diesel', 'electric', 'hybrid'];
const YEARS = [2020, 2021, 2022, 2023, 2024];

export function FilterBar({ filters, onChange, messages, filtersEnabled, onToggleFilters }: FilterBarProps) {
  const toggleType = (type: CarType) => {
    // If clicking the currently selected type, clear it.
    // If clicking a different type, replace the array to select only the new one.
    const types = filters.types.includes(type) ? [] : [type];
    onChange({ ...filters, types });
  };

  return (
    <div className="space-y-4 rounded-xl border border-warm-200 bg-white p-4 dark:border-warm-800 dark:bg-warm-900">
      {/* Filters Toggle Switch */}
      <div className="flex items-center justify-between border-b border-warm-100 pb-3 dark:border-warm-800">
        <span className="text-sm font-medium text-warm-700 dark:text-warm-200">
          {filtersEnabled ? t(messages, 'cars.disableFilters') : t(messages, 'cars.enableFilters')}
        </span>
        <button
          type="button"
          onClick={() => onToggleFilters(!filtersEnabled)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            filtersEnabled ? 'bg-primary-500' : 'bg-warm-300 dark:bg-warm-700'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              filtersEnabled ? 'translate-x-5 rtl:-translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {filtersEnabled && (
        <>
          {/* Type Filters */}
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-warm-500 dark:text-warm-400">
              {t(messages, 'cars.filterBy')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {CAR_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    filters.types.includes(type)
                      ? 'bg-primary-500 text-white shadow'
                      : 'bg-warm-100 text-warm-600 hover:bg-warm-200 dark:bg-warm-800 dark:text-warm-400 dark:hover:bg-warm-700'
                  }`}
                >
                  {t(messages, `cars.${type}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {/* Fuel Type */}
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-warm-500 dark:text-warm-400">
                {t(messages, 'addCar.fuelType')}
              </label>
              <select
                value={filters.fuelType ?? ''}
                onChange={(e) => onChange({ ...filters, fuelType: (e.target.value || null) as FuelType | null })}
                className="w-full rounded-lg border border-warm-200 bg-white px-2 py-1.5 text-xs text-warm-700 dark:border-warm-700 dark:bg-warm-800 dark:text-warm-300"
              >
                <option value="">{t(messages, 'cars.allTypes')}</option>
                {FUEL_TYPES.map((ft) => (
                  <option key={ft} value={ft}>{t(messages, `cars.${ft}`)}</option>
                ))}
              </select>
            </div>

            {/* Model Year Filter */}
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-warm-500 dark:text-warm-400">
                {t(messages, 'cars.modelYear')}
              </label>
              <select
                value={filters.year ?? ''}
                onChange={(e) => onChange({ ...filters, year: e.target.value ? Number(e.target.value) : null })}
                className="w-full rounded-lg border border-warm-200 bg-white px-2 py-1.5 text-xs text-warm-700 dark:border-warm-700 dark:bg-warm-800 dark:text-warm-300"
              >
                <option value="">{t(messages, 'cars.allYears')}</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

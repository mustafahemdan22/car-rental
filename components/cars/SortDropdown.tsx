'use client';

import type { SortOption, Messages } from '@/types';
import { t } from '@/lib/i18n';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  messages: Messages;
}

const SORT_OPTIONS: { value: SortOption; labelKey: string }[] = [
  { value: 'price-asc', labelKey: 'cars.priceLowHigh' },
  { value: 'price-desc', labelKey: 'cars.priceHighLow' },
  { value: 'rating-desc', labelKey: 'cars.topRated' },
  { value: 'seats-desc', labelKey: 'cars.mostSeats' },
  { value: 'name-asc', labelKey: 'cars.nameAZ' },
  { value: 'name-desc', labelKey: 'cars.nameZA' },
];

export function SortDropdown({ value, onChange, messages }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-medium text-warm-500 dark:text-warm-400 whitespace-nowrap">
        {t(messages, 'cars.sortBy')}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="rounded-lg border border-warm-200 bg-white px-3 py-1.5 text-xs text-warm-700 dark:border-warm-700 dark:bg-warm-800 dark:text-warm-300"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {t(messages, opt.labelKey)}
          </option>
        ))}
      </select>
    </div>
  );
}

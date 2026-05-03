'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar } from 'react-icons/fi';

interface DateInputProps {
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  placeholder?: string;
  error?: string;
}

export function DateInput({ label, selected, onChange, minDate, placeholder, error }: DateInputProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-warm-700 dark:text-warm-300">
        {label}
      </label>
      <div className="relative">
        <DatePicker
          selected={selected}
          onChange={onChange}
          minDate={minDate || new Date()}
          placeholderText={placeholder}
          dateFormat="dd/MM/yyyy"
          className={`w-full rounded-lg border px-3 py-2.5 ps-9 text-sm transition-colors placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:placeholder:text-warm-600 ${
            error
              ? 'border-error bg-error/5'
              : 'border-warm-200 bg-white text-warm-900 hover:border-warm-300 focus:border-primary-500 dark:border-warm-700 dark:bg-warm-800 dark:text-warm-100'
          }`}
        />
        <FiCalendar className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-400" />
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}

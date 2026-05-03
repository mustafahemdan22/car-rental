import type { SelectHTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: FieldError;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  placeholder?: string;
}

export function FormSelect({ label, options, error, register, placeholder, className = '', ...props }: FormSelectProps) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-warm-700 dark:text-warm-300">
        {label}
        {props.required && <span className="ms-0.5 text-error">*</span>}
      </label>
      <select
        {...register}
        {...props}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30 ${
          error
            ? 'border-error bg-error/5 text-warm-900 dark:text-warm-100'
            : 'border-warm-200 bg-white text-warm-900 hover:border-warm-300 focus:border-primary-500 dark:border-warm-700 dark:bg-warm-800 dark:text-warm-100 dark:hover:border-warm-600'
        }`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error?.message && (
        <p className="mt-1 text-xs text-error">{error.message}</p>
      )}
    </div>
  );
}

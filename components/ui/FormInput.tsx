import type { InputHTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
}

export function FormInput({ label, error, register, className = '', ...props }: FormInputProps) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-warm-700 dark:text-warm-300">
        {label}
        {props.required && <span className="ms-0.5 text-error">*</span>}
      </label>
      <input
        {...register}
        {...props}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm transition-colors placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:placeholder:text-warm-600 ${
          error
            ? 'border-error bg-error/5 text-warm-900 dark:text-warm-100'
            : 'border-warm-200 bg-white text-warm-900 hover:border-warm-300 focus:border-primary-500 dark:border-warm-700 dark:bg-warm-800 dark:text-warm-100 dark:hover:border-warm-600 dark:focus:border-primary-400'
        }`}
      />
      {error?.message && (
        <p className="mt-1 text-xs text-error">{error.message}</p>
      )}
    </div>
  );
}

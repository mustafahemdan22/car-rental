'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { CheckoutFormData, Messages } from '@/types';
import { t } from '@/lib/i18n';
import { FormInput } from '@/components/ui/FormInput';

interface CheckoutFormProps {
  messages: Messages;
  onSuccess: () => void;
}

export function CheckoutForm({ messages, onSuccess }: CheckoutFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutFormData>();

  const onSubmit = async () => {
    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 1500));
    toast.success(t(messages, 'checkout.bookingConfirmed'));
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h3 className="text-lg font-semibold text-warm-900 dark:text-warm-50">
        {t(messages, 'checkout.personalInfo')}
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          label={t(messages, 'checkout.firstName')}
          required
          register={register('firstName', { required: t(messages, 'checkout.firstNameRequired') })}
          error={errors.firstName}
        />
        <FormInput
          label={t(messages, 'checkout.lastName')}
          required
          register={register('lastName', { required: t(messages, 'checkout.lastNameRequired') })}
          error={errors.lastName}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          label={t(messages, 'checkout.email')}
          type="email"
          required
          register={register('email', {
            required: t(messages, 'checkout.emailRequired'),
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t(messages, 'checkout.emailInvalid') },
          })}
          error={errors.email}
        />
        <FormInput
          label={t(messages, 'checkout.phone')}
          type="tel"
          required
          register={register('phone', {
            required: t(messages, 'checkout.phoneRequired'),
            pattern: { value: /^[\d+\-\s()]{8,}$/, message: t(messages, 'checkout.phoneInvalid') },
          })}
          error={errors.phone}
        />
      </div>

      <FormInput
        label={t(messages, 'checkout.idNumber')}
        required
        register={register('idNumber', { required: t(messages, 'checkout.idRequired') })}
        error={errors.idNumber}
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-warm-700 dark:text-warm-300">
          {t(messages, 'checkout.notes')}
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          placeholder={t(messages, 'checkout.notesPlaceholder')}
          className="w-full rounded-lg border border-warm-200 bg-white px-3 py-2.5 text-sm placeholder:text-warm-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-warm-700 dark:bg-warm-800 dark:text-warm-100 dark:placeholder:text-warm-500"
        />
      </div>

      <p className="text-xs text-warm-500 dark:text-warm-400">
        {t(messages, 'checkout.termsNote')}
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-primary-500 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99]"
      >
        {isSubmitting ? t(messages, 'common.loading') : t(messages, 'checkout.confirmAndPay')}
      </button>
    </form>
  );
}

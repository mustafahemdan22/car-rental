'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { ContactFormData, Messages } from '@/types';
import { t } from '@/lib/i18n';
import { FormInput } from '@/components/ui/FormInput';

interface ContactFormProps {
  messages: Messages;
}

export function ContactForm({ messages }: ContactFormProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>();

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1200));
    toast.success(t(messages, 'contact.success'));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-lg font-semibold text-warm-900 dark:text-warm-50">
        {t(messages, 'contact.formTitle')}
      </h3>

      <FormInput
        label={t(messages, 'contact.name')}
        required
        register={register('name', { required: t(messages, 'contact.nameRequired') })}
        error={errors.name}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          label={t(messages, 'contact.email')}
          type="email"
          required
          register={register('email', {
            required: t(messages, 'contact.emailRequired'),
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t(messages, 'contact.emailInvalid') },
          })}
          error={errors.email}
        />
        <FormInput
          label={t(messages, 'contact.phone')}
          type="tel"
          register={register('phone')}
        />
      </div>

      <FormInput
        label={t(messages, 'contact.subject')}
        register={register('subject')}
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-warm-700 dark:text-warm-300">
          {t(messages, 'contact.message')} <span className="text-error">*</span>
        </label>
        <textarea
          {...register('message', { required: t(messages, 'contact.messageRequired') })}
          rows={5}
          placeholder={t(messages, 'contact.messagePlaceholder')}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:placeholder:text-warm-500 ${
            errors.message
              ? 'border-error bg-error/5'
              : 'border-warm-200 bg-white text-warm-900 hover:border-warm-300 focus:border-primary-500 dark:border-warm-700 dark:bg-warm-800 dark:text-warm-100'
          }`}
        />
        {errors.message?.message && (
          <p className="mt-1 text-xs text-error">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-primary-500 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600 disabled:opacity-60 active:scale-[0.99]"
      >
        {isSubmitting ? t(messages, 'common.loading') : t(messages, 'contact.send')}
      </button>
    </form>
  );
}

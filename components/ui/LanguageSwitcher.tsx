'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import type { Locale, Messages } from '@/types';
import { t } from '@/lib/i18n';

interface LanguageSwitcherProps {
  locale: Locale;
  messages: Messages;
}

export function LanguageSwitcher({ locale, messages }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Replace current locale segment with the other locale
  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <Link
      href={newPath}
      className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-warm-600 transition-colors hover:bg-warm-100 hover:text-warm-900 dark:text-warm-400 dark:hover:bg-warm-800 dark:hover:text-warm-50"
      aria-label={`Switch to ${otherLocale === 'ar' ? 'Arabic' : 'English'}`}
    >
      <HiOutlineGlobeAlt className="h-4 w-4" />
      <span>{t(messages, 'language.switchTo')}</span>
    </Link>
  );
}

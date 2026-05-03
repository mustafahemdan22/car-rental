import Link from 'next/link';
import { IoCarSportOutline } from 'react-icons/io5';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import type { Locale, Messages } from '@/types';
import { t } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
  messages: Messages;
}

export function Footer({ locale, messages }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-warm-200 bg-warm-100 dark:border-warm-800 dark:bg-warm-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={`/${locale}`} className="mb-4 flex items-center gap-2 text-lg font-bold text-warm-900 dark:text-warm-50">
              <IoCarSportOutline className="h-6 w-6 text-primary-500" />
              <span>Rent<span className="text-primary-500">KSA</span></span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-warm-600 dark:text-warm-400">
              {t(messages, 'footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-warm-900 dark:text-warm-100">
              {t(messages, 'footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {['home', 'cars', 'about', 'contact'].map((key) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${key === 'home' ? '' : `/${key}`}`}
                    className="text-sm text-warm-600 transition-colors hover:text-primary-500 dark:text-warm-400 dark:hover:text-primary-400"
                  >
                    {t(messages, `nav.${key}`)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}/add-car`}
                  className="text-sm text-warm-600 transition-colors hover:text-primary-500 dark:text-warm-400 dark:hover:text-primary-400"
                >
                  {t(messages, 'nav.addCar')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-warm-900 dark:text-warm-100">
              {t(messages, 'footer.support')}
            </h3>
            <ul className="space-y-2">
              {['faq', 'terms', 'privacy', 'helpCenter'].map((key) => (
                <li key={key}>
                  <span className="cursor-default text-sm text-warm-600 dark:text-warm-400">
                    {t(messages, `footer.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-warm-900 dark:text-warm-100">
              {t(messages, 'nav.contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-warm-600 dark:text-warm-400">
                <FiPhone className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                {t(messages, 'contact.phone1')}
              </li>
              <li className="flex items-start gap-2 text-sm text-warm-600 dark:text-warm-400">
                <FiMail className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                {t(messages, 'contact.emailAddress')}
              </li>
              <li className="flex items-start gap-2 text-sm text-warm-600 dark:text-warm-400">
                <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                <span className="leading-relaxed">{t(messages, 'contact.address')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-warm-200 pt-6 text-center text-xs text-warm-500 dark:border-warm-800 dark:text-warm-500">
          © {currentYear} RentKSA. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
        </div>
      </div>
    </footer>
  );
}

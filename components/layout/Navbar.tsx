'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { IoCarSportOutline } from 'react-icons/io5';
import type { Locale, Messages } from '@/types';
import { t } from '@/lib/i18n';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface NavbarProps {
  locale: Locale;
  messages: Messages;
}

const NAV_LINKS = [
  { key: 'home', href: '' },
  { key: 'cars', href: '/cars' },
  { key: 'drivers', href: '/drivers' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
];

export function Navbar({ locale, messages }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-warm-200 bg-warm-50/80 backdrop-blur-xl dark:border-warm-800 dark:bg-warm-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-warm-900 dark:text-warm-50"
        >
          <IoCarSportOutline className="h-7 w-7 text-primary-500" />
          <span>
            Rent<span className="text-primary-500">KSA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-warm-600 transition-colors hover:bg-warm-100 hover:text-warm-900 dark:text-warm-400 dark:hover:bg-warm-800 dark:hover:text-warm-50"
            >
              {t(messages, `nav.${link.key}`)}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher locale={locale} messages={messages} />
          <ThemeToggle />
          <Link
            href={`/${locale}/cars`}
            className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-600 active:scale-[0.97]"
          >
            {t(messages, 'nav.bookNow')}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-warm-600 hover:bg-warm-100 dark:text-warm-400 dark:hover:bg-warm-800"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <HiOutlineX className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
            className="overflow-hidden border-t border-warm-200 bg-warm-50 md:hidden dark:border-warm-800 dark:bg-warm-950"
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href}`}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-warm-700 hover:bg-warm-100 dark:text-warm-300 dark:hover:bg-warm-800"
                >
                  {t(messages, `nav.${link.key}`)}
                </Link>
              ))}

              <div className="border-t border-warm-200 pt-3 dark:border-warm-800">
                <LanguageSwitcher locale={locale} messages={messages} />
              </div>

              <Link
                href={`/${locale}/cars`}
                onClick={() => setIsOpen(false)}
                className="mt-2 block rounded-lg bg-primary-500 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-600"
              >
                {t(messages, 'nav.bookNow')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

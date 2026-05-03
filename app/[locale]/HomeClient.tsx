'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiDollarSign, FiTruck, FiClock, FiShield, FiArrowRight } from 'react-icons/fi';
import { IoCarSportOutline } from 'react-icons/io5';
import type { Locale, Messages } from '@/types';
import { t } from '@/lib/i18n';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { CarCard } from '@/components/cars/CarCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTASection } from '@/components/ui/CTASection';
import { useBookingStore } from '@/store/bookingStore';
import { getFeaturedCars } from '@/data/cars';
import { useRouter } from 'next/navigation';

interface HomeClientProps {
  locale: Locale;
  messages: Messages;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' as const },
  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
};

export function HomeClient({ locale, messages }: HomeClientProps) {
  const router = useRouter();
  const selectCar = useBookingStore((s) => s.selectCar);
  const featuredCars = getFeaturedCars();

  const handleSelectCar = (car: Parameters<typeof selectCar>[0]) => {
    if (car) {
      selectCar(car);
      router.push(`/${locale}/booking`);
    }
  };

  return (
    <>
      {/* ── Hero ────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-warm-50 pb-16 pt-12 dark:from-warm-950 dark:to-warm-950 sm:pb-24 sm:pt-20">
        {/* Decorative circles */}
        <div className="absolute -end-32 -top-32 h-96 w-96 rounded-full bg-primary-200/30 blur-3xl dark:bg-primary-800/10" />
        <div className="absolute -bottom-20 -start-20 h-72 w-72 rounded-full bg-accent-200/20 blur-3xl dark:bg-accent-900/10" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Text */}
            <motion.div {...fadeUp}>
              <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-warm-900 sm:text-4xl lg:text-5xl dark:text-warm-50">
                {t(messages, 'hero.title')}
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-warm-600 sm:text-lg dark:text-warm-400">
                {t(messages, 'hero.subtitle')}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/cars`}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600 active:scale-[0.97]"
                >
                  {t(messages, 'hero.cta')}
                  <FiArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="inline-flex items-center gap-2 rounded-lg border border-warm-300 px-6 py-3 text-sm font-semibold text-warm-700 transition-all hover:bg-warm-100 dark:border-warm-600 dark:text-warm-300 dark:hover:bg-warm-800"
                >
                  {t(messages, 'common.learnMore')}
                </Link>
              </div>
            </motion.div>

            {/* Booking Widget */}
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
              <BookingWidget locale={locale} messages={messages} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Featured Cars ───────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={t(messages, 'cars.featured')}
            subtitle={t(messages, 'cars.featuredSubtitle')}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                locale={locale}
                messages={messages}
                onSelect={handleSelectCar}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/cars`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400"
            >
              {t(messages, 'common.viewAll')}
              <FiArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ───────────────────────── */}
      <section className="bg-warm-100/50 py-16 sm:py-20 dark:bg-warm-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={t(messages, 'whyUs.title')}
            subtitle={t(messages, 'whyUs.subtitle')}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: FiDollarSign, title: t(messages, 'whyUs.reason1Title'), text: t(messages, 'whyUs.reason1Text') },
              { icon: IoCarSportOutline, title: t(messages, 'whyUs.reason2Title'), text: t(messages, 'whyUs.reason2Text') },
              { icon: FiClock, title: t(messages, 'whyUs.reason3Title'), text: t(messages, 'whyUs.reason3Text') },
              { icon: FiShield, title: t(messages, 'whyUs.reason4Title'), text: t(messages, 'whyUs.reason4Text') },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
                className="rounded-xl bg-white p-6 dark:bg-warm-800"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 font-semibold text-warm-900 dark:text-warm-50">{item.title}</h3>
                <p className="text-sm leading-relaxed text-warm-500 dark:text-warm-400">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Stats ─────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={t(messages, 'trust.title')}
            subtitle={t(messages, 'trust.subtitle')}
          />
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { value: t(messages, 'trust.stat1'), label: t(messages, 'trust.stat1Label') },
              { value: t(messages, 'trust.stat2'), label: t(messages, 'trust.stat2Label') },
              { value: t(messages, 'trust.stat3'), label: t(messages, 'trust.stat3Label') },
              { value: t(messages, 'trust.stat4'), label: t(messages, 'trust.stat4Label') },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-600 sm:text-4xl dark:text-primary-400">{stat.value}</div>
                <div className="mt-1 text-sm text-warm-500 dark:text-warm-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Add Car CTA ─────────────────────────── */}
      <CTASection
        title={t(messages, 'addCarCta.title')}
        subtitle={t(messages, 'addCarCta.subtitle')}
        ctaLabel={t(messages, 'addCarCta.cta')}
        ctaHref={`/${locale}/add-car`}
      />
    </>
  );
}

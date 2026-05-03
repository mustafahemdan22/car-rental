'use client';

import { motion } from 'framer-motion';
import { FiTarget, FiCheck, FiTrendingUp } from 'react-icons/fi';
import { IoCarSportOutline } from 'react-icons/io5';
import type { Locale, Messages } from '@/types';
import { t } from '@/lib/i18n';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface AboutClientProps {
  locale: Locale;
  messages: Messages;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
};

export function AboutClient({ locale, messages }: AboutClientProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Intro */}
      <SectionHeader title={t(messages, 'about.title')} subtitle={t(messages, 'about.subtitle')} />

      {/* Story */}
      <motion.section {...fadeUp} className="mb-16">
        <h2 className="mb-3 text-xl font-bold text-warm-900 dark:text-warm-50">{t(messages, 'about.storyTitle')}</h2>
        <p className="max-w-3xl leading-relaxed text-warm-600 dark:text-warm-400">{t(messages, 'about.storyText')}</p>
      </motion.section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-xl font-bold text-warm-900 dark:text-warm-50">{t(messages, 'about.howItWorks')}</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { num: '01', title: t(messages, 'about.step1Title'), text: t(messages, 'about.step1Text'), icon: IoCarSportOutline },
            { num: '02', title: t(messages, 'about.step2Title'), text: t(messages, 'about.step2Text'), icon: FiTarget },
            { num: '03', title: t(messages, 'about.step3Title'), text: t(messages, 'about.step3Text'), icon: FiCheck },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                <step.icon className="h-6 w-6" />
              </div>
              <span className="mb-2 block text-xs font-bold text-primary-500">{step.num}</span>
              <h3 className="mb-1.5 font-semibold text-warm-900 dark:text-warm-50">{step.title}</h3>
              <p className="text-sm leading-relaxed text-warm-500 dark:text-warm-400">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-xl font-bold text-warm-900 dark:text-warm-50">{t(messages, 'about.whyTitle')}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { title: t(messages, 'about.why1Title'), text: t(messages, 'about.why1Text') },
            { title: t(messages, 'about.why2Title'), text: t(messages, 'about.why2Text') },
            { title: t(messages, 'about.why3Title'), text: t(messages, 'about.why3Text') },
            { title: t(messages, 'about.why4Title'), text: t(messages, 'about.why4Text') },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
              className="rounded-xl bg-warm-100 p-5 dark:bg-warm-800"
            >
              <h3 className="mb-1.5 font-semibold text-warm-900 dark:text-warm-50">{item.title}</h3>
              <p className="text-sm leading-relaxed text-warm-500 dark:text-warm-400">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <motion.section
        {...fadeUp}
        className="rounded-2xl bg-primary-500 p-8 text-center text-white sm:p-12"
      >
        <FiTrendingUp className="mx-auto mb-4 h-8 w-8 text-primary-100" />
        <h2 className="mb-3 text-xl font-bold">{t(messages, 'about.missionTitle')}</h2>
        <p className="mx-auto max-w-2xl leading-relaxed text-primary-100">{t(messages, 'about.missionText')}</p>
      </motion.section>
    </div>
  );
}

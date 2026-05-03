'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CTASectionProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

export function CTASection({ title, subtitle, ctaLabel, ctaHref }: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-primary-500 py-16 sm:py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -start-20 -top-20 h-80 w-80 rounded-full bg-white" />
        <div className="absolute -bottom-10 -end-10 h-60 w-60 rounded-full bg-white" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-100">{subtitle}</p>
          <Link
            href={ctaHref}
            className="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-sm font-semibold text-primary-600 transition-all hover:bg-primary-50 active:scale-[0.97]"
          >
            {ctaLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

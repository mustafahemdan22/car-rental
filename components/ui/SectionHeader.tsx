'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
      className={`mb-10 ${centered ? 'text-center' : ''}`}
    >
      <h2 className="text-2xl font-bold tracking-tight text-warm-900 sm:text-3xl dark:text-warm-50">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-base text-warm-500 dark:text-warm-400">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

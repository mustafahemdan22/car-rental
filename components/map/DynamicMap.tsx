'use client';

import dynamic from 'next/dynamic';
import type { Coordinates } from '@/types';

const MapPreview = dynamic(
  () => import('@/components/map/MapPreview').then((mod) => ({ default: mod.MapPreview })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 w-full items-center justify-center rounded-xl border border-warm-200 bg-warm-100 sm:h-80 dark:border-warm-700 dark:bg-warm-800">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
      </div>
    ),
  }
);

interface DynamicMapProps {
  pickup?: Coordinates | null;
  destination?: Coordinates | null;
  className?: string;
}

export function DynamicMap({ pickup, destination, className }: DynamicMapProps) {
  return <MapPreview pickup={pickup} destination={destination} className={className} />;
}

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'circle' | 'image';
  count?: number;
  className?: string;
}

function SkeletonPulse({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-warm-200 dark:bg-warm-800 ${className}`}
    />
  );
}

export function LoadingSkeleton({ variant = 'card', count = 1, className = '' }: LoadingSkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {items.map((i) => (
          <SkeletonPulse key={i} className={`h-4 ${i === items.length - 1 ? 'w-3/4' : 'w-full'}`} />
        ))}
      </div>
    );
  }

  if (variant === 'circle') {
    return (
      <div className={`flex gap-3 ${className}`}>
        {items.map((i) => (
          <SkeletonPulse key={i} className="h-10 w-10 rounded-full" />
        ))}
      </div>
    );
  }

  if (variant === 'image') {
    return (
      <div className={className}>
        {items.map((i) => (
          <SkeletonPulse key={i} className="aspect-video w-full rounded-xl" />
        ))}
      </div>
    );
  }

  // Card variant
  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {items.map((i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-warm-200 bg-white p-0 dark:border-warm-800 dark:bg-warm-900">
          <SkeletonPulse className="aspect-[16/10] w-full rounded-none" />
          <div className="space-y-3 p-4">
            <SkeletonPulse className="h-5 w-2/3" />
            <SkeletonPulse className="h-4 w-1/2" />
            <div className="flex gap-2">
              <SkeletonPulse className="h-4 w-16" />
              <SkeletonPulse className="h-4 w-16" />
              <SkeletonPulse className="h-4 w-16" />
            </div>
            <SkeletonPulse className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

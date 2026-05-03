import { FiSearch } from 'react-icons/fi';

interface EmptyStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({ title, message, actionLabel, onAction, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-warm-100 text-warm-400 dark:bg-warm-800 dark:text-warm-500">
        {icon || <FiSearch className="h-7 w-7" />}
      </div>
      <h3 className="mb-1 text-lg font-semibold text-warm-900 dark:text-warm-100">{title}</h3>
      {message && (
        <p className="mb-4 max-w-sm text-sm text-warm-500 dark:text-warm-400">{message}</p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

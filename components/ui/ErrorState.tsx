import { FiAlertTriangle } from 'react-icons/fi';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({ title, message, onRetry, retryLabel = 'Try Again' }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-error/10 text-error">
        <FiAlertTriangle className="h-6 w-6" />
      </div>
      {title && (
        <h3 className="mb-1 text-lg font-semibold text-warm-900 dark:text-warm-100">{title}</h3>
      )}
      <p className="mb-4 max-w-sm text-sm text-warm-500 dark:text-warm-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg border border-warm-200 px-4 py-2 text-sm font-medium text-warm-700 transition-colors hover:bg-warm-100 dark:border-warm-700 dark:text-warm-300 dark:hover:bg-warm-800"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}

'use client';

import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export default function ErrorAlert({ message, onRetry, onDismiss }: ErrorAlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 animate-fade-in">
      <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
      <p className="flex-1 text-sm">{message}</p>
      <div className="flex items-center gap-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm font-medium text-red-600 hover:text-red-800 underline"
          >
            Retry
          </button>
        )}
        {(onDismiss || true) && (
          <button
            onClick={() => {
              setDismissed(true);
              onDismiss?.();
            }}
            className="p-1 hover:bg-red-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
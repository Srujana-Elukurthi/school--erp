import { ReactNode } from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface AlertCardProps {
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  action?: string;
  onAction?: () => void;
}

export function AlertCard({ type, message, action, onAction }: AlertCardProps) {
  const configs = {
    warning: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-800',
      icon: <AlertTriangle size={20} className="text-orange-600" />
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <AlertCircle size={20} className="text-red-600" />
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <Info size={20} className="text-blue-600" />
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle size={20} className="text-green-600" />
    }
  };

  const config = configs[type];

  return (
    <div className={`${config.bg} ${config.border} border rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{config.icon}</div>
        <div className="flex-1">
          <p className={`text-sm ${config.text}`}>{message}</p>
        </div>
        {action && onAction && (
          <button
            onClick={onAction}
            className={`text-xs ${config.text} hover:underline font-medium`}
          >
            {action}
          </button>
        )}
      </div>
    </div>
  );
}

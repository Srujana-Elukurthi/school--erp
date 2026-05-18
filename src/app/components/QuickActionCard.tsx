import { ReactNode } from 'react';

interface QuickActionCardProps {
  icon: ReactNode;
  title: string;
  onClick?: () => void;
}

export function QuickActionCard({ icon, title, onClick }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group"
    >
      <div className="text-blue-600 group-hover:scale-110 transition-transform mb-3">
        {icon}
      </div>
      <p className="text-sm text-gray-700">{title}</p>
    </button>
  );
}

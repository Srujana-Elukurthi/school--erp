import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Insight {
  message: string;
  trend: 'up' | 'down' | 'neutral';
}

interface AIInsightCardProps {
  title: string;
  insights: Insight[];
}

export function AIInsightCard({ title, insights }: AIInsightCardProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} className="text-green-600" />;
      case 'down': return <TrendingDown size={16} className="text-orange-600" />;
      case 'neutral': return <Minus size={16} className="text-blue-600" />;
      default: return <Minus size={16} className="text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'bg-green-500';
      case 'down': return 'bg-orange-500';
      case 'neutral': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 rounded-xl p-6 border border-purple-100">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <TrendingUp size={24} className="text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg">{title}</h3>
          <p className="text-xs text-gray-600 mt-1">AI-powered predictions and recommendations</p>
        </div>
      </div>
      <div className="space-y-3">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
            <div className={`w-1.5 h-1.5 rounded-full mt-2 ${getTrendColor(insight.trend)}`} />
            <div className="flex-1">
              <p className="text-sm text-gray-700">{insight.message}</p>
            </div>
            {getTrendIcon(insight.trend)}
          </div>
        ))}
      </div>
    </div>
  );
}

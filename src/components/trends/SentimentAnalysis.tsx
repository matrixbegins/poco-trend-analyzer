import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, MessageSquare } from "lucide-react";

interface SentimentAnalysisProps {
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    trending: 'up' | 'down' | 'stable';
    volume: number;
  };
}

export function SentimentAnalysis({ sentiment }: SentimentAnalysisProps) {
  const data = [
    { name: 'Positive', value: sentiment.positive, color: '#22c55e' },
    { name: 'Neutral', value: sentiment.neutral, color: '#94a3b8' },
    { name: 'Negative', value: sentiment.negative, color: '#ef4444' }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl leading-tight">Customer Sentiment</CardTitle>
          <Badge
            variant="secondary"
            className={`flex items-center gap-1 ${
              sentiment.trending === 'up'
                ? 'bg-green-100 text-green-700'
                : sentiment.trending === 'down'
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <TrendingUp className="h-3 w-3" />
            {sentiment.trending === 'up' ? '+12%' : sentiment.trending === 'down' ? '-8%' : 'Stable'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Sentiment Distribution Chart */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Sentiment']}
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Metrics */}
          <div className="space-y-4 flex flex-col justify-center">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Positive</span>
                </div>
                <span className="font-bold">{sentiment.positive}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Neutral</span>
                </div>
                <span className="font-bold">{sentiment.neutral}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Negative</span>
                </div>
                <span className="font-bold">{sentiment.negative}%</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Mentions</span>
                <span className="font-bold">{sentiment.volume.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

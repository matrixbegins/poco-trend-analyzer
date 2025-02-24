import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TrendStatsProps {
  trendData: Array<{ date: string; score: number }>;
  currentTotal: number;
  percentageChange: number;
  updatedAt: string;
}

export function TrendStats({ trendData, currentTotal, percentageChange, updatedAt }: TrendStatsProps) {
  // Custom date formatter for x-axis
  const formatXAxis = (dateStr: string) => {
    return format(parseISO(dateStr), 'MMM d');
  };

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <p className="font-medium">{format(parseISO(label), 'MMMM d, yyyy')}</p>
          <p className="text-purple-600">
            Score: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Popularity Trend</CardTitle>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Clock className="h-3 w-3" />
            <span>updated {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Metrics Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Engagement</p>
            <p className="text-xl font-semibold">{currentTotal.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Week over Week</p>
            <div className="flex items-center gap-1">
              {percentageChange > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <p className={`text-xl font-semibold ${percentageChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(percentageChange).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                tickFormatter={formatXAxis}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#9b87f5"
                strokeWidth={2}
                dot={{ fill: '#9b87f5', r: 3 }}
                activeDot={{ r: 4 }}
                name="Engagement Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

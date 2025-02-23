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
    <Card className="overflow-hidden border-purple-100">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl leading-tight">Popularity Trend</CardTitle>
          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="h-3 w-3" />
            <span className="text-xs">
              updated {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
            </span>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="grid grid-cols-2 gap-8 py-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Engagement</p>
            <p className="text-2xl font-semibold">{currentTotal.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Week over Week Change</p>
            <div className="flex items-center gap-2">
              {percentageChange > 0 ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
              <p className={`text-2xl font-semibold ${percentageChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(percentageChange).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis
                dataKey="date"
                tick={{ fill: '#666' }}
                tickLine={{ stroke: '#666' }}
                tickFormatter={formatXAxis}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: '#666' }}
                tickLine={{ stroke: '#666' }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#9b87f5"
                strokeWidth={2}
                dot={{ fill: '#9b87f5', r: 4 }}
                activeDot={{ r: 6 }}
                name="Engagement Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

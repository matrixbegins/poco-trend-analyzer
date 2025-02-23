import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { MetricCard } from "@/components/MetricCard";
import { TrendAnalytics } from "@/data/analyticsData";
import { TrendingUp, Zap, Target, BarChart2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PredictiveAnalyticsProps {
  data: TrendAnalytics['predictiveMetrics'];
}

const getLifecycleColor = (lifecycle: 'emerging' | 'peaking' | 'declining') => {
  switch (lifecycle) {
    case 'emerging': return 'bg-green-100 text-green-700';
    case 'peaking': return 'bg-purple-100 text-purple-700';
    case 'declining': return 'bg-orange-100 text-orange-700';
  }
};

export function PredictiveAnalytics({ data }: PredictiveAnalyticsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Growth Potential"
          value={`${data.growthPotential}%`}
          icon={TrendingUp}
          description="Expected growth"
          trend={1}
          trendValue={8.5}
        />
        <MetricCard
          title="Sustainability"
          value={data.sustainabilityScore}
          icon={Target}
          description="Long-term viability"
          trend={1}
          trendValue={4.2}
        />
        <div className="col-span-2">
          <Card className="h-full">
            <CardContent className="h-full flex flex-col justify-center p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-500">Trend Lifecycle</div>
                  <div className="mt-1 text-2xl font-bold capitalize">{data.trendLifecycle}</div>
                </div>
                <Badge className={`${getLifecycleColor(data.trendLifecycle)}`}>
                  {data.trendLifecycle === 'emerging' ? 'High Potential' :
                   data.trendLifecycle === 'peaking' ? 'Act Now' : 'Monitor'}
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-500">Next Wave</div>
                <div className="mt-1 text-sm">{data.nextWavePrediction}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Growth Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.forecastedGrowth}>
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short' })}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  formatter={(value: number) => [`${value}%`, 'Predicted Growth']}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#9b87f5"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
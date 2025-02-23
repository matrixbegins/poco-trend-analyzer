import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MetricCard } from "@/components/MetricCard";
import { TrendingUp, Share2, Zap, Clock } from "lucide-react";
import { TrendAnalytics } from "@/data/analyticsData";

interface ContentPerformanceProps {
  data: TrendAnalytics['contentPerformance'];
}

export function ContentPerformance({ data }: ContentPerformanceProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Avg. Engagement Rate"
          value={data.metrics.avgEngagementRate}
          icon={TrendingUp}
          description="Above industry average"
          trend={1}
          trendValue={2.3}
        />
        <MetricCard
          title="Shareability Score"
          value={data.metrics.shareability}
          icon={Share2}
          description="Content share probability"
          trend={1}
          trendValue={5.7}
        />
        <MetricCard
          title="Virality Score"
          value={data.metrics.virality}
          icon={Zap}
          description="Viral potential"
          trend={1}
          trendValue={3.2}
        />
        <MetricCard
          title="Content Lifespan"
          value={`${data.metrics.contentLifespan}h`}
          icon={Clock}
          description="Average content lifetime"
          trend={0}
          trendValue={0}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.performanceOverTime}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="engagement" stroke="#9b87f5" />
                <Line type="monotone" dataKey="shares" stroke="#f59b87" />
                <Line type="monotone" dataKey="viral" stroke="#87f59b" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
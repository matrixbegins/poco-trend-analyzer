import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { MetricCard } from "@/components/MetricCard";
import { TrendAnalytics } from "@/data/analyticsData";
import { DollarSign, Users, Percent, Target } from "lucide-react";

interface ROIMetricsProps {
  data: TrendAnalytics['roiMetrics'];
}

const COLORS = ['#9b87f5', '#f59b87', '#87f59b', '#f587e4'];

export function ROIMetrics({ data }: ROIMetricsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Lead Generation"
          value={data.leadGeneration}
          icon={Users}
          description="New leads this month"
          trend={1}
          trendValue={12.5}
        />
        <MetricCard
          title="Cost per Engagement"
          value={`$${data.costPerEngagement}`}
          icon={DollarSign}
          description="Average cost"
          trend={-1}
          trendValue={3.2}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${data.conversionRate}%`}
          icon={Percent}
          description="Overall conversion"
          trend={1}
          trendValue={1.8}
        />
        <MetricCard
          title="Acquisition Cost"
          value={`$${data.customerAcquisitionCost}`}
          icon={Target}
          description="Per customer"
          trend={-1}
          trendValue={2.4}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Revenue Attribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.revenueAttribution}
                  dataKey="revenue"
                  nameKey="channel"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {data.revenueAttribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            {data.revenueAttribution.map((item, index) => (
              <div key={item.channel} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600">
                  {item.channel}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
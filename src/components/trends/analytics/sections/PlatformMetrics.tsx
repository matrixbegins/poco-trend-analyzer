import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Tooltip } from 'recharts';
import { TrendAnalytics } from "@/data/analyticsData";
import { Badge } from "@/components/ui/badge";

interface PlatformMetricsProps {
  data: TrendAnalytics['platformMetrics'];
}

export function PlatformMetrics({ data }: PlatformMetricsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Engagement Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="platform" />
                  <Radar
                    name="Engagement"
                    dataKey="engagement"
                    stroke="#9b87f5"
                    fill="#9b87f5"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Platform Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.map((platform) => (
                <div
                  key={platform.platform}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{platform.platform}</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {platform.growth}% growth
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Cost per Reach</div>
                      <div className="font-medium">${platform.reachCost}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Conversion Rate</div>
                      <div className="font-medium">{platform.conversionRate}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
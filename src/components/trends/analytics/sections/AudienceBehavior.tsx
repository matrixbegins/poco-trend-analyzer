import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { TrendAnalytics } from "@/data/analyticsData";
import { Progress } from "@/components/ui/progress";

interface AudienceBehaviorProps {
  data: TrendAnalytics['audienceBehavior'];
}

const COLORS = ['#9b87f5', '#f59b87', '#87f59b', '#f587e4'];

export function AudienceBehavior({ data }: AudienceBehaviorProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Content Consumption Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.contentConsumptionPatterns.map((pattern) => (
              <div key={pattern.type}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{pattern.type}</span>
                  <span className="text-sm text-gray-500">{pattern.preference}%</span>
                </div>
                <Progress value={pattern.preference} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Interaction Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.interactionTypes}
                  dataKey="frequency"
                  nameKey="action"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {data.interactionTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Device Preference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.devicePreference} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="device" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="usage" fill="#9b87f5" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Attention Span Analysis</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center h-full">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">
              {data.attentionSpan}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Average attention span (seconds)
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Recommendation:</span> Create content that can be consumed within {data.attentionSpan} seconds
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Best Practice:</span> Front-load important information
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface TrendInsightsProps {
  contentFormats: Array<{ name: string; value: number; color: string }>;
  marketingChannels: Array<{ name: string; value: number; color: string }>;
  dailyEngagement: Array<{ day: string; engagement: number }>;
  audienceReach: Array<{ name: string; value: number }>;
}

export function TrendInsights({ contentFormats, marketingChannels, dailyEngagement, audienceReach }: TrendInsightsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Content Format Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Top Performing Formats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentFormats}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {contentFormats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {contentFormats.map((format, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: format.color }} />
                <span className="text-gray-600">{format.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Marketing Channel Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Channel Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketingChannels}
                  innerRadius={0}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {marketingChannels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {marketingChannels.map((channel, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }} />
                <span className="text-gray-600">{channel.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Best Publishing Days */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Best Days to Publish</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyEngagement}>
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                />
                <YAxis
                  hide
                  domain={[0, 'dataMax + 20']}
                />
                <Tooltip
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0' }}
                  formatter={(value: number) => [`${value}k engagements`, 'Engagement']}
                />
                <Bar
                  dataKey="engagement"
                  fill="#9b87f5"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Audience Growth Radar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Audience Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={audienceReach}
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  {audienceReach.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#9b87f5' : '#e2e8f0'}
                    />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-2xl font-bold"
                  fill="#1a1a1a"
                >
                  {audienceReach[0].value}%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Growth in audience reach
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
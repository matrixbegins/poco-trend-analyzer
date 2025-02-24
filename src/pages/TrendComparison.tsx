import { useParams } from 'react-router-dom';
import { findTrendById } from '@/data/trendData';
import { LineChart } from '@/components/charts/LineChart';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TrendComparison() {
  const { trendIds } = useParams<{ trendIds: string }>();
  const trends = trendIds?.split('/').map(id => findTrendById(id)).filter(Boolean) || [];

  // Prepare data for popularity trends chart
  const popularityData = {
    labels: trends[0]?.data.map(d => new Date(d.date).toLocaleDateString()) || [],
    datasets: trends.map(trend => ({
      label: trend?.name || '',
      data: trend?.data.map(d => d.score) || [],
      borderColor: getRandomColor(),
      tension: 0.4,
    })),
  };

  // Prepare sentiment comparison data
  const sentimentData = trends.map(trend => ({
    name: trend?.name || '',
    positive: trend?.sentiment?.positive || 0,
    negative: trend?.sentiment?.negative || 0,
    neutral: trend?.sentiment?.neutral || 0,
  }));

  // Prepare source comparison data
  const sourcesData = trends.map(trend => ({
    name: trend?.name || '',
    sources: trend?.sources || [],
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Trend Comparison</h1>
        <p className="text-muted-foreground mt-2">
          Comparing {trends.map(t => t?.name).join(' vs ')}
        </p>
      </div>

      <Tabs defaultValue="popularity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="popularity">Popularity Trends</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="popularity">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Popularity Comparison</h2>
            <div className="h-[400px]">
              <LineChart data={popularityData} />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          {/* Sentiment Analysis */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Sentiment Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sentimentData.map((data, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">{data.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Positive</span>
                      <span>{data.positive}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Negative</span>
                      <span>{data.negative}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Neutral</span>
                      <span>{data.neutral}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Source Distribution */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Source Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sourcesData.map((data, i) => (
                <div key={i}>
                  <h3 className="font-medium mb-3">{data.name}</h3>
                  <div className="space-y-2">
                    {data.sources.map((source, j) => (
                      <div key={j} className="flex justify-between items-center">
                        <span>{source.name}</span>
                        <span className="font-medium">{source.mentions}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Content Performance */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Content Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trends.map((trend, i) => (
                <div key={i} className="space-y-4">
                  <h3 className="font-medium">{trend?.name}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Engagement Rate</span>
                      <span className="font-medium">{(Math.random() * 10).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Click-through Rate</span>
                      <span className="font-medium">{(Math.random() * 5).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Average Time Spent</span>
                      <span className="font-medium">{Math.floor(Math.random() * 5) + 2} mins</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Audience Demographics */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Audience Demographics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {trends.map((trend, i) => (
                <div key={i}>
                  <h3 className="font-medium mb-4">{trend?.name}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                          <span>18-24</span>
                          <span>{Math.floor(Math.random() * 30)}%</span>
                        </div>
                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                          <span>25-34</span>
                          <span>{Math.floor(Math.random() * 30)}%</span>
                        </div>
                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                          <span>35-44</span>
                          <span>{Math.floor(Math.random() * 20)}%</span>
                        </div>
                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                          <span>45+</span>
                          <span>{Math.floor(Math.random() * 20)}%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Geographic Distribution</h4>
                      <div className="space-y-2">
                        {['North America', 'Europe', 'Asia', 'Others'].map((region) => (
                          <div key={region} className="flex justify-between p-2 bg-gray-50 rounded text-sm">
                            <span>{region}</span>
                            <span>{Math.floor(Math.random() * 40)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Platform Performance */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Platform Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trends.map((trend, i) => (
                <div key={i}>
                  <h3 className="font-medium mb-3">{trend?.name}</h3>
                  <div className="space-y-2">
                    {['Twitter', 'LinkedIn', 'Instagram', 'TikTok', 'YouTube'].map((platform) => (
                      <div key={platform} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <span className="flex-1">{platform}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">
                            Growth: {(Math.random() * 100).toFixed(1)}%
                          </span>
                          <span className="text-sm">
                            Engagement: {(Math.random() * 10).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* ROI and Revenue Impact */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">ROI & Revenue Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {trends.map((trend, i) => (
                <div key={i} className="space-y-4">
                  <h3 className="font-medium">{trend?.name}</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        ${(Math.random() * 1000000).toFixed(0)}
                      </div>
                      <div className="text-sm text-gray-500">Projected Revenue Impact</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 border rounded-lg">
                        <div className="text-lg font-semibold">
                          {(Math.random() * 300).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-500">ROI</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="text-lg font-semibold">
                          {(Math.random() * 50).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-500">Market Share</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Growth Potential */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Growth Potential</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trends.map((trend, i) => (
                <div key={i} className="space-y-4">
                  <h3 className="font-medium">{trend?.name}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Market Potential</span>
                      <span className="font-medium text-green-600">High</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Adoption Rate</span>
                      <span className="font-medium">{(Math.random() * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Growth Rate</span>
                      <span className="font-medium">{(Math.random() * 50).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Competition Level</span>
                      <span className="font-medium">Medium</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getRandomColor() {
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
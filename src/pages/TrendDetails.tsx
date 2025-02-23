import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { findTrendById } from "@/data/trendData";
import { useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import { ExternalLink, Star, ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";

const COLORS = ['#10B981', '#EF4444', '#6B7280'];

export default function TrendDetails() {
  const navigate = useNavigate();
  const { trendId } = useParams();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  const { data: trend, isLoading } = useQuery({
    queryKey: ['trend', trendId],
    queryFn: () => findTrendById(trendId || ''),
    enabled: !!trendId,
  });

  const prepareSentimentData = (sentiment: any) => {
    return [
      { name: 'Positive', value: sentiment.positive },
      { name: 'Negative', value: sentiment.negative },
      { name: 'Neutral', value: sentiment.neutral }
    ];
  };

  const prepareTrendData = () => {
    // Get the last 7 days of data
    const currentWeekData = trend.data.slice(-7);
    // Get the previous 7 days of data
    const previousWeekData = trend.data.slice(-14, -7);

    // Create array of data points with both current and previous week values
    return currentWeekData.map((item, index) => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      currentWeek: item.score,
      previousWeek: previousWeekData[index]?.score * 0.8 || 0
    }));
  };

  if (isLoading || !trend) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <div className="text-lg">Loading trend details...</div>
      </div>
    );
  }

  const trendData = prepareTrendData();
  const currentTotal = trendData.reduce((sum, item) => sum + item.currentWeek, 0);
  const previousTotal = trendData.reduce((sum, item) => sum + item.previousWeek, 0);
  const percentageChange = ((currentTotal - previousTotal) / previousTotal) * 100;

  const sortedSources = [...(trend.sources || [])].sort((a, b) => b.mentions - a.mentions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="container py-8 space-y-8">
        <div className="space-y-6">
          <Button
            variant="ghost"
            className="gap-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 -ml-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Trends
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {trend.name}
              </h1>
              <p className="text-muted-foreground">{trend.description}</p>
            </div>
            <DateRangePicker 
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>
        </div>

        <Card className="overflow-hidden border-purple-100">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl leading-tight">Popularity Trend</CardTitle>
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
                  />
                  <YAxis 
                    tick={{ fill: '#666' }}
                    tickLine={{ stroke: '#666' }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="currentWeek"
                    stroke="#9b87f5"
                    strokeWidth={2}
                    dot={{ fill: '#9b87f5', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Current Week"
                  />
                  <Line
                    type="monotone"
                    dataKey="previousWeek"
                    stroke="#e2e8f0"
                    strokeWidth={2}
                    dot={{ fill: '#e2e8f0', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Previous Week"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-purple-100">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl leading-tight">Customer Response/Sentiments</CardTitle>
            <Separator className="my-3" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-[300px]">
                {trend.sentiment && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={prepareSentimentData(trend.sentiment)}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {prepareSentimentData(trend.sentiment).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="space-y-4">
                {trend.customerQuotes?.slice(0, 3).map((quote) => (
                  <Card key={quote.id} className="border-l-4 border-l-purple-400">
                    <CardContent className="p-4">
                      <p className="italic text-sm">{quote.text}</p>
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                        <span>{quote.source}</span>
                        <span>•</span>
                        <span>{new Date(quote.date).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-purple-100">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl leading-tight">Top Sources</CardTitle>
            <Separator className="my-3" />
          </CardHeader>
          <CardContent>
            {sortedSources && (
              <div className="space-y-3">
                {sortedSources.map((source, index) => (
                  <div key={source.name} className="flex items-center gap-4">
                    <span className="text-sm font-medium w-8">{index + 1}.</span>
                    <span className="flex-1">{source.name}</span>
                    <div className="flex items-center gap-4">
                      <div className="relative h-2 w-32 bg-purple-100 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-purple-500 rounded-full"
                          style={{ 
                            width: `${(source.mentions / Math.max(...sortedSources.map(s => s.mentions))) * 100}%`
                          }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-24 text-right">
                        {source.mentions.toLocaleString()} mentions
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent">
            <CardTitle>Latest News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trend.news?.map((item) => (
                <a 
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-purple-200">
                    <CardContent className="p-4">
                      <div className="aspect-video mb-4 overflow-hidden rounded-md">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="font-medium mb-2 line-clamp-2 group-hover:text-purple-600">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{item.source}</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent">
            <CardTitle>Related Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {trend.relatedTrends?.map((related) => (
                <Card key={related.id} className="hover:bg-purple-50/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {related.thumbnail && (
                        <img
                          src={related.thumbnail}
                          alt={related.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium">{related.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {related.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span>Engagement: {(related.strength * 100).toFixed(0)}%</span>
                          </div>
                          <div className="text-purple-600">
                            Similarity: {(related.strength * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center py-8">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 transition-opacity text-white px-8 py-6 text-lg"
          >
            Generate Content Ideas
          </Button>
        </div>
      </div>
    </div>
  );
}

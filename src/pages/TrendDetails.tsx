
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
import { findTrendById } from "@/data/trendData";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink, Star } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Constants for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Utility function to prepare sentiment data
const prepareSentimentData = (sentiment: Record<string, number> | null | undefined) => {
  if (!sentiment) return [];
  return Object.entries(sentiment).map(([name, value]) => ({
    name,
    value: Number(value),
  }));
};

export default function TrendDetails() {
  const navigate = useNavigate();
  const { trendId } = useParams();

  const { data: trend, isLoading, isError } = useQuery({
    queryKey: ['trend', trendId],
    queryFn: () => {
      const trendData = findTrendById(trendId || '');
      if (!trendData) {
        throw new Error('Trend not found');
      }
      return trendData;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <div className="text-lg">Loading trend details...</div>
      </div>
    );
  }

  if (isError || !trend) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-8">
        <div className="container mx-auto text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Homepage
          </Button>
          <h1 className="text-2xl font-semibold mb-4">Trend Not Found</h1>
          <p className="text-muted-foreground">
            The trend you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const trendData = trend.data || [];
  const currentTotal = trendData.reduce((sum, item) => sum + (item.score || 0), 0);
  const previousTotal = trendData.reduce((sum, item) => sum + (item.score * 0.8 || 0), 0);
  const percentageChange = previousTotal !== 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;
  const sortedSources = [...(trend.sources || [])].sort((a, b) => b.mentions - a.mentions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="container py-8 space-y-8">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Trend Data Cards */}
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
                    dataKey="score"
                    stroke="#9b87f5"
                    strokeWidth={2}
                    dot={{ fill: '#9b87f5', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Current Week"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
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
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="space-y-4">
                {trend.customerQuotes?.slice(0, 3).map((quote: any) => (
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
            onClick={() => navigate(`/trends/${trendId}/generate`)}
          >
            Generate Content Ideas
          </Button>
        </div>
      </div>
    </div>
  );
}

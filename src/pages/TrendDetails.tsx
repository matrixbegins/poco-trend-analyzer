
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { findTrendById } from "@/data/trendData";
import { useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";

export default function TrendDetails() {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-lg">Loading trend details...</div>
      </div>
    );
  }

  if (!trend) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-lg">Trend not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{trend.name}</h1>
            <p className="text-muted-foreground">{trend.description}</p>
          </div>
          <DateRangePicker 
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </div>

        {/* Popularity Section */}
        <Card>
          <CardHeader>
            <CardTitle>Popularity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend.data}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#9b87f5"
                    fill="#9b87f5"
                    fillOpacity={0.1}
                    strokeWidth={1.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Section */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Response/Sentiments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trend.sentiment && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {trend.sentiment.positive}%
                    </div>
                    <div className="text-sm text-muted-foreground">Positive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">
                      {trend.sentiment.negative}%
                    </div>
                    <div className="text-sm text-muted-foreground">Negative</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-500">
                      {trend.sentiment.neutral}%
                    </div>
                    <div className="text-sm text-muted-foreground">Neutral</div>
                  </div>
                </>
              )}
            </div>
            {trend.customerQuotes && (
              <div className="mt-6 space-y-4">
                {trend.customerQuotes.map((quote) => (
                  <Card key={quote.id}>
                    <CardContent className="p-4">
                      <p className="italic">{quote.text}</p>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {quote.source} • {new Date(quote.date).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sources Section */}
        <Card>
          <CardHeader>
            <CardTitle>Top Sources</CardTitle>
          </CardHeader>
          <CardContent>
            {trend.sources && (
              <div className="space-y-2">
                {trend.sources.map((source, index) => (
                  <div key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{index + 1}.</span>
                      <span>{source.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {source.mentions.toLocaleString()} mentions
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* News Section */}
        <Card>
          <CardHeader>
            <CardTitle>Latest News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trend.news?.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="font-medium mb-2">{item.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{item.source}</span>
                      <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Trends Section */}
        <Card>
          <CardHeader>
            <CardTitle>Related Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="cards">
              <TabsList>
                <TabsTrigger value="cards">Cards</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
              </TabsList>
              <TabsContent value="cards">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {trend.relatedTrends?.map((related) => (
                    <Card key={related.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {related.thumbnail && (
                            <img
                              src={related.thumbnail}
                              alt={related.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          )}
                          <div>
                            <h4 className="font-medium">{related.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {related.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="network">
                <div className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Network visualization coming soon...
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Generate Content Section */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Content Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Generate tailored content ideas with estimated virality and ROI scores
            </p>
            <Button size="lg">
              Generate Content
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

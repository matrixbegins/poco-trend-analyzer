import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { findTrendById } from "@/data/trendData";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { TrendStats } from "@/components/trends/TrendStats";
import { SentimentAnalysis } from "@/components/trends/SentimentAnalysis";
import { TrendSources } from "@/components/trends/TrendSources";
import { CompetitorAnalysis } from "@/components/trends/CompetitorAnalysis";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Flame, Globe2, Factory, Gauge } from "lucide-react";
import { TrendActions } from "@/components/trends/TrendActions";
import { RelatedTrends } from "@/components/trends/RelatedTrends";
import { TrendNews } from "@/components/trends/TrendNews";
import { TrendInsights } from "@/components/trends/TrendInsights";
import { TrendAnalyticsDashboard } from "@/components/trends/analytics/TrendAnalyticsDashboard";
import { usePageTitle } from '@/hooks/usePageTitle';

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

  usePageTitle(trend ? trend.name : 'Trend Analysis');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-lg">Loading trend details...</div>
      </div>
    );
  }

  if (isError || !trend) {
    return (
      <Layout>
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
      </Layout>
    );
  }

  const trendData = trend.data || [];
  const currentTotal = trendData.reduce((sum, item) => sum + (item.score || 0), 0);
  const previousTotal = trendData.reduce((sum, item) => sum + (item.score * 0.8 || 0), 0);
  const percentageChange = previousTotal !== 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;

  const handleGenerateContent = () => {
    navigate(`/trends/${trendId}/generate`);
  };

  const handleCreateCampaign = () => {
    // TODO: Implement campaign creation
    console.log('Create campaign clicked');
  };

  // Sample data for insights
  const insightsData = {
    contentFormats: [
      { name: 'Video', value: 45, color: '#9b87f5' },
      { name: 'Blog', value: 25, color: '#f59b87' },
      { name: 'Infographic', value: 20, color: '#87f59b' },
      { name: 'Podcast', value: 10, color: '#f587e4' },
    ],
    marketingChannels: [
      { name: 'Social', value: 40, color: '#9b87f5' },
      { name: 'Email', value: 25, color: '#f59b87' },
      { name: 'Search', value: 20, color: '#87f59b' },
      { name: 'Ads', value: 15, color: '#f587e4' },
    ],
    dailyEngagement: [
      { day: 'Mon', engagement: 45 },
      { day: 'Tue', engagement: 52 },
      { day: 'Wed', engagement: 49 },
      { day: 'Thu', engagement: 63 },
      { day: 'Fri', engagement: 51 },
      { day: 'Sat', engagement: 33 },
      { day: 'Sun', engagement: 30 },
    ],
    audienceReach: [
      { name: 'Reached', value: 78 },
      { name: 'Remaining', value: 22 },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            {trend.name}
          </h1>
          <TrendActions
            onGenerateContent={handleGenerateContent}
            onCreateCampaign={handleCreateCampaign}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-lime-100 text-lime-700 hover:bg-lime-100 border-lime-200"
          >
            <Factory className="h-3 w-3" />
            <span>{trend.category}</span>
          </Badge>

          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
          >
            <Globe2 className="h-3 w-3" />
            <span>Global</span>
          </Badge>

          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200"
          >
            <Flame className="h-3 w-3" />
            <span>High Impact</span>
          </Badge>

          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200"
          >
            <Gauge className="h-3 w-3" />
            <span>Virality: 85%</span>
          </Badge>
        </div>

        <p className="text-lg text-gray-600 leading-relaxed">
          {trend.trendSummary}
        </p>
      </div>

      <TrendStats
        trendData={trendData}
        currentTotal={currentTotal}
        percentageChange={percentageChange}
        updatedAt={trend.updatedAt}
      />

      <SentimentAnalysis
        sentiment={trend.sentiment}
        customerQuotes={trend.customerQuotes || []}
      />

      <TrendAnalyticsDashboard
        trendId={trendId || ''}
        trendName={trend.name}
      />

      <TrendInsights {...insightsData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trend.competitors && (
          <CompetitorAnalysis competitors={trend.competitors} />
        )}
        {trend.sources && <TrendSources sources={trend.sources} />}
      </div>

      {trend.relatedTrends && trend.relatedTrends.length > 0 && (
        <RelatedTrends trends={trend.relatedTrends} />
      )}

      {trend.news && trend.news.length > 0 && (
        <TrendNews
          news={trend.news}
          trendName={trend.name}
        />
      )}

    </div>
  );
}

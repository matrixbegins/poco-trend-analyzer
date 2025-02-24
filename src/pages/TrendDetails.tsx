import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { findTrendById } from "@/data/trendData";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Info, ArrowRight, Play, Users, BarChart, Target, TrendingUp } from "lucide-react";
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
import { getInsightsData } from '@/data/insightsData';
import { useState } from "react";
import { TrendCompareModal } from "@/components/trends/TrendCompareModal";
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LineChart } from '@/components/charts/LineChart';
import { IconComponent } from '@/components/ui/IconComponent';

export default function TrendDetails() {
  const navigate = useNavigate();
  const { trendId } = useParams();
  const [compareModalOpen, setCompareModalOpen] = useState(false);

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

  const insightsData = getInsightsData(trend.name, trend.category);

  const getActionableInsights = () => [
    {
      title: "Growth Trajectory",
      insight: `${trend.name} shows ${Math.round(percentageChange)}% growth in last 30 days`,
      action: "Capitalize on momentum with increased content production",
      icon: "TrendingUp"
    },
    {
      title: "Content Strategy",
      insight: "Video content leads with 75% engagement rate",
      action: "Focus on short-form video content under 3 minutes",
      icon: "Play"
    },
    {
      title: "Audience Focus",
      insight: "25-34 age group shows highest engagement",
      action: "Target young professionals with tailored messaging",
      icon: "Users"
    },
    {
      title: "Platform Opportunity",
      insight: "TikTok shows highest growth potential",
      action: "Increase presence on TikTok with trending formats",
      icon: "BarChart"
    },
    {
      title: "Market Position",
      insight: "Leading in premium segment with 45% share",
      action: "Maintain premium positioning while expanding reach",
      icon: "Target"
    }
  ];

  const chartData = {
    labels: trend.data.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [{
      label: trend.name,
      data: trend.data.map(d => d.score),
      borderColor: '#2563eb',
      tension: 0.4
    }]
  };

  return (
    <TooltipProvider>
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            {trend.name}
          </h1>
          <div className="flex items-center gap-2">
            <TrendActions
              onGenerateContent={handleGenerateContent}
              onCreateCampaign={handleCreateCampaign}
              onCompare={() => setCompareModalOpen(true)}
            />
          </div>
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


      <TooltipProvider>
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-purple-900">Trend Insights</h2>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-purple-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Key insights and recommended actions for this trend</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getActionableInsights().map((item, i) => (
                <div key={i} className="p-3 bg-white rounded-lg border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2">
                    <IconComponent icon={item.icon} />
                    <h3 className="text-sm font-medium text-purple-900">{item.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{item.insight}</p>
                  <div className="pt-2 mt-2 border-t border-purple-100">
                    <div className="flex items-center gap-1 text-xs text-purple-700">
                      <ArrowRight className="h-3 w-3" />
                      <span>{item.action}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </TooltipProvider>

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

      <TrendCompareModal
        open={compareModalOpen}
        onOpenChange={setCompareModalOpen}
        currentTrendId={trendId || ''}
      />

    </div>
    </TooltipProvider>
  );
}

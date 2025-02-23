import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Loader2 } from "lucide-react";
import { ContentPerformance } from "./sections/ContentPerformance";
import { AudienceInsights } from "./sections/AudienceInsights";
import { CompetitiveBenchmark } from "./sections/CompetitiveBenchmark";
import { PlatformMetrics } from "./sections/PlatformMetrics";
import { TimingAnalytics } from "./sections/TimingAnalytics";
import { KeywordAnalytics } from "./sections/KeywordAnalytics";
import { ROIMetrics } from "./sections/ROIMetrics";
import { ContentGapAnalysis } from "./sections/ContentGapAnalysis";
import { AudienceBehavior } from "./sections/AudienceBehavior";
import { PredictiveAnalytics } from "./sections/PredictiveAnalytics";

interface TrendAnalyticsDashboardProps {
  trendId: string;
  trendName: string;
}

export function TrendAnalyticsDashboard({ trendId, trendName }: TrendAnalyticsDashboardProps) {
  const { data: analytics, isLoading, error } = useAnalytics(trendId);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </CardContent>
      </Card>
    );
  }

  if (error || !analytics) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl leading-tight">Advanced Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="competitive">Competitive</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="timing">Timing</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="roi">ROI</TabsTrigger>
            <TabsTrigger value="gaps">Gaps</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="predictive">Predictive</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <ContentPerformance data={analytics.contentPerformance} />
          </TabsContent>
          <TabsContent value="audience">
            <AudienceInsights data={analytics.audienceInsights} />
          </TabsContent>
          <TabsContent value="competitive">
            <CompetitiveBenchmark data={analytics.competitiveBenchmark} />
          </TabsContent>
          <TabsContent value="platforms">
            <PlatformMetrics data={analytics.platformMetrics} />
          </TabsContent>
          <TabsContent value="timing">
            <TimingAnalytics data={analytics.timingAnalytics} />
          </TabsContent>
          <TabsContent value="keywords">
            <KeywordAnalytics data={analytics.keywordAnalytics} />
          </TabsContent>
          <TabsContent value="roi">
            <ROIMetrics data={analytics.roiMetrics} />
          </TabsContent>
          <TabsContent value="gaps">
            <ContentGapAnalysis data={analytics.contentGaps} />
          </TabsContent>
          <TabsContent value="behavior">
            <AudienceBehavior data={analytics.audienceBehavior} />
          </TabsContent>
          <TabsContent value="predictive">
            <PredictiveAnalytics data={analytics.predictiveMetrics} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
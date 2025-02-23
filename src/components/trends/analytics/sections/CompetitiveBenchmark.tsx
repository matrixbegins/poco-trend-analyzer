import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { MetricCard } from "@/components/MetricCard";
import { TrendAnalytics } from "@/data/analyticsData";
import { Share2, TrendingUp, Heart } from "lucide-react";

interface CompetitiveBenchmarkProps {
  data: TrendAnalytics['competitiveBenchmark'];
}

export function CompetitiveBenchmark({ data }: CompetitiveBenchmarkProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Share of Voice"
          value={`${data.shareOfVoice}%`}
          icon={Share2}
          description="Market presence"
          trend={1}
          trendValue={5.2}
        />
        <MetricCard
          title="Market Penetration"
          value={`${data.marketPenetration}%`}
          icon={TrendingUp}
          description="Market coverage"
          trend={1}
          trendValue={3.8}
        />
        <MetricCard
          title="Brand Sentiment"
          value={`${data.brandSentiment}%`}
          icon={Heart}
          description="Positive mentions"
          trend={1}
          trendValue={2.4}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Competitor Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.competitorComparison} layout="vertical">
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="competitor" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="score" fill="#9b87f5" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
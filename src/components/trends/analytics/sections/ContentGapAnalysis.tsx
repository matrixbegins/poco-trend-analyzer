import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendAnalytics } from "@/data/analyticsData";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ContentGapAnalysisProps {
  data: TrendAnalytics['contentGaps'];
}

export function ContentGapAnalysis({ data }: ContentGapAnalysisProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Content Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Opportunity Score</span>
                <span className="text-2xl font-bold">{data.opportunityScore}</span>
              </div>
              <Progress value={data.opportunityScore} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Demand vs Supply</span>
                <span className="text-2xl font-bold">{data.demandVsSupply}x</span>
              </div>
              <Progress value={data.demandVsSupply * 20} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Unaddressed Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.unaddressedTopics.map((topic) => (
              <div
                key={topic}
                className="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-800 rounded-lg"
              >
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{topic}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Competitor Content Advantages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.competitorAdvantages.map((advantage) => (
              <div
                key={advantage}
                className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg"
              >
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">{advantage}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
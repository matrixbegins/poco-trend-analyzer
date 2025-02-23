
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { findTrendById } from "@/data/trendData";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { TrendStats } from "@/components/trends/TrendStats";
import { SentimentAnalysis } from "@/components/trends/SentimentAnalysis";
import { TrendSources } from "@/components/trends/TrendSources";

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

        <TrendStats
          trendData={trendData}
          currentTotal={currentTotal}
          percentageChange={percentageChange}
        />

        <SentimentAnalysis
          sentiment={trend.sentiment}
          customerQuotes={trend.customerQuotes || []}
        />

        {trend.sources && <TrendSources sources={trend.sources} />}

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

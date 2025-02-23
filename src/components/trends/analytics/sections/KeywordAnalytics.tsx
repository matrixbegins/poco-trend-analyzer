import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendAnalytics } from "@/data/analyticsData";
import { TrendingUp } from "lucide-react";

interface KeywordAnalyticsProps {
  data: TrendAnalytics['keywordAnalytics'];
}

export function KeywordAnalytics({ data }: KeywordAnalyticsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Trending Hashtags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.trendingHashtags.map((hashtag) => (
              <div
                key={hashtag.tag}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium">{hashtag.tag}</div>
                  <div className="text-sm text-gray-500">{hashtag.volume.toLocaleString()} mentions</div>
                </div>
                <Badge className="flex items-center gap-1 bg-green-100 text-green-700">
                  <TrendingUp className="h-3 w-3" />
                  {hashtag.growth}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Related Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.relatedKeywords.map((keyword) => (
              <div
                key={keyword.word}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="font-medium">{keyword.word}</div>
                <div className="text-sm">
                  <span className="font-medium">{(keyword.correlation * 100).toFixed(0)}%</span>
                  <span className="text-gray-500 ml-1">correlation</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
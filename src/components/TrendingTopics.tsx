
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Topic {
  name: string;
  category: string;
  trend: number;
}

interface TrendingTopicsProps {
  topics: Topic[];
  className?: string;
}

export function TrendingTopics({ topics, className }: TrendingTopicsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Trending Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div
              key={topic.name}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-1">
                <p className="font-medium">{topic.name}</p>
                <Badge variant="secondary" className="text-xs">
                  {topic.category}
                </Badge>
              </div>
              <span className={`text-sm font-medium ${
                topic.trend > 0 ? "text-green-500" : "text-red-500"
              }`}>
                {topic.trend > 0 ? "+" : ""}{topic.trend}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

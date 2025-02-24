import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

export function TrendingTopics() {
  const trends = [
    { id: '1', name: 'AI in Manufacturing', category: 'Technology', growth: 85 },
    { id: '2', name: 'Sustainable Supply Chain', category: 'Operations', growth: 72 },
    { id: '3', name: 'Digital Twins', category: 'Innovation', growth: 68 },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Trending Topics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trends.map((trend) => (
          <Card key={trend.id}>
            <CardContent className="p-4">
              <Badge className="mb-2">{trend.category}</Badge>
              <h3 className="font-semibold">{trend.name}</h3>
              <div className="flex items-center gap-1 text-green-600 mt-2">
                <TrendingUp className="h-4 w-4" />
                <span>{trend.growth}% growth</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
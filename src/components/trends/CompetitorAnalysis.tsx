import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Competitor {
  name: string;
  adoptionPercentage: number;
}

interface CompetitorAnalysisProps {
  competitors: Competitor[];
}

export function CompetitorAnalysis({ competitors }: CompetitorAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl leading-tight">Top Competitors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {competitors.map((competitor) => (
            <div
              key={competitor.name}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
            >
              <span className="font-medium">{competitor.name}</span>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-700 hover:bg-purple-100 hover:text-purple-700"
              >
                {competitor.adoptionPercentage}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
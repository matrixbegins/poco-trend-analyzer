import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Source {
  name: string;
  mentions: number;
}

interface TrendSourcesProps {
  sources: Source[];
}

export function TrendSources({ sources }: TrendSourcesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl leading-tight">Top Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {sources.map((source) => (
            <div
              key={source.name}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
            >
              <span className="font-medium">{source.name}</span>
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-700"
              >
                {source.mentions.toLocaleString()}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

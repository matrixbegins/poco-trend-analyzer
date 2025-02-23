
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Source {
  name: string;
  mentions: number;
}

interface TrendSourcesProps {
  sources: Source[];
}

export function TrendSources({ sources }: TrendSourcesProps) {
  const sortedSources = [...sources].sort((a, b) => b.mentions - a.mentions);
  
  return (
    <Card className="overflow-hidden border-purple-100">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl leading-tight">Top Sources</CardTitle>
        <Separator className="my-3" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedSources.map((source, index) => (
            <div key={source.name} className="flex items-center gap-4">
              <span className="text-sm font-medium w-8">{index + 1}.</span>
              <span className="flex-1">{source.name}</span>
              <div className="flex items-center gap-4">
                <div className="relative h-2 w-32 bg-purple-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-purple-500 rounded-full"
                    style={{ 
                      width: `${(source.mentions / Math.max(...sortedSources.map(s => s.mentions))) * 100}%`
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-24 text-right">
                  {source.mentions.toLocaleString()} mentions
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

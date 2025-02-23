import { Button } from "@/components/ui/button";
import { TrendCard } from "./TrendCard";

interface Trend {
  name: string;
  data: { date: string; score: number }[];
  currentScore: number;
  updatedAt: string;
}

interface TrendSectionProps {
  title: string;
  description?: string;
  trends: Trend[];
  viewAllHref: string;
}

export function TrendSection({ title, description, trends, viewAllHref }: TrendSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href={viewAllHref}>View All</a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {trends.map((trend) => (
          <TrendCard
            key={trend.name}
            name={trend.name}
            data={trend.data}
            currentScore={trend.currentScore}
            updatedAt={trend.updatedAt}
          />
        ))}
      </div>
    </section>
  );
}

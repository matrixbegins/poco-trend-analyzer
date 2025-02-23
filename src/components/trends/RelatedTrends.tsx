import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TrendCard } from "@/components/TrendCard";
import { useRef, useEffect } from "react";
import { Trend } from "@/data/trendData";

interface RelatedTrendsProps {
  trends: Trend[];
}

export function RelatedTrends({ trends }: RelatedTrendsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = 300; // Width of each card
    const gap = 16; // Gap between cards
    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl leading-tight">Related Trends</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <div
        ref={containerRef}
        className="relative overflow-x-auto px-6 pb-6 scrollbar-hide"
      >
        <div className="flex gap-4">
          {trends.map((trend) => (
            <div key={trend.id} className="flex-none w-[300px]">
              <TrendCard
                name={trend.name}
                data={trend.data}
                currentScore={trend.currentScore}
                updatedAt={trend.updatedAt}
                isHighImpact={trend.isHighImpact}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
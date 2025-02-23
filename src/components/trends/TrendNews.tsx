import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { BarChart2, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  image: string;
  engagement: number;
  publishedAt: string;
  url: string;
  keywords: string[];
}

interface TrendNewsProps {
  news: NewsItem[];
  trendName: string;
}

export function TrendNews({ news, trendName }: TrendNewsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = 400; // Slightly wider than related trends
    const gap = 16;
    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl leading-tight flex items-center gap-2">
          Trending News
          <span className="text-sm text-gray-500 font-normal">
            | {trendName}
          </span>
        </CardTitle>
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
          {news.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-none w-[400px] group"
            >
              <div className="bg-white rounded-lg overflow-hidden border border-gray-100 transition-shadow hover:shadow-md">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="font-medium text-purple-600">{item.source}</span>
                    <div className="flex items-center gap-1">
                      <BarChart2 className="h-4 w-4 text-gray-400" />
                      <span>{item.engagement.toLocaleString()}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-purple-50 text-purple-600 hover:bg-purple-50"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Card>
  );
}
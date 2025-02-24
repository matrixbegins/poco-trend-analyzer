import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BarChart2, Share2, MessageSquare, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { NewsItem } from "@/data/newsData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getFallbackImage } from "@/utils/imageUtils";

interface TrendNewsProps {
  news: NewsItem[];
  title?: string;
  description?: string;
  trendName?: string;  // For trend-specific news
}

export function TrendNews({ news, title, description, trendName }: TrendNewsProps) {
  const displayTitle = title || (trendName ? `Latest News about ${trendName}` : 'Latest News');
  const displayDescription = description || (trendName ? `Stay updated with the latest developments in ${trendName}` : undefined);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement;
    const category = img.dataset.category || 'default';
    img.src = getFallbackImage(category);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{displayTitle}</h2>
        {displayDescription && <p className="text-muted-foreground">{displayDescription}</p>}
      </div>

      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {news.map((item) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                  {item.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                        onError={handleImageError}
                        data-category={item.category}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                      >
                        {item.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-3 text-lg group-hover:text-purple-700 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-600">{item.source}</span>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <BarChart2 className="h-4 w-4" />
                          <span>2.5k</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>128</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="h-4 w-4" />
                          <span>45</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-purple-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
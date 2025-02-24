import { usePageTitle } from '@/hooks/usePageTitle';
import { useState, useEffect, Fragment } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Eye, MessageSquare, Share2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewsItem } from '@/data/newsData';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { getFallbackImage } from '@/utils/imageUtils';
import { fetchNewsPage } from '@/utils/newsUtils';

interface NewsFilters {
  industry: string;
  category: string;
  timeRange: string;
  geography: string;
  region: string;
}

export default function NewsFeed() {
  usePageTitle('News Feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<NewsFilters>({
    industry: '',
    category: '',
    timeRange: '7days',
    geography: '',
    region: '',
  });

  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['news', filters, searchQuery],
    queryFn: ({ pageParam = 1 }) => fetchNewsPage(pageParam, filters, searchQuery),
    getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined,
    initialPageParam: 1
  });

  // Load more when scrolling to bottom
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">News Feed</h1>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 p-4 bg-white rounded-lg border shadow-sm">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 h-3.5 w-3.5" />
          <Input
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>

        {/* Filters Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter className="h-3.5 w-3.5" />
            <span>Filters</span>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            <Select
              value={filters.industry}
              onValueChange={(value) => setFilters({ ...filters, industry: value })}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                <SelectItem value="Logistics">Logistics</SelectItem>
                <SelectItem value="Innovation">Innovation</SelectItem>
                <SelectItem value="Automation">Automation</SelectItem>
                <SelectItem value="AI & ML">AI & ML</SelectItem>
                <SelectItem value="IoT">IoT</SelectItem>
                <SelectItem value="Robotics">Robotics</SelectItem>
                <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                <SelectItem value="Blockchain">Blockchain</SelectItem>
                <SelectItem value="Green Tech">Green Tech</SelectItem>
                <SelectItem value="3D Printing">3D Printing</SelectItem>
                <SelectItem value="AR/VR">AR/VR</SelectItem>
                <SelectItem value="Digital Transformation">Digital Transformation</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.timeRange}
              onValueChange={(value) => setFilters({ ...filters, timeRange: value })}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="15days">Last 15 days</SelectItem>
                <SelectItem value="1month">Last month</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.geography}
              onValueChange={(value) => setFilters({ ...filters, geography: value })}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Geography" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Global">Global</SelectItem>
                <SelectItem value="North America">North America</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                <SelectItem value="Latin America">Latin America</SelectItem>
                <SelectItem value="Middle East">Middle East</SelectItem>
                <SelectItem value="Africa">Africa</SelectItem>
                <SelectItem value="Southeast Asia">Southeast Asia</SelectItem>
                <SelectItem value="Eastern Europe">Eastern Europe</SelectItem>
                <SelectItem value="Nordic">Nordic</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="Benelux">Benelux</SelectItem>
                <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                <SelectItem value="Oceania">Oceania</SelectItem>
                <SelectItem value="Caribbean">Caribbean</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.items.map((news: NewsItem) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </Fragment>
        ))}
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={ref} className="h-10" />
    </div>
  );
}

function NewsCard({ news }: { news: NewsItem }) {
  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="object-cover w-full h-full"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = getFallbackImage(news.category);
          }}
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium line-clamp-2 text-sm group-hover:text-purple-600">
          {news.title}
        </h3>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{news.source}</span>
          <span>{formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true })}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500 border-t pt-2">
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {news.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            {news.comments.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Share2 className="h-3 w-3" />
            {news.shares.toLocaleString()}
          </span>
        </div>
      </div>
    </a>
  );
}
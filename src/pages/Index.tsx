import { TrendSection } from "@/components/TrendSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import {
  industryTrends,
  geographyTrends,
  competitorTrends,
  followedTrends,
  Trend,
} from "@/data/trendData";
import { TrendNews } from "@/components/trends/TrendNews";
import { personalizedNews, topicNews } from '@/data/newsData';

export default function Index() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerms, setSearchTerms] = useState<string[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      e.preventDefault();
      addSearchTerm(searchInput.trim());
    }
  };

  const addSearchTerm = (term: string) => {
    if (!searchTerms.includes(term)) {
      setSearchTerms([...searchTerms, term]);
    }
    setSearchInput("");
  };

  const removeSearchTerm = (termToRemove: string) => {
    setSearchTerms(searchTerms.filter(term => term !== termToRemove));
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      addSearchTerm(searchInput.trim());
    }
  };

  // Filter trends based on all search terms
  const filterTrends = (trends: Trend[]) => {
    if (searchTerms.length === 0) return trends;
    return trends.filter(trend => {
      const searchText = `${trend.name} ${trend.description}`.toLowerCase();
      return searchTerms.every(term =>
        searchText.includes(term.toLowerCase())
      );
    });
  };

  return (
    <div className="space-y-8">
      <header className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Trends Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and analyze trending topics across different categories
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search trends... (Press Enter to add multiple keywords)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Search
            </Button>
          </div>

          {searchTerms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {searchTerms.map((term, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                >
                  {term}
                  <button
                    onClick={() => removeSearchTerm(term)}
                    className="hover:text-purple-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="space-y-10">
        <TrendSection
          title={industryTrends.name}
          description={industryTrends.description}
          trends={filterTrends(industryTrends.trends)}
          viewAllHref={`/trends/${industryTrends.id}`}
        />

        <TrendSection
          title={geographyTrends.name}
          description={geographyTrends.description}
          trends={filterTrends(geographyTrends.trends)}
          viewAllHref={`/trends/${geographyTrends.id}`}
        />

        <TrendSection
          title={competitorTrends.name}
          description={competitorTrends.description}
          trends={filterTrends(competitorTrends.trends)}
          viewAllHref={`/trends/${competitorTrends.id}`}
        />

        <TrendSection
          title={followedTrends.name}
          description={followedTrends.description}
          trends={filterTrends(followedTrends.trends)}
          viewAllHref={`/trends/${followedTrends.id}`}
        />

        <TrendNews
          title="News for You"
          description="Personalized news based on your industry and preferences"
          news={personalizedNews}
        />

        <TrendNews
          title="Topics You Follow"
          description="Latest updates from your areas of interest"
          news={topicNews}
        />
      </div>
    </div>
  );
}

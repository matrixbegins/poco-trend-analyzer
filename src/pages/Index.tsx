
import { TrendSection } from "@/components/TrendSection";

// Helper function to generate random trend data
function generateTrendData() {
  return Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString(),
    score: Math.floor(Math.random() * 1000) + 500,
  }));
}

// Sample data for trends
const industryTrends = Array.from({ length: 10 }, (_, i) => ({
  name: `Industry Trend ${i + 1}`,
  data: generateTrendData(),
  currentScore: Math.floor(Math.random() * 1000) + 500,
}));

const geographyTrends = Array.from({ length: 10 }, (_, i) => ({
  name: `Geographic Trend ${i + 1}`,
  data: generateTrendData(),
  currentScore: Math.floor(Math.random() * 1000) + 500,
}));

const competitorTrends = Array.from({ length: 10 }, (_, i) => ({
  name: `Competitor Trend ${i + 1}`,
  data: generateTrendData(),
  currentScore: Math.floor(Math.random() * 1000) + 500,
}));

const followedTrends = Array.from({ length: 10 }, (_, i) => ({
  name: `Followed Trend ${i + 1}`,
  data: generateTrendData(),
  currentScore: Math.floor(Math.random() * 1000) + 500,
}));

const generalTrends = Array.from({ length: 10 }, (_, i) => ({
  name: `General Trend ${i + 1}`,
  data: generateTrendData(),
  currentScore: Math.floor(Math.random() * 1000) + 500,
}));

export default function Index() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="container py-8 space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Trend Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and analyze trending topics across different categories
          </p>
        </header>

        <div className="space-y-10">
          <TrendSection
            title="Trends from Your Industry"
            description="Top trending topics in your specific industry sector"
            trends={industryTrends}
            viewAllHref="/trends/industry"
          />

          <TrendSection
            title="Trends from Your Geography"
            description="Popular trends in your geographic region"
            trends={geographyTrends}
            viewAllHref="/trends/geography"
          />

          <TrendSection
            title="Trends from Your Competitor"
            description="Track what your competitors are focusing on"
            trends={competitorTrends}
            viewAllHref="/trends/competitors"
          />

          <TrendSection
            title="Trends that You Follow"
            description="Stay updated with your favorite trends"
            trends={followedTrends}
            viewAllHref="/trends/followed"
          />

          <TrendSection
            title="General Trends"
            description="Overall trending topics across all categories"
            trends={generalTrends}
            viewAllHref="/trends/general"
          />
        </div>
      </div>
    </div>
  );
}

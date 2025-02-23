
import { TrendSection } from "@/components/TrendSection";
import {
  industryTrends,
  geographyTrends,
  competitorTrends,
  followedTrends,
  generalTrends,
} from "@/data/trendData";

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
            title={industryTrends.name}
            description={industryTrends.description}
            trends={industryTrends.trends}
            viewAllHref={`/trends/${industryTrends.id}`}
          />

          <TrendSection
            title={geographyTrends.name}
            description={geographyTrends.description}
            trends={geographyTrends.trends}
            viewAllHref={`/trends/${geographyTrends.id}`}
          />

          <TrendSection
            title={competitorTrends.name}
            description={competitorTrends.description}
            trends={competitorTrends.trends}
            viewAllHref={`/trends/${competitorTrends.id}`}
          />

          <TrendSection
            title={followedTrends.name}
            description={followedTrends.description}
            trends={followedTrends.trends}
            viewAllHref={`/trends/${followedTrends.id}`}
          />

          <TrendSection
            title={generalTrends.name}
            description={generalTrends.description}
            trends={generalTrends.trends}
            viewAllHref={`/trends/${generalTrends.id}`}
          />
        </div>
      </div>
    </div>
  );
}

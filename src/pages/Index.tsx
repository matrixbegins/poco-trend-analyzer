
import { MetricCard } from "@/components/MetricCard";
import { TrendChart } from "@/components/TrendChart";
import { TrendingTopics } from "@/components/TrendingTopics";

const metrics = [
  { title: "Total Engagement", value: "324,652", trend: 12 },
  { title: "Social Reach", value: "1.2M", trend: 8 },
  { title: "Conversion Rate", value: "3.2%", trend: -2 },
  { title: "Average Session", value: "2m 45s", trend: 5 },
];

const chartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
  { name: "Jun", value: 900 },
  { name: "Jul", value: 1100 },
];

const trendingTopics = [
  { name: "Artificial Intelligence", category: "Technology", trend: 45 },
  { name: "Sustainable Marketing", category: "Environment", trend: 32 },
  { name: "Social Commerce", category: "E-commerce", trend: 28 },
  { name: "Video Content", category: "Content", trend: -5 },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Marketing Trends</h1>
          <p className="text-muted-foreground">
            Track and analyze your marketing performance
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              trend={metric.trend}
            />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <TrendChart
            title="Engagement Overview"
            data={chartData}
            className="animate-fade-up"
          />
          <TrendingTopics
            topics={trendingTopics}
            className="animate-fade-up"
          />
        </div>
      </div>
    </div>
  );
}

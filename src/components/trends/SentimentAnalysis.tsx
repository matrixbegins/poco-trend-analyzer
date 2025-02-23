
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { CHART_COLORS, prepareSentimentData } from "@/utils/chartUtils";

interface CustomerQuote {
  id: string;
  text: string;
  source: string;
  date: string;
}

interface SentimentAnalysisProps {
  sentiment: Record<string, number> | null | undefined;
  customerQuotes: CustomerQuote[];
}

export function SentimentAnalysis({ sentiment, customerQuotes }: SentimentAnalysisProps) {
  return (
    <Card className="overflow-hidden border-purple-100">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl leading-tight">Customer Sentiments</CardTitle>
        <Separator className="my-3" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-[300px]">
            {sentiment && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prepareSentimentData(sentiment)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {prepareSentimentData(sentiment).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="space-y-4">
            {customerQuotes?.slice(0, 3).map((quote) => (
              <Card key={quote.id} className="border-l-4 border-l-purple-400">
                <CardContent className="p-4">
                  <p className="italic text-sm">{quote.text}</p>
                  <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                    <span>{quote.source}</span>
                    <span>•</span>
                    <span>{new Date(quote.date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

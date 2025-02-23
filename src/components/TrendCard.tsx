
import { Card, CardContent } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";

interface TrendCardProps {
  name: string;
  data: { date: string; score: number }[];
  currentScore: number;
}

export function TrendCard({ name, data, currentScore }: TrendCardProps) {
  return (
    <Link to={`/trends/${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <Card className="hover:shadow-md transition-all duration-300">
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm truncate">{name}</h3>
            
            <div className="h-[40px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#9b87f5"
                    fill="#9b87f5"
                    fillOpacity={0.1}
                    strokeWidth={1.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="text-sm font-semibold">{currentScore.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import { Clock, Plus, Check, Flame } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TrendCardProps {
  name: string;
  data: { date: string; score: number }[];
  currentScore: number;
  updatedAt: string;
  isHighImpact?: boolean;
}

export function TrendCard({
  name,
  data,
  currentScore,
  updatedAt,
  isHighImpact = Math.random() > 0.7
}: TrendCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent card navigation when clicking the button
    setIsFollowing(!isFollowing);
  };

  return (
    <Link to={`/trends/${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <Card className="hover:shadow-md transition-all duration-300 relative">
        {isHighImpact && (
          <div className="absolute top-2 right-2 bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Flame className="h-3 w-3" />
            High Impact
          </div>
        )}
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm truncate pr-24">{name}</h3>

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

            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">
                {currentScore.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="h-3 w-3" />
                <span className="text-xs">
                  {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                className={`w-full transition-colors ${
                  isFollowing
                    ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700'
                    : ''
                }`}
                onClick={handleFollow}
              >
                {isFollowing ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Following
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-1" />
                    Follow
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

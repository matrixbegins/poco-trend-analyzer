import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
  trend: -1 | 0 | 1;  // -1: down, 0: neutral, 1: up
  trendValue: number;
}

export function MetricCard({ title, value, icon: Icon, description, trend, trendValue }: MetricCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <Icon className="h-4 w-4 text-gray-400" />
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold">{value}</span>
        {trend !== 0 && (
          <span className={`ml-2 text-sm ${
            trend > 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend > 0 ? '↑' : '↓'} {trendValue}%
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </Card>
  );
}

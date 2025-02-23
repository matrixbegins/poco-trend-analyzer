import { useQuery } from "@tanstack/react-query";
import { getAnalytics, TrendAnalytics } from "@/data/analyticsData";

export function useAnalytics(trendId: string) {
  return useQuery<TrendAnalytics>({
    queryKey: ['analytics', trendId],
    queryFn: () => getAnalytics(trendId),
  });
}
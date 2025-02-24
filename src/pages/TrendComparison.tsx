import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { findTrendById } from "@/data/trendData";

export default function TrendComparison() {
  const { trendId1, trendId2 } = useParams();
  const navigate = useNavigate();

  const { data: trend1 } = useQuery({
    queryKey: ['trend', trendId1],
    queryFn: () => findTrendById(trendId1 || ''),
  });

  const { data: trend2 } = useQuery({
    queryKey: ['trend', trendId2],
    queryFn: () => findTrendById(trendId2 || ''),
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">
          Comparing: {trend1?.name} vs {trend2?.name}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Add comparison sections here */}
      </div>
    </div>
  );
}
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { findTrendsByQuery } from "@/data/trendData";
import { useNavigate } from "react-router-dom";

interface TrendCompareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTrendId: string;
}

export function TrendCompareModal({ open, onOpenChange, currentTrendId }: TrendCompareModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ id: string; name: string; category: string }>>([]);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = findTrendsByQuery(query);
    setSearchResults(results.filter(trend => trend.id !== currentTrendId));
  };

  const handleCompare = (trendId: string) => {
    onOpenChange(false);
    navigate(`/trends/compare/${currentTrendId}/${trendId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Compare with another trend</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search trends..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="space-y-2">
            {searchResults.map((trend) => (
              <Button
                key={trend.id}
                variant="ghost"
                className="w-full justify-start hover:bg-gray-200"
                onClick={() => handleCompare(trend.id)}
              >
                <div className="text-left">
                  <div className="text-foreground">{trend.name}</div>
                  <div className="text-sm text-muted-foreground">{trend.category}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
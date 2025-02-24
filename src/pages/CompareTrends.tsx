import { usePageTitle } from '@/hooks/usePageTitle';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Plus, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { allTrendCategories } from '@/data/trendData';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';

interface TrendOption {
  id: string;
  name: string;
  category: string;
}

export default function CompareTrends() {
  usePageTitle('Compare Trends');
  const navigate = useNavigate();
  const [searchQueries, setSearchQueries] = useState<string[]>(['', '', '', '']);
  const [selectedTrends, setSelectedTrends] = useState<(TrendOption | null)[]>([null, null, null, null]);
  const [activeTrends, setActiveTrends] = useState(2); // Start with 2 trends

  const getFilteredTrends = (query: string) => {
    if (!query) return [];
    try {
      const lowerQuery = query.toLowerCase();
      return allTrendCategories.flatMap(category =>
        category.trends.filter(trend =>
          trend.name.toLowerCase().includes(lowerQuery) ||
          trend.category.toLowerCase().includes(lowerQuery)
        )
      ).map(trend => ({
        id: trend.id,
        name: trend.name,
        category: trend.category
      }));
    } catch (error) {
      console.error('Error filtering trends:', error);
      toast.error('Error filtering trends');
      return [];
    }
  };

  const handleCompare = () => {
    try {
      const validTrends = selectedTrends.filter(Boolean).slice(0, activeTrends);
      if (validTrends.length < 2) {
        toast.error('Please select at least 2 trends to compare');
        return;
      }
      const trendIds = validTrends.map(trend => trend!.id).join('/');
      navigate(`/trends/compare/${trendIds}`);
    } catch (error) {
      console.error('Error navigating to comparison:', error);
      toast.error('Error starting comparison');
    }
  };

  const addTrendSlot = () => {
    if (activeTrends < 4) {
      setActiveTrends(prev => prev + 1);
    }
  };

  const removeTrendSlot = (index: number) => {
    const newSearchQueries = [...searchQueries];
    const newSelectedTrends = [...selectedTrends];

    // Remove the trend at index
    newSearchQueries[index] = '';
    newSelectedTrends[index] = null;

    // Shift remaining trends up
    for (let i = index; i < activeTrends - 1; i++) {
      newSearchQueries[i] = newSearchQueries[i + 1];
      newSelectedTrends[i] = newSelectedTrends[i + 1];
    }

    setSearchQueries(newSearchQueries);
    setSelectedTrends(newSelectedTrends);
    setActiveTrends(prev => prev - 1);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Compare Trends</h1>
        <p className="text-muted-foreground mt-2">
          Select up to 4 trends to compare their performance, insights, and analytics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {Array.from({ length: activeTrends }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Trend {index + 1}</h2>
                {index >= 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTrendSlot(index)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 h-3.5 w-3.5" />
                <Input
                  placeholder="Search trends..."
                  value={searchQueries[index]}
                  onChange={(e) => {
                    const newQueries = [...searchQueries];
                    newQueries[index] = e.target.value;
                    setSearchQueries(newQueries);
                  }}
                  className="pl-8 h-9"
                />
              </div>

              <AnimatePresence>
                {searchQueries[index] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border rounded-lg divide-y overflow-hidden"
                  >
                    {getFilteredTrends(searchQueries[index]).map((trend) => (
                      <button
                        key={trend.id}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                          selectedTrends[index]?.id === trend.id ? 'bg-purple-50' : ''
                        }`}
                        onClick={() => {
                          const newTrends = [...selectedTrends];
                          newTrends[index] = trend;
                          setSelectedTrends(newTrends);
                          const newQueries = [...searchQueries];
                          newQueries[index] = '';
                          setSearchQueries(newQueries);
                        }}
                      >
                        <div className="font-medium">{trend.name}</div>
                        <div className="text-sm text-muted-foreground">{trend.category}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {selectedTrends[index] && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 border rounded-lg bg-purple-50"
                >
                  <div className="font-medium">{selectedTrends[index]!.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedTrends[index]!.category}</div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-4">
        {activeTrends < 4 && (
          <Button
            variant="outline"
            onClick={addTrendSlot}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Another Trend
          </Button>
        )}
        <Button
          size="lg"
          className="gap-2"
          disabled={selectedTrends.filter(Boolean).length < 2}
          onClick={handleCompare}
        >
          Compare Trends
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
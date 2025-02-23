
export const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const prepareSentimentData = (sentiment: Record<string, number> | null | undefined) => {
  if (!sentiment) return [];
  return Object.entries(sentiment).map(([name, value]) => ({
    name,
    value: Number(value),
  }));
};

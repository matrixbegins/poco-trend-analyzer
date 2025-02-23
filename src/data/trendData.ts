
export interface Trend {
  id: string;
  name: string;
  data: { date: string; score: number }[];
  currentScore: number;
  category: string;
  description?: string;
  sentiment?: {
    positive: number;
    negative: number;
    neutral: number;
  };
  sources?: {
    name: string;
    mentions: number;
  }[];
  news?: {
    id: string;
    title: string;
    source: string;
    image: string;
    engagement: number;
    publishedAt: string;
    url: string;
  }[];
  relatedTrends?: {
    id: string;
    name: string;
    strength: number;
    description?: string;
    thumbnail?: string;
  }[];
  customerQuotes?: {
    id: string;
    text: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    source: string;
    date: string;
  }[];
}

export interface TrendCategory {
  id: string;
  name: string;
  description: string;
  trends: Trend[];
}

// Helper function to generate random trend data for the past 7 days
const generateTrendData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString(),
    score: Math.floor(Math.random() * 1000) + 500,
  }));
};

// Helper function to generate a random trend
const generateTrend = (name: string, category: string): Trend => {
  const id = name.toLowerCase().replace(/\s+/g, '-');
  return {
    id,
    name,
    category,
    data: generateTrendData(),
    currentScore: Math.floor(Math.random() * 1000) + 500,
    description: `Description for ${name}`,
    sentiment: {
      positive: Math.floor(Math.random() * 60) + 20,
      negative: Math.floor(Math.random() * 30),
      neutral: Math.floor(Math.random() * 30),
    },
    sources: [
      { name: 'Twitter', mentions: Math.floor(Math.random() * 1000) + 100 },
      { name: 'LinkedIn', mentions: Math.floor(Math.random() * 800) + 100 },
      { name: 'News Articles', mentions: Math.floor(Math.random() * 500) + 50 },
      { name: 'Blog Posts', mentions: Math.floor(Math.random() * 300) + 30 },
      { name: 'Forums', mentions: Math.floor(Math.random() * 200) + 20 },
    ],
    news: Array.from({ length: 5 }, (_, i) => ({
      id: `news-${id}-${i}`,
      title: `Latest news about ${name} - Article ${i + 1}`,
      source: ['TechCrunch', 'Forbes', 'Reuters', 'Bloomberg', 'CNBC'][i],
      image: `https://picsum.photos/seed/${id}-${i}/200/200`,
      engagement: Math.floor(Math.random() * 1000) + 100,
      publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      url: '#',
    })),
    relatedTrends: Array.from({ length: 5 }, (_, i) => ({
      id: `related-${id}-${i}`,
      name: `Related Trend ${i + 1} to ${name}`,
      strength: Math.random() * 0.8 + 0.2,
      description: `Description for related trend ${i + 1}`,
      thumbnail: `https://picsum.photos/seed/${id}-related-${i}/100/100`,
    })),
    customerQuotes: Array.from({ length: 3 }, (_, i) => ({
      id: `quote-${id}-${i}`,
      text: `This is a sample customer quote about ${name}. It's ${['positive', 'negative', 'neutral'][i % 3]}.`,
      sentiment: ['positive', 'negative', 'neutral'][i % 3] as 'positive' | 'negative' | 'neutral',
      source: ['Twitter', 'Customer Review', 'Survey'][i % 3],
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    })),
  };
};

// Generate sample data for each category
export const industryTrends: TrendCategory = {
  id: 'industry',
  name: 'Industry Trends',
  description: 'Top trending topics in your specific industry sector',
  trends: Array.from({ length: 10 }, (_, i) => 
    generateTrend(`Industry Trend ${i + 1}`, 'Industry')
  ),
};

export const geographyTrends: TrendCategory = {
  id: 'geography',
  name: 'Geography Trends',
  description: 'Popular trends in your geographic region',
  trends: Array.from({ length: 10 }, (_, i) =>
    generateTrend(`Geographic Trend ${i + 1}`, 'Geography')
  ),
};

export const competitorTrends: TrendCategory = {
  id: 'competitors',
  name: 'Competitor Trends',
  description: 'Track what your competitors are focusing on',
  trends: Array.from({ length: 10 }, (_, i) =>
    generateTrend(`Competitor Trend ${i + 1}`, 'Competitors')
  ),
};

export const followedTrends: TrendCategory = {
  id: 'followed',
  name: 'Followed Trends',
  description: 'Stay updated with your favorite trends',
  trends: Array.from({ length: 10 }, (_, i) =>
    generateTrend(`Followed Trend ${i + 1}`, 'Followed')
  ),
};

export const generalTrends: TrendCategory = {
  id: 'general',
  name: 'General Trends',
  description: 'Overall trending topics across all categories',
  trends: Array.from({ length: 10 }, (_, i) =>
    generateTrend(`General Trend ${i + 1}`, 'General')
  ),
};

export const allTrendCategories = [
  industryTrends,
  geographyTrends,
  competitorTrends,
  followedTrends,
  generalTrends,
];

// Helper function to find a trend by ID across all categories
export const findTrendById = (trendId: string): Trend | undefined => {
  for (const category of allTrendCategories) {
    const trend = category.trends.find(t => t.id === trendId);
    if (trend) return trend;
  }
  return undefined;
};

// Helper function to find a category by ID
export const findCategoryById = (categoryId: string): TrendCategory | undefined => {
  return allTrendCategories.find(c => c.id === categoryId);
};

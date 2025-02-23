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

// Generate sample data for the food industry category
export const industryTrends: TrendCategory = {
  id: 'food-industry',
  name: 'Food Industry Trends',
  description: 'Leading trends shaping the future of food and beverage',
  trends: [
    generateTrend('Plant-Based Innovation', 'Food Industry'),
    generateTrend('Food Waste Reduction', 'Food Industry'),
    generateTrend('Cloud Kitchens', 'Food Industry'),
    generateTrend('Sustainable Packaging', 'Food Industry'),
    generateTrend('Alternative Proteins', 'Food Industry'),
    generateTrend('Smart Kitchen Tech', 'Food Industry'),
    generateTrend('Functional Foods', 'Food Industry'),
    generateTrend('Local Sourcing', 'Food Industry'),
    generateTrend('Personalized Nutrition', 'Food Industry'),
    generateTrend('Zero-Alcohol Beverages', 'Food Industry'),
  ],
};

export const geographyTrends: TrendCategory = {
  id: 'geography',
  name: 'Regional Food Trends',
  description: 'Popular food trends in your geographic region',
  trends: [
    generateTrend('Korean Street Food', 'Geography'),
    generateTrend('Mediterranean Diet', 'Geography'),
    generateTrend('Nordic Cuisine', 'Geography'),
    generateTrend('Latin American Fusion', 'Geography'),
    generateTrend('Indian Street Food', 'Geography'),
    generateTrend('Japanese Comfort Food', 'Geography'),
    generateTrend('Middle Eastern Flavors', 'Geography'),
    generateTrend('Southeast Asian Desserts', 'Geography'),
    generateTrend('African Superfoods', 'Geography'),
    generateTrend('European Pastries', 'Geography'),
  ],
};

export const competitorTrends: TrendCategory = {
  id: 'competitors',
  name: 'Competitor Trends',
  description: 'Track what leading food companies are focusing on',
  trends: [
    generateTrend('Direct-to-Consumer Models', 'Competitors'),
    generateTrend('Ghost Kitchen Expansion', 'Competitors'),
    generateTrend('Subscription Meal Kits', 'Competitors'),
    generateTrend('AI-Powered Menu Planning', 'Competitors'),
    generateTrend('Vertical Farming Investment', 'Competitors'),
    generateTrend('Food Delivery Innovation', 'Competitors'),
    generateTrend('Blockchain Traceability', 'Competitors'),
    generateTrend('Lab-Grown Alternatives', 'Competitors'),
    generateTrend('Smart Vending Solutions', 'Competitors'),
    generateTrend('Eco-Friendly Packaging', 'Competitors'),
  ],
};

export const followedTrends: TrendCategory = {
  id: 'followed',
  name: 'Followed Trends',
  description: 'Your curated list of food industry trends',
  trends: [
    generateTrend('Food Tech Innovation', 'Followed'),
    generateTrend('Restaurant Automation', 'Followed'),
    generateTrend('Digital Menu Optimization', 'Followed'),
    generateTrend('Food Safety Tech', 'Followed'),
    generateTrend('Consumer Analytics', 'Followed'),
    generateTrend('Loyalty Programs 2.0', 'Followed'),
    generateTrend('Voice Ordering Systems', 'Followed'),
    generateTrend('Contactless Dining', 'Followed'),
    generateTrend('Augmented Reality Menus', 'Followed'),
    generateTrend('Robotic Food Prep', 'Followed'),
  ],
};

export const generalTrends: TrendCategory = {
  id: 'general',
  name: 'General Food Trends',
  description: 'Overall trending topics in food and beverage',
  trends: [
    generateTrend('Health & Wellness Foods', 'General'),
    generateTrend('Meal Kit Delivery', 'General'),
    generateTrend('Food Tourism', 'General'),
    generateTrend('Social Media Food', 'General'),
    generateTrend('Food Photography', 'General'),
    generateTrend('Home Cooking', 'General'),
    generateTrend('Food Influencers', 'General'),
    generateTrend('Cooking Classes', 'General'),
    generateTrend('Food Festivals', 'General'),
    generateTrend('Farm-to-Table', 'General'),
  ],
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

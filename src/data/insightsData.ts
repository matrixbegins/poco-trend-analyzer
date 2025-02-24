export interface InsightsData {
  contentFormats: {
    name: string;
    value: number;
    color: string;
  }[];
  marketingChannels: {
    name: string;
    value: number;
    color: string;
  }[];
  dailyEngagement: {
    day: string;
    engagement: number;
  }[];
  audienceReach: {
    name: string;
    value: number;
  }[];
}

interface DataRange {
  min: number;
  max: number;
}

const ENGAGEMENT_RANGES: Record<string, DataRange> = {
  Technology: { min: 50, max: 80 },
  Manufacturing: { min: 40, max: 70 },
  Sustainability: { min: 45, max: 75 },
  Innovation: { min: 55, max: 85 },
  default: { min: 35, max: 65 }
};

const generateRandomValue = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getEngagementRange = (category: string): DataRange => {
  return ENGAGEMENT_RANGES[category] || ENGAGEMENT_RANGES.default;
};

// Content format weights by category
const CONTENT_PREFERENCES: Record<string, Record<string, number>> = {
  Technology: {
    Video: 45,
    Blog: 25,
    Infographic: 20,
    Podcast: 10
  },
  Manufacturing: {
    Video: 30,
    Blog: 35,
    Infographic: 25,
    Podcast: 10
  },
  Sustainability: {
    Video: 35,
    Blog: 30,
    Infographic: 25,
    Podcast: 10
  },
  default: {
    Video: 35,
    Blog: 30,
    Infographic: 20,
    Podcast: 15
  }
};

export const getInsightsData = (trendName: string, category: string = 'default'): InsightsData => {
  const range = getEngagementRange(category);
  const preferences = CONTENT_PREFERENCES[category] || CONTENT_PREFERENCES.default;

  // Generate daily engagement with trend-specific patterns
  const dailyEngagement = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
  ].map(day => ({
    day,
    engagement: generateRandomValue(range.min, range.max)
  }));

  // Adjust content format preferences based on trend category
  const contentFormats = [
    { name: 'Video', value: preferences.Video, color: '#9b87f5' },
    { name: 'Blog', value: preferences.Blog, color: '#f59b87' },
    { name: 'Infographic', value: preferences.Infographic, color: '#87f59b' },
    { name: 'Podcast', value: preferences.Podcast, color: '#f587e4' },
  ];

  // Generate marketing channel distribution based on trend type
  const marketingChannels = [
    { name: 'Social', value: generateRandomValue(35, 45), color: '#9b87f5' },
    { name: 'Email', value: generateRandomValue(20, 30), color: '#f59b87' },
    { name: 'Search', value: generateRandomValue(15, 25), color: '#87f59b' },
    { name: 'Ads', value: generateRandomValue(10, 20), color: '#f587e4' },
  ];

  // Calculate audience reach based on engagement levels
  const totalReach = generateRandomValue(65, 90);
  const audienceReach = [
    { name: 'Reached', value: totalReach },
    { name: 'Remaining', value: 100 - totalReach },
  ];

  return {
    contentFormats,
    marketingChannels,
    dailyEngagement,
    audienceReach,
  };
};

// Utility to get consistent colors
export const CHART_COLORS = {
  primary: '#9b87f5',
  secondary: '#f59b87',
  tertiary: '#87f59b',
  quaternary: '#f587e4',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};
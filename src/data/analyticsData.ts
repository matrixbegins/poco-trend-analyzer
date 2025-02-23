import { subDays, format } from "date-fns";

// Generate dates for the last 30 days
const generateDates = (days: number) => {
  return Array.from({ length: days }, (_, i) => {
    const date = subDays(new Date(), days - 1 - i);
    return format(date, 'yyyy-MM-dd');
  });
};

const dates = generateDates(30);

export interface TrendAnalytics {
  contentPerformance: {
    metrics: {
      avgEngagementRate: number;
      shareability: number;
      virality: number;
      contentLifespan: number;
    };
    performanceOverTime: Array<{
      date: string;
      engagement: number;
      shares: number;
      viral: number;
    }>;
  };
  audienceInsights: {
    demographics: Array<{
      group: string;
      percentage: number;
    }>;
    geoDistribution: Array<{
      region: string;
      percentage: number;
    }>;
    interests: Array<{
      name: string;
      affinity: number;
    }>;
  };
  platformMetrics: Array<{
    platform: string;
    engagement: number;
    growth: number;
    reachCost: number;
    conversionRate: number;
  }>;
  timingAnalytics: {
    bestTimeOfDay: Array<{
      hour: number;
      engagement: number;
    }>;
    weeklyPattern: Array<{
      day: string;
      engagement: number;
    }>;
    seasonality: Array<{
      month: string;
      trend: number;
    }>;
  };
  keywordAnalytics: {
    trendingHashtags: Array<{
      tag: string;
      volume: number;
      growth: number;
    }>;
    relatedKeywords: Array<{
      word: string;
      correlation: number;
    }>;
  };
  competitiveBenchmark: {
    shareOfVoice: number;
    marketPenetration: number;
    brandSentiment: number;
    competitorComparison: Array<{
      competitor: string;
      score: number;
    }>;
  };
  roiMetrics: {
    leadGeneration: number;
    costPerEngagement: number;
    conversionRate: number;
    customerAcquisitionCost: number;
    revenueAttribution: Array<{
      channel: string;
      revenue: number;
    }>;
  };
  contentGaps: {
    unaddressedTopics: string[];
    competitorAdvantages: string[];
    opportunityScore: number;
    demandVsSupply: number;
  };
  predictiveMetrics: {
    trendLifecycle: 'emerging' | 'peaking' | 'declining';
    growthPotential: number;
    sustainabilityScore: number;
    nextWavePrediction: string;
    forecastedGrowth: Array<{
      date: string;
      predicted: number;
    }>;
  };
  audienceBehavior: {
    contentConsumptionPatterns: Array<{
      type: string;
      preference: number;
    }>;
    interactionTypes: Array<{
      action: string;
      frequency: number;
    }>;
    attentionSpan: number;
    devicePreference: Array<{
      device: string;
      usage: number;
    }>;
  };
}

export const generateMockAnalytics = (trendId: string): TrendAnalytics => ({
  contentPerformance: {
    metrics: {
      avgEngagementRate: 8.4,
      shareability: 76,
      virality: 92,
      contentLifespan: 48,
    },
    performanceOverTime: dates.map(date => ({
      date,
      engagement: Math.floor(Math.random() * 40) + 60,
      shares: Math.floor(Math.random() * 30) + 40,
      viral: Math.floor(Math.random() * 20) + 30,
    })),
  },
  audienceInsights: {
    demographics: [
      { group: '18-24', percentage: 25 },
      { group: '25-34', percentage: 35 },
      { group: '35-44', percentage: 20 },
      { group: '45+', percentage: 20 },
    ],
    geoDistribution: [
      { region: 'United States', percentage: 40 },
      { region: 'Germany', percentage: 15 },
      { region: 'United Kingdom', percentage: 15 },
      { region: 'China', percentage: 12 },
      { region: 'India', percentage: 8 },
      { region: 'Others', percentage: 10 },
    ],
    interests: [
      { name: 'Technology', affinity: 85 },
      { name: 'Innovation', affinity: 75 },
      { name: 'Business', affinity: 70 },
      { name: 'Sustainability', affinity: 65 },
    ],
  },
  platformMetrics: [
    { platform: 'Instagram', engagement: 82, growth: 12, reachCost: 1.2, conversionRate: 3.4 },
    { platform: 'Twitter', engagement: 75, growth: 8, reachCost: 0.8, conversionRate: 2.8 },
    { platform: 'LinkedIn', engagement: 68, growth: 15, reachCost: 2.1, conversionRate: 4.2 },
    { platform: 'TikTok', engagement: 90, growth: 25, reachCost: 1.5, conversionRate: 3.8 },
  ],
  timingAnalytics: {
    bestTimeOfDay: [
      { hour: 9, engagement: 85 },
      { hour: 12, engagement: 92 },
      { hour: 15, engagement: 88 },
      { hour: 18, engagement: 95 },
      { hour: 21, engagement: 78 },
    ],
    weeklyPattern: [
      { day: 'Monday', engagement: 82 },
      { day: 'Tuesday', engagement: 88 },
      { day: 'Wednesday', engagement: 85 },
      { day: 'Thursday', engagement: 90 },
      { day: 'Friday', engagement: 86 },
      { day: 'Saturday', engagement: 72 },
      { day: 'Sunday', engagement: 68 },
    ],
    seasonality: [
      { month: 'Jan', trend: 75 },
      { month: 'Feb', trend: 78 },
      { month: 'Mar', trend: 82 },
      { month: 'Apr', trend: 85 },
      { month: 'May', trend: 88 },
      { month: 'Jun', trend: 92 },
    ],
  },
  keywordAnalytics: {
    trendingHashtags: [
      { tag: '#innovation', volume: 12500, growth: 25 },
      { tag: '#sustainability', volume: 8900, growth: 18 },
      { tag: '#technology', volume: 15600, growth: 15 },
      { tag: '#future', volume: 7800, growth: 12 },
    ],
    relatedKeywords: [
      { word: 'digital transformation', correlation: 0.85 },
      { word: 'artificial intelligence', correlation: 0.78 },
      { word: 'machine learning', correlation: 0.72 },
      { word: 'automation', correlation: 0.68 },
    ],
  },
  competitiveBenchmark: {
    shareOfVoice: 32,
    marketPenetration: 28,
    brandSentiment: 76,
    competitorComparison: [
      { competitor: 'Company A', score: 85 },
      { competitor: 'Company B', score: 78 },
      { competitor: 'Company C', score: 72 },
      { competitor: 'Company D', score: 68 },
    ],
  },
  roiMetrics: {
    leadGeneration: 245,
    costPerEngagement: 1.2,
    conversionRate: 3.8,
    customerAcquisitionCost: 28.5,
    revenueAttribution: [
      { channel: 'Social Media', revenue: 45000 },
      { channel: 'Email', revenue: 32000 },
      { channel: 'Content Marketing', revenue: 28000 },
      { channel: 'Paid Ads', revenue: 38000 },
    ],
  },
  contentGaps: {
    unaddressedTopics: [
      'Enterprise Integration',
      'Security Implications',
      'Cost Analysis',
      'Implementation Guide',
    ],
    competitorAdvantages: [
      'Video Tutorials',
      'Case Studies',
      'Technical Documentation',
    ],
    opportunityScore: 78,
    demandVsSupply: 1.4,
  },
  predictiveMetrics: {
    trendLifecycle: 'emerging',
    growthPotential: 85,
    sustainabilityScore: 76,
    nextWavePrediction: 'Integration with AI',
    forecastedGrowth: dates.slice(0, 6).map(date => ({
      date,
      predicted: Math.floor(Math.random() * 30) + 70,
    })),
  },
  audienceBehavior: {
    contentConsumptionPatterns: [
      { type: 'Video Content', preference: 65 },
      { type: 'Text Articles', preference: 45 },
      { type: 'Infographics', preference: 55 },
      { type: 'Audio Content', preference: 35 },
    ],
    interactionTypes: [
      { action: 'Likes', frequency: 45 },
      { action: 'Shares', frequency: 25 },
      { action: 'Comments', frequency: 20 },
      { action: 'Saves', frequency: 10 },
    ],
    attentionSpan: 15,
    devicePreference: [
      { device: 'Mobile', usage: 65 },
      { device: 'Desktop', usage: 25 },
      { device: 'Tablet', usage: 10 },
    ],
  },
});

export const getAnalytics = async (trendId: string): Promise<TrendAnalytics> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return generateMockAnalytics(trendId);
};
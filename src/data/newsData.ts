import { getImageUrl } from '@/utils/imageUtils';

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
  imageUrl: string;
  location: string;
  views: number;
  comments: number;
  shares: number;
}

// Generate 60 news items (2 pages worth of data)
export const personalizedNews: NewsItem[] = Array.from({ length: 60 }, (_, i) => {
  // Base engagement that decreases with article age
  const ageMultiplier = Math.max(0.3, 1 - (i * 0.02));

  // Random multiplier for variation (0.8 to 1.2)
  const randomFactor = 0.8 + Math.random() * 0.4;

  // Calculate engagement metrics
  const baseViews = Math.floor(1000 + Math.random() * 9000);
  const views = Math.floor(baseViews * ageMultiplier * randomFactor);
  const comments = Math.floor(views * (0.01 + Math.random() * 0.04)); // 1-5% of views
  const shares = Math.floor(views * (0.02 + Math.random() * 0.06)); // 2-8% of views

  return {
    id: `news-${i}`,
    title: `Latest Developments in Industry ${i % 5 === 0 ? 'Technology' : i % 3 === 0 ? 'Manufacturing' : 'Logistics'}`,
    source: [
      'TechCrunch', 'Reuters', 'Bloomberg', 'Industry Weekly', 'Market Insights',
      'Forbes', 'WSJ', 'CNBC', 'Financial Times', 'The Economist',
      'VentureBeat', 'Wired', 'MIT Tech Review', 'Harvard Business Review', 'Fast Company'
    ][i % 15],
    url: '#',
    publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
    category: [
      'Technology', 'Manufacturing', 'Logistics', 'Innovation', 'Automation',
      'AI & ML', 'IoT', 'Robotics', 'Cloud Computing', 'Cybersecurity',
      'Blockchain', 'Green Tech', '3D Printing', 'AR/VR', 'Digital Transformation'
    ][i % 15],
    imageUrl: `https://picsum.photos/seed/${i}/800/400`,
    location: [
      'Global', 'North America', 'Europe', 'Asia Pacific', 'Latin America',
      'Middle East', 'Africa', 'Southeast Asia', 'Eastern Europe', 'Nordic',
      'India', 'Benelux', 'Mediterranean', 'Oceania', 'Caribbean'
    ][i % 15],
    views,
    comments,
    shares,
  };
});

export const topicNews = personalizedNews.slice(0, 30); // First 30 items for topic news
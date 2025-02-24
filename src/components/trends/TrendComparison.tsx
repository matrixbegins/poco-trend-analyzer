import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  ArcElement
} from 'chart.js';
import { Card } from '@/components/ui/card';
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from 'react';
import {
  ArrowUp,
  Share2,
  Zap,
  Info,
  Play,
  Image,
  CirclePlay,
  FileText,
  ArrowRight,
  Users,
  BarChart,
  Target,
  TrendingUp
} from 'lucide-react';
import type { TrendOption } from '@/pages/CompareTrends';
import { findTrendById } from '@/data/trendData';

// Register all required elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  ArcElement
);

// Move all the comparison logic and UI from TrendComparison.tsx here
// and update the component to accept trends as props instead of using useParams
interface TrendComparisonProps {
  trends: TrendOption[];
}

export function TrendComparison({ trends }: TrendComparisonProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Get full trend data for each trend
  const trendData = trends.map(t => findTrendById(t.id)).filter(Boolean);

  // Prepare data for popularity trends chart
  const popularityData = {
    labels: trendData[0]?.data.map(d => new Date(d.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })) || [],
    datasets: trendData.map(trend => ({
      label: trend?.name || '',
      data: trend?.data.map(d => d.score) || [],
      borderColor: getRandomColor(),
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.4,
    })),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'start' as const,
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: { size: 12 },
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  useEffect(() => {
    // Simulate data processing delay
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [trends]);

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  const getMetrics = (trend: any) => ({
    engagement: {
      value: 8.4,
      change: 2.3,
      label: 'Avg. Engagement Rate',
      subtext: 'Above industry average'
    },
    shareability: {
      value: 76,
      change: 5.7,
      label: 'Shareability Score',
      subtext: 'Content share probability'
    },
    virality: {
      value: 92,
      change: 3.2,
      label: 'Virality Score',
      subtext: 'Viral potential'
    }
  });

  const getDemographicsData = (trend: any) => ({
    ageData: {
      labels: ['18-24', '25-34', '35-44', '45+'],
      datasets: [{
        data: [30, 40, 20, 10],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderWidth: 1
      }]
    }
  });

  const getCompetitorData = (trend: any) => ({
    adoption: {
      value: Math.floor(65 + Math.random() * 25),
      change: Math.floor(2 + Math.random() * 5),
      topCompetitor: 'Company Alpha',
      competitors: [
        { name: 'Company Alpha', value: 85 },
        { name: 'Beta Inc', value: 72 },
        { name: 'Delta Corp', value: 65 },
        { name: 'Gamma Ltd', value: 58 }
      ]
    },
    penetration: {
      value: Math.floor(40 + Math.random() * 30),
      change: Math.floor(3 + Math.random() * 6),
      potential: 'High',
      marketShare: [
        { segment: 'Premium', share: 45 },
        { segment: 'Mid-market', share: 30 },
        { segment: 'Economy', share: 25 }
      ]
    },
    sentiment: {
      positive: Math.floor(60 + Math.random() * 20),
      negative: Math.floor(10 + Math.random() * 10),
      neutral: Math.floor(10 + Math.random() * 10),
      breakdown: {
        quality: 4.2,
        innovation: 4.5,
        pricing: 3.8,
        overall: 4.1
      }
    }
  });

  const getCompetitorTrendData = (trend: any) => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Company Alpha',
        data: [65, 68, 72, 75, 82, 85],
        borderColor: '#FF6384',
        backgroundColor: 'transparent',
        borderWidth: 2,
      },
      {
        label: 'Beta Foods',
        data: [55, 58, 60, 65, 68, 70],
        borderColor: '#36A2EB',
        backgroundColor: 'transparent',
        borderWidth: 2,
      },
      {
        label: 'Delta Kitchen',
        data: [45, 48, 52, 55, 58, 62],
        borderColor: '#FFCE56',
        backgroundColor: 'transparent',
        borderWidth: 2,
      }
    ]
  });

  const getPlatformData = (trend: any) => ({
    platforms: [
      {
        name: 'YouTube',
        engagement: Math.floor(80 + Math.random() * 15),
        growth: Math.floor(6 + Math.random() * 18),
        reach: Math.floor(300000 + Math.random() * 1000000),
        performance: 'Very High'
      },
      {
        name: 'Instagram',
        engagement: Math.floor(70 + Math.random() * 20),
        growth: Math.floor(5 + Math.random() * 15),
        reach: Math.floor(100000 + Math.random() * 500000),
        performance: 'High'
      },
      {
        name: 'Twitter',
        engagement: Math.floor(60 + Math.random() * 20),
        growth: Math.floor(3 + Math.random() * 12),
        reach: Math.floor(80000 + Math.random() * 300000),
        performance: 'Medium'
      },
      {
        name: 'LinkedIn',
        engagement: Math.floor(65 + Math.random() * 25),
        growth: Math.floor(4 + Math.random() * 10),
        reach: Math.floor(50000 + Math.random() * 200000),
        performance: 'High'
      },
      {
        name: 'TikTok',
        engagement: Math.floor(75 + Math.random() * 20),
        growth: Math.floor(8 + Math.random() * 20),
        reach: Math.floor(200000 + Math.random() * 800000),
        performance: 'Very High'
      }
    ]
  });

  const getROIData = (trend: any) => ({
    leadGeneration: {
      value: Math.floor(1000 + Math.random() * 2000),
      growth: Math.floor(5 + Math.random() * 15),
      quality: Math.floor(70 + Math.random() * 20)
    },
    costPerEngagement: {
      value: (0.5 + Math.random() * 2).toFixed(2),
      change: -1 * Math.floor(5 + Math.random() * 10), // negative is good for cost
      benchmark: (1.5 + Math.random()).toFixed(2)
    },
    conversionRate: {
      value: Math.floor(2 + Math.random() * 5),
      growth: Math.floor(10 + Math.random() * 20),
      industry: '2.1'
    },
    acquisitionCost: {
      value: Math.floor(20 + Math.random() * 30),
      change: -1 * Math.floor(5 + Math.random() * 15), // negative is good for cost
      industry: 35
    }
  });

  const getRevenueData = (trend: any) => ({
    total: Math.floor(1000000 + Math.random() * 2000000),
    growth: Math.floor(15 + Math.random() * 25),
    breakdown: [
      { channel: 'Direct Sales', percentage: 35 + Math.random() * 10 },
      { channel: 'Online', percentage: 25 + Math.random() * 15 },
      { channel: 'Partners', percentage: 20 + Math.random() * 10 },
      { channel: 'Referrals', percentage: 15 + Math.random() * 10 }
    ]
  });

  const getROITrendData = (trend: any) => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'ROI',
        data: [150, 180, 210, 220, 250, 280],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Industry Average',
        data: [140, 150, 160, 165, 170, 175],
        borderColor: '#6B7280',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  });

  const getPredictiveTrendData = (trend: any) => ({
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Predicted Growth',
        data: [300, 320, 350, 400, 450, 500],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        borderDash: [5, 5]
      },
      {
        label: 'Confidence Interval',
        data: [280, 290, 310, 340, 380, 420],
        borderColor: 'transparent',
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        fill: 1,
        tension: 0.4
      },
      {
        label: 'Confidence Interval',
        data: [320, 350, 390, 460, 520, 580],
        borderColor: 'transparent',
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        fill: 1,
        tension: 0.4
      }
    ],
    insights: {
      growthRate: Math.floor(15 + Math.random() * 25),
      confidence: Math.floor(85 + Math.random() * 10),
      factors: [
        'Market Expansion',
        'Technology Adoption',
        'Consumer Behavior',
        'Competition'
      ]
    }
  });

  const getScenarioData = (trend: any) => ({
    scenarios: [
      {
        name: 'Optimistic',
        probability: 30,
        growth: Math.floor(40 + Math.random() * 20),
        impact: 'High',
        color: 'green'
      },
      {
        name: 'Base Case',
        probability: 50,
        growth: Math.floor(20 + Math.random() * 15),
        impact: 'Medium',
        color: 'blue'
      },
      {
        name: 'Conservative',
        probability: 20,
        growth: Math.floor(5 + Math.random() * 10),
        impact: 'Low',
        color: 'orange'
      }
    ],
    risks: [
      {
        type: 'Market Risk',
        level: Math.floor(50 + Math.random() * 30),
        status: 'Increasing',
        mitigation: 'Market diversification strategy'
      },
      {
        type: 'Competition Risk',
        level: Math.floor(40 + Math.random() * 30),
        status: 'Stable',
        mitigation: 'Innovation focus'
      },
      {
        type: 'Adoption Risk',
        level: Math.floor(30 + Math.random() * 40),
        status: 'Decreasing',
        mitigation: 'Enhanced user education'
      }
    ]
  });

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          font: {
            size: 11
          }
        }
      }
    }
  };

  const getContentFormatData = (trend: any) => ({
    formats: [
      {
        type: 'Video',
        engagement: Math.floor(75 + Math.random() * 20),
        growth: Math.floor(8 + Math.random() * 15),
        icon: 'Play'
      },
      {
        type: 'Images',
        engagement: Math.floor(65 + Math.random() * 20),
        growth: Math.floor(5 + Math.random() * 12),
        icon: 'Image'
      },
      {
        type: 'Stories',
        engagement: Math.floor(70 + Math.random() * 15),
        growth: Math.floor(10 + Math.random() * 15),
        icon: 'CirclePlay'
      },
      {
        type: 'Text',
        engagement: Math.floor(45 + Math.random() * 20),
        growth: Math.floor(3 + Math.random() * 10),
        icon: 'FileText'
      }
    ]
  });

  const iconMap = {
    'Play': Play,
    'Image': Image,
    'CirclePlay': CirclePlay,
    'FileText': FileText,
    'Users': Users,
    'BarChart': BarChart,
    'Target': Target,
    'TrendingUp': TrendingUp
  };

  const getActionableInsights = (trends: TrendOption[]) => {
    return [
      {
        title: "Most Effective Content Format",
        insight: "Video content shows highest engagement across trends with 75% average engagement rate",
        action: "Prioritize video content production, especially short-form videos under 3 minutes",
        icon: "Play"
      },
      {
        title: "Audience Targeting Opportunity",
        insight: "25-34 age group shows strongest growth potential across all trends",
        action: "Focus campaign targeting on young professionals with personalized messaging",
        icon: "Users"
      },
      {
        title: "Platform Strategy",
        insight: "TikTok and YouTube lead in ROI and engagement metrics",
        action: "Reallocate 40% of marketing budget to these platforms for maximum impact",
        icon: "BarChart"
      },
      {
        title: "Competitive Edge",
        insight: "Market penetration in premium segment shows 20% gap vs competitors",
        action: "Develop premium offerings to capture untapped market potential",
        icon: "Target"
      },
      {
        title: "Cost Optimization",
        insight: "Customer acquisition costs 30% lower through social channels",
        action: "Scale social media campaigns while maintaining current engagement rates",
        icon: "TrendingUp"
      }
    ];
  };

  return (
    <TooltipProvider>
      <div className="space-y-3">
        {/* 1. Main Trend Chart - Compact */}
        <Card className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-medium">Trend Popularity</h2>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">Relative popularity based on engagement and mentions</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex gap-3">
              {trends.map((trend, i) => (
                <div key={i} className="flex items-center gap-1 text-xs">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: popularityData.datasets[i].borderColor }}
                  />
                  <span>{trend.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[200px]">
            <Line
              data={popularityData}
              options={{
                ...chartOptions,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                    padding: 8,
                    bodyFont: {
                      size: 11
                    }
                  }
                },
                scales: {
                  x: {
                    grid: { display: false },
                    ticks: { font: { size: 10 } }
                  },
                  y: {
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: { font: { size: 10 } }
                  }
                }
              }}
            />
          </div>
        </Card>

        {/* Actionable Insights */}
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-purple-900">Actionable Insights</h2>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-purple-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Key takeaways and recommended actions based on trend comparison</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-xs text-purple-600">Top 5 Strategic Recommendations</span>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {getActionableInsights(trends).map((item, i) => (
                <div key={i} className="space-y-2 p-3 bg-white rounded-lg border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2">
                    <IconComponent icon={item.icon} />
                    <h3 className="text-sm font-medium text-purple-900">{item.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600">{item.insight}</p>
                  <div className="pt-2 border-t border-purple-100">
                    <div className="flex items-center gap-1 text-xs text-purple-700">
                      <ArrowRight className="h-3 w-3" />
                      <span>{item.action}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 2. Key Metrics Grid - Compact */}
        <Card className="p-3">
          <div className="space-y-4">
            {/* Engagement Rate Row */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Key Metrics</h3>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Key performance indicators for each trend</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {trends.map((trend, i) => {
                  const metrics = getMetrics(trend);
                  return (
                    <div key={i} className="space-y-2">
                      <div className="text-sm font-medium">{trend.name}</div>
                      <div className="grid grid-cols-2 gap-2">
                        {/* Engagement */}
                        <div className="p-2 border rounded-lg">
                          <div className="text-xs text-muted-foreground">Engagement</div>
                          <div className="text-lg font-bold mt-1">
                            {metrics.engagement.value}
                            <span className="text-xs text-green-600 ml-1">↑{metrics.engagement.change}%</span>
                          </div>
                        </div>
                        {/* Virality */}
                        <div className="p-2 border rounded-lg">
                          <div className="text-xs text-muted-foreground">Virality</div>
                          <div className="text-lg font-bold mt-1">
                            {metrics.virality.value}
                            <span className="text-xs text-green-600 ml-1">↑{metrics.virality.change}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        {/* 3. Revenue Attribution */}
        <Card className="p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">Revenue Attribution</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Revenue breakdown by channel</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {trends.map((trend, i) => {
                const revenueData = getRevenueData(trend);
                return (
                  <div key={i} className="space-y-2">
                    <div className="text-sm font-medium">{trend.name}</div>

                    {/* Total Revenue */}
                    <div className="p-2 border rounded-lg">
                      <div className="text-xs text-muted-foreground">Total Revenue</div>
                      <div className="text-lg font-bold mt-1">
                        ${(revenueData.total / 1000000).toFixed(2)}M
                        <span className="text-xs text-green-600 ml-2">↑{revenueData.growth}%</span>
                      </div>
                    </div>

                    {/* Channel Distribution */}
                    <div className="space-y-2">
                      {revenueData.breakdown.map((channel, j) => (
                        <div key={j} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{channel.channel}</span>
                            <span className="font-medium">{Math.round(channel.percentage)}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1">
                            <div
                              className="bg-blue-500 h-1 rounded-full"
                              style={{ width: `${channel.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* 4. Content Performance */}
        <Card className="p-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">Content Performance</h3>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Engagement and virality metrics across content</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {trends.map((trend, i) => {
                const metrics = getMetrics(trend);
                return (
                  <div key={i} className="space-y-2">
                    <div className="text-sm font-medium">{trend.name}</div>
                    <div className="grid grid-cols-3 gap-2">
                      {/* Engagement */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="p-2 border rounded-lg cursor-help">
                            <div className="flex items-center justify-center mb-1">
                              <ArrowUp className="h-3 w-3 text-green-500" />
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{metrics.engagement.value}k</div>
                              <div className="text-xs text-muted-foreground">Engagements</div>
                              <div className="text-xs text-green-600 mt-1">+{metrics.engagement.change}%</div>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Total likes, comments, and interactions</p>
                        </TooltipContent>
                      </Tooltip>

                      {/* Shares */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="p-2 border rounded-lg cursor-help">
                            <div className="flex items-center justify-center mb-1">
                              <Share2 className="h-3 w-3 text-blue-500" />
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{metrics.shareability.value}%</div>
                              <div className="text-xs text-muted-foreground">Share Rate</div>
                              <div className="text-xs text-green-600 mt-1">+{metrics.shareability.change}%</div>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Content sharing frequency and reach</p>
                        </TooltipContent>
                      </Tooltip>

                      {/* Virality */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="p-2 border rounded-lg cursor-help">
                            <div className="flex items-center justify-center mb-1">
                              <Zap className="h-3 w-3 text-yellow-500" />
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{metrics.virality.value}</div>
                              <div className="text-xs text-muted-foreground">Viral Score</div>
                              <div className="text-xs text-green-600 mt-1">+{metrics.virality.change}%</div>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Viral potential and spread rate</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* 5. Content Format Performance */}
        <Card className="p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">Content Format Performance</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Performance metrics by content type</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {trends.map((trend, i) => {
                const formatData = getContentFormatData(trend);
                return (
                  <div key={i} className="space-y-2">
                    <div className="text-sm font-medium">{trend.name}</div>
                    <div className="space-y-2">
                      {formatData.formats.map((format, j) => (
                        <Tooltip key={j}>
                          <TooltipTrigger asChild>
                            <div className="p-2 border rounded-lg cursor-help">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1.5">
                                  <IconComponent icon={format.icon} />
                                  <span className="text-xs">{format.type}</span>
                                </div>
                                <span className="text-xs text-green-600">↑{format.growth}%</span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-1.5">
                                <div
                                  className="bg-blue-600 h-1.5 rounded-full"
                                  style={{ width: `${format.engagement}%` }}
                                />
                              </div>
                              <div className="mt-1 text-right">
                                <span className="text-xs font-medium">{format.engagement}%</span>
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1">
                              <p className="text-xs font-medium">{format.type} Content Performance</p>
                              <p className="text-xs text-muted-foreground">{format.engagement}% engagement rate</p>
                              <p className="text-xs text-green-600">{format.growth}% growth in last 30 days</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* 6. Audience Demographics */}
        <Card className="p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">Audience Demographics</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Age distribution and demographic breakdown</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {trends.map((trend, i) => {
                const demographics = getDemographicsData(trend);
                return (
                  <div key={i} className="space-y-2">
                    <div className="text-sm font-medium">{trend.name}</div>

                    {/* Age Distribution Pie Chart */}
                    <div className="h-[140px] flex items-center justify-center">
                      <Pie
                        data={demographics.ageData}
                        options={{
                          ...pieOptions,
                          plugins: {
                            legend: {
                              position: 'right',
                              labels: {
                                boxWidth: 8,
                                font: { size: 9 }
                              }
                            }
                          }
                        }}
                      />
                    </div>

                    {/* Demographics Stats */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Gender</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs">Male</span>
                            <span className="text-xs font-medium">58%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1">
                            <div className="bg-blue-500 h-1 rounded-full" style={{ width: '58%' }} />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs">Female</span>
                            <span className="text-xs font-medium">42%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1">
                            <div className="bg-pink-500 h-1 rounded-full" style={{ width: '42%' }} />
                          </div>
                        </div>
                      </div>

                      <div className="p-2 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Location</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs">Urban</span>
                            <span className="text-xs font-medium">75%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1">
                            <div className="bg-purple-500 h-1 rounded-full" style={{ width: '75%' }} />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs">Rural</span>
                            <span className="text-xs font-medium">25%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1">
                            <div className="bg-green-500 h-1 rounded-full" style={{ width: '25%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Demographics Insights */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="p-2 border rounded-lg cursor-help">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Primary Audience</span>
                            <span className="text-xs font-medium">25-34 yrs</span>
                          </div>
                          <div className="text-xs text-green-600 mt-1">40% of total audience</div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Most engaged age group with highest interaction rate</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* 7. Platform Performance */}
        <Card className="p-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">Platform Performance</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Performance metrics across different marketing channels</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {trends.map((trend, i) => {
                const platformData = getPlatformData(trend);
                return (
                  <div key={i} className="space-y-2">
                    <div className="text-sm font-medium">{trend.name}</div>
                    {platformData.platforms.map((platform, j) => (
                      <Tooltip key={j}>
                        <TooltipTrigger asChild>
                          <div className="p-2 border rounded-lg cursor-help">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">{platform.name}</span>
                              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                platform.performance === 'Very High' ? 'bg-green-100 text-green-700' :
                                platform.performance === 'High' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {platform.performance}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">Engagement</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-medium">{platform.engagement}%</span>
                                  <span className="text-xs text-green-600">↑{platform.growth}%</span>
                                </div>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-1">
                                <div
                                  className="bg-blue-600 h-1 rounded-full"
                                  style={{ width: `${platform.engagement}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-medium">Reach: {platform.reach.toLocaleString()}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* 8. Competitor Analysis */}
        <Card className="p-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">Competitor Analysis</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Competitive landscape analysis and market positioning</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {trends.map((trend, i) => {
                const competitorData = getCompetitorData(trend);
                return (
                  <div key={i} className="space-y-2">
                    <div className="text-sm font-medium">{trend.name}</div>

                    {/* Adoption Rate */}
                    <div className="p-2 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">Competitor Adoption</span>
                        <span className="text-xs text-green-600">↑{competitorData.adoption.change}%</span>
                      </div>
                      <div className="space-y-1.5">
                        {competitorData.adoption.competitors.map((comp, j) => (
                          <div key={j} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{comp.name}</span>
                              <span className="font-medium">{comp.value}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1">
                              <div
                                className="bg-blue-500 h-1 rounded-full"
                                style={{ width: `${comp.value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Market Penetration */}
                    <div className="p-2 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">Market Penetration</span>
                        <span className="text-xs text-green-600">↑{competitorData.penetration.change}%</span>
                      </div>
                      <div className="space-y-1.5">
                        {competitorData.penetration.marketShare.map((segment, j) => (
                          <div key={j} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{segment.segment}</span>
                              <span className="font-medium">{segment.share}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1">
                              <div
                                className="bg-purple-500 h-1 rounded-full"
                                style={{ width: `${segment.share}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Brand Sentiment */}
                    <div className="p-2 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">Brand Sentiment</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium">{competitorData.sentiment.breakdown.overall}</span>
                          <span className="text-xs text-yellow-500">★</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(competitorData.sentiment.breakdown).map(([key, value], j) => (
                          <div key={j} className="flex items-center justify-between text-xs">
                            <span className="capitalize">{key}</span>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{value}</span>
                              <span className="text-yellow-500">★</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trend Chart */}
                    <div className="p-2 border rounded-lg">
                      <div className="text-xs text-muted-foreground mb-2">Adoption Trend</div>
                      <div className="h-[100px]">
                        <Line
                          data={getCompetitorTrendData(trend)}
                          options={{
                            ...chartOptions,
                            plugins: {
                              legend: { display: false },
                              tooltip: {
                                mode: 'index',
                                intersect: false,
                                bodyFont: { size: 10 }
                              }
                            },
                            scales: {
                              x: {
                                display: false
                              },
                              y: {
                                display: false,
                                min: 0,
                                max: 100
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* 9. ROI Analysis */}
        <Card className="p-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">ROI Analysis</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Return on Investment metrics and cost analysis</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {trends.map((trend, i) => {
                const roiData = getROIData(trend);
                return (
                  <div key={i} className="space-y-2">
                    <div className="text-sm font-medium">{trend.name}</div>

                    {/* Lead Generation */}
                    <div className="p-2 border rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Lead Generation</span>
                        <span className="text-xs text-green-600">↑{roiData.leadGeneration.growth}%</span>
                      </div>
                      <div className="text-lg font-bold">
                        {roiData.leadGeneration.value.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-muted-foreground">Quality Score:</span>
                        <span className="text-xs font-medium">{roiData.leadGeneration.quality}%</span>
                      </div>
                    </div>

                    {/* Cost per Engagement */}
                    <div className="p-2 border rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Cost per Engagement</span>
                        <span className="text-xs text-green-600">↓{Math.abs(roiData.costPerEngagement.change)}%</span>
                      </div>
                      <div className="text-lg font-bold">
                        ${roiData.costPerEngagement.value}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-muted-foreground">Industry Avg:</span>
                        <span className="text-xs font-medium">${roiData.costPerEngagement.benchmark}</span>
                      </div>
                    </div>

                    {/* Conversion Rate */}
                    <div className="p-2 border rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Conversion Rate</span>
                        <span className="text-xs text-green-600">↑{roiData.conversionRate.growth}%</span>
                      </div>
                      <div className="text-lg font-bold">
                        {roiData.conversionRate.value}%
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-muted-foreground">Industry Avg:</span>
                        <span className="text-xs font-medium">{roiData.conversionRate.industry}%</span>
                      </div>
                    </div>

                    {/* Acquisition Cost */}
                    <div className="p-2 border rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Acquisition Cost</span>
                        <span className="text-xs text-green-600">↓{Math.abs(roiData.acquisitionCost.change)}%</span>
                      </div>
                      <div className="text-lg font-bold">
                        ${roiData.acquisitionCost.value}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-muted-foreground">Industry Avg:</span>
                        <span className="text-xs font-medium">${roiData.acquisitionCost.industry}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* 10. ROI Trends */}
        <Card className="p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">ROI Trends</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Return on Investment trends over time</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {trends.map((trend, i) => {
                const roiTrendData = getROITrendData(trend);
                return (
                  <div key={i} className="space-y-2">
                    <div className="text-sm font-medium">{trend.name}</div>
                    <div className="p-2 border rounded-lg">
                      <div className="h-[150px]">
                        <Line
                          data={roiTrendData}
                          options={{
                            ...chartOptions,
                            plugins: {
                              legend: {
                                display: true,
                                position: 'bottom',
                                labels: {
                                  boxWidth: 8,
                                  usePointStyle: true,
                                  font: { size: 10 }
                                }
                              },
                              tooltip: {
                                mode: 'index',
                                intersect: false,
                                bodyFont: { size: 10 }
                              }
                            },
                            scales: {
                              x: {
                                grid: { display: false },
                                ticks: { font: { size: 9 } }
                              },
                              y: {
                                beginAtZero: false,
                                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                                ticks: {
                                  font: { size: 9 },
                                  callback: (value) => `${value}%`
                                }
                              }
                            }
                          }}
                        />
                      </div>
                      <div className="mt-2 text-xs text-center text-muted-foreground">
                        6-month ROI performance vs Industry Average
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* 11. Predictive Trends */}
        <Card className="p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">Predictive Analysis</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">6-month trend projections with confidence intervals</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {trends.map((trend, i) => {
                const predictiveData = getPredictiveTrendData(trend);
                return (
                  <div key={i} className="space-y-2">
                    <div className="text-sm font-medium">{trend.name}</div>

                    {/* Prediction Chart */}
                    <div className="p-2 border rounded-lg">
                      <div className="h-[150px]">
                        <Line
                          data={{
                            labels: predictiveData.labels,
                            datasets: predictiveData.datasets
                          }}
                          options={{
                            ...chartOptions,
                            plugins: {
                              legend: {
                                display: false
                              },
                              tooltip: {
                                callbacks: {
                                  label: (context) => {
                                    if (context.datasetIndex === 0) {
                                      return `Predicted: ${context.parsed.y}`;
                                    }
                                    return '';
                                  }
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Prediction Insights */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 border rounded-lg">
                        <div className="text-xs text-muted-foreground">Growth Rate</div>
                        <div className="text-lg font-bold mt-1">
                          {predictiveData.insights.growthRate}%
                          <span className="text-xs text-green-600 ml-1">projected</span>
                        </div>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <div className="text-xs text-muted-foreground">Confidence</div>
                        <div className="text-lg font-bold mt-1">
                          {predictiveData.insights.confidence}%
                        </div>
                      </div>
                    </div>

                    {/* Growth Factors */}
                    <div className="p-2 border rounded-lg">
                      <div className="text-xs text-muted-foreground mb-2">Key Growth Factors</div>
                      <div className="space-y-1">
                        {predictiveData.insights.factors.map((factor, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span>{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* 12. Scenario Analysis */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Scenario Analysis</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Different growth scenarios and their probabilities</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {trends.map((trend, i) => {
                const { scenarios } = getScenarioData(trend);
                return (
                  <div key={i} className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium mb-3">{trend.name}</h4>
                    <div className="space-y-3">
                      {scenarios.map((scenario, j) => (
                        <div key={j} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{scenario.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full bg-${scenario.color}-100 text-${scenario.color}-700`}>
                              {scenario.probability}% probability
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-100 rounded-full">
                              <div
                                className={`h-2 bg-${scenario.color}-500 rounded-full`}
                                style={{ width: `${scenario.growth}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium">{scenario.growth}% growth</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* 13. Risk Assessment */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Risk Assessment</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Key risk factors and mitigation strategies</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {trends.map((trend, i) => {
                const { risks } = getScenarioData(trend);
                return (
                  <div key={i} className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium mb-3">{trend.name}</h4>
                    <div className="space-y-3">
                      {risks.map((risk, j) => (
                        <Tooltip key={j}>
                          <TooltipTrigger asChild>
                            <div className="space-y-1 cursor-help">
                              <div className="flex justify-between text-sm">
                                <span>{risk.type}</span>
                                <span className={`text-xs ${
                                  risk.status === 'Increasing' ? 'text-red-600' :
                                  risk.status === 'Decreasing' ? 'text-green-600' :
                                  'text-blue-600'
                                }`}>
                                  {risk.status}
                                </span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    risk.level > 66 ? 'bg-red-500' :
                                    risk.level > 33 ? 'bg-orange-500' :
                                    'bg-green-500'
                                  }`}
                                  style={{ width: `${risk.level}%` }}
                                />
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-medium">Risk Level: {risk.level}%</p>
                            <p className="text-xs mt-1">Mitigation: {risk.mitigation}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
}

function getRandomColor() {
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

const IconComponent = ({ icon }: { icon: string }) => {
  const iconMap = {
    'Play': Play,
    'Image': Image,
    'CirclePlay': CirclePlay,
    'FileText': FileText,
    'Users': Users,
    'BarChart': BarChart,
    'Target': Target,
    'TrendingUp': TrendingUp
  };

  const Icon = iconMap[icon as keyof typeof iconMap];
  return Icon ? <Icon className="h-3 w-3 text-muted-foreground" /> : null;
};
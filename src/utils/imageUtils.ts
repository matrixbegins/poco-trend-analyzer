const FALLBACK_IMAGES = {
  default: '/images/fallback/technology.svg',
  categories: {
    manufacturing: '/images/fallback/manufacturing.svg',
    technology: '/images/fallback/technology.svg',
    logistics: '/images/fallback/logistics.svg',
    automation: '/images/fallback/automation.svg',
    innovation: '/images/fallback/innovation.svg',
    maintenance: '/images/fallback/maintenance.svg',
    iot: '/images/fallback/iot.svg',
    quality: '/images/fallback/quality.svg',
    sustainability: '/images/fallback/sustainability.svg',
    training: '/images/fallback/training.svg',
    security: '/images/fallback/security.svg',
    cloud: '/images/fallback/cloud.svg',
    analytics: '/images/fallback/analytics.svg',
  } as Record<string, string>
};

export const getImageUrl = (category: string, id: string) => {
  // Use a more reliable image service
  return `https://picsum.photos/seed/${category.toLowerCase()}-${id}/800/400`;
};

export const getFallbackImage = (category: string) => {
  return FALLBACK_IMAGES.categories[category.toLowerCase()] || FALLBACK_IMAGES.default;
};
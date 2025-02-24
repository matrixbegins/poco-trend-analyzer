
import fs from 'fs';
import path from 'path';


const categories = {
  technology: { color: '#f3f4f6', text: '#6b7280' },
  manufacturing: { color: '#fef3c7', text: '#92400e' },
  logistics: { color: '#e0e7ff', text: '#4338ca' },
  automation: { color: '#f3e8ff', text: '#7e22ce' },
  innovation: { color: '#ecfeff', text: '#0e7490' },
  maintenance: { color: '#f0fdf4', text: '#166534' },
  iot: { color: '#fff1f2', text: '#be123c' },
  quality: { color: '#fdf4ff', text: '#a21caf' },
  sustainability: { color: '#f0fdfa', text: '#0f766e' },
  training: { color: '#fff7ed', text: '#c2410c' },
  security: { color: '#fef2f2', text: '#b91c1c' },
  cloud: { color: '#f8fafc', text: '#0369a1' },
  analytics: { color: '#f5f3ff', text: '#5b21b6' },
};

const generateSVG = (category, { color, text }) => `
<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}"/>
  <text x="50%" y="45%" font-family="system-ui" font-size="24" fill="${text}" text-anchor="middle">
    ${category.charAt(0).toUpperCase() + category.slice(1)}
  </text>
  <text x="50%" y="55%" font-family="system-ui" font-size="16" fill="${text}" text-anchor="middle">
    Placeholder Image
  </text>
</svg>
`;

const fallbackDir = path.join(process.cwd(), 'public', 'images', 'fallback');

// Create directory if it doesn't exist
if (!fs.existsSync(fallbackDir)) {
  fs.mkdirSync(fallbackDir, { recursive: true });
}

// Generate SVG files
Object.entries(categories).forEach(([category, colors]) => {
  const svg = generateSVG(category, colors);
  fs.writeFileSync(path.join(fallbackDir, `${category}.svg`), svg);
});
import {
  Play,
  Image,
  CirclePlay,
  FileText,
  Users,
  BarChart,
  Target,
  TrendingUp
} from 'lucide-react';

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

interface IconComponentProps {
  icon: string;
  className?: string;
}

export const IconComponent = ({ icon, className = "h-3 w-3 text-muted-foreground" }: IconComponentProps) => {
  const Icon = iconMap[icon as keyof typeof iconMap];
  return Icon ? <Icon className={className} /> : null;
};
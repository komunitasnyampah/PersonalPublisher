import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return "just now";
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInHours < 48) {
    return "1 day ago";
  } else if (diffInHours < 168) {
    return `${Math.floor(diffInHours / 24)} days ago`;
  } else {
    return d.toLocaleDateString();
  }
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getCategoryColor(categoryName: string): string {
  const colors: Record<string, string> = {
    'Environment': 'bg-green-100 text-green-700',
    'Renewable Energy': 'bg-yellow-100 text-yellow-700',
    'Economy': 'bg-blue-100 text-blue-700',
    'Decentralized Tech': 'bg-purple-100 text-purple-700',
  };
  return colors[categoryName] || 'bg-gray-100 text-gray-700';
}

export function getTagColor(tagName: string): string {
  const colors: Record<string, string> = {
    'Solar': 'bg-green-100 text-green-600',
    'Blockchain': 'bg-blue-100 text-blue-600',
    'Sustainability': 'bg-amber-100 text-amber-600',
    'DeFi': 'bg-purple-100 text-purple-600',
    'Wind Energy': 'bg-green-100 text-green-600',
    'Carbon Credits': 'bg-gray-100 text-gray-600',
  };
  return colors[tagName] || 'bg-gray-100 text-gray-600';
}

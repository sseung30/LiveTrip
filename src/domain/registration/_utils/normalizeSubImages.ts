import { ActivityDetail } from '@/domain/activities/api';

export const normalizeSubImages = (data?: ActivityDetail): string[] => {
  if (!data) return [];
  if (Array.isArray(data.subImageUrls)) return data.subImageUrls;
  if (Array.isArray((data as any).subImages)) {
    const arr = (data as any).subImages as Array<string | { imageUrl: string }>;
    return arr
      .map((item) => (typeof item === 'string' ? item : item.imageUrl))
      .filter(Boolean);
  }
  return [];
};

import type { ActivityDetail } from '@/domain/activities/type';

export const normalizeSubImages = (data?: ActivityDetail): string[] => {
  if (!data) {
    return [];
  }
  if (Array.isArray(data.subImageUrls)) {
    return data.subImageUrls;
  }
  if (Array.isArray(data.subImages)) {
    const arr = data.subImages as (string | { imageUrl: string })[];

    return arr
      .map((item) => (typeof item === 'string' ? item : item.imageUrl))
      .filter(Boolean);
  }

  return [];
};

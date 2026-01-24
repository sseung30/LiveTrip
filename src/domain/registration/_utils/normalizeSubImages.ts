import type { ActivityDetailResponse } from '@/domain/activities/type';

export const normalizeSubImages = (data?: ActivityDetailResponse): string[] => {
  if (!data) {
    return [];
  }
  if (Array.isArray(data.subImageUrls)) {
    return data.subImageUrls;
  }
  if (Array.isArray((data as any).subImages)) {
    const arr = (data as any).subImages as (string | { imageUrl: string })[];

    return arr
      .map((item) => (typeof item === 'string' ? item : item.imageUrl))
      .filter(Boolean);
  }

  return [];
};

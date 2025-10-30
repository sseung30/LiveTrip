import {
  getActivitiyAvailableSchedule,
  getActivitiyReviews,
  getAllActivitiesWithCache,
  getDetailActivity,
} from '@/domain/activities/api';
import type {
  activityCategory,
  getAllActivitiesParams,
  sortType,
} from '@/domain/activities/type';

export const queryKeys = {
  all: (category?: activityCategory, sort?: sortType, keyword?: string) => {
    return [
      'activities',
      {
        category,
        sort,
        keyword,
      },
    ] as const;
  },
  detail: (activityId: number) => ['activity', activityId] as const,
  schedules: (activityId: number) => {
    return [...queryKeys.detail(activityId), 'schedules'] as const;
  },
  reviews: (activityId: number) =>
    [...queryKeys.detail(activityId), 'reviews'] as const,
};

export const queryOptions = {
  all: (params: getAllActivitiesParams) => {
    const { category, sort, size, method, keyword } = params;

    return {
      queryKey: queryKeys.all(category, sort || 'latest', keyword),
      queryFn: () =>
        getAllActivitiesWithCache({ category, sort, size, method, keyword }),
    };
  },
  detail: (activityId: number) => {
    return {
      queryKey: queryKeys.detail(activityId),
      queryFn: () => {
        getDetailActivity();
      },
    };
  },
  schedules: (activityId: number) => {
    return {
      queryKey: queryKeys.schedules(activityId),
      queryFn: () => {
        getActivitiyAvailableSchedule();
      },
    };
  },
  reviews: (activityId: number) => {
    return {
      queryKey: queryKeys.reviews(activityId),
      queryFn: () => {
        getActivitiyReviews();
      },
    };
  },
};

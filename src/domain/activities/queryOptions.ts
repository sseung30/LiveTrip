import {
  getActivitiyAvailableSchedule,
  getActivitiyReviews,
  getDetailActivity,
} from '@/domain/activities/api';

export const queryKeys = {
  all: (category: string | undefined, sort: string | undefined) => {
    return ['activities', category, sort] as const;
  },
  detail: (activityId: number) => ['activity', activityId] as const,
  schedules: (activityId: number) => {
    return [...queryKeys.detail(activityId), 'schedules'] as const;
  },
  reviews: (activityId: number) =>
    [...queryKeys.detail(activityId), 'reviews'] as const,
};

export const queryOptions = {
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

import {
  getActivitiyAvailableSchedule,
  getActivitiyReviews,
  getDetailActivity,
} from '@/domain/activities/api';

const queryKeys = {
  all: ['activities'] as const,
  detail: (activityId: number) => [...queryKeys.all, activityId] as const,
  schedules: (activityId: number) => {
    return [...queryKeys.detail(activityId), 'schedules'] as const;
  },
  reviews: (activityId: number) =>
    [...queryKeys.detail(activityId), 'reviews'] as const,
};

const queryOptions = {
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

export default queryOptions;

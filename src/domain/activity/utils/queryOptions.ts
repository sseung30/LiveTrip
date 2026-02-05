import {
  getActivityDetail,
  getActivityReviews,
  getAllActivitiesWithCache,
  getAvailableSchedules,
  getMyActivities,
} from '@/domain/activity/api';
import type {
  activityCategory,
  getAllActivitiesParams,
  sortType,
  useInfiniteActivitiesParams,
} from '@/domain/activity/types';

export const activityQueryKeys = {
  /**
   * 활동 조회
   */
  all: (category?: activityCategory, sort?: sortType, keyword?: string) => [
    'activities',
    { category, sort, keyword },
  ],
  detail: (id: number) => ['activities', id],
  reviews: (id: number) => ['activities', id, 'reviews'],
  availableSchedules: (id: number, date: string) => [
    'activities',
    id,
    'schedules',
    date,
  ],

  /**
   * 내 활동 관리
   */
  my: (params?: useInfiniteActivitiesParams) => ['my-activities', params],
  /**
   * 검색 관련
   */
  search: (params: useInfiniteActivitiesParams) => [
    'activities',
    'search',
    params,
  ],
} as const;

export const activityQueryOptions = {
  all: (params: getAllActivitiesParams) => {
    const { category, sort, size, method, keyword } = params;

    return {
      queryKey: activityQueryKeys.all(category, sort || 'latest', keyword),
      queryFn: () =>
        getAllActivitiesWithCache({ category, sort, size, method, keyword }),
    };
  },
  detail: (id: number) => ({
    queryKey: activityQueryKeys.detail(id),
    queryFn: () => getActivityDetail(id),
  }),
  reviews: (id: number) => ({
    queryKey: activityQueryKeys.reviews(id),
    queryFn: () => getActivityReviews(id),
  }),
  availableSchedules: (id: number, date: string) => ({
    queryKey: activityQueryKeys.availableSchedules(id, date),
    queryFn: () => getAvailableSchedules(id, '2024', '01'),
  }),
  my: (params?: useInfiniteActivitiesParams) => ({
    queryKey: activityQueryKeys.my(params),
    queryFn: () => getMyActivities(params),
  }),
};

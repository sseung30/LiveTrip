import { getAllActivitiesWithCache } from '@/domain/activities/api';
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
};

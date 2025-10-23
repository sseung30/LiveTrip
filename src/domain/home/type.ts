import type { activityCategory, sortType } from '@/domain/activities/type';

export interface homeSearchParams {
  page?: string;
  sort?: sortType;
  categoryIndex?: string;
  descending?: string;
}
export type homeCategoryStateType = activityCategory | '';
export interface AllActivitySectionProps {
  page?: number;
  sort?: sortType;
  categoryIndex?: number;
  isDescending?: boolean;
}

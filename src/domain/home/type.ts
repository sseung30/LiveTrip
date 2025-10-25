import type { activityCategory, sortType } from '@/domain/activities/type';

export interface homeSearchParams {
  sort?: sortType;
  category?: string;
}
export type homeCategoryStateType = activityCategory | '';
export interface AllActivitySectionProps {
  sort?: sortType;
  category?: string;
}
export type AllActivityDataWrapperProps = AllActivitySectionProps;
export type useInfiniteActivitiesParams = AllActivitySectionProps;

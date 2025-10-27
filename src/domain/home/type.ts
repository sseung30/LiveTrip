import type { activityCategory, sortType } from '@/domain/activities/type';

export interface homeSearchParams {
  sort?: sortType;
  category?: activityCategory;
}
export interface AllActivitySectionProps {
  sort?: sortType;
  category?: activityCategory;
}
export type AllActivityDataWrapperProps = AllActivitySectionProps;
export type useInfiniteActivitiesParams = AllActivitySectionProps;

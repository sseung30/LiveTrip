import { useQuery } from '@tanstack/react-query';
import queryOptions from '@/domain/activities/queryOptions';
import type { getAllActivitiesParams } from '@/domain/activities/type';

export function useActivities(params: getAllActivitiesParams) {
  return useQuery(queryOptions.all(params));
}
export function useDetailActivity({ activityId }: { activityId: number }) {
  return useQuery(queryOptions.detail(activityId));
}
export function useSchedules({ activityId }: { activityId: number }) {
  return useQuery(queryOptions.schedules(activityId));
}
export function useReviews({ activityId }: { activityId: number }) {
  return useQuery(queryOptions.reviews(activityId));
}

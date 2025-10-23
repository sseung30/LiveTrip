import { useQuery } from '@tanstack/react-query';
import queryOptions from '@/domain/activities/queryOptions';

export function useDetailActivity({ activityId }: { activityId: number }) {
  return useQuery(queryOptions.detail(activityId));
}
export function useSchedules({ activityId }: { activityId: number }) {
  return useQuery(queryOptions.schedules(activityId));
}
export function useReviews({ activityId }: { activityId: number }) {
  return useQuery(queryOptions.reviews(activityId));
}

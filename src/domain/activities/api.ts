/* eslint-disable @typescript-eslint/no-empty-function */
import { apiFetch } from '@/api/api';
import type {
  getAllActivitiesParams,
  getAllActivitiesResponse,
} from '@/domain/activities/type';

export const getAllActivities = async (
  params: getAllActivitiesParams
): Promise<getAllActivitiesResponse> => {
  const endpoint = '/activities?';
  const queryString = new URLSearchParams(
    params as unknown as Record<string, string>
  );

  queryString.append('method', 'cursor');

  return apiFetch(`${endpoint}${queryString}`);
};
export const getDetailActivity = () => {};
export const getActivitiyAvailableSchedule = () => {};
export const getActivitiyReviews = () => {};

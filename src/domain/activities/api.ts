/* eslint-disable @typescript-eslint/no-empty-function */
import { apiFetch } from '@/api/api';
import createQueryString from '@/api/create-query-string';
import type {
  getAllActivitiesParams,
  getAllActivitiesResponse,
} from '@/domain/activities/type';

export const getAllActivitiesWithCache = async (
  params: getAllActivitiesParams
): Promise<getAllActivitiesResponse> => {
  const endpoint = '/activities?';
  const queryString = createQueryString(params);

  return apiFetch(`${endpoint}${queryString}`, {
    next: { revalidate: 10 },
  });
};
export const getDetailActivity = () => {};
export const getActivitiyAvailableSchedule = () => {};
export const getActivitiyReviews = () => {};

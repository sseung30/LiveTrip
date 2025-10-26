/* eslint-disable @typescript-eslint/no-empty-function */
import { apiFetch } from '@/api/api';
import createQueryString from '@/api/create-query-string';
import type {
  getAllActivitiesParams,
  getAllActivitiesResponse,
} from '@/domain/activities/type';

const _ALL_ACTIVITIES_ENDPOINT = '/activities?';

export const getAllActivitiesWithCache = async (
  params: getAllActivitiesParams
): Promise<getAllActivitiesResponse> => {
  const queryString = createQueryString(params);

  return apiFetch(`${_ALL_ACTIVITIES_ENDPOINT}${queryString}`, {
    next: { revalidate: 10 },
  });
};
export const getAllActivities = async (
  params: getAllActivitiesParams
): Promise<getAllActivitiesResponse> => {
  const queryString = createQueryString(params);

  return apiFetch(`${_ALL_ACTIVITIES_ENDPOINT}${queryString}`);
};
export const getDetailActivity = () => {};
export const getActivitiyAvailableSchedule = () => {};
export const getActivitiyReviews = () => {};

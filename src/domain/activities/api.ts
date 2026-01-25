import { apiFetch } from '@/api/api';
import createQueryString from '@/api/create-query-string';
import type {
  ActivityDetailResponse,
  getAllActivitiesParams,
  getAllActivitiesResponse,
} from '@/domain/activities/type';

const _ALL_ACTIVITIES_ENDPOINT = '/activities?';

export const getAllActivitiesCacheTag = 'activities';

export const getAllActivitiesWithCache = async (
  params: getAllActivitiesParams
): Promise<getAllActivitiesResponse> => {
  const queryString = createQueryString(params);

  return apiFetch(`${_ALL_ACTIVITIES_ENDPOINT}${queryString}`, {
    next: { tags: [getAllActivitiesCacheTag] },
  });
};

export const getAllActivities = async (
  params: getAllActivitiesParams
): Promise<getAllActivitiesResponse> => {
  const queryString = createQueryString(params);

  return apiFetch(`${_ALL_ACTIVITIES_ENDPOINT}${queryString}`);
};

export const getActivity = async (
  id: number | string
): Promise<ActivityDetailResponse> => {
  return apiFetch<ActivityDetailResponse>(`/activities/${id}`);
};

/* eslint-disable @typescript-eslint/no-empty-function */
import { apiFetch } from '@/api/api';
import createQueryString from '@/api/create-query-string';
import { fetchRevalidateByTag } from '@/api/revalidate-fetch';
import type {
  getAllActivitiesParams,
  getAllActivitiesResponse,
  Activity,
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

// Detail type used by edit form. Kept flexible to avoid tight coupling.
export interface ActivityDetail extends Activity {
  // Some APIs return subImageUrls (string[]), others return subImages as objects
  subImageUrls?: string[];
  subImages?: Array<string | { id?: number; imageUrl: string }>;
  schedules?: Array<{ date: string; startTime: string; endTime: string }>;
}

export const getActivity = async (
  id: number | string
): Promise<ActivityDetail> => {
  return apiFetch<ActivityDetail>(`/activities/${id}`);
};

// Owner detail for editing: includes IDs for subImages and schedules
export interface MyActivityDetail extends Activity {
  subImages: Array<{ id: number; imageUrl: string }>;
  schedules: Array<{
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  }>;
}

export const getMyActivity = async (
  id: number | string
): Promise<MyActivityDetail> => {
  return apiFetch<MyActivityDetail>(`/my-activities/${id}`);
};

export type UpdateActivityPayload = Partial<{
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  // For edit endpoint contract
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: Array<{ date: string; startTime: string; endTime: string }>;
}>;

export const updateActivity = async (
  id: number | string,
  payload: UpdateActivityPayload
): Promise<ActivityDetail> => {
  // Update endpoint is under my-activities for owner-scoped modifications
  const res = await apiFetch<ActivityDetail>(`/my-activities/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  await fetchRevalidateByTag(getAllActivitiesCacheTag);
  await fetchRevalidateByTag(String(id));
  return res;
};
export const createActivity = async (payload: any) => {
  const res = await apiFetch('/activities', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  await fetchRevalidateByTag(getAllActivitiesCacheTag);
  return res;
};

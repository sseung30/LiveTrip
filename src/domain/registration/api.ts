import { apiFetch } from '@/api/api';
import { fetchRevalidateByTag } from '@/api/revalidate-fetch';
import { getAllActivitiesCacheTag } from '@/domain/activities/api';
import type { ActivityDetailResponse } from '@/domain/activities/type';
import type { UpdateActivityPayload } from '@/domain/registration/types';

export const updateActivity = async (
  id: number | string,
  payload: UpdateActivityPayload
): Promise<ActivityDetailResponse> => {
  // Update endpoint is under my-activities for owner-scoped modifications
  const res = await apiFetch<ActivityDetailResponse>(`/my-activities/${id}`, {
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

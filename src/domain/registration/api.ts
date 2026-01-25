import { apiFetch } from '@/api/api';
import { fetchRevalidateByTag } from '@/api/revalidate-fetch';
import { activityCacheTag } from '@/domain/activities/api';
import type { ActivityDetail } from '@/domain/activities/type';
import type { UpdateActivityPayload } from '@/domain/registration/types';

export const updateActivity = async (
  id: number | string,
  payload: UpdateActivityPayload
): Promise<ActivityDetail> => {
  // Update endpoint is under my-activities for owner-scoped modifications
  const res = await apiFetch<ActivityDetail>(`/my-activities/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

  await fetchRevalidateByTag(activityCacheTag.all());
  await fetchRevalidateByTag(String(id));

  return res;
};

export const createActivity = async (payload: any) => {
  const res = await apiFetch('/activities', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  await fetchRevalidateByTag(activityCacheTag.all());

  return res;
};

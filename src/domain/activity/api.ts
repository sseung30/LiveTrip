import { ApiError, apiFetch } from '@/api/api';
import createQueryString from '@/api/create-query-string';
import { fetchRevalidateByTag } from '@/api/revalidate-fetch';
import type {
  ActivityDetail,
  AvailableSchedule,
  getAllActivitiesParams,
  getAllActivitiesResponse,
  MyActivities,
  ReservationRequest,
  ReservationResponse,
  ReviewResponse,
  UpdateActivityPayload,
  useInfiniteActivitiesParams,
} from '@/domain/activity/types';

const _ALL_ACTIVITIES_ENDPOINT = '/activities?';

export const activityCacheTag = {
  all: () => ['activities'],
  detail: (activityId: string | number) => [
    ...activityCacheTag.all(),
    String(activityId),
  ],
  reviews: (activityId: number) => ['reviews', String(activityId)],
  my: () => ['my-activities'],
};

/**
 * Activity API
 */
export const getAllActivitiesWithCache = async (
  params: getAllActivitiesParams
): Promise<getAllActivitiesResponse> => {
  const queryString = createQueryString(params);

  return apiFetch(`${_ALL_ACTIVITIES_ENDPOINT}${queryString}`, {
    next: { tags: [...activityCacheTag.all()] },
  });
};

export const getAllActivities = async (
  params: getAllActivitiesParams
): Promise<getAllActivitiesResponse> => {
  const queryString = createQueryString(params);

  return apiFetch(`${_ALL_ACTIVITIES_ENDPOINT}${queryString}`);
};

/**
 * Activity detail API
 */
export const getActivityDetail = async (
  activityId: number | string
): Promise<ActivityDetail> => {
  return apiFetch<ActivityDetail>(`/activities/${activityId}`);
};

export const getActivityDetailWithCache = async (
  activityId: number | string
): Promise<ActivityDetail> => {
  return apiFetch<ActivityDetail>(`/activities/${activityId}`, {
    next: { tags: [...activityCacheTag.detail(activityId)] },
  });
};

/**
 * Activity 리뷰 리스트 API
 */
export const getActivityReviews = async (
  activityId: number,
  page = 1,
  size = 3
): Promise<ReviewResponse> => {
  return apiFetch<ReviewResponse>(
    `/activities/${activityId}/reviews?page=${page}&size=${size}`
  );
};

export const getActivityReviewsWithCache = async (
  activityId: number,
  page = 1,
  size = 3
): Promise<ReviewResponse> => {
  return apiFetch<ReviewResponse>(
    `/activities/${activityId}/reviews?page=${page}&size=${size}`,
    {
      next: { tags: [...activityCacheTag.reviews(activityId)] },
    }
  );
};

export const getAvailableSchedules = async (
  activityId: number,
  year: string,
  month: string
): Promise<AvailableSchedule[]> => {
  return apiFetch<AvailableSchedule[]>(
    `/activities/${activityId}/available-schedule?year=${year}&month=${month}`
  );
};

export const getAvailableScheduleWithCache = async (
  activityId: number,
  year: string,
  month: string
): Promise<AvailableSchedule[]> => {
  return apiFetch<AvailableSchedule[]>(
    `/activities/${activityId}/available-schedule?year=${year}&month=${month}`,
    { next: { revalidate: 60 } }
  );
};

/**
 * 예약 API
 */
export const createReservation = async (
  activityId: number,
  data: ReservationRequest
): Promise<ReservationResponse> => {
  return apiFetch<ReservationResponse>(
    `/activities/${activityId}/reservations`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
};

/**
 * My Activities API (host 운영용)
 */
export const getMyActivities = async (
  params?: useInfiniteActivitiesParams
): Promise<MyActivities> => {
  const queryString = params ? createQueryString(params) : '';

  return apiFetch<MyActivities>(`/my-activities${queryString}`);
};

export const getMyActivityDetail = async (
  id: number | string
): Promise<ActivityDetail> => {
  return apiFetch<ActivityDetail>(`/my-activities/${id}`);
};

export async function deleteMyActivity(id: number) {
  const body = { status: 'canceled' };

  try {
    await apiFetch(`/my-activities/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(body),
    });

    return { ok: true as const };
  } catch (error) {
    if (error instanceof ApiError) {
      return { ok: false as const, status: error.status };
    }

    return { ok: false as const, status: 500 };
  }
}

/**
 * Activity 생성, 수정 API
 */
export const createActivity = async (payload: any) => {
  const res = await apiFetch('/activities', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  await fetchRevalidateByTag(activityCacheTag.all()[0]);

  return res;
};

export const updateActivity = async (
  id: number | string,
  payload: UpdateActivityPayload
): Promise<ActivityDetail> => {
  const res = await apiFetch<ActivityDetail>(`/my-activities/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

  await fetchRevalidateByTag(activityCacheTag.all()[0]);
  await fetchRevalidateByTag(String(id));

  return res;
};

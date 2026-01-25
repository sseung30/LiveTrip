import { apiFetch } from '@/api/api';
import createQueryString from '@/api/create-query-string';
import type {
  ActivityDetail,
  AvailableSchedule,
  getAllActivitiesParams,
  getAllActivitiesResponse,
  ReservationRequest,
  ReservationResponse,
  ReviewResponse,
} from '@/domain/activities/type';

const _ALL_ACTIVITIES_ENDPOINT = '/activities?';

export const activityCacheTag = {
  all: () => 'activity',
  detail: (activityId: string | number) => [
    ...activityCacheTag.all(),
    String(activityId),
  ],
};
const reviewsCacheTag = {
  all: (activityId: number) => ['reviews', String(activityId)],
};

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
 * 체험 리뷰 조회
 */
export async function getReviewsWithCache(
  activityId: number,
  page = 1,
  size = 3
): Promise<ReviewResponse> {
  return apiFetch<ReviewResponse>(
    `/activities/${activityId}/reviews?page=${page}&size=${size}`,
    {
      next: { tags: [...reviewsCacheTag.all(activityId)] },
    }
  );
}
/**
 * 체험 예약 가능일 조회
 */
export async function getAvailableScheduleWithCache(
  activityId: number,
  year: string,
  month: string
): Promise<AvailableSchedule[]> {
  return apiFetch<AvailableSchedule[]>(
    `/activities/${activityId}/available-schedule?year=${year}&month=${month}`,
    { next: { revalidate: 60 } }
  );
}

/**
 * 체험 예약 신청
 */
export async function createReservation(
  activityId: number,
  data: ReservationRequest
): Promise<ReservationResponse> {
  return apiFetch<ReservationResponse>(
    `/activities/${activityId}/reservations`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
}

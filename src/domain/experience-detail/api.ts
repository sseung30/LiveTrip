import { apiFetch } from '@/api/api';
import type {
  AvailableSchedule,
  ExperienceDetail,
  ReservationRequest,
  ReservationResponse,
  ReviewResponse,
} from '@/domain/experience-detail/type';

/**
 * 체험 상세 조회
 */
export const getExperienceDetailCacheTag = (activityId: number) => [
  'experience-detail',
  String(activityId),
];
export const getReviewsCacheTag = (activityId: number) => [
  'reviews',
  String(activityId),
];

export async function getExperienceDetail(
  activityId: number
): Promise<ExperienceDetail> {
  return apiFetch<ExperienceDetail>(`/activities/${activityId}`, {
    next: { tags: [...getExperienceDetailCacheTag(activityId)] },
  });
}

/**
 * 체험 예약 가능일 조회
 */
export async function getAvailableSchedule(
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
 * 체험 리뷰 조회
 */
export async function getReviews(
  activityId: number,
  page = 1,
  size = 3
): Promise<ReviewResponse> {
  return apiFetch<ReviewResponse>(
    `/activities/${activityId}/reviews?page=${page}&size=${size}`,
    {
      next: { tags: [...getReviewsCacheTag(activityId)] },
    }
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

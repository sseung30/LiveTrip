import { apiFetch } from '@/api/api';

export interface MyActivity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MyActivitiesResponse {
  cursorId: number | null;
  totalCount: number;
  activities: MyActivity[];
}

export interface ReservationDashboard {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
    declined?: number;
  };
}

export interface ReservedSchedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

export interface ActivityReservation {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: 'declined' | 'pending' | 'confirmed';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationsResponse {
  cursorId: number | null;
  totalCount: number;
  reservations: ActivityReservation[];
}

/**
 * 내 체험 목록 조회
 */
export async function fetchMyActivities(
  size = 20,
  cursorId?: number
): Promise<MyActivitiesResponse> {
  const params: string[] = [`size=${size}`];

  if (cursorId) {
    params.push(`cursorId=${cursorId}`);
  }

  return apiFetch<MyActivitiesResponse>(`/my-activities?${params.join('&')}`);
}

/**
 * 특정 체험의 월별 예약 현황 조회 (달력용)
 */
export async function fetchReservationDashboard(
  activityId: number,
  year: string,
  month: string
): Promise<ReservationDashboard[]> {
  return apiFetch<ReservationDashboard[]>(
    `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`
  );
}

/**
 * 특정 체험의 특정 날짜 스케줄 조회
 */
export async function fetchReservedSchedule(
  activityId: number,
  date: string
): Promise<ReservedSchedule[]> {
  return apiFetch<ReservedSchedule[]>(
    `/my-activities/${activityId}/reserved-schedule?date=${date}`
  );
}

/**
 * 특정 체험의 예약 내역 조회 (scheduleId, status 필수)
 */
export async function fetchActivityReservations(
  activityId: number,
  scheduleId: number,
  status: 'pending' | 'confirmed' | 'declined'
): Promise<ReservationsResponse> {
  return apiFetch<ReservationsResponse>(
    `/my-activities/${activityId}/reservations?scheduleId=${scheduleId}&status=${status}`
  );
}

/**
 * 예약 승인
 */
export async function approveReservation(
  activityId: number,
  reservationId: number
): Promise<ActivityReservation> {
  return apiFetch<ActivityReservation>(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status: 'confirmed' }),
    }
  );
}

/**
 * 예약 거절
 */
export async function rejectReservation(
  activityId: number,
  reservationId: number
): Promise<ActivityReservation> {
  return apiFetch<ActivityReservation>(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status: 'declined' }),
    }
  );
}

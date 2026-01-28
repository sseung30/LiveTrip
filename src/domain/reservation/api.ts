import { ApiError, apiFetch } from '@/api/api';
import type {
  ActivityReservation,
  DashboardParams,
  HostReservation,
  MyActivitiesResponse,
  MyReservationParams,
  MyReservationsResponse,
  ReservationDashboard,
  ReservationQueryParams,
  ReservationsResponse,
  ReservedSchedule,
  UserReservation,
} from '@/domain/reservation/types';

// ====================================
// User Reservation API Functions (MyReservation)
// ====================================

/**
 * 사용자 예약 목록 조회
 */
export const getMyReservations = async (
  params?: MyReservationParams
): Promise<MyReservationsResponse> => {
  const queryParams = new URLSearchParams();

  if (params?.cursorId) {
    queryParams.append('cursorId', params.cursorId.toString());
  }
  if (params?.status) {
    queryParams.append('status', params.status);
  }
  if (params?.size) {
    queryParams.append('size', params.size.toString());
  }

  const queryString = queryParams.toString() || '';

  return apiFetch<MyReservationsResponse>(`/my-reservations${queryString}`);
};

/**
 * 예약 취소 (사용자)
 */
export const cancelReservation = async (
  id: number
): Promise<
  | {
      ok: true;
    }
  | {
      ok: false;
      status: number;
    }
> => {
  const body = { status: 'canceled' };

  try {
    await apiFetch(`/my-reservations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    return { ok: true as const };
  } catch (error) {
    if (error instanceof ApiError) {
      return { ok: false as const, status: error.status };
    }

    return { ok: false as const, status: 500 };
  }
};

// ====================================
// Host Reservation API Functions (Reservation Status)
// ====================================

/**
 * 내 체험 목록 조회 (호스트)
 */
export const fetchMyActivities = async (
  size = 20,
  cursorId?: number
): Promise<MyActivitiesResponse> => {
  const params: string[] = [`size=${size}`];

  if (cursorId) {
    params.push(`cursorId=${cursorId}`);
  }

  return apiFetch<MyActivitiesResponse>(`/my-activities?${params.join('&')}`);
};

/**
 * 특정 체험의 월별 예약 현황 조회 (달력용)
 */
export const fetchReservationDashboard = async ({
  activityId,
  year,
  month,
}: DashboardParams): Promise<ReservationDashboard[]> => {
  return apiFetch<ReservationDashboard[]>(
    `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`
  );
};

/**
 * 특정 체험의 특정 날짜 스케줄 조회
 */
export const fetchReservedSchedule = async (
  activityId: number,
  date: string
): Promise<ReservedSchedule[]> => {
  return apiFetch<ReservedSchedule[]>(
    `/my-activities/${activityId}/reserved-schedule?date=${date}`
  );
};

/**
 * 특정 체험의 예약 내역 조회 (scheduleId, status 필수)
 */
export const fetchActivityReservations = async ({
  activityId,
  scheduleId,
  status,
}: ReservationQueryParams): Promise<ReservationsResponse> => {
  return apiFetch<ReservationsResponse>(
    `/my-activities/${activityId}/reservations?scheduleId=${scheduleId}&status=${status}`
  );
};

/**
 * 예약 승인 (호스트)
 */
export const approveReservation = async (
  activityId: number,
  reservationId: number
): Promise<ActivityReservation> => {
  return apiFetch<ActivityReservation>(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status: 'confirmed' }),
    }
  );
};

/**
 * 예약 거절 (호스트)
 */
export const rejectReservation = async (
  activityId: number,
  reservationId: number
): Promise<ActivityReservation> => {
  return apiFetch<ActivityReservation>(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status: 'declined' }),
    }
  );
};

// ====================================
// Shared API Functions
// ====================================

/**
 * 특정 예약 상세 조회 (공용)
 */
export const getReservationById = async (
  id: number
): Promise<UserReservation | HostReservation> => {
  return apiFetch<UserReservation | HostReservation>(`/reservations/${id}`);
};

/**
 * 예약 정보 업데이트 (상태 변경 등)
 */
export const updateReservationStatus = async (
  id: number,
  status: 'confirmed' | 'declined' | 'canceled'
): Promise<UserReservation | HostReservation> => {
  return apiFetch<UserReservation | HostReservation>(`/reservations/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
};

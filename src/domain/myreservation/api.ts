import { apiFetch } from '@/api/api';

export interface MyReservation {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
  scheduleId: number;
  status: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyReservationsResponse {
  cursorId: number | null;
  reservations: MyReservation[];
  totalCount: number;
}

/**
 * 내 예약 목록 조회
 */
export async function fetchMyReservations(
  size = 10,
  cursorId?: number,
  status?: string
): Promise<MyReservationsResponse> {
  let url = `/my-reservations?size=${size}`;

  if (cursorId) {
    url = `${url}&cursorId=${cursorId}`;
  }
  if (status) {
    url = `${url}&status=${status}`;
  }

  return apiFetch<MyReservationsResponse>(url);
}

/**
 * 예약 취소
 */
export async function cancelReservation(
  reservationId: number
): Promise<unknown> {
  return apiFetch<unknown>(`/my-reservations/${reservationId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'canceled' }),
  });
}

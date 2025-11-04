import { ApiError, apiFetch } from '@/api/api';

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
 * 예약 취소
 */
export async function cancelReservation(id: number) {
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
}

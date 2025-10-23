'use server';

import { rejectReservation } from '@/domain/reservationStatus/api';
import { revalidatePath } from 'next/cache';

interface RejectState {
  status: 'idle' | 'success' | 'error';
  message?: string;
}

export async function rejectReservationAction(
  prevState: RejectState,
  formData: FormData
): Promise<RejectState> {
  try {
    const activityId = Number(formData.get('activityId'));
    const reservationId = Number(formData.get('reservationId'));

    if (!activityId || !reservationId) {
      return {
        status: 'error',
        message: '잘못된 요청입니다.',
      };
    }

    await rejectReservation(activityId, reservationId);

    revalidatePath('/reservation-status');

    return {
      status: 'success',
      message: '예약이 거절되었습니다.',
    };
  } catch (error) {
    return {
      status: 'error',
      message: '예약 거절에 실패했습니다.',
    };
  }
}

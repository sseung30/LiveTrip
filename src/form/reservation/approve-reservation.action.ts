'use server';

import { revalidatePath } from 'next/cache';
import { approveReservation } from '@/domain/reservationStatus/api';

interface ApproveState {
  status: 'idle' | 'success' | 'error';
  message?: string;
}

export async function approveReservationAction(
  prevState: ApproveState,
  formData: FormData
): Promise<ApproveState> {
  try {
    const activityId = Number(formData.get('activityId'));
    const reservationId = Number(formData.get('reservationId'));

    if (!activityId || !reservationId) {
      return {
        status: 'error',
        message: '잘못된 요청입니다.',
      };
    }

    await approveReservation(activityId, reservationId);

    revalidatePath('/reservation-status');

    return {
      status: 'success',
      message: '예약이 승인되었습니다.',
    };
  } catch {
    return {
      status: 'error',
      message: '예약 승인에 실패했습니다.',
    };
  }
}

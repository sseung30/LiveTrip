'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import type { ReservationStatusType } from '@/components/reservationPopup/type';
import StateBadge from '@/components/stateBadge/StateBadge';
import { toast } from '@/components/toast';
import { approveReservationAction } from '@/form/reservation/approve-reservation.action';
import { rejectReservationAction } from '@/form/reservation/reject-reservation.action';

interface ReservationCardProps {
  reservation: {
    id: number;
    nickname: string;
    headCount: number;
  };
  activeTab: ReservationStatusType;
  activityId: number;
  onActionSuccess?: () => void;
}

export default function ReservationCard({
  reservation,
  activeTab,
  activityId,
  onActionSuccess,
}: ReservationCardProps) {
  const router = useRouter();
  const [approveState, approveFormAction, isApprovePending] = useActionState(
    approveReservationAction,
    { status: 'idle' as const }
  );

  const [rejectState, rejectFormAction, isRejectPending] = useActionState(
    rejectReservationAction,
    { status: 'idle' as const }
  );

  useEffect(() => {
    if (approveState.status === 'success') {
      toast({ message: approveState.message || '', eventType: 'success' });
      router.refresh();
      // eslint-disable-next-line react-you-might-not-need-an-effect/you-might-not-need-an-effect
      onActionSuccess?.();
    } else if (approveState.status === 'error') {
      toast({ message: approveState.message || '', eventType: 'error' });
    }
  }, [approveState, router, onActionSuccess]);

  useEffect(() => {
    if (rejectState.status === 'success') {
      toast({ message: rejectState.message || '', eventType: 'success' });
      router.refresh();
      // eslint-disable-next-line react-you-might-not-need-an-effect/you-might-not-need-an-effect
      onActionSuccess?.();
    } else if (rejectState.status === 'error') {
      toast({ message: rejectState.message || '', eventType: 'error' });
    }
  }, [rejectState, router, onActionSuccess]);

  return (
    <div className='rounded-2xl border border-gray-100 bg-white p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-1'>
          <span className='text-base font-bold text-gray-500'>
            닉네임{' '}
            <span className='text-base font-medium text-gray-900'>
              {reservation.nickname}
            </span>
          </span>
          <span className='text-base font-bold text-gray-500'>
            인원{' '}
            <span className='text-base font-medium text-gray-900'>
              {reservation.headCount}명
            </span>
          </span>
        </div>

        {activeTab === 'pending' && (
          <div className='flex flex-col gap-1.5'>
            <form action={approveFormAction}>
              <input type='hidden' name='activityId' value={activityId} />
              <input
                type='hidden'
                name='reservationId'
                value={reservation.id}
              />
              <button
                type='submit'
                disabled={isApprovePending || isRejectPending}
                className='w-full rounded-md border border-gray-50 px-3 py-1 text-xs font-medium text-gray-600 disabled:cursor-not-allowed disabled:opacity-50'
              >
                {isApprovePending ? '처리 중...' : '승인하기'}
              </button>
            </form>
            <form action={rejectFormAction}>
              <input type='hidden' name='activityId' value={activityId} />
              <input
                type='hidden'
                name='reservationId'
                value={reservation.id}
              />
              <button
                type='submit'
                disabled={isApprovePending || isRejectPending}
                className='w-full rounded-md border border-gray-50 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 disabled:cursor-not-allowed disabled:opacity-50'
              >
                {isRejectPending ? '처리 중...' : '거절하기'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'confirmed' && <StateBadge state='confirmed' />}

        {activeTab === 'declined' && <StateBadge state='declined' />}
      </div>
    </div>
  );
}

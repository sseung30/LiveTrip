import StateBadge from '@/components/stateBadge/StateBadge';
import type { ReservationStatusType } from '@/components/reservationPopup/type';

interface ReservationCardProps {
  reservation: {
    id: number;
    nickname: string;
    headCount: number;
  };
  activeTab: ReservationStatusType;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

export default function ReservationCard({
  reservation,
  activeTab,
  onApprove,
  onReject,
}: ReservationCardProps) {
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
            <button
              type='button'
              className='w-full rounded-md border border-gray-50 px-3 py-1 text-xs font-medium text-gray-600'
              onClick={() => {
                onApprove?.(reservation.id);
              }}
            >
              승인하기
            </button>
            <button
              type='button'
              className='w-full rounded-md border border-gray-50 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600'
              onClick={() => {
                onReject?.(reservation.id);
              }}
            >
              거절하기
            </button>
          </div>
        )}

        {activeTab === 'confirmed' && <StateBadge state='approved' />}

        {activeTab === 'declined' && <StateBadge state='rejected' />}
      </div>
    </div>
  );
}

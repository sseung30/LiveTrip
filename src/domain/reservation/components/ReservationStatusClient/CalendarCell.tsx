import { useRef } from 'react';
import CalendarBadge from '@/domain/reservation/components/CalendarBadge';
import { formatDateString } from '@/domain/reservation/components/ReservationStatusClient/formatDateString';
import type {
  BadgeType,
  ReservationDashboard,
} from '@/domain/reservation/types';

export default function CalendarCell({
  date,
  isCurrentMonth,
  isLastRow,
  dashboardData,
  onClick,
}: {
  date: Date;
  isCurrentMonth: boolean;
  isLastRow: boolean;
  dashboardData: ReservationDashboard[];
  onClick: (date: Date, element: HTMLDivElement) => void;
}) {
  const cellRef = useRef<HTMLDivElement>(null);
  const dateString = formatDateString(date);
  const dayData = dashboardData.find((d) => d.date === dateString);

  const badges: { type: BadgeType; count: number }[] = [];

  if (isCurrentMonth && dayData) {
    const { completed, confirmed, pending } = dayData.reservations;

    if (completed > 0) {
      badges.push({ type: 'completed', count: completed });
    }
    if (confirmed > 0) {
      badges.push({ type: 'approval', count: confirmed });
    }
    if (pending > 0) {
      badges.push({ type: 'reservation', count: pending });
    }
  }

  const hasReservations = badges.length > 0;

  const handleClick = () => {
    if (hasReservations && cellRef.current) {
      onClick(date, cellRef.current);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (hasReservations && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();

      if (cellRef.current) {
        onClick(date, cellRef.current);
      }
    }
  };

  return (
    <div
      ref={cellRef}
      role={hasReservations ? 'button' : undefined}
      tabIndex={hasReservations ? 0 : undefined}
      className={`relative flex min-h-[100px] flex-col items-center bg-white p-2 sm:min-h-[120px] sm:p-3 md:min-h-[150px] ${
        !isLastRow ? 'border-b border-gray-200' : ''
      } ${hasReservations ? 'cursor-pointer hover:bg-gray-50' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className='flex w-full items-start justify-center'>
        <span
          className={`relative text-xs sm:text-sm ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-800'}`}
        >
          {date.getDate()}
          {hasReservations && (
            <div className='absolute -top-0.5 -right-1 h-1 w-1 rounded-full bg-red-500 sm:-right-1.5 sm:h-1.5 sm:w-1.5' />
          )}
        </span>
      </div>

      <div className='mt-1 flex flex-col gap-0.5 sm:mt-2 sm:gap-1'>
        {badges.map((badge) => {
          return (
            <CalendarBadge
              key={`${dateString}-${badge.type}`}
              type={badge.type}
              count={badge.count}
            />
          );
        })}
      </div>
    </div>
  );
}

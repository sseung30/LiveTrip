'use client';

import { useEffect, useRef, useState } from 'react';
import CalendarBadge from '@/components/calendarBadge/CalendarBadge';
import type { BadgeType } from '@/components/calendarBadge/type';
import SelectDropdown from '@/components/dropdown/SelectDropdown';
import ReservationPopup from '@/components/reservationPopup/ReservationPopup';
import SideMenu from '@/components/side-menu';
import { toast } from '@/components/toast';
import {
  type ActivityReservation,
  fetchActivityReservations,
  fetchMyActivities,
  fetchReservationDashboard,
  fetchReservedSchedule,
  type ReservationDashboard,
  type ReservedSchedule,
} from '@/domain/reservationStatus/api';

/**
 * 요일 헤더
 */
const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일'];

/**
 * 달력 셀 컴포넌트
 */
function CalendarCell({
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

  const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const dayData = dashboardData.find((d) => d.date === dateString);

  const badges: { type: BadgeType; count: number }[] = [];

  if (dayData) {
    if (dayData.reservations.completed > 0) {
      badges.push({ type: 'completed', count: dayData.reservations.completed });
    }

    if (dayData.reservations.confirmed > 0) {
      badges.push({ type: 'approval', count: dayData.reservations.confirmed });
    }

    if (dayData.reservations.pending > 0) {
      badges.push({ type: 'reservation', count: dayData.reservations.pending });
    }

    if (dayData.reservations.declined && dayData.reservations.declined > 0) {
      badges.push({ type: 'declined', count: dayData.reservations.declined });
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

/**
 * 달력 날짜 생성 함수
 */
const getCalendarDates = (year: number, month: number): Date[] => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDayOfMonth.getDay();

  const dates: Date[] = [];

  const daysInPrevMonth = new Date(year, month, 0).getDate();

  for (let i = startDayOfWeek; i > 0; i = i - 1) {
    dates.push(new Date(year, month - 1, daysInPrevMonth - i + 1));
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i = i + 1) {
    dates.push(new Date(year, month, i));
  }

  const remainingCells = 42 - dates.length;

  for (let i = 1; i <= remainingCells; i = i + 1) {
    dates.push(new Date(year, month + 1, i));
  }

  return dates;
};

export default function ReservationStatusPage() {
  const [activities, setActivities] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dashboardData, setDashboardData] = useState<ReservationDashboard[]>(
    []
  );
  const [schedules, setSchedules] = useState<ReservedSchedule[]>([]);
  const [reservations, setReservations] = useState<ActivityReservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popupState, setPopupState] = useState<{
    isOpen: boolean;
    selectedDate: Date | null;
    position: { top: number; right: number };
  }>({
    isOpen: false,
    selectedDate: null,
    position: { top: 0, right: 0 },
  });

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchMyActivities(100);

        const activityOptions = data.activities.map((a) => {
          return {
            value: a.id.toString(),
            label: a.title,
          };
        });

        setActivities(activityOptions);

        if (activityOptions.length > 0) {
          setSelectedExperience(activityOptions[0].value);
        }
      } catch {
        toast({
          message: '체험 목록을 불러올 수 없습니다.',
          eventType: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadActivities();
  }, []);

  useEffect(() => {
    if (!selectedExperience) {
      return;
    }

    const loadDashboard = async () => {
      try {
        const yearStr = currentDate.getFullYear().toString();
        const monthStr = (currentDate.getMonth() + 1)
          .toString()
          .padStart(2, '0');

        const data = await fetchReservationDashboard(
          Number(selectedExperience),
          yearStr,
          monthStr
        );

        setDashboardData(data);
      } catch {
        // 조회 실패 시 빈 데이터로 유지
      }
    };

    loadDashboard();
  }, [selectedExperience, currentDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarDates = getCalendarDates(year, month);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = async (date: Date, element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const calendarContainer = element.closest('.rounded-xl');
    const containerRect = calendarContainer?.getBoundingClientRect();

    if (
      popupState.isOpen &&
      popupState.selectedDate?.toDateString() === date.toDateString()
    ) {
      setPopupState({
        isOpen: false,
        selectedDate: null,
        position: { top: 0, right: 0 },
      });

      return;
    }

    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    try {
      const schedulesData = await fetchReservedSchedule(
        Number(selectedExperience),
        dateString
      ).catch(() => []);

      if (schedulesData.length === 0) {
        setSchedules([]);
        setReservations([]);
      } else {
        const allReservations: ActivityReservation[] = [];

        for (const schedule of schedulesData) {
          const statuses: ('pending' | 'confirmed' | 'declined')[] = [
            'pending',
            'confirmed',
            'declined',
          ];

          for (const status of statuses) {
            if (schedule.count[status] === 0) {
              continue;
            }

            try {
              const reservationsData = await fetchActivityReservations(
                Number(selectedExperience),
                schedule.scheduleId,
                status
              );

              allReservations.push(...reservationsData.reservations);
            } catch {
              // 조회 실패 시 스킵
            }
          }
        }

        setSchedules(schedulesData);
        setReservations(allReservations);
      }

      const top = rect.top - (containerRect?.top || 0) + rect.height + 8;
      const right =
        (containerRect?.right || 0) - rect.right + rect.width / 2 - 350 / 2;

      setPopupState({
        isOpen: true,
        selectedDate: date,
        position: { top, right },
      });
    } catch {
      toast({
        message: '예약 정보를 불러올 수 없습니다.',
        eventType: 'error',
      });
    }
  };

  const handleClosePopup = () => {
    setPopupState({
      isOpen: false,
      selectedDate: null,
      position: { top: 0, right: 0 },
    });
  };

  return (
    <div className='mx-auto flex max-w-[1200px] gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 md:gap-8 md:px-12 md:py-8'>
      {/* 왼쪽: SideMenu (모바일에서만 숨김) */}
      <aside className='hidden md:block lg:w-auto'>
        <SideMenu size='large' activeItem='reservationStatus' />
      </aside>

      {/* 오른쪽: 메인 콘텐츠 */}
      <main className='flex-1'>
        <section className='pb-30'>
          <div className='mb-6 flex items-center justify-between md:mb-10'>
            <h1 className='text-2xl font-bold text-gray-800'>예약 현황</h1>
            <div className='w-[200px]'>
              <SelectDropdown
                options={activities}
                placeholder='체험을 선택하세요'
                defaultValue={selectedExperience}
                onSelect={(value) => {
                  setSelectedExperience(value);
                }}
              />
            </div>
          </div>

          {isLoading && (
            <div className='flex items-center justify-center py-12'>
              <p className='text-gray-500'>체험 목록을 불러오는 중...</p>
            </div>
          )}

          {!isLoading && activities.length === 0 && (
            <div className='mt-2.5 flex flex-col'>
              <p className='mb-4 text-center text-gray-500'>
                등록된 체험이 없습니다.
              </p>
              <button
                type='button'
                className='mx-auto w-fit rounded-md bg-primary-500 px-4 py-2 text-white'
                onClick={() => {
                  window.location.href = '/registration';
                }}
              >
                체험 등록하기
              </button>
            </div>
          )}

          {!isLoading && activities.length > 0 && (
            <div className='rounded-xl border border-gray-200 p-4 md:p-6'>
              <div className='mb-4 flex items-center justify-between'>
                <button
                  type='button'
                  className='text-gray-600 hover:text-gray-800'
                  onClick={goToPreviousMonth}
                >
                  &lt;
                </button>
                <h2 className='text-xl font-semibold text-gray-800'>
                  {year}년 {month + 1}월
                </h2>
                <button
                  type='button'
                  className='text-gray-600 hover:text-gray-800'
                  onClick={goToNextMonth}
                >
                  &gt;
                </button>
              </div>
              <div className='grid grid-cols-7 gap-2 text-center'>
                {WEEKDAYS.map((day) => {
                  return (
                    <div key={day} className='font-medium text-gray-500'>
                      {day}
                    </div>
                  );
                })}
                {calendarDates.map((date, index) => {
                  const isLastRow = index >= 28;

                  return (
                    <CalendarCell
                      key={date.toISOString()}
                      date={date}
                      isCurrentMonth={date.getMonth() === month}
                      isLastRow={isLastRow}
                      dashboardData={dashboardData}
                      onClick={handleDateClick}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* 예약 팝업 */}
      {popupState.selectedDate && selectedExperience && (
        <ReservationPopup
          isOpen={popupState.isOpen}
          position={popupState.position}
          date={popupState.selectedDate}
          schedules={schedules}
          activityId={Number(selectedExperience)}
          reservations={reservations.map((r) => {
            return {
              id: r.id,
              nickname: r.nickname,
              headCount: r.headCount,
              status: r.status,
            };
          })}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

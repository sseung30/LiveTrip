'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SelectDropdown from '@/components/dropdown/SelectDropdown';
import { toast } from '@/components/toast';
import {
  fetchActivityReservations,
  fetchMyActivities,
  fetchReservationDashboard,
  fetchReservedSchedule,
} from '@/domain/reservation/api';
import ReservationPopup from '@/domain/reservation/components/ReservationPopup';
import CalendarCell from '@/domain/reservation/components/ReservationStatusClient/CalendarCell';
import { formatDateString } from '@/domain/reservation/components/ReservationStatusClient/formatDateString';
import type {
  ActivityReservation,
  ReservedSchedule,
} from '@/domain/reservation/types';

const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일'];

function getCalendarDates(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);

  startDate.setDate(startDate.getDate() - startDate.getDay());

  const dates: Date[] = [];
  const current = new Date(startDate);

  while (dates.length < 35) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export default function ReservationStatusClient() {
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedules, setSchedules] = useState<ReservedSchedule[]>([]);
  const [reservations, setReservations] = useState<ActivityReservation[]>([]);
  const [popupState, setPopupState] = useState<{
    isOpen: boolean;
    selectedDate: Date | null;
    position: { top: number; right: number };
  }>({
    isOpen: false,
    selectedDate: null,
    position: { top: 0, right: 0 },
  });

  // 내 체험 목록 조회 (React Query)
  const { data: activitiesData, isLoading: activitiesLoading } = useQuery({
    queryKey: ['my-activities'],
    queryFn: () => fetchMyActivities(100),
  });

  // 예약 현황 대시보드 조회 (React Query)
  const { data: dashboardData = [] } = useQuery({
    queryKey: [
      'reservation-dashboard',
      selectedExperience,
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
    ],
    queryFn: () => {
      if (!selectedExperience) {
        return [];
      }

      const yearStr = currentDate.getFullYear().toString();
      const monthStr = (currentDate.getMonth() + 1).toString().padStart(2, '0');

      return fetchReservationDashboard({
        activityId: Number(selectedExperience),
        year: yearStr,
        month: monthStr,
      });
    },
    enabled: Boolean(selectedExperience),
  });

  useEffect(() => {
    if (
      activitiesData?.activities &&
      activitiesData.activities.length > 0 &&
      !selectedExperience
    ) {
      setSelectedExperience(activitiesData.activities[0].id.toString());
    }
  }, [activitiesData, selectedExperience]);

  const activities =
    activitiesData?.activities.map((a) => {
      return {
        value: a.id.toString(),
        label: a.title,
      };
    }) || [];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarDates = getCalendarDates(year, month);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleClosePopup = () => {
    setPopupState({
      isOpen: false,
      selectedDate: null,
      position: { top: 0, right: 0 },
    });
  };

  const handleDateClick = async (date: Date, element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const calendarContainer = element.closest('.rounded-xl');
    const containerRect = calendarContainer?.getBoundingClientRect();

    if (
      popupState.isOpen &&
      popupState.selectedDate?.toDateString() === date.toDateString()
    ) {
      handleClosePopup();

      return;
    }

    const dateString = formatDateString(date);

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
              const reservationsData = await fetchActivityReservations({
                activityId: Number(selectedExperience),
                scheduleId: schedule.scheduleId,
                status,
              });

              allReservations.push(...reservationsData.reservations);
            } catch {
              continue;
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

  return (
    <main className='w-full'>
      <div className='mb-3 md:mb-7.5'>
        <h2 className='text-18 mb-2.5 font-bold text-gray-950'>예약 현황</h2>
        <p className='text-gray-500'>
          내 체험의 예약 내역을 월 단위로 확인할 수 있습니다.
        </p>
      </div>

      <div className='relative z-10 mb-4 w-full sm:mb-6'>
        {activities.length > 0 && (
          <SelectDropdown
            options={activities}
            defaultValue={selectedExperience}
            placeholder='체험을 선택하세요'
            onSelect={setSelectedExperience}
          />
        )}
        {activitiesLoading && (
          <p className='text-sm text-gray-500'>체험 목록을 불러오는 중...</p>
        )}
        {!activitiesLoading && activities.length === 0 && (
          <p className='text-sm text-gray-500'>등록된 체험이 없습니다.</p>
        )}
      </div>

      <div className='relative overflow-visible rounded-xl bg-white p-3 shadow-lg sm:p-4 md:p-6'>
        <div className='mb-4 flex items-center justify-center gap-3 sm:mb-6 sm:gap-4'>
          <button
            type='button'
            className='flex h-7 w-7 items-center justify-center rounded hover:bg-gray-100 sm:h-8 sm:w-8'
            onClick={goToPreviousMonth}
          >
            ◀
          </button>
          <h2 className='text-base font-semibold text-gray-900 sm:text-lg'>
            {year}년 {month + 1}월
          </h2>
          <button
            type='button'
            className='flex h-7 w-7 items-center justify-center rounded hover:bg-gray-100 sm:h-8 sm:w-8'
            onClick={goToNextMonth}
          >
            ▶
          </button>
        </div>

        <div className='overflow-visible rounded-lg'>
          <div className='grid grid-cols-7 border-b border-gray-200 bg-white'>
            {WEEKDAYS.map((day) => {
              return (
                <div
                  key={day}
                  className='py-2 text-center text-xs font-semibold text-gray-900 sm:py-3 sm:text-sm'
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className='grid grid-cols-7'>
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
                scheduleId: r.scheduleId,
              };
            })}
            onClose={handleClosePopup}
          />
        )}
      </div>
    </main>
  );
}

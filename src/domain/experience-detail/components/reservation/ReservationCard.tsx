'use client';

import { useEffect, useState } from 'react';
import { toast } from '@/components/toast';
import {
  createReservation,
  getAvailableScheduleWithCache,
} from '@/domain/activities/api';
import type { ActivityDetail } from '@/domain/activities/type';
import ActivityHeader from '@/domain/experience-detail/components/experience/ActivityHeader';
import Calendar from '@/domain/experience-detail/components/reservation/Calendar';
import MobileReservationBar from '@/domain/experience-detail/components/reservation/MobileReservationBar';
import ParticipantCounter from '@/domain/experience-detail/components/reservation/ParticipantCounter';
import TimeSelector from '@/domain/experience-detail/components/reservation/TimeSelector';
import type {
  AvailableSchedule,
  Schedule,
} from '@/domain/experience-detail/type';

const VALIDATION_MESSAGES = {
  NO_DATE: '날짜를 선택해주세요.',
  NO_TIME: '예약 시간을 선택해주세요.',
  INVALID_PARTICIPANT: '참여 인원을 1명 이상으로 설정해주세요.',
  SUCCESS: '예약이 완료되었습니다.',
} as const;

export interface ReservationCardProps {
  experience: ActivityDetail;
  selectedDate: Date | null;
  selectedTime: string | null;
  participantCount: number;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: string | null) => void;
  onParticipantChange: (count: number) => void;
}

export default function ReservationCard({
  experience,
  selectedDate,
  selectedTime,
  participantCount,
  onDateChange,
  onTimeChange,
  onParticipantChange,
}: ReservationCardProps) {
  const [availableSchedules, setAvailableSchedules] = useState<
    AvailableSchedule[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    const loadAvailableSchedules = async () => {
      try {
        const year = currentYear.toString();
        const month = currentMonth.toString().padStart(2, '0');
        const schedules = await getAvailableScheduleWithCache(
          experience.id,
          year,
          month
        );

        setAvailableSchedules(schedules);
      } catch (error) {
        console.error('예약 가능 일정 조회 실패:', error);
      }
    };

    loadAvailableSchedules();
  }, [experience.id, currentYear, currentMonth]);

  const handleMonthChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  const availableDates = availableSchedules.map((schedule) => schedule.date);

  const getFilteredSchedules = (): Schedule[] => {
    if (!selectedDate) {
      return [];
    }

    const dateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    const daySchedule = availableSchedules.find((s) => s.date === dateString);

    if (!daySchedule) {
      return [];
    }

    return daySchedule.times.map((time) => {
      return {
        id: time.id,
        date: dateString,
        startTime: time.startTime,
        endTime: time.endTime,
      };
    });
  };

  const validateReservation = () => {
    if (!selectedDate) {
      toast({ message: VALIDATION_MESSAGES.NO_DATE, eventType: 'error' });

      return false;
    }

    if (!selectedTime) {
      toast({ message: VALIDATION_MESSAGES.NO_TIME, eventType: 'error' });

      return false;
    }

    if (participantCount < 1) {
      toast({
        message: VALIDATION_MESSAGES.INVALID_PARTICIPANT,
        eventType: 'error',
      });

      return false;
    }

    return true;
  };

  const handleReservation = async () => {
    if (!validateReservation()) {
      return;
    }

    setIsLoading(true);

    try {
      const schedules = getFilteredSchedules();
      const selectedSchedule = schedules.find(
        (schedule) =>
          `${schedule.startTime}-${schedule.endTime}` === selectedTime
      );

      if (!selectedSchedule) {
        toast({
          message: '선택한 시간을 찾을 수 없습니다.',
          eventType: 'error',
        });

        return;
      }

      await createReservation(experience.id, {
        scheduleId: selectedSchedule.id,
        headCount: participantCount,
      });

      toast({ message: VALIDATION_MESSAGES.SUCCESS, eventType: 'success' });

      onDateChange(null);
      onTimeChange(null);
      onParticipantChange(1);
    } catch (error) {
      console.error('예약 실패:', error);
      toast({ message: '예약에 실패했습니다.', eventType: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = experience.price * participantCount;
  const filteredSchedules = getFilteredSchedules();

  return (
    <>
      <div className='space-y-4'>
        {/* 데스크톱용 체험 기본 정보 - lg 이상에서만 표시 */}
        <div className='hidden lg:block'>
          <ActivityHeader activity={experience} />
        </div>

        {/* 데스크톱용 예약 폼 - lg 이상에서만 표시 */}
        <div
          className='mb-6 hidden rounded-2xl border bg-white p-4 shadow-lg lg:block lg:p-6'
          style={{ borderColor: '#DDDDDD' }}
        >
          <div className='space-y-6'>
            {/* 가격 */}
            <div className='text-2xl font-bold text-gray-900'>
              ₩ {experience.price.toLocaleString()}{' '}
              <span style={{ color: '#79747E' }}>/ 인</span>
            </div>

            {/* 날짜 선택 */}
            <Calendar
              selectedDate={selectedDate}
              availableDates={availableDates}
              onDateChange={onDateChange}
              onMonthChange={handleMonthChange}
            />

            {/* 참여 인원 수 */}
            <ParticipantCounter
              participantCount={participantCount}
              onParticipantChange={onParticipantChange}
            />

            {/* 예약 가능한 시간 */}
            {selectedDate ? (
              <TimeSelector
                schedules={filteredSchedules}
                selectedTime={selectedTime}
                onTimeChange={onTimeChange}
              />
            ) : (
              <div>
                <h3 className='mb-3 text-base font-semibold text-gray-900'>
                  예약 가능한 시간
                </h3>
                <div className='py-4 text-center'>
                  <p className='text-sm text-gray-500'>날짜를 선택해주세요.</p>
                </div>
              </div>
            )}

            {/* 총 합계 */}
            <div className='border-t border-gray-200 pt-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <span className='text-lg font-semibold text-gray-900'>
                    총 합계
                  </span>
                  <span className='text-lg font-semibold text-gray-900'>
                    ₩ {totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* 예약하기 버튼 */}
                <button
                  disabled={isLoading}
                  className='bg-primary-500 hover:bg-primary-600 rounded-lg px-6 py-3 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50'
                  onClick={handleReservation}
                >
                  {isLoading ? '예약 중...' : '예약하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일/태블릿용 하단 고정 예약 바 */}
      <MobileReservationBar
        experience={experience}
        participantCount={participantCount}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        availableDates={availableDates}
        filteredSchedules={filteredSchedules}
        isLoading={isLoading}
        onDateChange={onDateChange}
        onParticipantChange={onParticipantChange}
        onTimeChange={onTimeChange}
        onReservation={handleReservation}
        onMonthChange={handleMonthChange}
      />
    </>
  );
}

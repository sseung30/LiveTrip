'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Calendar from '@/components/experienceDetail/Calendar';
import ParticipantCounter from '@/components/experienceDetail/ParticipantCounter';
import TimeSelector from '@/components/experienceDetail/TimeSelector';
import type { ExperienceDetail } from '@/components/experienceDetail/type';
import { toast } from '@/components/toast';

interface ReservationBottomSheetProps {
  experience: ExperienceDetail;
  selectedDate: Date | null;
  selectedTime: string | null;
  participantCount: number;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: string | null) => void;
  onParticipantChange: (count: number) => void;
  onClose: () => void;
}

const VALIDATION_MESSAGES = {
  NO_DATE: '날짜를 선택해주세요.',
  NO_TIME: '예약 시간을 선택해주세요.',
  INVALID_PARTICIPANT: '참여 인원을 1명 이상으로 설정해주세요.',
} as const;

export default function ReservationBottomSheet({
  experience,
  selectedDate,
  selectedTime,
  participantCount,
  onDateChange,
  onTimeChange,
  onParticipantChange,
  onClose,
}: ReservationBottomSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const hideDialog = useCallback(() => {
    onClose();
  }, [onClose]);

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg 브레이크포인트 (1024px)
    };

    // 초기 체크
    checkScreenSize();

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // 큰 화면으로 변경되면 모달 닫기
  useEffect(() => {
    if (isLargeScreen) {
      hideDialog();
    }
  }, [isLargeScreen, hideDialog]);

  const handleConfirm = () => {
    // 유효성 검사
    if (!selectedDate) {
      toast({ message: VALIDATION_MESSAGES.NO_DATE, eventType: 'error' });

      return;
    }

    if (!selectedTime) {
      toast({ message: VALIDATION_MESSAGES.NO_TIME, eventType: 'error' });

      return;
    }

    if (participantCount < 1) {
      toast({
        message: VALIDATION_MESSAGES.INVALID_PARTICIPANT,
        eventType: 'error',
      });

      return;
    }

    // 모달만 닫기 (실제 예약은 하단 예약하기 버튼에서)
    onClose();
  };

  return (
    <div className='flex h-[55vh] flex-col'>
            {/* 메인 콘텐츠 - 태블릿: 좌우 분할, 모바일: 세로 배치 */}
            <div className='flex flex-1 flex-col gap-6 overflow-hidden md:flex-row'>
              {/* 좌측: 캘린더 */}
              <div className='flex-1 overflow-y-auto'>
                <Calendar
                  selectedDate={selectedDate}
                  onDateChange={onDateChange}
                />
              </div>

              {/* 우측: 모바일 순서(인원 수 + 시간), 태블릿 순서(시간 + 인원 수) */}
              <div className='flex-1 space-y-6 overflow-y-auto'>
                {/* 모바일: 인원 수 먼저 */}
                <div className='md:hidden'>
                  <ParticipantCounter
                    participantCount={participantCount}
                    onParticipantChange={onParticipantChange}
                  />
                </div>

                {/* 모바일: 예약 가능한 시간 */}
                <div className='md:hidden'>
                  <h3 className='mb-3 text-base font-semibold text-gray-900'>
                    예약 가능한 시간
                  </h3>
                  {selectedDate ? (
                    <div className='grid grid-cols-1 gap-2'>
                      {experience.schedules.map((schedule) => {
                        const timeString = `${schedule.startTime}-${schedule.endTime}`;

                        return (
                          <button
                            key={schedule.id}
                            className={`rounded-lg border p-3 text-center text-sm transition-colors ${
                              selectedTime === timeString
                                ? 'border-primary-500 bg-primary-100 text-primary-500 font-bold'
                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                            }`}
                            onClick={() => {
                              onTimeChange(timeString);
                            }}
                          >
                            {timeString}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className='py-4 text-center'>
                      <p className='text-sm text-gray-500'>
                        날짜를 선택해주세요.
                      </p>
                    </div>
                  )}
                </div>

                {/* 태블릿: 예약 가능한 시간 먼저 */}
                <div className='hidden md:block'>
                  <h3 className='mb-3 text-base font-semibold text-gray-900'>
                    예약 가능한 시간
                  </h3>
                  {selectedDate ? (
                    <div className='grid grid-cols-1 gap-2'>
                      {experience.schedules.map((schedule) => {
                        const timeString = `${schedule.startTime}-${schedule.endTime}`;

                        return (
                          <button
                            key={schedule.id}
                            className={`rounded-lg border p-3 text-center text-sm transition-colors ${
                              selectedTime === timeString
                                ? 'border-primary-500 bg-primary-100 text-primary-500 font-bold'
                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                            }`}
                            onClick={() => {
                              onTimeChange(timeString);
                            }}
                          >
                            {timeString}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className='py-4 text-center'>
                      <p className='text-sm text-gray-500'>
                        날짜를 선택해주세요.
                      </p>
                    </div>
                  )}
                </div>

                {/* 태블릿: 인원 수 나중에 */}
                <div className='hidden md:block'>
                  <ParticipantCounter
                    participantCount={participantCount}
                    onParticipantChange={onParticipantChange}
                  />
                </div>
              </div>
            </div>

            {/* 하단 고정 확인 버튼 */}
            <div className='mt-6'>
              <button
                className='bg-primary-500 hover:bg-primary-600 w-full rounded-lg py-3 font-semibold text-white transition-colors'
                onClick={handleConfirm}
              >
                확인
              </button>
            </div>
          </div>
  );
}

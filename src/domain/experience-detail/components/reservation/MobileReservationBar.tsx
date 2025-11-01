'use client';

import { useCallback, useEffect, useState } from 'react';
import Button from '@/components/button/Button';
import { BottomSheetContainer } from '@/components/dialog/BottomSheet/BottomSheetContainer';
import { useDialog } from '@/components/dialog/useDialog';
import Calendar from '@/domain/experience-detail/components/reservation/Calendar';
import ParticipantCounter from '@/domain/experience-detail/components/reservation/ParticipantCounter';
import TimeSelector from '@/domain/experience-detail/components/reservation/TimeSelector';
import type {
  ExperienceDetail,
  Schedule,
} from '@/domain/experience-detail/type';

interface MobileReservationBarProps {
  experience: ExperienceDetail;
  selectedDate: Date | null;
  selectedTime: string | null;
  participantCount: number;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: string | null) => void;
  onParticipantChange: (count: number) => void;
  availableDates: string[];
  filteredSchedules: Schedule[];
  onReservation: () => void;
  isLoading: boolean;
  onMonthChange: (year: number, month: number) => void;
}

export default function MobileReservationBar({
  experience,
  selectedDate,
  selectedTime,
  participantCount,
  onDateChange,
  onTimeChange,
  onParticipantChange,
  availableDates,
  filteredSchedules,
  onReservation,
  isLoading,
  onMonthChange,
}: MobileReservationBarProps) {
  const { dialogRef, openDialog, hideDialog, isOpen } = useDialog();
  const [step, setStep] = useState<'calendar' | 'participant'>('calendar');

  // 바텀시트 닫을 때 스텝 초기화
  const handleCloseDialog = useCallback(() => {
    setStep('calendar');
    hideDialog();
  }, [hideDialog]);

  // PC 사이즈로 창이 커지면 바텀시트 자동 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        handleCloseDialog();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, handleCloseDialog]);

  const formatDate = (date: Date | null) => {
    if (!date) {
      return '날짜 선택하기';
    }

    if (!selectedTime) {
      return '날짜 선택하기';
    }

    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}/${month}/${day} ${selectedTime}`;
  };

  return (
    <>
      {/* 모바일/태블릿용 하단 고정 예약 바 */}
      <div className='fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white shadow-lg lg:hidden'>
        <div className='px-4 py-3'>
          <div className='mb-3 flex items-center justify-between'>
            {/* 총 합계 금액 */}
            <div className='flex items-center gap-2'>
              <span className='text-lg font-bold text-gray-900'>
                ₩ {(experience.price * participantCount).toLocaleString()}
              </span>
              <span className='text-sm text-gray-600'>
                총 {participantCount}명
              </span>
            </div>

            {/* 날짜 선택 버튼 */}
            <button
              className='text-primary-500 text-sm font-medium underline'
              onClick={openDialog}
            >
              {formatDate(selectedDate)}
            </button>
          </div>

          {/* 예약하기 버튼 */}
          <button
            disabled={isLoading}
            className={`w-full rounded-lg py-3 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              selectedDate && selectedTime
                ? 'bg-primary-500 hover:bg-primary-600'
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
            onClick={selectedDate && selectedTime ? onReservation : openDialog}
          >
            {isLoading ? '예약 중...' : '예약하기'}
          </button>
        </div>
      </div>

      {/* 예약 바텀시트 */}
      <BottomSheetContainer
        dialogRef={dialogRef}
        isOpen={isOpen}
        hideDialog={hideDialog}
        onClose={handleCloseDialog}
      >
        {() => {
          return (
            <div className='flex flex-col'>
              {/* 모바일용 바텀시트: 스텝별 표시 */}
              <div className='md:hidden'>
                {step === 'calendar' && (
                  <>
                    {/* 1단계: 날짜와 시간 선택 */}
                    <div className='flex flex-col gap-6'>
                      <div>
                        <Calendar
                          selectedDate={selectedDate}
                          availableDates={availableDates}
                          onDateChange={onDateChange}
                          onMonthChange={onMonthChange}
                        />
                      </div>

                      <div className='p-4'>
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
                              <p className='text-sm text-gray-500'>
                                날짜를 선택해주세요.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='mt-6 px-4 pb-4'>
                      <Button
                        variant='primary'
                        classNames='!h-auto !py-3 !w-full'
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => {
                          setStep('participant');
                        }}
                      >
                        다음
                      </Button>
                    </div>
                  </>
                )}

                {step === 'participant' && (
                  <>
                    {/* 2단계: 인원 선택 */}
                    <div className='flex flex-col'>
                      <div className='flex items-center gap-4 border-b border-gray-200 p-4'>
                        <button
                          className='text-gray-600 hover:text-gray-800'
                          onClick={() => {
                            setStep('calendar');
                          }}
                        >
                          ←
                        </button>
                        <h2 className='text-lg font-semibold text-gray-900'>
                          인원
                        </h2>
                      </div>

                      {/* 인원 선택 */}
                      <div className='p-4'>
                        <ParticipantCounter
                          participantCount={participantCount}
                          onParticipantChange={onParticipantChange}
                        />
                      </div>

                      {/* 확인 버튼 */}
                      <div className='px-4 pb-4'>
                        <Button
                          variant='primary'
                          classNames='!h-auto !py-3 !w-full'
                          onClick={handleCloseDialog}
                        >
                          확인
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* 태블릿용 바텀시트 */}
              <div className='hidden md:block'>
                <div className='flex gap-6 md:flex-row'>
                  {/* 캘린더 */}
                  <div className='flex-1'>
                    <Calendar
                      selectedDate={selectedDate}
                      availableDates={availableDates}
                      onDateChange={onDateChange}
                      onMonthChange={onMonthChange}
                    />
                  </div>

                  <div className='flex-1 space-y-6 p-4'>
                    {/* 예약 가능한 시간 */}
                    <div>
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
                            <p className='text-sm text-gray-500'>
                              날짜를 선택해주세요.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 인원 수 */}
                    <ParticipantCounter
                      participantCount={participantCount}
                      onParticipantChange={onParticipantChange}
                    />
                  </div>
                </div>

                {/* 확인 버튼 */}
                <div className='mt-6 p-4'>
                  <Button variant='primary' onClick={handleCloseDialog}>
                    확인
                  </Button>
                </div>
              </div>
            </div>
          );
        }}
      </BottomSheetContainer>
    </>
  );
}

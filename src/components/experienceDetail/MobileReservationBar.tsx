'use client';

import { useState } from 'react';
import { BottomSheetContainer } from '@/components/dialog/BottomSheet/BottomSheetContainer';
import { useDialog } from '@/components/dialog/useDialog';
import ReservationBottomSheet from '@/components/experienceDetail/ReservationBottomSheet';
import type { ExperienceDetail } from '@/components/experienceDetail/type';
import { toast } from '@/components/toast';

interface MobileReservationBarProps {
  experience: ExperienceDetail;
  selectedDate: Date | null;
  selectedTime: string | null;
  participantCount: number;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: string | null) => void;
  onParticipantChange: (count: number) => void;
}

const VALIDATION_MESSAGES = {
  NO_DATE: '날짜를 선택해주세요.',
  NO_TIME: '예약 시간을 선택해주세요.',
  INVALID_PARTICIPANT: '참여 인원을 1명 이상으로 설정해주세요.',
  SUCCESS: '예약이 완료되었습니다.',
} as const;

export default function MobileReservationBar({
  experience,
  selectedDate,
  selectedTime,
  participantCount,
  onDateChange,
  onTimeChange,
  onParticipantChange,
}: MobileReservationBarProps) {
  const { dialogRef, openDialog, hideDialog, isOpen } = useDialog();

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

  const handleReservation = () => {
    openDialog();
  };

  const handleConfirmReservation = () => {
    if (!validateReservation()) {
      return;
    }

    toast({ message: VALIDATION_MESSAGES.SUCCESS, eventType: 'success' });
    hideDialog();
    // TODO: 예약 로직 구현
  };

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
          {/* 상단 정보 행 */}
          <div className='mb-3 flex items-center justify-between'>
            {/* 가격 및 인원 */}
            <div className='flex items-center gap-2'>
              <span className='text-lg font-bold text-gray-900'>
                ₩ {experience.price.toLocaleString()}
              </span>
              <span className='text-sm text-gray-600'>
                / {participantCount}명
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
            className={`w-full rounded-lg py-3 font-semibold text-white transition-colors ${
              selectedDate && selectedTime
                ? 'bg-primary-500 hover:bg-primary-600'
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
            onClick={handleReservation}
          >
            예약하기
          </button>
        </div>
      </div>

      {/* 예약 바텀시트 */}
      <BottomSheetContainer
        dialogRef={dialogRef}
        isOpen={isOpen}
        hideDialog={hideDialog}
        onClose={() => {}}
      >
        {({ closeDialog }) => 
          { return <ReservationBottomSheet
            experience={experience}
            participantCount={participantCount}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateChange={onDateChange}
            onParticipantChange={onParticipantChange}
            onTimeChange={onTimeChange}
            onClose={closeDialog}
          /> }
        }
      </BottomSheetContainer>
    </>
  );
}

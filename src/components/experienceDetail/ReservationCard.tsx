'use client';

import Calendar from '@/components/experienceDetail/Calendar';
import ExperienceHeader from '@/components/experienceDetail/ExperienceHeader';
import MobileReservationBar from '@/components/experienceDetail/MobileReservationBar';
import ParticipantCounter from '@/components/experienceDetail/ParticipantCounter';
import TimeSelector from '@/components/experienceDetail/TimeSelector';
import type { ReservationCardProps } from '@/components/experienceDetail/type';
import { toast } from '@/components/toast';

const VALIDATION_MESSAGES = {
  NO_DATE: '날짜를 선택해주세요.',
  NO_TIME: '예약 시간을 선택해주세요.',
  INVALID_PARTICIPANT: '참여 인원을 1명 이상으로 설정해주세요.',
  SUCCESS: '예약이 완료되었습니다.',
} as const;

export default function ReservationCard({
  experience,
  selectedDate,
  selectedTime,
  participantCount,
  onDateChange,
  onTimeChange,
  onParticipantChange,
}: ReservationCardProps) {
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
    if (!validateReservation()) {
      return;
    }

    toast({ message: VALIDATION_MESSAGES.SUCCESS, eventType: 'success' });
    // TODO: 예약 로직 구현
  };

  const totalPrice = experience.price * participantCount;

  return (
    <>
      <div className='space-y-4'>
        {/* 데스크톱용 체험 기본 정보 - lg 이상에서만 표시 */}
        <div className='hidden lg:block'>
          <ExperienceHeader experience={experience} />
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
            <Calendar selectedDate={selectedDate} onDateChange={onDateChange} />

            {/* 참여 인원 수 */}
            <ParticipantCounter
              participantCount={participantCount}
              onParticipantChange={onParticipantChange}
            />

            {/* 예약 가능한 시간 */}
            {selectedDate ? (
              <TimeSelector
                schedules={experience.schedules}
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
                  className='bg-primary-500 hover:bg-primary-600 rounded-lg px-6 py-3 font-semibold text-white transition-colors'
                  onClick={handleReservation}
                >
                  예약하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일/태블릿용 하단 고정 예약 바 */}
      <MobileReservationBar
        experience={experience}
        onDateChange={onDateChange}
        onParticipantChange={onParticipantChange}
        onTimeChange={onTimeChange}
        participantCount={participantCount}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />
    </>
  );
}

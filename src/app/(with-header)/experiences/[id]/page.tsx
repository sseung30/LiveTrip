'use client';

import { useState } from 'react';
import ExperienceHeader from '@/components/experienceDetail/ExperienceHeader';
import ExperienceInfo from '@/components/experienceDetail/ExperienceInfo';
import ExperienceReviews from '@/components/experienceDetail/ExperienceReviews';
import ImageGallery from '@/components/experienceDetail/ImageGallery';
import MobileExperienceHeader from '@/components/experienceDetail/MobileExperienceHeader';
import ReservationCard from '@/components/experienceDetail/ReservationCard';
import {
  MOCK_EXPERIENCE_DETAIL,
  MOCK_REVIEWS,
} from '@/mocks/experienceDetailMock';

export default function ExperienceDetailPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [participantCount, setParticipantCount] = useState(1);

  const handleReservation = () => {
    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 선택해주세요.');

      return;
    }

    const totalPrice = MOCK_EXPERIENCE_DETAIL.price * participantCount;

    alert(`예약이 완료되었습니다!\n총 금액: ₩${totalPrice.toLocaleString()}`);
  };

  return (
    <div className='min-h-screen'>
      {/* 메인 콘텐츠 */}
      <div className='mx-auto max-w-7xl px-4 py-4 pb-32 sm:px-6 sm:py-6 sm:pb-32 lg:px-8 lg:py-8 lg:pb-60'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8'>
          {/* 좌측 콘텐츠 영역 */}
          <div className='space-y-6 lg:col-span-2 lg:space-y-8'>
            {/* 이미지 갤러리 */}
            <ImageGallery
              images={[
                MOCK_EXPERIENCE_DETAIL.bannerImageUrl,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                ...(MOCK_EXPERIENCE_DETAIL as any).subImages.map(
                  (img: { id: number; imageUrl: string }) => img.imageUrl
                ),
              ]}
            />

            {/* 모바일/태블릿에서만 표시되는 체험 간략 설명 */}
            <div className='lg:hidden'>
              <MobileExperienceHeader experience={MOCK_EXPERIENCE_DETAIL} />
            </div>

            {/* 체험 정보 */}
            <ExperienceInfo
              description={MOCK_EXPERIENCE_DETAIL.description}
              address={MOCK_EXPERIENCE_DETAIL.address}
            />

            {/* 체험 후기 */}
            <ExperienceReviews
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              reviews={(MOCK_REVIEWS as any).reviews || []}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              totalReviews={(MOCK_REVIEWS as any).totalCount || 0}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              averageRating={(MOCK_REVIEWS as any).averageRating || 0}
            />
          </div>

          {/* 우측 예약 카드 */}
          <div className='lg:col-span-1'>
            <ReservationCard
              experience={MOCK_EXPERIENCE_DETAIL}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              participantCount={participantCount}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
              onParticipantChange={setParticipantCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

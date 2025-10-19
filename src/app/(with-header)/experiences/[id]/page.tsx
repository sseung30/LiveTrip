'use client';

import { useState } from 'react';
import ExperienceInfo from '@/components/experienceDetail/experience/ExperienceInfo';
import ExperienceReviews from '@/components/experienceDetail/experience/ExperienceReviews';
import ImageGallery from '@/components/experienceDetail/experience/ImageGallery';
import MobileExperienceHeader from '@/components/experienceDetail/experience/MobileExperienceHeader';
import ReservationCard from '@/components/experienceDetail/reservation/ReservationCard';
import {
  MOCK_EXPERIENCE_DETAIL,
  MOCK_REVIEWS,
} from '@/mocks/experienceDetailMock';

/**
 * 타입 안전한 이미지 배열 생성 함수
 */
const createImageArray = (
  experience: typeof MOCK_EXPERIENCE_DETAIL
): string[] => {
  const { subImages } = experience as {
    subImages: { id: number; imageUrl: string }[];
  };

  return [experience.bannerImageUrl, ...subImages.map((img) => img.imageUrl)];
};

/**
 * 타입 안전한 리뷰 데이터 추출 함수
 */
const extractReviewData = (reviews: typeof MOCK_REVIEWS) => {
  return {
    reviews: (reviews as { reviews: any[] }).reviews,
    totalCount: (reviews as { totalCount: number }).totalCount,
    averageRating: (reviews as { averageRating: number }).averageRating,
  };
};

export default function ExperienceDetailPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [participantCount, setParticipantCount] = useState(1);

  const imageArray = createImageArray(MOCK_EXPERIENCE_DETAIL);
  const reviewData = extractReviewData(MOCK_REVIEWS);

  return (
    <div className='min-h-screen'>
      {/* 메인 콘텐츠 */}
      <div className='mx-auto max-w-7xl px-4 py-4 pb-32 sm:px-6 sm:py-6 sm:pb-32 lg:px-8 lg:py-8 lg:pb-60'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8'>
          {/* 좌측 콘텐츠 영역 */}
          <div className='space-y-6 lg:col-span-2 lg:space-y-8'>
            {/* 이미지 갤러리 */}
            <ImageGallery images={imageArray} />

            {/* 모바일/태블릿 버전 체험 간략 설명 */}
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
              reviews={reviewData.reviews}
              totalReviews={reviewData.totalCount}
              averageRating={reviewData.averageRating}
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

import ExperienceDetailClient from '@/domain/experience-detail/components/experience/ExperienceDetailClient';
import ExperienceInfo from '@/domain/experience-detail/components/experience/ExperienceInfo';
import ExperienceReviews from '@/domain/experience-detail/components/experience/ExperienceReviews';
import ImageGallery from '@/domain/experience-detail/components/experience/ImageGallery';
import KakaoMapScript from '@/domain/experience-detail/components/experience/KakaoMapScript';
import MobileExperienceHeader from '@/domain/experience-detail/components/experience/MobileExperienceHeader';
import type {
  ExperienceDetail,
  ReviewResponse,
} from '@/domain/experience-detail/type';
import {
  getExperienceDetail,
  getReviews,
} from '@/domain/experience-detail/api';
import {
  MOCK_EXPERIENCE_DETAIL,
  MOCK_REVIEWS,
} from '@/mocks/experienceDetailMock';

interface PageProps {
  params: Promise<{ id: string }>;
}

function createImageArray(experience: ExperienceDetail): string[] {
  return [
    experience.bannerImageUrl,
    ...experience.subImages.map((img) => img.imageUrl),
  ];
}

function extractReviewData(reviewResponse: ReviewResponse) {
  return {
    reviews: reviewResponse.reviews,
    totalCount: reviewResponse.totalCount,
    averageRating: reviewResponse.averageRating,
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const activityId = Number(id);

  let experience: ExperienceDetail;
  let reviews: ReviewResponse;

  try {
    [experience, reviews] = await Promise.all([
      getExperienceDetail(activityId),
      getReviews(activityId, 1, 10),
    ]);
  } catch {
    console.warn(
      `API에서 체험 ID ${activityId}를 찾을 수 없어 Mock 데이터를 사용합니다.`
    );
    experience = MOCK_EXPERIENCE_DETAIL;
    reviews = MOCK_REVIEWS;
  }

  const imageArray = createImageArray(experience);
  const reviewData = extractReviewData(reviews);

  const currentUserId = 999;
  const isMyExperience = experience.userId === currentUserId;

  return (
    <div className='min-h-screen'>
      <KakaoMapScript />
      {/* 메인 콘텐츠 */}
      <div className='mx-auto max-w-7xl px-4 py-4 pb-32 sm:px-6 sm:py-6 sm:pb-32 lg:px-8 lg:py-8 lg:pb-60'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8'>
          {/* 좌측 콘텐츠 영역 */}
          <div className='space-y-6 lg:col-span-2 lg:space-y-8'>
            {/* 이미지 갤러리 */}
            <ImageGallery images={imageArray} />

            {/* 모바일/태블릿 버전 체험 간략 설명 */}
            <div className='lg:hidden'>
              <MobileExperienceHeader experience={experience} />
            </div>

            {/* 체험 정보 */}
            <ExperienceInfo
              description={experience.description}
              address={experience.address}
            />

            {/* 체험 후기 */}
            <ExperienceReviews
              reviews={reviewData.reviews}
              totalReviews={reviewData.totalCount}
              averageRating={reviewData.averageRating}
              activityId={activityId}
            />
          </div>

          {/* 우측 예약 카드 - 내 체험이 아닐 때만 표시 */}
          <ExperienceDetailClient
            experience={experience}
            isMyExperience={isMyExperience}
          />
        </div>
      </div>
    </div>
  );
}

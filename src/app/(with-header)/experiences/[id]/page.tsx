import {
  getActivityDetailWithCache,
  getActivityReviewsWithCache,
} from '@/domain/activity/api';
import ActivityDetailClient from '@/domain/activity/components/display/ActivityDetailClient';
import ExperienceInfo from '@/domain/activity/components/display/ActivityInfo';
import ExperienceReviews from '@/domain/activity/components/display/ActivityReviews';
import ImageGallery from '@/domain/activity/components/display/ImageGallery';
import KakaoMapScript from '@/domain/activity/components/display/KakaoMapScript';
import MobileActivityHeader from '@/domain/activity/components/display/MobileActivityHeader';
import type { ActivityDetail, ReviewResponse } from '@/domain/activity/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

function createImageArray(activity: ActivityDetail): string[] {
  return [
    activity.bannerImageUrl,
    ...activity.subImages.map((img) => img.imageUrl),
  ];
}

function extractReviewData(reviewResponse: ReviewResponse) {
  return {
    reviews: reviewResponse.reviews,
    totalCount: reviewResponse.totalCount,
    averageRating: reviewResponse.averageRating,
  };
}

export default async function ActivityDetailPage({ params }: PageProps) {
  const { id } = await params;
  const activityId = Number(id);

  const [activity, reviews] = await Promise.all([
    getActivityDetailWithCache(activityId),
    getActivityReviewsWithCache(activityId, 1, 10),
  ]);

  const imageArray = createImageArray(activity);
  const reviewData = extractReviewData(reviews);

  const currentUserId = 999;
  const isMyExperience = activity.userId === currentUserId;

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
              <MobileActivityHeader activity={activity} />
            </div>

            {/* 체험 정보 */}
            <ExperienceInfo
              description={activity.description}
              address={activity.address}
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
          <ActivityDetailClient
            activity={activity}
            isMyActivity={isMyExperience}
          />
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ExperienceReviewsProps } from '@/components/experienceDetail/type';
import Pagination from '@/components/pagination/Pagination';

const REVIEWS_PER_PAGE = 3;
const STAR_COUNT = 5;

const getSatisfactionLevel = (rating: number): string => {
  if (rating >= 4.5) {
    return '매우 만족';
  }
  if (rating >= 4.0) {
    return '만족';
  }
  if (rating >= 3.0) {
    return '보통';
  }

  return '불만족';
};

export default function ExperienceReviews({
  reviews,
  totalReviews,
  averageRating,
}: ExperienceReviewsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // TODO: 이후 API 연동 시 데이터 받아오도록
  const currentReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: STAR_COUNT }, (_, index) => {
      const isActive = index < rating;

      return (
        <Image
          key={`star-${index}`}
          src='/icons/star.svg'
          alt='별점'
          width={16}
          height={16}
          className={isActive ? '' : 'opacity-30'}
          style={{
            filter: isActive
              ? 'none'
              : 'brightness(0) saturate(100%) invert(85%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(85%) contrast(100%)',
          }}
        />
      );
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* 후기 헤더 */}
      <div className='mb-6'>
        <h2 className='mb-2 text-2xl font-bold text-gray-950'>
          체험 후기{' '}
          <span className='text-lg' style={{ color: '#79747E' }}>
            {totalReviews.toLocaleString()}개
          </span>
        </h2>

        {/* 전체 평점 */}
        <div className='flex flex-col items-center gap-2'>
          <span className='text-3xl font-bold text-gray-950'>
            {averageRating}
          </span>
          <span className='text-sm font-bold text-gray-950'>
            {getSatisfactionLevel(averageRating)}
          </span>
          <div className='flex items-center gap-1'>
            <Image src='/icons/star.svg' alt='별점' width={16} height={16} />
            <span className='text-sm text-gray-700'>
              {totalReviews.toLocaleString()}개 후기
            </span>
          </div>
        </div>
      </div>

      {/* 후기 목록 */}
      <div className='space-y-6'>
        {currentReviews.map((review) => {
          return (
            <div key={review.id} className='rounded-2xl bg-white p-6 shadow-lg'>
              <div className='mb-3'>
                <div className='mb-2 flex items-center gap-3'>
                  <span className='font-bold text-gray-950'>
                    {review.user.nickname}
                  </span>
                  <span className='text-sm text-gray-400'>
                    {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                  </span>
                </div>
                <div className='flex items-center gap-1'>
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className='leading-relaxed text-gray-950'>{review.content}</p>
            </div>
          );
        })}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalCount={totalReviews}
        limit={REVIEWS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

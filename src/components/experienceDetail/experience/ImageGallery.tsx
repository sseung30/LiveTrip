'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import {
  LeftArrowButton,
  RightArrowButton,
} from '@/components/button/ArrowButton';

interface ImageGalleryProps {
  images: string[];
}

const ANIMATION_DURATION = 300;
const GALLERY_HEIGHTS = {
  mobile: 'h-64',
  tablet: 'sm:h-80',
  desktop: 'lg:h-96',
} as const;

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const goToIndex = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) {
        return;
      }

      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => {
        setIsAnimating(false);
      }, ANIMATION_DURATION);
    },
    [isAnimating, currentIndex]
  );

  const goToPrev = useCallback(() => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    goToIndex(prevIndex);
  }, [currentIndex, images.length, goToIndex]);

  const goToNext = useCallback(() => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

    goToIndex(nextIndex);
  }, [currentIndex, images.length, goToIndex]);

  if (images.length === 0) {
    return (
      <div className='flex h-96 w-full items-center justify-center rounded-2xl bg-gray-200'>
        <span className='text-gray-500'>이미지가 없습니다</span>
      </div>
    );
  }

  const hasMultipleImages = images.length > 1;
  const galleryHeightClass = `${GALLERY_HEIGHTS.mobile} ${GALLERY_HEIGHTS.tablet} ${GALLERY_HEIGHTS.desktop}`;

  return (
    <div className='relative w-full'>
      <div
        className={`relative w-full overflow-hidden rounded-2xl ${galleryHeightClass}`}
      >
        <div
          className='flex h-full transition-transform duration-300 ease-in-out'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => {
            const imageSrc = failedImages.has(image)
              ? '/images/fallback_cloud.webp'
              : image;

            return (
              <div key={image} className='relative h-full w-full flex-shrink-0'>
                <Image
                  fill
                  priority={index === 0}
                  src={imageSrc}
                  alt={`체험 이미지 ${index + 1}`}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
                  className='object-cover'
                  onError={() => {
                    setFailedImages((prev) => {
                      const newSet = new Set(prev);

                      newSet.add(image);

                      return newSet;
                    });
                  }}
                />
              </div>
            );
          })}
        </div>

        {hasMultipleImages && (
          <>
            <LeftArrowButton ariaLabel='이전 이미지' onClick={goToPrev} />
            <RightArrowButton ariaLabel='다음 이미지' onClick={goToNext} />

            <div className='absolute right-4 bottom-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white'>
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className='mt-4 flex justify-center gap-2'>
          {images.map((image, index) => {
            return (
              <button
                key={image}
                aria-label={`${index + 1}번째 이미지로 이동`}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? 'bg-primary-500 w-8'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => {
                  goToIndex(index);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

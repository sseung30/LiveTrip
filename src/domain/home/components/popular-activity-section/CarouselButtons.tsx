import { type RefObject, useState } from 'react';
import {
  LeftArrowButton,
  RightArrowButton,
} from '@/components/button/ArrowButton';

export default function CarouselButtons({
  pageSize,
  sliderRef,
}: {
  pageSize: number;
  sliderRef: RefObject<HTMLDivElement | null>;
}) {
  const [page, setPage] = useState(1);
  const hasPrevPage = page > 1;
  const hasNextPage = page < pageSize;
  const getScrollPosition = (pageNumber: number) => {
    const cardIndex = (pageNumber - 1) * 4;
    const cards = sliderRef.current?.children;

    if (cards?.[cardIndex]) {
      const firstCard = cards[cardIndex] as HTMLElement;

      return firstCard.offsetLeft - 6;
    }

    return 0;
  };
  const onClickPrev = () => {
    if (hasPrevPage && sliderRef.current) {
      const scrollPosition = getScrollPosition(page - 1);

      setPage((prev) => prev - 1);
      sliderRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  };
  const onClickRight = () => {
    if (hasNextPage && sliderRef.current) {
      const scrollPosition = getScrollPosition(page + 1);

      setPage((prev) => prev + 1);
      console.log(scrollPosition);

      sliderRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      {hasPrevPage && (
        <LeftArrowButton
          ariaLabel='이전 페이지'
          className='border-gray-25 -left-5 z-10 hidden hover:border-1 xl:block'
          onClick={onClickPrev}
        />
      )}
      {hasNextPage && (
        <RightArrowButton
          ariaLabel='다음 페이지'
          className='border-gray-25 -right-5 z-10 hidden hover:border-1 xl:block'
          onClick={onClickRight}
        />
      )}
    </>
  );
}

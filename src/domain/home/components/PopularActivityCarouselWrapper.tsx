'use client';
import { useRef } from 'react';
import type { Activity } from '@/domain/activities/type';
import ArrowButtons from '@/domain/home/components/ArrowButtons';
import Card from '@/domain/home/components/Card';

export default function PopularActivityCarouselWrapper({
  activities,
}: {
  activities: Activity[];
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const pageSize = 4;

  return (
    <div
      ref={sliderRef}
      className={
        'scrollbar-hide flex w-full items-center gap-3.5 overflow-x-scroll px-1.5'
      }
    >
      <>
        {activities.map((activity) => {
          return (
            <div
              className='w-[8.25rem] shrink-0 snap-start md:w-[20.75rem] xl:w-[16.6rem]'
              key={crypto.randomUUID()}
            >
              <Card
                id={activity.id}
                title={activity.title}
                src={activity.bannerImageUrl}
                alt={activity.title}
              />
            </div>
          );
        })}
      </>
      <ArrowButtons pageSize={pageSize} sliderRef={sliderRef} />
    </div>
  );
}

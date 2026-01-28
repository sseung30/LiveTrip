'use client';
import { useRef } from 'react';
import Card from '@/domain/activity/components/display/Card';
import ArrowButtons from '@/domain/activity/components/display/PopularActivitySection/CarouselButtons';
import type { Activity } from '@/domain/activity/types';

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
              key={`card-${crypto.randomUUID()}`}
            >
              <Card activity={activity} alt={activity.title} />
            </div>
          );
        })}
      </>
      <ArrowButtons pageSize={pageSize} sliderRef={sliderRef} />
    </div>
  );
}

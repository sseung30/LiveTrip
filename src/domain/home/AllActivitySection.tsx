'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ActivityTabs, tabs } from '@/domain/home/ActivityTabs';
import Card from '@/domain/home/Card';
import { getActivityList } from '@/domain/home/mock';

export default function AllActivitySection() {
  const { activities } = getActivityList();
  const [selectedTabIndex, setSelectedTabIndex] = useState(-1);
  const isTabSelected = selectedTabIndex !== -1;
  const sectionTitle = '🛼 모든 체험';
  const title = isTabSelected
    ? tabs[selectedTabIndex].emojiTitle
    : sectionTitle;

  return (
    <section className='relative w-full'>
      <div className='mb-2.5 flex items-center justify-between md:mb-4'>
        <h2 className='text-18 md:text-24 font-bold'>{title}</h2>
        <div className='hover:bg-gray-25 flex cursor-pointer rounded-2xl p-3 xl:absolute xl:top-[3.25rem] xl:right-0'>
          <span className='text-16 font-medium'>가격</span>
          <Image
            src={'/icons/arrow-down.svg'}
            alt='아래 화살표'
            width={20}
            height={20}
          />
        </div>
      </div>
      <ActivityTabs
        selectedTabIndex={selectedTabIndex}
        setSelectedTabIndex={setSelectedTabIndex}
      />
      <div className='grid w-full grid-cols-2 gap-3.5 overflow-x-scroll md:justify-items-center md:gap-5 md:overflow-hidden xl:grid-cols-4'>
        {activities.map((activity) => {
          return (
            <Card
              src={activity.bannerImageUrl}
              alt={activity.title}
              key={crypto.randomUUID()}
              imageClassNames='aspect-1/1'
            />
          );
        })}
      </div>
    </section>
  );
}

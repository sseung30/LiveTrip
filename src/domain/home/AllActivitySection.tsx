'use client';
import { useState } from 'react';
import { ActivityTabs, tabs } from '@/domain/home/ActivityTabs';
import Card from '@/domain/home/Card';
import DropdownTabs from '@/domain/home/components/DropdownTabs';
import { getActivityList } from '@/domain/home/mock';

export default function AllActivitySection() {
  const { activities } = getActivityList();
  const [selectedTabIndex, setSelectedTabIndex] = useState(-1);
  const [selectedDropdownOption, setSelectedDropdownOption] =
    useState('인기순');
  const [isDescending, setIsDescending] = useState(true);

  const isTabSelected = selectedTabIndex !== -1;
  const sectionTitle = '🛼 모든 체험';
  const title = isTabSelected
    ? tabs[selectedTabIndex].emojiTitle
    : sectionTitle;

  const onDropdownSelect = (value: string) => {
    setSelectedDropdownOption(value);
  };

  return (
    <section className='relative w-full'>
      <div className='mb-2.5 flex items-center justify-between md:mb-4'>
        <h2 className='text-18 md:text-24 font-bold'>{title}</h2>
        <DropdownTabs
          selectedDropdownOption={selectedDropdownOption}
          isDescending={isDescending}
          setIsDescending={setIsDescending}
          onDropdownSelect={onDropdownSelect}
        />
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

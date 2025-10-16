'use client';
import { useState } from 'react';
import { ActivityTabs, tabs } from '@/domain/home/components/ActivityTabs';
import DropdownTabs from '@/domain/home/components/DropdownTabs';
import GridCardList from '@/domain/home/components/GridCardList';
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
      <GridCardList activities={activities} />
    </section>
  );
}

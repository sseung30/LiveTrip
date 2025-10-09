'use client';
import { cx } from 'class-variance-authority';
import type { Dispatch, SetStateAction } from 'react';

interface ActivityTabsProps {
  selectedTabIndex: number;
  setSelectedTabIndex: Dispatch<SetStateAction<number>>;
}
export const tabs = [
  { icon: <></>, title: '문화 · 예술', emojiTitle: '🎨 문화 · 예술' },
  { icon: <></>, title: '식음료', emojiTitle: '🥗 식음료' },
  { icon: <></>, title: '투어', emojiTitle: '🏕️ 투어' },
  { icon: <></>, title: '관광', emojiTitle: '✈️ 관광' },
  { icon: <></>, title: '웰빙', emojiTitle: '🧘‍♀️ 웰빙' },
];

export function ActivityTabs({
  selectedTabIndex,
  setSelectedTabIndex,
}: ActivityTabsProps) {
  const handleClick = (index: number) => {
    if (selectedTabIndex === index) {
      setSelectedTabIndex(-1);

      return;
    }
    setSelectedTabIndex(index);
  };

  return (
    <div className='scrollbar-hide mb-6 flex gap-2 overflow-scroll overflow-y-hidden md:mb-8 md:gap-5'>
      {tabs.map((tab, index) => {
        return (
          <button
            key={`tab-${crypto.randomUUID()}`}
            className={cx(
              'border-gray-150 hover:bg-gray-25 min-w-fit cursor-pointer rounded-[100px] border-1 px-4 py-2.5',
              selectedTabIndex === index &&
                'bg-gray-900 text-white hover:bg-gray-900'
            )}
            onClick={() => {
              handleClick(index);
            }}
          >
            {tab.icon}
            <span>{tab.title}</span>
          </button>
        );
      })}
    </div>
  );
}

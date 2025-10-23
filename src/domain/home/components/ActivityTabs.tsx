'use client';
import { cx } from 'class-variance-authority';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';

interface ActivityTabsProps {
  categoryIndex: number;
}
export const categoryTabs = [
  { icon: <></>, title: '문화 · 예술', emojiTitle: '🎨 문화 · 예술' },
  { icon: <></>, title: '식음료', emojiTitle: '🥗 식음료' },
  { icon: <></>, title: '투어', emojiTitle: '🏕️ 투어' },
  { icon: <></>, title: '관광', emojiTitle: '✈️ 관광' },
  { icon: <></>, title: '웰빙', emojiTitle: '🧘‍♀️ 웰빙' },
];

export function ActivityTabs({ categoryIndex }: ActivityTabsProps) {
  const { setSearchParams } = useCustomSearchParams();

  const handleClick = (index: number) => {
    if (categoryIndex === index) {
      return;
    }
    setSearchParams({ categoryIndex: String(index) });
  };

  return (
    <div className='scrollbar-hide mb-6 flex gap-2 overflow-scroll overflow-y-hidden md:mb-8 md:gap-5'>
      {categoryTabs.map((tab, index) => {
        return (
          <button
            key={`tab-${crypto.randomUUID()}`}
            className={cx(
              'border-gray-150 hover:bg-gray-25 min-w-fit cursor-pointer rounded-[100px] border-1 px-4 py-2.5',
              categoryIndex === index &&
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

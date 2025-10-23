'use client';
import { cx } from 'class-variance-authority';
import Image from 'next/image';
import { categoryTabs } from '@/domain/home/constants/categoryTabs';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';

interface ActivityTabsProps {
  categoryIndex: number;
}

export function ActivityTabs({ categoryIndex }: ActivityTabsProps) {
  const { setSearchParams } = useCustomSearchParams();

  const handleTabClick = (index: number) => {
    if (categoryIndex === index) {
      return;
    }
    setSearchParams({ categoryIndex: String(index) });
  };
  const handleDeleteClick = () => {
    setSearchParams({ categoryIndex: String(-1) });
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
              handleTabClick(index);
            }}
          >
            {tab.icon}
            <span>{tab.title}</span>
          </button>
        );
      })}
      <button
        className='border-gray-150 hover:bg-gray-25 min-w-fit cursor-pointer rounded-[100px] border-1 px-4 py-2.5 active:bg-gray-900'
        onClick={handleDeleteClick}
      >
        <Image
          src={'/icons/delete.svg'}
          alt='카테고리 제거'
          width={28}
          height={28}
        />
      </button>
    </div>
  );
}

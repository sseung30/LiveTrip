'use client';
import { cx } from 'class-variance-authority';
import { CategoryIcon } from '@/domain/home/components/svg';
import { categoryTabs } from '@/domain/home/constants/categoryTabs';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';

interface ActivityTabsProps {
  category: string | undefined;
}
const _BUTTON_DEFAULT_CLASS_NAME =
  'border-gray-150 hover:bg-gray-25 flex-center min-w-fit cursor-pointer gap-1.5 rounded-[100px] border-1 px-4 py-2.5 active:bg-gray-900 active:text-white active:[&_svg]:fill-white';
const _BUTTON_SELECTED_CLASS_NAME =
  'bg-gray-900 text-white hover:bg-gray-900 [&_svg]:fill-white';

export function ActivityTabs({ category }: ActivityTabsProps) {
  const { setSearchParams } = useCustomSearchParams();
  const isCategorySelected = (title: string) => category === title;

  const handleTabClick = (title: string) => {
    if (isCategorySelected(title)) {
      return;
    }
    setSearchParams({ category: title, page: '' });
  };
  const handleDeleteClick = () => {
    setSearchParams({ category: '' });
  };

  return (
    <div className='scrollbar-hide sticky top-1 z-2 mb-6 flex gap-2 overflow-scroll overflow-y-hidden md:mb-8 md:gap-5'>
      <button
        className={cx(
          _BUTTON_DEFAULT_CLASS_NAME,
          !category && _BUTTON_SELECTED_CLASS_NAME
        )}
        onClick={handleDeleteClick}
      >
        <CategoryIcon />
      </button>
      {categoryTabs.map((tab) => {
        return (
          <button
            key={`tab-${crypto.randomUUID()}`}
            className={cx(
              _BUTTON_DEFAULT_CLASS_NAME,
              isCategorySelected(tab.title) && _BUTTON_SELECTED_CLASS_NAME
            )}
            onClick={() => {
              handleTabClick(tab.title);
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

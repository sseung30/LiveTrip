'use client';
import Image from 'next/image';
import Dropdown from '@/components/dropdown/Dropdown';
import type { sortType } from '@/domain/activities/type';
import descendingIcon from '@/domain/home/assets/sort-amount-down.svg';
import ascendingIcon from '@/domain/home/assets/sort-amount-up.svg';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';

interface DropdownTabsProps {
  sortOption: sortType;
  isDescending: boolean;
}
const sortOptionMapping = {
  most_reviewed: '리뷰',
  price_desc: '가격',
  price_asc: '가격',
  latest: '최신',
} as Record<sortType, string>;

export default function DropdownTabs({
  sortOption,
  isDescending,
}: DropdownTabsProps) {
  const { setSearchParams } = useCustomSearchParams();
  const selectedDropdownOption = sortOptionMapping[sortOption];

  const handleDescendingButton = () => {
    setSearchParams({ descending: `${!isDescending}` });
  };

  const handleDropdownSelectButton = (value: string) => {
    setSearchParams({ sort: value });
  };

  return (
    <>
      <div className='flex-center gap-5'>
        <button
          className='hover:bg-gray-25 border-gray-150 rounded-2xl border-1 px-4 py-2.5'
          onClick={handleDescendingButton}
        >
          {isDescending ? (
            <Image
              src={descendingIcon}
              alt='오름차순으로 변경'
              width={18}
              height={18}
            />
          ) : (
            <Image
              src={ascendingIcon}
              alt='내림차순으로 변경'
              width={18}
              height={18}
            />
          )}
        </button>
        <Dropdown width={110}>
          <Dropdown.Trigger variant='mainPage'>
            {selectedDropdownOption}
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Items
              variant='mainPage'
              value='price_desc'
              onSelect={handleDropdownSelectButton}
            >
              가격
            </Dropdown.Items>
            <Dropdown.Items
              variant='mainPage'
              value='most_reviewed'
              onSelect={handleDropdownSelectButton}
            >
              리뷰
            </Dropdown.Items>
            <Dropdown.Items
              variant='mainPage'
              value='latest'
              onSelect={handleDropdownSelectButton}
            >
              날짜
            </Dropdown.Items>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

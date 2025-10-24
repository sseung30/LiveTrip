'use client';
import Dropdown from '@/components/dropdown/Dropdown';
import type { sortType } from '@/domain/activities/type';
import SortPriceButton from '@/domain/home/components/SortPriceButton';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';

interface DropdownTabsProps {
  sortOption: sortType;
}
const sortOptionMapping = {
  most_reviewed: '리뷰',
  price_desc: '가격',
  price_asc: '가격',
  latest: '최신',
} as Record<sortType, string>;

export default function DropdownTabs({ sortOption }: DropdownTabsProps) {
  const { setSearchParams } = useCustomSearchParams();
  const selectedDropdownOption = sortOptionMapping[sortOption];
  const isPriceOption =
    sortOption === 'price_asc' || sortOption === 'price_desc';
  const handleDropdownSelectButton = (value: string) => {
    setSearchParams({ sort: value });
  };

  return (
    <>
      <div className='flex-center gap-5'>
        {isPriceOption && <SortPriceButton isPriceOption={isPriceOption} />}
        <Dropdown>
          <Dropdown.Trigger variant='mainPage'>
            <span className='text-gray-800'>{selectedDropdownOption}</span>
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
              최신
            </Dropdown.Items>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

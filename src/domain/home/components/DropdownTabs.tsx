'use client';
import Dropdown from '@/components/dropdown/Dropdown';
import type { sortType } from '@/domain/activities/type';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';

interface DropdownTabsProps {
  sortOption: sortType;
}
const sortOptionMapping = {
  most_reviewed: '리뷰',
  price_desc: '가격 내림차순',
  price_asc: '가격 오름차순',
  latest: '최신',
} as Record<sortType, string>;

export default function DropdownTabs({ sortOption }: DropdownTabsProps) {
  const { setSearchParams } = useCustomSearchParams();
  const selectedDropdownOption = sortOptionMapping[sortOption];

  const handleDropdownSelectButton = (value: string) => {
    setSearchParams({ sort: value });
  };

  return (
    <>
      <div className='flex-center gap-5'>
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

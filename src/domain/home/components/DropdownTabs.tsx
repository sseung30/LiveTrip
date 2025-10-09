import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import Dropdown from '@/components/dropdown/Dropdown';
import descendingIcon from '@/domain/home/assets/sort-amount-down.svg';
import ascendingIcon from '@/domain/home/assets/sort-amount-up.svg';

interface DropdownTabsProps {
  selectedDropdownOption: string;
  onDropdownSelect: (value: string) => void;
  isDescending: boolean;
  setIsDescending: Dispatch<SetStateAction<boolean>>;
}
export default function DropdownTabs({
  selectedDropdownOption,
  onDropdownSelect,
  isDescending,
  setIsDescending,
}: DropdownTabsProps) {
  const handleSortClick = () => {
    setIsDescending((prev) => !prev);
  };

  return (
    <>
      <div className='flex-center gap-5'>
        <button
          className='hover:bg-gray-25 border-gray-150 rounded-2xl border-1 px-4 py-2.5'
          onClick={handleSortClick}
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
          <Dropdown.Trigger>{selectedDropdownOption}</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Items value='가격순' onSelect={onDropdownSelect}>
              가격순
            </Dropdown.Items>
            <Dropdown.Items value='인기순' onSelect={onDropdownSelect}>
              인기순
            </Dropdown.Items>
            <Dropdown.Items value='날짜순' onSelect={onDropdownSelect}>
              날짜순
            </Dropdown.Items>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

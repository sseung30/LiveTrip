'use client';
import { useState } from 'react';
import { AscendingIcon, DescendingIcon } from '@/domain/home/components/svg';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';

export default function SortPriceButton({
  isPriceOption,
}: {
  isPriceOption: boolean;
}) {
  const [isDescending, setIsDescending] = useState(true);
  const { setSearchParams } = useCustomSearchParams();

  const handleDescendingButton = () => {
    if (!isPriceOption) {
      return;
    }
    setSearchParams({ sort: isDescending ? 'price_asc' : 'price_desc' });
    setIsDescending(!isDescending);
  };

  return (
    <button
      className='hover:bg-gray-25 border-gray-150 h-full rounded-[100px] border-1 px-5 py-2.5'
      onClick={handleDescendingButton}
    >
      {isDescending ? <DescendingIcon /> : <AscendingIcon />}
    </button>
  );
}

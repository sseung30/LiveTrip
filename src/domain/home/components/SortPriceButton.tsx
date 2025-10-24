'use client';
import Image from 'next/image';
import { useState } from 'react';
import descendingIcon from '@/domain/home/assets/sort-amount-down.svg';
import ascendingIcon from '@/domain/home/assets/sort-amount-up.svg';
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
  );
}

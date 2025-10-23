'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface paramsType {
  [key: string]: string;
}

const useCustomSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const _searchParams = useSearchParams();
  const searchParams = new URLSearchParams(_searchParams.toString());

  const setNewParams = (newParams: paramsType) => {
    for (const [key, value] of Object.entries(newParams)) {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    }

    return searchParams.toString();
  };

  const setSearchParams = (newParams: paramsType) => {
    router.push(`${pathname}?${setNewParams(newParams)}`, {
      scroll: false,
    });
  };

  return { searchParams: Object.fromEntries(searchParams), setSearchParams };
};

export default useCustomSearchParams;

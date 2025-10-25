'use client';

import Pagination from '@/components/pagination/Pagination';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';

interface PaginationContainerProps {
  page: number;
  totalCount: number;
}
export default function PaginationContainer({
  page,
  totalCount,
}: PaginationContainerProps) {
  const { setSearchParams } = useCustomSearchParams();
  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  return (
    <Pagination
      currentPage={page}
      totalCount={totalCount}
      limit={5}
      onPageChange={handlePageChange}
    />
  );
}

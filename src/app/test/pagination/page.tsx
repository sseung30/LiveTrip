// app/test/pagination/page.tsx

'use client'; // 

import { useState } from 'react';
import Pagination from '@/components/pagination/Pagination'; 

export default function PaginationTestPage() {
  const [currentPage, setCurrentPage] = useState(1);
  /**
   * 테스트를 위한 전체 페이지 수
   */
  const totalCount = 100;
  /**
   * 한 페이지당 아이템 수
   */
  const limit = 5; 
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10">
      <h1 className="text-white text-2xl mb-8">
        Pagination Test: Current Page {currentPage} / {totalPages}
      </h1>
      
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        limit={5} // 한 페이지당 아이템 수
        onPageChange={setCurrentPage} // 상태 변경 함수 전달
      />

      <div className="text-gray-400 mt-4">
        * 페이지네이션 UI를 테스트 페이지
      </div>
    </div>
  );
}
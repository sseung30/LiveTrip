// app/test/pagination/page.tsx

'use client'; // 

import { useState } from 'react';
import Pagination from '@/components/pagination/Pagination'; 

export default function PaginationTestPage() {
  const [currentPage, setCurrentPage] = useState(1);
  /**
   * 테스트를 위한 전체 페이지 수
   */
  const totalPages = 15; 

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10">
      <h1 className="text-white text-2xl mb-8">
        Pagination Test: Current Page {currentPage} / {totalPages}
      </h1>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage} // 상태 변경 함수 전달
      />

      <div className="text-gray-400 mt-4">
        * 페이지네이션 UI를 테스트 페이지
      </div>
    </div>
  );
}
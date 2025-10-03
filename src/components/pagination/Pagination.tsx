'use client'; 

import Image from 'next/image';
import Link from 'next/link';
import chevronLeft from '@/components/pagination/asset/chevron-left.svg'
import chevronRight from '@/components/pagination/asset/chevron-right.svg'

const PAGE_GROUP_SIZE = 5; 

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {

  // 페이지 그룹 계산 로직 (5개 단위로 이동)g
  const currentGroupStart = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const currentGroupEnd = Math.min(
    currentGroupStart + PAGE_GROUP_SIZE - 1,
    totalPages
  );

  // 현재 그룹에서 표시할 페이지 번호 배열 생성
  const pageNumbers = Array.from(
    { length: currentGroupEnd - currentGroupStart + 1 },
    (_, i) => currentGroupStart + i
  );

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const prevGroupStart = currentGroupStart - PAGE_GROUP_SIZE;
  const nextGroupStart = currentGroupStart + PAGE_GROUP_SIZE;

  const handlePrevGroup = () => {
    if (prevGroupStart >= 1) {
      onPageChange(prevGroupStart);
    }
  };

  const handleNextGroup = () => {
    if (nextGroupStart <= totalPages) {
      onPageChange(nextGroupStart);
    }
  };

  /**
   * Chevron 아이콘 클래스 정의
   */
  const getChevronClasses = (isDisabled: boolean) => {
    return `w-6 h-6 transition-colors duration-150 ${
      isDisabled 
        ? 'text-gray-300 opacity-50' 
        : 'text-gray-300 hover:text-gray-700 active:text-black' 
    }`;
  };

  return (
    <nav className="flex justify-center items-center space-x-2 my-10" aria-label="Pagination">
      
      {/* 1. 이전 그룹 버튼 ('<') */}
      <button
        disabled={currentGroupStart === 1}
        className="px-2 py-[6] disabled:cursor-not-allowed" // 비활성화 시 커서 변경
        aria-label="이전 페이지 그룹"
        onClick={handlePrevGroup}
      >
        <Image 
          src={chevronLeft} 
          alt="이전 그룹" 
          width={24} 
          height={24} 
          className={getChevronClasses(currentGroupStart === 1)}
        />
      </button>

      {/* 2. 페이지 번호 목록 */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page) => {
          const isActive = page === currentPage;
          
          return (
            <button
              key={page}
              aria-current={isActive ? 'page' : undefined}
              className={`
                px-2 py-2 text-sm font-medium transition-colors duration-150 
                ${isActive 
                  ? 'text-black' // 활성 페이지는 검정색 
                  : 'text-gray-400 hover:text-gray-700' // 비활성 페이지는 회색, 호버 시 진한 회색
                }
              `}

              onClick={() => {handlePageClick(page)}}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* 3. 다음 그룹 버튼 ('>') */}
      <button
        disabled={currentGroupEnd === totalPages} 
        className="px-2 py-[6] disabled:cursor-not-allowed"
        aria-label="다음 페이지 그룹"
        onClick={handleNextGroup}
      >
        <Image 
          src={chevronRight} 
          alt="다음 그룹" 
          width={24} 
          height={24} 
          className={getChevronClasses(currentGroupEnd === totalPages)}
        />
      </button>
    </nav>
  );
}
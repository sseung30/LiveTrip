import { useEffect, useRef } from 'react';

interface useInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  setPage: (callback: (prevPage: number) => number) => void;
}

/**
 * loading: 현재 추가 데이터를 불러오는 중인지 여부
 * hasMore: 더 불러올 데이터가 남았는지 여부
 * setPage: 페이지 번호를 증가시키는 상태 업데이트 함수
 */
export default function useInfiniteScroll({
  loading,
  hasMore,
  setPage,
}: useInfiniteScrollProps) {
  // 실제로 화면 스크롤 상태를 관찰하는 IntersectionObserver 인스턴스
  const observer = useRef<IntersectionObserver | null>(null);
  // 리스트 하단의 로딩 트리거 <div>에 연결
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 이미 요청을 보내는 중이면(로딩 중이면), 관찰자를 만들지 않음
    if (loading) {
      return;
    }
    // 이미 관찰 중이면, 관찰 연결 중단
    if (observer.current) {
      observer.current.disconnect();
    }

    // 새로운 IntersectionObserver
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore) {
            setPage((prev) => prev + 1);
          }
        });
      },
      {
        rootMargin: '200px',
        threshold: 0,
      }
    );

    // loader div를 관찰 대상으로 등록
    if (loader.current) {
      observer.current.observe(loader.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore, setPage]);

  // loader ref를 받아 <div ref={loader} />등에 연결할 수 있도록 반환
  return { loader };
}

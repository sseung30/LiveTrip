import { useEffect, useRef } from 'react';

interface useInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  setPage: (callback: (prevPage: number) => number) => void;
}

export default function useInfiniteScroll({
  loading,
  hasMore,
  setPage,
}: useInfiniteScrollProps) {
  const observer = useRef<IntersectionObserver | null>(null);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect(); // 중복 확인 제거
    }

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

    if (loader.current) {
      observer.current.observe(loader.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore, setPage]);

  return { loader };
}

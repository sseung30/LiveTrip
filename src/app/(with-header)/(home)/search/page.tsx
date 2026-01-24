import { Suspense } from 'react';
import IntroSection from '@/domain/home/components/IntroSection';
import SearchResult from '@/domain/home/components/search/SearchResult';
import SearchResultSkeleton from '@/domain/home/components/search/SearchResultSkeleton';

export default async function HomeSearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
  }>;
}) {
  const { q } = await searchParams;

  return (
    <>
      <IntroSection />
      <Suspense key={q} fallback={<SearchResultSkeleton />}>
        <SearchResult q={q} />
      </Suspense>
    </>
  );
}

import { Suspense } from 'react';
import IntroSection from '@/domain/activity/components/display/IntroSection';
import SearchResult from '@/domain/activity/components/display/SearchResult';
import SearchResultSkeleton from '@/domain/activity/components/display/SearchResultSkeleton';

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

import { Suspense } from 'react';
import SearchResult from '@/domain/home/components/SearchResult';
import IntroSection from '@/domain/home/components/IntroSection';

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
      <Suspense key={q} fallback={<div>Loading...</div>}>
        <SearchResult q={q} />
      </Suspense>
    </>
  );
}

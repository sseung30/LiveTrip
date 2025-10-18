import { Suspense } from 'react';
import SearchResult from '@/domain/home/components/SearchResult';

export default async function HomeSearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
  }>;
}) {
  const { q } = await searchParams;

  return (
    <section className=''>
      <Suspense key={q} fallback={<div>Loading...</div>}>
        <SearchResult q={q} />
      </Suspense>
    </section>
  );
}

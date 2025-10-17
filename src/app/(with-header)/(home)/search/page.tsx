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
    <Suspense fallback={<div>Loading...</div>}>
    <section className=''>
      <SearchResult q={q} />
    </section>
    </Suspense>
  );
}

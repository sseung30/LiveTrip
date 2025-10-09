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
      <SearchResult q={q} />
    </section>
  );
}

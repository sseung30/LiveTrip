import { queryOptions } from '@/domain/activities/queryOptions';
import SearchResultDataWrapper from '@/domain/home/components/search/SearchResultDataWrapper';
import { getDehydratedInfiniteQueryClient } from '@/utils/react-query/getDehydratedInfiniteQueryClient';
import { Hydrate } from '@/utils/react-query/getQueryClient';

interface SearchResultProps {
  q: string;
}
export default async function SearchResult({ q }: SearchResultProps) {
  const hydratedInfiniteActivities = await getDehydratedInfiniteQueryClient({
    ...queryOptions.all({
      sort: 'latest',
      keyword: q,
      method: 'cursor',
      size: 8,
    }),
    initialPageParam: undefined,
  });

  return (
    <Hydrate state={hydratedInfiniteActivities}>
      <SearchResultDataWrapper q={q} />
    </Hydrate>
  );
}

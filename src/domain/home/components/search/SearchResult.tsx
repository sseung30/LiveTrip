import { queryOptions } from '@/domain/activities/queryOptions';
import { getDehydratedInfiniteQueryClient } from '@/utils/react-query/getDehydratedInfiniteQueryClient';
import SearchResultDataWrapper from './SearchResultDataWrapper';
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

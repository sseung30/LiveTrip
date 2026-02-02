import SearchResultDataWrapper from '@/domain/activity/components/display/SearchResult/SearchResultDataWrapper';
import { activityQueryOptions } from '@/domain/activity/utils/queryOptions';
import { getDehydratedInfiniteQueryClient } from '@/utils/react-query/getDehydratedInfiniteQueryClient';
import { Hydrate } from '@/utils/react-query/getQueryClient';

interface SearchResultProps {
  q: string;
}
export default async function SearchResult({ q }: SearchResultProps) {
  const hydratedInfiniteActivities = await getDehydratedInfiniteQueryClient({
    ...activityQueryOptions.all({
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

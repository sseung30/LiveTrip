import { queryOptions } from '@/domain/activities/queryOptions';
import AllActivityDataWrapper from '@/domain/home/components/all-activity-section/AllActivityDataWrapper';
import type { AllActivitySectionProps } from '@/domain/home/type';
import { getDehydratedInfiniteQueryClient } from '@/utils/react-query/getDehydratedInfiniteQueryClient';
import { Hydrate } from '@/utils/react-query/getQueryClient';

export default async function AllActivityPrefetch({
  sort = 'latest',
  category,
}: AllActivitySectionProps) {
  const hydratedInfiniteActivities = await getDehydratedInfiniteQueryClient({
    ...queryOptions.all({
      sort,
      category,
      method: 'cursor',
      size: 8,
    }),
    initialPageParam: undefined,
  });

  return (
    <Hydrate state={hydratedInfiniteActivities}>
      <AllActivityDataWrapper category={category} sort={sort} />
    </Hydrate>
  );
}

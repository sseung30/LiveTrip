import AllActivityDataWrapper from '@/domain/activity/components/display/AllActivitySection/AllActivityDataWrapper';
import type { AllActivitySectionProps } from '@/domain/activity/types';
import { activityQueryOptions } from '@/domain/activity/utils/queryOptions';
import { getDehydratedInfiniteQueryClient } from '@/utils/react-query/getDehydratedInfiniteQueryClient';
import { Hydrate } from '@/utils/react-query/getQueryClient';

export default async function AllActivityPrefetch({
  sort = 'latest',
  category,
}: AllActivitySectionProps) {
  const hydratedInfiniteActivities = await getDehydratedInfiniteQueryClient({
    ...activityQueryOptions.all({
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

import { getAllActivitiesWithCache } from '@/domain/activities/api';
import type { getAllActivitiesParams } from '@/domain/activities/type';
import type { AllActivityCardsProps } from '@/domain/home//type';
import GridCardList from '@/domain/home/components/GridCardList';

export default async function AllActivityCards({
  category,
  sort,
  page,
}: AllActivityCardsProps) {
  const { activities } = await getAllActivitiesWithCache({
    category,
    sort,
    page,
    size: 8,
    method: 'cursor',
  } as getAllActivitiesParams);

  return <GridCardList activities={activities} />;
}

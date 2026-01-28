import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchMyActivities } from '@/domain/reservation/api';
import ReservationStatusClient from '@/domain/reservation/components/ReservationStatusClient';

export default async function ReservationStatusPage() {
  const queryClient = new QueryClient();

  // 내 체험 목록 prefetch
  await queryClient.prefetchQuery({
    queryKey: ['my-activities'],
    queryFn: () => fetchMyActivities(100),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReservationStatusClient />
      </HydrationBoundary>
    </>
  );
}

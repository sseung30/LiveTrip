import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { fetchMyActivities } from '@/domain/reservationStatus/api';

import ReservationStatusClient from '@/app/(with-header)/reservation-status/ReservationStatusClient';

export default async function ReservationStatusPage() {
  const queryClient = new QueryClient();

  // 내 체험 목록 prefetch
  await queryClient.prefetchQuery({
    queryKey: ['my-activities'],
    queryFn: () => fetchMyActivities(100),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReservationStatusClient />
    </HydrationBoundary>
  );
}
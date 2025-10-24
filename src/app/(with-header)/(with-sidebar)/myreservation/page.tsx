import { apiFetch } from '@/api/api';
import MyReservationsSection from '@/domain/myreservations/MyReservationsSection';
import type { MyReservations } from '@/domain/myreservations/type';

export default async function Page() {
  // const { reservations, totalCount } =
  //   await apiFetch<MyReservations>('/my-reservations');

  // const hasReservations = Boolean(totalCount);

  return (
    <>
      <main className='w-full'>
        <div className='mb-3 md:mb-7.5'>
          <h2 className='text-18 mb-2.5 font-bold text-gray-950'>예약내역</h2>
          <p className='text-gray-500'>예약내역 변경 및 취소할 수 있습니다.</p>
        </div>
        <MyReservationsSection
        // hasReservations={hasReservations}
        // reservations={reservations}
        />
      </main>
    </>
  );
}

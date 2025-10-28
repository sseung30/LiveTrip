import MyReservationsSection from '@/domain/myreservations/MyReservationsSection';

export default async function Page() {
  return (
    <>
      <main className='w-full'>
        <div className='mb-3 md:mb-7.5'>
          <h2 className='text-18 mb-2.5 font-bold text-gray-950'>예약내역</h2>
          <p className='text-gray-500'>예약내역 변경 및 취소할 수 있습니다.</p>
        </div>
        <MyReservationsSection />
      </main>
    </>
  );
}

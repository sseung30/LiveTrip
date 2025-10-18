import Image from 'next/image';
import { apiFetch } from '@/api/api';
import Button from '@/components/button/Button';
import ActivitiyCard from '@/domain/myactivities/components/ActivityCard';
import RegisterActivity from '@/domain/myactivities/components/RegitsterActivity';
import type { Activity, MyActivities } from '@/domain/myactivities/type';
// import mockData from '@/mocks/mockMyActivities.json'; // 🗄️ 목 데이터

export default async function Page() {
  // 🗄️ 목 데이터
  // const { activities, totalCount } = mockData as MyActivities;

  const { activities, totalCount } =
    await apiFetch<MyActivities>('/my-activities');

  const hasActivities = Boolean(totalCount);

  return (
    <main className='w-full'>
      <section className='pb-30'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-18 mb-2.5 font-bold text-gray-950'>
              내 체험 관리
            </h2>
            <p className='text-gray-500'>
              체험을 등록하거나 수정 및 삭제가 가능합니다.
            </p>
          </div>
          <div className='hidden sm:block'>
            <RegisterActivity />
          </div>
        </div>
        <div className='scrollbar-hide flex h-full flex-col gap-6 overflow-y-auto'>
          {hasActivities &&
            activities.map((a: Activity) => {
              return (
                <div key={a.id}>
                  <ActivitiyCard
                    title={a.title}
                    rating={a.rating}
                    reviewCount={a.reviewCount}
                    price={a.price}
                    bannerImageUrl={a.bannerImageUrl}
                  />
                </div>
              );
            })}
          {!hasActivities && (
            <div className='mt-7.5 flex flex-col'>
              <div className='flex items-center justify-center'>
                <Image
                  src='/images/reservation_empty.png'
                  alt='empty'
                  width={122}
                  height={122}
                  className='mb-7.5'
                />
              </div>
              <p className='text-18 mb-7.5 flex justify-center font-medium text-gray-600'>
                아직 예약한 체험이 없어요
              </p>
              <div className='flex justify-center'>
                <Button variant='primary' classNames='w-[182px]'>
                  둘러보기
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

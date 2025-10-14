'use client';

import Button from '@/components/button/Button';
import ActivitiyCard from '@/domain/myactivities/components/ActivityCard';
import mockData from '@/mocks/mockMyActivities.json'; // 🗄️ 목 데이터

export default function Page() {
  // 🗄️ 목 데이터
  const { activities } = mockData;

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <div>
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
            <div>
              <Button
                variant='primary'
                classNames='w-[138px]'
                onClick={handleClick}
              >
                체험 등록하기
              </Button>
            </div>
          </div>
          <div className='scrollbar-hide flex h-full flex-col gap-6 overflow-y-auto'>
            {activities.map((a) => {
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
          </div>
        </section>
      </main>
    </div>
  );
}

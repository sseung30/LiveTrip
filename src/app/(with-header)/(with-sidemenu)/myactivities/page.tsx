import ToastOnMount from '@/components/ToastOnMount';
import MyActivitySection from '@/domain/myactivities/components/MyActivitySection';
import RegisterActivity from '@/domain/myactivities/components/RegitsterActivity';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const unauthorized = sp.unauthorized === '1';

  return (
    <>
      <main className='w-full'>
        <section>
          {unauthorized && <ToastOnMount message='접근 권한이 없습니다.' />}
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
        </section>
        <MyActivitySection />
      </main>
    </>
  );
}

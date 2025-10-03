import SideMenu from '@/components/sideMenu/SideMenu';

export default function SideMenuTestPage() {
  return (
    <div className='min-h-screen bg-gray-900 p-10'>
      <h1 className='mb-8 text-3xl font-bold text-white'>
        SideMenu 컴포넌트 테스트
      </h1>

      <div className='flex gap-8'>
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-white'>
            Large Size (291x450)
          </h2>
          <SideMenu size='large' />
        </div>

        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-white'>
            Small Size (178x342)
          </h2>
          <SideMenu size='small' />
        </div>
      </div>
    </div>
  );
}

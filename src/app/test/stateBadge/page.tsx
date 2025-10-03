import SideMenu from '@/components/sideMenu/SideMenu';
import StateBadge from '@/components/stateBadge/StateBadge';
import type { StateType } from '@/components/stateBadge/type';

const stateTestData: StateType[] = [
  'cancelled',
  'completed',
  'rejected',
  'experience_completed',
  'approved',
];

export default function StateBadgeTestPage() {
  return (
    <div className='min-h-screen bg-white p-10'>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {/* StateBadge 테스트 */}
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-gray-800'>
            StateBadge 컴포넌트
          </h2>

          <div className='pt-4'>
            <div className='flex flex-wrap gap-2'>
              <StateBadge state='cancelled' />
              <StateBadge state='rejected' />
              <StateBadge state='completed' />
              <StateBadge state='experience_completed' />
              <StateBadge state='approved' />
            </div>
          </div>
        </div>

        {/* SideMenu 테스트 */}
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-gray-800'>
            SideMenu 컴포넌트
          </h2>
          <div className='flex gap-4'>
            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-gray-600'>
                Large (291x450)
              </h3>
              <SideMenu size='large' />
            </div>
            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-gray-600'>
                Small (178x342)
              </h3>
              <SideMenu size='small' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <h1 className='mb-8 text-3xl font-bold text-gray-800'>
        StateBadge 컴포넌트 테스트
      </h1>

      <div className='pt-8'>
        <div className='flex flex-wrap gap-2'>
          <StateBadge state='cancelled' />
          <StateBadge state='completed' />
          <StateBadge state='rejected' />
          <StateBadge state='experience_completed' />
          <StateBadge state='approved' />
        </div>
      </div>
    </div>
  );
}

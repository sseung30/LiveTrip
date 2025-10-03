import CalendarBadge from '@/components/calendarBadge/CalendarBadge';
import type { BadgeType } from '@/components/calendarBadge/type';

// 테스트 데이터
const badgeTestData: { type: BadgeType; count: number }[] = [
  { type: 'reservation', count: 1 },
  { type: 'approval', count: 5 },
  { type: 'completed', count: 12 },
  { type: 'reservation', count: 0 }, // 카운트 0 테스트
];

export default function BadgeTestPage() {
  return (
    // 뱃지 디자인을 명확하게 확인하기 위해 흰색 배경과 적당한 패딩을 줍니다.
    <div className='min-h-screen bg-white p-10'>
      <h1 className='mb-8 text-3xl font-bold text-gray-800'>
        뱃지 컴포넌트 테스트
      </h1>
      <p className='mb-6 text-gray-600'></p>

      <div className='flex flex-col space-y-4'>
        {badgeTestData.map((data) => {
          // 0인 뱃지는 렌더링하지 않도록 조건부 처리 (선택 사항)
          return data.count > 0 ? (
            <div
              key={`${data.type}-${data.count}`}
              className='flex items-center space-x-4'
            >
              <span className='w-24 font-medium text-gray-700'>
                {data.type.toUpperCase()} ({data.count})
              </span>
              <CalendarBadge type={data.type} count={data.count} />
            </div>
          ) : (
            <p key={`${data.type}-zero`} className='text-gray-400'>
              {data.type.toUpperCase()} 뱃지는 카운트가 0이라 표시되지 않음.
            </p>
          );
        })}

        {/* 추가적으로 여러 개를 나란히 배치하는 경우 */}
        <div className='pt-8'>
          <h2 className='mb-4 text-xl font-semibold text-gray-800'>
            날짜 셀 테스트 (나란히 배치)
          </h2>
          <div className='flex flex-wrap gap-2'>
            <CalendarBadge type='reservation' count={3} />
            <CalendarBadge type='approval' count={1} />
            <CalendarBadge type='completed' count={5} />
          </div>
        </div>
      </div>
    </div>
  );
}

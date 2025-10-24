import React, { useMemo } from 'react';
import type { Notification } from '@/components/notification/type';

function parseTime(updatedAt: string) {
  const year = Number(updatedAt.slice(0, 4));
  const month = Number(updatedAt.slice(5, 7));
  const day = Number(updatedAt.slice(8, 10));
  const hour = Number(updatedAt.slice(11, 13));
  const minutes = Number(updatedAt.slice(14, 16));
  const seconds = Number(updatedAt.slice(17, 19));
  const milliseconds = Number(updatedAt.slice(20, 23));

  // 윤달이 있어서 사실상 이게 아주 미세하게 좀 더 정확
  return new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
}

function formattedContents(content: string) {
  const title = content.slice(0, content.indexOf('('));
  const reservedDate = content.slice(
    content.indexOf('('),
    content.indexOf(')') + 1
  );
  const status = content.slice(
    content.indexOf(')') + 6,
    content.indexOf(')') + 8
  );

  return [title, reservedDate, status];
}

function formattedMilliseconds(ms: number) {
  if (ms < 1000) {
    return '방금 전';
  }

  const units = [
    { label: '년', ms: 365 * 30 * 24 * 60 * 60 * 1000 },
    { label: '개월', ms: 30 * 24 * 60 * 60 * 1000 },
    { label: '일', ms: 24 * 60 * 60 * 1000 },
    { label: '시간', ms: 60 * 60 * 1000 },
    { label: '분', ms: 60 * 1000 },
    { label: '초', ms: 1000 },
  ];

  for (const unit of units) {
    if (ms >= unit.ms) {
      const formattedResult = Math.floor(ms / unit.ms);

      return `${formattedResult}${unit.label} 전`;
    }
  }
}

const NotificationItem = React.memo(
  ({ n, now }: { n: Notification; now: number }) => {
    const { id, content, updatedAt } = n;

    const parsed = useMemo(() => {
      const updatedTime = parseTime(updatedAt);
      const [title, reservedDate, status] = formattedContents(content);

      return {
        updatedTime,
        title,
        reservedDate,
        status,
        isConfirmed: status === '승인',
      };
    }, [content, updatedAt]);

    return (
      <div
        key={id}
        className='hover:bg-primary-100 flex w-full flex-col px-5 py-4'
      >
        <div className='mb-2 flex justify-between'>
          <h3 className='text-14 leading-3.5 font-bold text-gray-950'>
            예약 {content.slice(-8, -6)}
          </h3>
          <h3 className='text-12 leading-3 font-medium text-gray-400'>
            {formattedMilliseconds(now - parsed.updatedTime.getTime())}
          </h3>
        </div>
        <div className='text-14-body font-medium text-gray-800'>
          {parsed.title}
          <br />
          {parsed.reservedDate}
          <br />
          예약이{' '}
          <span
            className={parsed.isConfirmed ? 'text-primary-500' : 'text-red-500'}
          >
            {parsed.isConfirmed ? '승인' : '거절'}
          </span>{' '}
          되었어요.
        </div>
      </div>
    );
  }
);

NotificationItem.displayName = 'NotificationItem';

export default NotificationItem;

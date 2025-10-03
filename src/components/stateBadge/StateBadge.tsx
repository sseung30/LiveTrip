import type {
  StateBadgeProps,
  StateConfig,
} from '@/components/stateBadge/type';

const STATE_CONFIG = {
  cancelled: {
    text: '예약 취소',
    className: 'bg-gray-100 text-gray-600',
  },
  completed: {
    text: '예약 완료',
    style: { backgroundColor: '#E9FBE4', color: '#2BA90D' },
  },
  rejected: {
    text: '예약 거절',
    style: { backgroundColor: '#FCECEA', color: '#F96767' },
  },
  experience_completed: {
    text: '체험 완료',
    style: { backgroundColor: '#DAF0FF', color: '#0D6CD1' },
  },
  approved: {
    text: '예약 승인',
    style: { backgroundColor: '#DDF9F9', color: '#1790A0' },
  },
};

export default function StateBadge({ state, className = '' }: StateBadgeProps) {
  const stateConfig = STATE_CONFIG[state];

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-bold ${'className' in stateConfig ? stateConfig.className : ''} ${className}`}
      style={'style' in stateConfig ? stateConfig.style : undefined}
    >
      {stateConfig.text}
    </span>
  );
}

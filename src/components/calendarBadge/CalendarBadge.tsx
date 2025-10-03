import type { BadgeProps, BadgeStyleMap } from '@/components/calendarBadge/type';

const BADGE_STYLES: BadgeStyleMap = {
  // 예약 
  reservation: {
    text: '예약',
    bgColor: 'bg-primary-100',     
    textColor: 'text-primary-500', 
  },
  // 승인 
  approval: {
    text: '승인',
    bgColor: 'bg-orange-100',    
    textColor: 'text-orange-400', 
  },
  // 완료 
  completed: {
    text: '완료',
    bgColor: 'bg-gray-50',     
    textColor: 'text-gray-500', 
  },
};

export default function Badge({ type, count }: BadgeProps) {
  const styles = BADGE_STYLES[type];
  
  return (
    <div
      className={`
        inline-flex items-center justify-center 
        px-2 py-0.5 
        text-md font-normal
        rounded-sm transition-colors
        ${styles.bgColor} 
        ${styles.textColor}
      `}
    >
      {styles.text} {count}
    </div>
  );
}
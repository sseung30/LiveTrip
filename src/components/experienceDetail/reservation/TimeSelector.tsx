import Button from '@/components/button/Button';
import type { Schedule } from '@/components/experienceDetail/type';

interface TimeSelectorProps {
  schedules: Schedule[];
  selectedTime: string | null;
  onTimeChange: (time: string | null) => void;
}

export default function TimeSelector({
  schedules,
  selectedTime,
  onTimeChange,
}: TimeSelectorProps) {
  return (
    <div>
      <h3 className='mb-3 text-base font-semibold text-gray-900'>
        예약 가능한 시간
      </h3>
      <div className='grid grid-cols-1 gap-2'>
        {schedules.map((schedule) => {
          const timeString = `${schedule.startTime}-${schedule.endTime}`;
          const isSelected = selectedTime === timeString;

          return (
            <Button
              key={schedule.id}
              variant={isSelected ? 'label' : 'secondary'}
              style={isSelected ? 'default' : 'accent'}
              classNames={`!h-auto !py-3 ${isSelected ? '!border-2 !border-primary-500' : ''}`}
              onClick={() => {
                onTimeChange(timeString);
              }}
            >
              {timeString}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

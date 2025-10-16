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

          return (
            <button
              key={schedule.id}
              className={`rounded-lg border p-3 text-center text-sm transition-colors ${
                selectedTime === timeString
                  ? 'border-primary-500 bg-primary-100 text-primary-500 font-bold'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
              onClick={() => {
                onTimeChange(timeString);
              }}
            >
              {timeString}
            </button>
          );
        })}
      </div>
    </div>
  );
}

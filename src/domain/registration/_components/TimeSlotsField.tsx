import { RoundIconButton } from '@/domain/registration/_components/RoundIconButton';
import { TimeSelectDropdown } from '@/domain/registration/_components/TimeSelectDropdown';
import type { TimeSlot } from '@/domain/registration/_utils/createEmptyTimeSlot';

interface TimeSlotsFieldProps {
  timeSlots: TimeSlot[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof Omit<TimeSlot, 'id'>, value: string) => void;
  timeOptions: string[];
}

export function TimeSlotsField({
  timeSlots,
  onAdd,
  onRemove,
  onChange,
  timeOptions,
}: TimeSlotsFieldProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-900">예약 가능한 시간대</h2>
        <p className="text-sm text-gray-500">날짜</p>
      </div>

      <div className="flex flex-col gap-4">
        {timeSlots.map((slot, index) => 
          { return <div
            key={slot.id}
            className="flex flex-col gap-4 rounded-2xlㄴ p-4 md:flex-row md:items-center md:gap-4"
          >
            <div className="relative w-full md:w-48">
              <input
                type="date"
                className="w-full rounded-2xl border border-gray-100 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 pr-12"
                value={slot.date}
                onChange={(e) => { onChange(slot.id, 'date', e.target.value); }}
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                <CalendarIcon />
              </span>
            </div>

            <div className="flex w-full flex-wrap items-center gap-2">
              <div className="flex-1 min-w-[150px]">
                <TimeSelectDropdown
                  value={slot.startTime}
                  options={timeOptions}
                  placeholder="시작 시간"
                  onSelect={(value) => { onChange(slot.id, 'startTime', value); }}
                />
              </div>

              <span className="flex h-12 w-6 items-center justify-center text-gray-300">-</span>

              <div className="flex-1 min-w-[150px]">
                <TimeSelectDropdown
                  value={slot.endTime}
                  options={timeOptions}
                  placeholder="종료 시간"
                  onSelect={(value) => { onChange(slot.id, 'endTime', value); }}
                />
              </div>

              <div className="ml-auto flex justify-end">
                {index === 0 ? (
                  <RoundIconButton ariaLabel="시간대 추가" onClick={onAdd}>
                    <PlusIcon />
                  </RoundIconButton>
                ) : (
                  <RoundIconButton ariaLabel="시간대 삭제" variant="neutral" onClick={() => { onRemove(slot.id); }}>
                    <MinusIcon />
                  </RoundIconButton>
                )}
              </div>
            </div>
          </div> }
        )}
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4" width="14" height="13" rx="2" stroke="#7A7A80" strokeWidth="1.5" />
      <path d="M3 8H17" stroke="#7A7A80" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 2.5V5.5" stroke="#7A7A80" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.5 2.5V5.5" stroke="#7A7A80" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3.33325V12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.33398 8H12.6673" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3.33398 8H12.6673" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

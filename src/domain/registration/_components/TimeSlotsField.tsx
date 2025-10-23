import DatePickerField from '@/domain/registration/_components/DatePickerField';
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
      </div>

      <div className="flex flex-col gap-4">
        {timeSlots.map((slot, index) => 
          { return <div
            key={slot.id}
            className={`flex flex-col gap-4 md:flex-row md:items-center md:gap-4 ${index === 0 && timeSlots.length > 1 ? 'border-b border-gray-100 pb-4' : ''}`}
          >
            {/* 날짜: 데스크탑에서는 남은 공간을 꽉 채움 (basis-0로 잔여폭 모두 차지) */}
            <div className="w-full md:flex-1 md:basis-0">
              <DatePickerField
                value={slot.date}
                onChange={(value) => onChange(slot.id, 'date', value)}
                placeholder="yyyy/mm/dd"
                label={index === 0 ? '날짜' : undefined}
                className="w-full"
              />
            </div>

            {/* 시간 + 버튼: 한 줄 정렬, 데스크탑에서는 내용폭만 차지 */}
            <div className="flex w-full items-end gap-2 md:flex-none md:w-auto md:flex-nowrap">
              <div className="flex-1 md:w-44 md:flex-none">
                <TimeSelectDropdown
                  label={index === 0 ? '시작 시간' : undefined}
                  value={slot.startTime}
                  options={timeOptions}
                  placeholder="0:00"
                  onSelect={(value) => { onChange(slot.id, 'startTime', value); }}
                />
              </div>

              <span className="self-end flex h-[54px] w-6 items-center justify-center text-gray-300">-</span>

              <div className="flex-1 md:w-44 md:flex-none">
                <TimeSelectDropdown
                  label={index === 0 ? '종료 시간' : undefined}
                  value={slot.endTime}
                  options={timeOptions}
                  placeholder="0:00"
                  onSelect={(value) => { onChange(slot.id, 'endTime', value); }}
                />
              </div>

              <div className="ml-4 shrink-0 self-end flex items-center h-[54px]">
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

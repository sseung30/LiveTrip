import Image from 'next/image';
import { useState } from 'react';

interface CalendarProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const TOTAL_CALENDAR_CELLS = 42;

export default function Calendar({
  selectedDate,
  onDateChange,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonthDays = Array.from(
    { length: startDay },
    (_, i) => daysInPrevMonth - startDay + i + 1
  );

  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const remainingCells =
    TOTAL_CALENDAR_CELLS - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays = Array.from({ length: remainingCells }, (_, i) => i + 1);

  const isToday = (day: number) => {
    const today = new Date();

    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) {
      return false;
    }

    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);

      newMonth.setMonth(prev.getMonth() + (direction === 'prev' ? -1 : 1));

      return newMonth;
    });
  };

  const handleDateClick = (day: number) => {
    onDateChange(new Date(year, month, day));
  };

  const getDateClassName = (day: number) => {
    if (isSelected(day)) {
      return 'bg-primary-500 rounded-full font-bold text-white';
    }
    if (isToday(day)) {
      return 'bg-primary-100 text-primary-700 rounded-full font-bold';
    }

    return 'rounded-full text-gray-700 hover:bg-gray-100';
  };

  return (
    <div>
      <h3 className='mb-3 text-base font-semibold text-gray-900'>날짜</h3>

      {/* 달력 헤더 */}
      <div className='mb-4 flex items-center justify-between'>
        <span className='font-semibold text-gray-900'>
          {currentMonth.toLocaleDateString('en-US', { month: 'long' })} {year}
        </span>
        <div className='flex items-center gap-6'>
          <button
            className='text-gray-600 hover:text-gray-900'
            onClick={() => {
              navigateMonth('prev');
            }}
          >
            <Image
              src='/icons/icon_arrow_left.svg'
              alt='이전 달'
              width={10}
              height={10}
              style={{ width: 'auto', height: 'auto' }}
            />
          </button>
          <button
            className='text-gray-600 hover:text-gray-900'
            onClick={() => {
              navigateMonth('next');
            }}
          >
            <Image
              src='/icons/icon_arrow_right.svg'
              alt='다음 달'
              width={10}
              height={10}
              style={{ width: 'auto', height: 'auto' }}
            />
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className='mb-2 grid grid-cols-7 gap-1'>
        {WEEKDAYS.map((day) => {
          return (
            <div
              key={`weekday-${day}`}
              className='p-2 text-center text-xs text-gray-500'
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* 달력 그리드 */}
      <div className='grid grid-cols-7 gap-1'>
        {/* 이전 달 */}
        {prevMonthDays.map((day) => {
          return (
            <div
              key={`prev-${day}`}
              className='flex aspect-square items-center justify-center text-xs text-gray-300'
            >
              {day}
            </div>
          );
        })}

        {/* 현재 달 */}
        {currentMonthDays.map((day) => {
          return (
            <button
              key={`current-${day}`}
              className={`flex aspect-square items-center justify-center text-sm transition-colors ${getDateClassName(day)}`}
              onClick={() => {
                handleDateClick(day);
              }}
            >
              {day}
            </button>
          );
        })}

        {/* 다음 달 */}
        {nextMonthDays.map((day) => {
          return (
            <div
              key={`next-${day}`}
              className='flex aspect-square items-center justify-center text-xs text-gray-300'
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

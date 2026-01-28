'use client';

import 'react-datepicker/dist/react-datepicker.css';
import { format, isDate,parseISO } from 'date-fns';
import { forwardRef, useMemo } from 'react';
import ReactDatePicker from 'react-datepicker';
import { cx } from '@/utils/cx';

interface DatePickerFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const DatePickerTrigger = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick, placeholder = 'yyyy/mm/dd', className, disabled }, ref) => 
    { return <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={cx(
        'flex h-[54px] w-full items-center justify-between rounded-2xl border px-4 text-left text-gray-950 transition-colors placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-25',
        disabled ? 'border-gray-100' : 'border-gray-100 hover:border-primary-500',
        className,
      )}
      onClick={onClick}
    >
      <span className={value ? 'text-gray-900' : 'text-gray-400'}>
        {value || placeholder}
      </span>
      <CalendarIcon />
    </button> }
  ,
);

DatePickerTrigger.displayName = 'DatePickerTrigger';

export default function DatePickerField({
  value,
  onChange,
  placeholder,
  label,
  className,
  disabled,
}: DatePickerFieldProps) {
  const selectedDate = useMemo(() => {
    if (!value) {
      return null;
    }

    try {
      const date = parseISO(value);

      return isDate(date) && !Number.isNaN(date.getTime()) ? date : null;
    } catch (error) {
      return null;
    }
  }, [value]);

  return (
    <div className="flex w-full flex-col">
      {label ? (
        <label className="mb-2 text-sm font-medium text-gray-900">{label}</label>
      ) : null}
      <ReactDatePicker
        selected={selectedDate}
        dateFormat="yyyy/MM/dd"
        placeholderText={placeholder}
        disabled={disabled}
        popperPlacement="bottom-start"
        showPopperArrow={false}
        customInput={
          <DatePickerTrigger
            value={selectedDate ? format(selectedDate, 'yyyy/MM/dd') : ''}
            placeholder={placeholder}
            className={className}
            disabled={disabled}
          />
        }
        onChange={(date) => {
          if (!date) {
            onChange('');

            return;
          }

          onChange(format(date, 'yyyy-MM-dd'));
        }}
      />
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-400"
    >
      <rect
        x="3"
        y="4"
        width="14"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 8H17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.5 2.5V5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.5 2.5V5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

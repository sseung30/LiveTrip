'use client';

import { useMemo } from 'react';
import SelectDropdown from '@/components/dropdown/SelectDropdown';

interface TimeSelectDropdownProps {
  label?: string;
  value: string;
  options: string[];
  placeholder: string;
  onSelect: (value: string) => void;
  width?: number;
}

export function TimeSelectDropdown({
  label,
  value,
  options,
  placeholder,
  onSelect,
  width,
}: TimeSelectDropdownProps) {
  const dropdownOptions = useMemo(() => {
    return options.map((option) => {
      return {
        label: option,
        value: option,
      };
    });
  }, [options]);

  return (
    <div>
      {label ? (
        <label className='mb-2 hidden text-sm text-black md:block'>
          {label}
        </label>
      ) : null}
      <SelectDropdown
        width={width}
        options={dropdownOptions}
        placeholder={placeholder}
        defaultValue={value || undefined}
        onSelect={onSelect}
      />
    </div>
  );
}

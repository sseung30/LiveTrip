'use client';

import { useMemo } from 'react';
import SelectDropdown from '@/components/dropdown/SelectDropdown';

interface TimeSelectDropdownProps {
  value: string;
  options: string[];
  placeholder: string;
  onSelect: (value: string) => void;
  width?: number;
}

export function TimeSelectDropdown({
  value,
  options,
  placeholder,
  onSelect,
  width = 184,
}: TimeSelectDropdownProps) {
  const dropdownOptions = useMemo(
    () =>
      options.map((option) => ({
        label: option,
        value: option,
      })),
    [options],
  );

  return (
    <SelectDropdown
      width={width}
      options={dropdownOptions}
      placeholder={placeholder}
      defaultValue={value || undefined}
      onSelect={onSelect}
    />
  );
}

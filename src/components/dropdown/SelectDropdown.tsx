'use client';

import { useState } from 'react';
import Dropdown from '@/components/dropdown/Dropdown';

const DEFAULT_WIDTH = 300;
const DEFAULT_POSITION = 'top-15';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  width?: number;
  position?: string;
  options: DropdownOption[];
  placeholder?: string;
  onSelect: (value: string) => void;
  defaultValue?: string;
}

export default function SelectDropdown({
  width = DEFAULT_WIDTH,
  position = DEFAULT_POSITION,
  options,
  placeholder = '선택하세요',
  onSelect,
  defaultValue,
}: DropdownProps) {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);

  // const handleClose = () => {
  //   setIsOpen(false);
  // };

  const handleSelect = (value: string) => {
    onSelect(value);
    setSelected(value);
  };

  const label = selected
    ? options.find((o) => o.value === selected)?.label
    : placeholder;

  return (
    <div>
      <Dropdown width={width}>
        <Dropdown.Trigger>
          <div className={selected ? 'text-gray-950' : 'text-gray-400'}>
            {label}
          </div>
        </Dropdown.Trigger>
        <Dropdown.Menu position={position}>
          {options.map((option) => {
            return (
              <Dropdown.Items
                key={option.value}
                value={option.value}
                onSelect={handleSelect}
              >
                {option.label}
              </Dropdown.Items>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

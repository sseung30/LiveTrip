'use client';

import { useState } from 'react';
import Dropdown from '@/components/dropdown/Dropdown';

const DEFAULT_WIDTH = 200;
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
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(defaultValue);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelect = (value: string) => {
    setIsOpen(false);
    onSelect(value);
    setSelected(value);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <Dropdown handleClose={handleClose}>
        <Dropdown.Trigger handleToggle={handleToggle}>
          <div className={selected ? 'text-gray-950' : 'text-gray-400'}>
            {selected
              ? options.find((o) => o.value === selected)?.label
              : placeholder}
          </div>
        </Dropdown.Trigger>
        <Dropdown.Menu isOpen={isOpen} width={width} position={position}>
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

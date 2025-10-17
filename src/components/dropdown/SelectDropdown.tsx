'use client';

import { useState } from 'react';
import Dropdown from '@/components/dropdown/Dropdown';
import type { Variant } from '@/components/dropdown/type';

const DEFAULT_POSITION = 'top-15';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  variant?: Variant;
  width?: number;
  position?: string;
  options: DropdownOption[];
  placeholder?: string;
  onSelect: (value: string) => void;
  defaultValue?: string;
}

/**
 * placeholder 색상 지정
 */
function getDesign(variant: Variant, selected?: string) {
  if (variant === 'detailPage') {
    return selected ? 'text-gray-950' : 'text-gray-400';
  }

  return 'text-gray-950';
}

export default function SelectDropdown({
  variant = 'detailPage',
  width,
  position = DEFAULT_POSITION,
  options,
  placeholder = '선택하세요',
  onSelect,
  defaultValue,
}: DropdownProps) {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);

  const handleSelect = (value: string) => {
    onSelect(value);
    setSelected(value);
  };

  const label = selected
    ? options.find((o) => o.value === selected)?.label
    : placeholder;

  const triggerDesign = getDesign(variant, selected);

  return (
    <div>
      <Dropdown width={width}>
        <Dropdown.Trigger variant={variant}>
          <div className={triggerDesign}>{label}</div>
        </Dropdown.Trigger>
        <Dropdown.Menu position={position}>
          {options.map((option) => {
            return (
              <Dropdown.Items
                key={option.value}
                value={option.value}
                variant={variant}
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

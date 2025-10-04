import type { ReactNode } from 'react';
import {
  type ButtonStyle,
  FILTER,
  type FilterSize,
  type FilterState,
  LABEL,
  type LabelSize,
  type LabelState,
  PRIMARY,
  type PrimarySize,
  type PrimaryState,
  SECONDARY,
  type SecondarySize,
  type SecondaryState,
} from '@/components/button/type';

interface BaseProps {
  width: number;
  height: number;
  children?: ReactNode;
  onClick: () => void;
}

type ButtonProps =
  | ({ variant: 'primary'; size: PrimarySize; state: PrimaryState } & BaseProps)
  | ({
      variant: 'secondary';
      size: SecondarySize;
      state: SecondaryState;
    } & BaseProps)
  | ({ variant: 'label'; size: LabelSize; state: LabelState } & BaseProps)
  | ({ variant: 'filter'; size: FilterSize; state: FilterState } & BaseProps);

function styleFromProps(p: ButtonProps): ButtonStyle {
  switch (p.variant) {
    case 'primary': {
      return PRIMARY[p.size][p.state];
    }
    case 'secondary': {
      return SECONDARY[p.size][p.state];
    }
    case 'label': {
      return LABEL[p.size][p.state];
    }
    case 'filter': {
      return FILTER[p.size][p.state];
    }
  }
}

function buildClassName(style: ButtonStyle): string {
  const base =
    'inline-flex items-center justify-center text-center select-none gap-1';

  return [
    base,
    style.bg,
    style.text,
    style.textSize,
    style.radius,
    style.stroke,
  ]
    .filter(Boolean)
    .join(' ');
}

export default function Button(props: ButtonProps) {
  const { variant, state, width, height, children, onClick } = props;

  const style = styleFromProps(props);

  const className = buildClassName(style);

  const isDisabled =
    (variant === 'primary' && state === 'disable') ||
    (variant === 'secondary' && state === 'disable');

  return (
    <button
      className={className}
      style={{ width, height }}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

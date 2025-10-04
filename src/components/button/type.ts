export type PrimarySize = 'lg' | 'md' | 'sm';
export type PrimaryState = 'active' | 'disable';

export type SecondarySize = 'lg' | 'md' | 'sm';
export type SecondaryState = 'normal' | 'active' | 'disable';

export type LabelSize = 'lg' | 'md' | 'sm';
export type LabelState = 'normal' | 'active';

export type FilterSize = 'PC' | 'mobile';
// export type FilterSize = 'lg' | 'sm';
export type FilterState = 'active' | 'normal';

export interface ButtonStyle {
  bg?: string | null;
  text: string;
  textSize: string;
  radius: string;
  stroke?: string | null;
  labelSize?: number | null;
}

/* sonarjs/no-duplicate-string은 3번 이상 반복되는 문자열 리터럴을 감지 */
const BG_PRIMARY_100 = 'bg-primary-100';
const BG_PRIMARY_500 = 'bg-primary-500';
const BG_WHITE = 'bg-white';
const BG_DISABLED = 'bg-gray-200';
const BG_333333 = 'bg-[#333333]';
const TEXT_WHITE = 'text-white';
const TEXT_GRAY_50 = 'text-gray-50';
const TEXT_GRAY_200 = 'text-gray-200';
const TEXT_GRAY_600 = 'text-gray-600';
const TEXT_GRAY_950 = 'text-gray-950';
const TEXT_16 = 'text-16';
const TEXT_14 = 'text-14';
const TEXT_B = 'font-bold';
const TEXT_M = 'font-medium';
const BORDER_GRAY_200 = 'border border-gray-200';
const BORDER_D8D8D8 = 'border border-[#D8D8D8]';
const RADIUS_LARGE = 'rounded-2xl';
const RADIUS_MEDIUM = 'rounded-[14px]';
const RADIUS_SMALL = 'rounded-xl';
const RADIUS_100 = 'rounded-[100px]';
const LABEL_LARGE = 24;
const LABEL_MEDIUM = 20;
const LABEL_SMALL = 16;

export const PRIMARY: Record<PrimarySize, Record<PrimaryState, ButtonStyle>> = {
  lg: {
    active: {
      bg: BG_PRIMARY_500,
      text: TEXT_WHITE,
      textSize: `${TEXT_16} ${TEXT_B}`,
      radius: RADIUS_LARGE,
      stroke: null,
    },
    disable: {
      bg: BG_DISABLED,
      text: TEXT_GRAY_50,
      textSize: `${TEXT_16} ${TEXT_B}`,
      radius: RADIUS_LARGE,
      stroke: null,
    },
  },
  md: {
    active: {
      bg: BG_PRIMARY_500,
      text: TEXT_WHITE,
      textSize: `${TEXT_16} ${TEXT_B}`,
      radius: RADIUS_MEDIUM,
      stroke: null,
    },
    disable: {
      bg: BG_DISABLED,
      text: TEXT_GRAY_50,
      textSize: `${TEXT_16} ${TEXT_B}`,
      radius: RADIUS_MEDIUM,
      stroke: null,
    },
  },
  sm: {
    active: {
      bg: BG_PRIMARY_500,
      text: TEXT_WHITE,
      textSize: `${TEXT_14} ${TEXT_B}`,
      radius: RADIUS_SMALL,
      stroke: null,
    },
    disable: {
      bg: BG_DISABLED,
      text: TEXT_GRAY_50,
      textSize: `${TEXT_14} ${TEXT_B}`,
      radius: RADIUS_SMALL,
      stroke: null,
    },
  },
};

export const SECONDARY: Record<
  SecondarySize,
  Record<SecondaryState, ButtonStyle>
> = {
  lg: {
    normal: {
      bg: BG_WHITE,
      text: TEXT_GRAY_600,
      textSize: `${TEXT_16} ${TEXT_M}`,
      radius: RADIUS_LARGE,
      stroke: BORDER_GRAY_200,
      labelSize: LABEL_LARGE,
    },
    active: {
      bg: BG_PRIMARY_500,
      text: TEXT_WHITE,
      textSize: `${TEXT_16} ${TEXT_M}`,
      radius: RADIUS_LARGE,
      stroke: null,
      labelSize: LABEL_LARGE,
    },
    disable: {
      bg: BG_WHITE,
      text: TEXT_GRAY_200,
      textSize: `${TEXT_16} ${TEXT_M}`,
      radius: RADIUS_LARGE,
      stroke: BORDER_GRAY_200,
      labelSize: LABEL_LARGE,
    },
  },
  md: {
    normal: {
      bg: BG_WHITE,
      text: TEXT_GRAY_600,
      textSize: `${TEXT_16} ${TEXT_M}`,
      radius: RADIUS_MEDIUM,
      stroke: BORDER_GRAY_200,
      labelSize: LABEL_MEDIUM,
    },
    active: {
      bg: BG_PRIMARY_500,
      text: TEXT_WHITE,
      textSize: `${TEXT_16} ${TEXT_M}`,
      radius: RADIUS_MEDIUM,
      stroke: null,
      labelSize: LABEL_MEDIUM,
    },
    disable: {
      bg: BG_WHITE,
      text: TEXT_GRAY_200,
      textSize: `${TEXT_16} ${TEXT_M}`,
      radius: RADIUS_MEDIUM,
      stroke: BORDER_GRAY_200,
      labelSize: LABEL_MEDIUM,
    },
  },
  sm: {
    normal: {
      bg: BG_WHITE,
      text: TEXT_GRAY_600,
      textSize: `${TEXT_14} ${TEXT_M}`,
      radius: RADIUS_SMALL,
      stroke: BORDER_GRAY_200,
      labelSize: LABEL_SMALL,
    },
    active: {
      bg: BG_PRIMARY_500,
      text: TEXT_WHITE,
      textSize: `${TEXT_14} ${TEXT_M}`,
      radius: RADIUS_SMALL,
      stroke: null,
      labelSize: LABEL_SMALL,
    },
    disable: {
      bg: BG_WHITE,
      text: TEXT_GRAY_200,
      textSize: `${TEXT_14} ${TEXT_M}`,
      radius: RADIUS_SMALL,
      stroke: BORDER_GRAY_200,
      labelSize: LABEL_SMALL,
    },
  },
};

export const LABEL: Record<LabelSize, Record<LabelState, ButtonStyle>> = {
  lg: {
    active: {
      bg: BG_PRIMARY_100,
      text: TEXT_GRAY_950,
      textSize: `${TEXT_16} ${TEXT_M}`,
      radius: RADIUS_LARGE,
      stroke: null,
      labelSize: LABEL_LARGE,
    },
    normal: {
      bg: null,
      text: TEXT_GRAY_600,
      textSize: `${TEXT_16} ${TEXT_M}`,
      radius: RADIUS_LARGE,
      stroke: null,
      labelSize: LABEL_LARGE,
    },
  },
  md: {
    active: {
      bg: BG_PRIMARY_100,
      text: TEXT_GRAY_950,
      textSize: `${TEXT_16} ${TEXT_M}`,
      radius: RADIUS_MEDIUM,
      stroke: null,
      labelSize: LABEL_MEDIUM,
    },
    normal: {
      bg: null,
      text: TEXT_GRAY_600,
      textSize: `${TEXT_16} ${TEXT_M}`,
      radius: RADIUS_MEDIUM,
      stroke: null,
      labelSize: LABEL_MEDIUM,
    },
  },
  sm: {
    active: {
      bg: BG_PRIMARY_100,
      text: TEXT_GRAY_950,
      textSize: `${TEXT_14} ${TEXT_M}`,
      radius: RADIUS_SMALL,
      stroke: null,
      labelSize: LABEL_SMALL,
    },
    normal: {
      bg: null,
      text: TEXT_GRAY_600,
      textSize: `${TEXT_14} ${TEXT_M}`,
      radius: RADIUS_SMALL,
      stroke: null,
      labelSize: LABEL_SMALL,
    },
  },
};

export const FILTER: Record<FilterSize, Record<FilterState, ButtonStyle>> = {
  PC: {
    active: {
      bg: BG_WHITE,
      text: TEXT_GRAY_950,
      textSize: `${TEXT_16} ${TEXT_M}`,
      radius: RADIUS_100,
      stroke: BORDER_D8D8D8,
      labelSize: LABEL_LARGE,
    },
    normal: {
      bg: BG_333333,
      text: TEXT_WHITE,
      textSize: `${TEXT_16} ${TEXT_B}`,
      radius: RADIUS_100,
      stroke: null,
      labelSize: LABEL_LARGE,
    },
  },
  mobile: {
    active: {
      bg: BG_WHITE,
      text: TEXT_GRAY_950,
      textSize: `${TEXT_14} ${TEXT_M}`,
      radius: RADIUS_100,
      stroke: BORDER_D8D8D8,
      labelSize: LABEL_SMALL,
    },
    normal: {
      bg: BG_333333,
      text: TEXT_WHITE,
      textSize: `${TEXT_14} ${TEXT_B}`,
      radius: RADIUS_100,
      stroke: null,
      labelSize: LABEL_SMALL,
    },
  },
};

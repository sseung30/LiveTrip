// UI 관련 상수
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  GALLERY_HEIGHTS: {
    mobile: 'h-64',
    tablet: 'sm:h-80',
    desktop: 'lg:h-96',
  },
  STAR_SIZES: {
    sm: { width: 14, height: 14 },
    md: { width: 16, height: 16 },
  },
  ICON_SIZES: {
    location: { width: 12, height: 12 },
  },
} as const;

// 레이아웃 관련 상수
export const LAYOUT_CONSTANTS = {
  CONTAINER_MAX_WIDTH: 'max-w-7xl',
  GRID_COLS: {
    mobile: 'grid-cols-1',
    desktop: 'lg:grid-cols-3',
  },
  SPACING: {
    mobile: 'space-y-6',
    desktop: 'lg:space-y-8',
  },
} as const;

// 반응형 브레이크포인트
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

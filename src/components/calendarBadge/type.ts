// 뱃지 타입 (reservation, approval, completed, declined)
export type BadgeType = 'reservation' | 'approval' | 'completed' | 'declined';

// 뱃지 스타일 객체의 구조를 정의 (데이터는 포함하지 않음)
export interface BadgeStyle {
  text: string;
  bgColor: string;
  textColor: string;
}

// 뱃지 스타일 맵의 타입 정의
export type BadgeStyleMap = Record<BadgeType, BadgeStyle>;

// 뱃지 Props 인터페이스
export interface BadgeProps {
  type: BadgeType;
  count: number;
}
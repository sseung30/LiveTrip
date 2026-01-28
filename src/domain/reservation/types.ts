// 예약 상태 타입
export type StateType =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

// ====================================
// Activity Info Types
// ====================================

// 기본 활동 정보
export interface ActivityInfo {
  id: number;
  title: string;
  bannerImageUrl: string;
}

// 상세 활동 정보 (호스트 관점)
export interface MyActivity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

// ====================================
// Base Reservation Types
// ====================================

// 기본 예약 인터페이스
export interface BaseReservation {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: StateType;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

// 사용자 예약 관점
export interface UserReservation extends BaseReservation {
  activity: ActivityInfo;
  reviewSubmitted: boolean;
}

// 호스트 예약 관점
export interface HostReservation extends BaseReservation {
  nickname: string;
  activity: MyActivity;
}

// ====================================
// MyReservation Domain Types (유저 예약)
// ====================================

// CardList 컴포넌트 Props
export interface CardListProps {
  state: StateType;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  capacity: number;
  reviewSubmitted: boolean;
  thumbnailUrl?: string;
  onChangeReservation?: () => void;
  onCancelReservation?: () => void;
  onWriteReview?: () => void;
}

export interface ReservedActivity {
  teamId: string;
  userId: number;
  activityInfo: ActivityInfo;
}

// MyReservation API 응답 타입
export interface MyReservationsResponse {
  cursorId: number | null;
  totalCount: number;
  reservations: UserReservation[];
}

// ====================================
// Reservation Status Domain Types (호스트 예약 관리)
// ====================================

// 뱃지 타입 (UI 표시용)
export type BadgeType = 'reservation' | 'approval' | 'completed';

// 뱃지 스타일 객체
export interface BadgeStyle {
  text: string;
  bgColor: string;
  textColor: string;
}

// 뱃지 스타일 맵
export type BadgeStyleMap = Record<BadgeType, BadgeStyle>;

// 뱃지 Props
export interface BadgeProps {
  type: BadgeType;
  count: number;
}

// State 상태 설정
export interface StateConfig {
  text: string;
  className?: string;
  style?: { backgroundColor: string; color: string };
}

// StateBadge Props
export interface StateBadgeProps {
  state: StateType;
  className?: string;
}

// 예약 대시보드 (달력용)
export interface ReservationDashboard {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
    declined?: number;
  };
}

// 예약된 스케줄
export interface ReservedSchedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

// MyActivities 응답 (호스트 관점)
export interface MyActivitiesResponse {
  cursorId: number | null;
  totalCount: number;
  activities: MyActivity[];
}

// ActivityReservation (호스트 관점)
export interface ActivityReservation {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: 'declined' | 'pending' | 'confirmed';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

// 예약 목록 응답 (호스트 관점)
export interface ReservationsResponse {
  cursorId: number | null;
  totalCount: number;
  reservations: ActivityReservation[];
}

// ====================================
// Query and Request Types
// ====================================

// 사용자 예약 조회 파라미터
export interface MyReservationParams {
  cursorId?: number;
  status?: StateType;
  size?: number;
}

// 대시보드 조회 파라미터
export interface DashboardParams {
  activityId: number;
  year: string;
  month: string;
}

// 예약 상세 조회 파라미터
export interface ReservationQueryParams {
  activityId: number;
  scheduleId: number;
  status: StateType;
}

import type { StateType } from '@/domain/reservation-status/components/state-badge/type';

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
export interface ActivityInfo {
  id: number;
  title: string;
  bannerImageUrl: string;
}

export interface ReservedActivity {
  teamId: string;
  userId: number;
  activityInfo: ActivityInfo;
}

export interface Reservation {
  activity: ActivityInfo;
  id: number;
  scheduled: number;
  status: StateType;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyReservations {
  cursorId: number;
  totalCount: number;
  reservations: Reservation[];
}

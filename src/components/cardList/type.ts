import type { StateType } from '@/components/stateBadge/type';

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

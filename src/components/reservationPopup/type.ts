export type ReservationStatusType = 'pending' | 'confirmed' | 'declined';

export interface ReservationDetail {
  id: number;
  nickname: string;
  headCount: number;
  status: ReservationStatusType;
  scheduleId: number;
}

export interface Schedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

export type { Schedule as ReservedSchedule };

export interface ReservationPopupProps {
  isOpen: boolean;
  position: {
    top: number;
    right: number;
  };
  date: Date;
  schedules: Schedule[];
  reservations: ReservationDetail[];
  activityId: number;
  onClose: () => void;
}

export type ReservationStatusType = 'pending' | 'confirmed' | 'declined';

export interface ReservationDetail {
  id: number;
  nickname: string;
  headCount: number;
  status: ReservationStatusType;
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
  onClose: () => void;
  position: {
    top: number;
    right: number;
  };
  date: Date;
  schedules: Schedule[];
  reservations: ReservationDetail[];
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

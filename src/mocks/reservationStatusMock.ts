/**
 * API 응답 타입 정의
 */

// 1. 월별 예약 현황 API 응답
export interface ReservationDashboard {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

// 2. 날짜별 스케줄 API 응답
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

// 3. 예약 내역 API 응답
export interface Reservation {
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

export interface ReservationsResponse {
  cursorId: number;
  totalCount: number;
  reservations: Reservation[];
}

/**
 * 더미 체험 데이터
 */
export const EXPERIENCES = [
  { value: '1', label: '함께 배우면 즐거운 스트릿 댄스' },
  { value: '2', label: '내 강아지 사진 찍어주기' },
  { value: '3', label: '열기구 페스티벌' },
];

/**
 * 더미 데이터 1: 월별 예약 현황 (달력용)
 */
export const MOCK_RESERVATION_DASHBOARD: ReservationDashboard[] = [
  {
    date: '2023-02-09',
    reservations: {
      completed: 10,
      confirmed: 0,
      pending: 0,
    },
  },
  {
    date: '2023-02-10',
    reservations: {
      completed: 0,
      confirmed: 2,
      pending: 0,
    },
  },
  {
    date: '2023-02-11',
    reservations: {
      completed: 0,
      confirmed: 0,
      pending: 2,
    },
  },
  {
    date: '2023-02-12',
    reservations: {
      completed: 0,
      confirmed: 8,
      pending: 10,
    },
  },
];

/**
 * 더미 데이터 2: 날짜별 스케줄 (특정 날짜 클릭 시)
 */
export const MOCK_RESERVED_SCHEDULE: ReservedSchedule[] = [
  {
    scheduleId: 1,
    startTime: '14:00',
    endTime: '15:00',
    count: {
      declined: 1,
      confirmed: 1,
      pending: 2,
    },
  },
  {
    scheduleId: 2,
    startTime: '16:00',
    endTime: '17:00',
    count: {
      declined: 0,
      confirmed: 2,
      pending: 1,
    },
  },
];

/**
 * 더미 데이터 3: 예약 내역 (시간대별 상세)
 */
export const MOCK_RESERVATIONS_RESPONSE: ReservationsResponse = {
  cursorId: 0,
  totalCount: 4,
  reservations: [
    {
      id: 1,
      nickname: '정만철',
      userId: 101,
      teamId: 'team1',
      activityId: 1,
      scheduleId: 1,
      status: 'pending',
      reviewSubmitted: false,
      totalPrice: 35000,
      headCount: 10,
      date: '2023-02-10',
      startTime: '14:00',
      endTime: '15:00',
      createdAt: '2023-02-01T10:00:00.000Z',
      updatedAt: '2023-02-01T10:00:00.000Z',
    },
    {
      id: 2,
      nickname: '김영희',
      userId: 102,
      teamId: 'team1',
      activityId: 1,
      scheduleId: 1,
      status: 'pending',
      reviewSubmitted: false,
      totalPrice: 42000,
      headCount: 12,
      date: '2023-02-10',
      startTime: '14:00',
      endTime: '15:00',
      createdAt: '2023-02-01T11:00:00.000Z',
      updatedAt: '2023-02-01T11:00:00.000Z',
    },
    {
      id: 3,
      nickname: '이철수',
      userId: 103,
      teamId: 'team1',
      activityId: 1,
      scheduleId: 1,
      status: 'confirmed',
      reviewSubmitted: true,
      totalPrice: 35000,
      headCount: 10,
      date: '2023-02-10',
      startTime: '14:00',
      endTime: '15:00',
      createdAt: '2023-02-01T12:00:00.000Z',
      updatedAt: '2023-02-02T09:00:00.000Z',
    },
    {
      id: 4,
      nickname: '박민수',
      userId: 104,
      teamId: 'team1',
      activityId: 1,
      scheduleId: 1,
      status: 'declined',
      reviewSubmitted: false,
      totalPrice: 42000,
      headCount: 12,
      date: '2023-02-10',
      startTime: '14:00',
      endTime: '15:00',
      createdAt: '2023-02-01T13:00:00.000Z',
      updatedAt: '2023-02-02T10:00:00.000Z',
    },
  ],
};

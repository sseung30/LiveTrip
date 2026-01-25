export type activityCategory =
  | '문화 · 예술'
  | '식음료'
  | '스포츠'
  | '투어'
  | '관광'
  | '웰빙';
export type sortType = 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';

export interface Activity {
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
export interface ActivityDetail extends Activity {
  subImageUrls: string[];
  subImages: SubImage[];
  schedules: Schedule[];
  shortDescription: string;
}
export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}
export interface SubImage {
  id: number;
  imageUrl: string;
}
export interface MyActivityDetail extends Activity {
  subImages: { id: number; imageUrl: string }[];
  schedules: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  }[];
}
export interface getAllActivitiesParams {
  cursorId?: number | null;
  category?: activityCategory;
  keyword?: string;
  sort?: sortType;
  page?: number;
  size?: number;
  method: 'cursor' | 'offset';
}
export interface getAllActivitiesResponse {
  cursorId: number | null;
  totalCount: number;
  activities: Activity[];
}

export interface ReviewResponse {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}
export interface Review {
  id: number;
  user: {
    id: number;
    profileImageUrl: string;
    nickname: string;
  };
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface AvailableSchedule {
  date: string;
  times: AvailableTime[];
}
export interface AvailableTime {
  id: number;
  startTime: string;
  endTime: string;
}

export interface ReservationRequest {
  scheduleId: number;
  headCount: number;
}
export interface ReservationResponse {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

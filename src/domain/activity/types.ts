// Activity domain unified types
// Consolidated from activities, registration, home, and myactivities domains

export type activityCategory =
  | '문화 · 예술'
  | '식음료'
  | '스포츠'
  | '투어'
  | '관광'
  | '웰빙';

export type sortType = 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';

// Core Activity types (from activities/type.ts)
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
  subImages: SubImage[];
  schedules: Schedule[];
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

// Activity listing and pagination
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

export interface MyActivities {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
}

// Review types
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

// Reservation types
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
export interface UploadedImage {
  id: string;
  src: string;
}
export interface UpdateActivityPayloadType {
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  address?: string;
  bannerImageUrl?: string;
  subImageIdsToRemove?: number[];
  subImageUrlsToAdd?: string[];
  scheduleIdsToRemove?: number[];
  schedulesToAdd?: { date: string; startTime: string; endTime: string }[];
}

export type UpdateActivityPayload = Partial<UpdateActivityPayloadType>;

// Search/Home types (from home/type.ts)
export interface homeSearchParams {
  sort?: sortType;
  category?: activityCategory;
}

export type AllActivitySectionProps = homeSearchParams;
export type AllActivityDataWrapperProps = AllActivitySectionProps;

export interface useInfiniteActivitiesParams extends AllActivitySectionProps {
  keyword?: string;
}

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

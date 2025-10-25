export interface ExperienceDetail {
  id: number;
  userId: number;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: SubImage[];
  schedules: Schedule[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubImage {
  id: number;
  imageUrl: string;
}

export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
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

export interface ImageGalleryProps {
  images: string[];
}

export interface ExperienceInfoProps {
  description: string;
  address: string;
}

export interface ExperienceReviewsProps {
  reviews: Review[];
  totalReviews: number;
  averageRating: number;
  activityId: number;
}

export interface ReservationCardProps {
  experience: ExperienceDetail;
  selectedDate: Date | null;
  selectedTime: string | null;
  participantCount: number;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: string | null) => void;
  onParticipantChange: (count: number) => void;
}

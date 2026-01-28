export interface ActivityCardProps {
  id: number;
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  bannerImageUrl: string;
  onDelete?: () => void;
}
export interface FormValues {
  title: string;
  category: string;
  description: string;
  address: string;
  price: string;
  bannerImage: string;
  subImageUrls: string[];
  timeSlots: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
}
export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface UploadedImage {
  id: string;
  src: string;
}

export type UpdateActivityPayload = Partial<{
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  /**
   * For edit endpoint contract
   */
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: { date: string; startTime: string; endTime: string }[];
}>;

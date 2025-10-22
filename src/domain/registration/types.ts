import { useForm, type UseFormReturn } from "react-hook-form";

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
